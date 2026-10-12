import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createMpgInvoice, verifyMpgWebhookSignature } from "./mpg.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Muat variabel environment dari .env jika ada
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join("=").trim();
      }
    }
  });
}

const PORT = process.env.PORT || 3001;

// Penyimpanan JSON persisten untuk Produk & Pesanan (Local Backend Store)
const dataDir = path.resolve(__dirname, "data");
const dbFilePath = path.resolve(dataDir, "db.json");

function readDb() {
  try {
    if (fs.existsSync(dbFilePath)) {
      return JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
    }
  } catch (err) {
    console.error("[DB_READ_ERROR]", err.message);
  }
  return { products: null, orders: [] };
}

function writeDb(data) {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[DB_WRITE_ERROR]", err.message);
  }
}

// Penyimpanan status pesanan in-memory
const orderStore = new Map();

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Callback-Signature, X-Callback-Timestamp");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. HEALTH CHECK
  if (url.pathname === "/api/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "MPG Backend Server", time: new Date().toISOString() }));
    return;
  }

  // 2. CHECKOUT ENDPOINT (POST /api/checkout)
  if (url.pathname === "/api/checkout" && req.method === "POST") {
    let rawBody = "";
    req.on("data", (chunk) => {
      rawBody += chunk;
    });

    req.on("end", async () => {
      try {
        const body = JSON.parse(rawBody || "{}");
        const orderId = body.order_id || `ORDER-${Date.now()}`;
        const amount = Number(body.amount) || 50000;
        const customerName = body.customer_name || "Pelanggan Pasar Pagi";
        const customerEmail = body.customer_email || "customer@pasarpagi.id";
        const customerPhone = body.customer_phone || "081234567890";

        // Simpan status awal PENDING
        orderStore.set(orderId, {
          orderId,
          amount,
          status: "PENDING",
          createdAt: new Date(),
        });

        // Terbitkan tagihan ke Mandiri Private Gateway
        const mpgRes = await createMpgInvoice({
          orderId,
          amount,
          customerName,
          customerEmail,
          customerPhone,
          redirectUrl: body.redirect_url || "http://localhost:5173",
          items: body.items,
        });

        const checkoutUrl = mpgRes.data?.checkout_url;

        // Opsi A: Hosted Checkout Redirect jika diminta form HTML
        if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
          res.writeHead(303, { Location: checkoutUrl });
          res.end();
          return;
        }

        // Return response JSON
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            order_id: orderId,
            checkout_url: checkoutUrl,
            data: mpgRes.data,
          })
        );
      } catch (err) {
        console.error("[CHECKOUT_API_ERROR]", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
    return;
  }

  // 3. WEBHOOK RECEIVER (POST & GET /api/webhook/payment-success)
  if (url.pathname === "/api/webhook/payment-success") {
    // Sediakan respons informatif jika diakses lewat GET (misal via browser)
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "active",
          service: "MPG Webhook Receiver",
          message: "Endpoint webhook aktif dan siap menerima notifikasi POST dari Mandiri Private Gateway.",
          method_expected: "POST",
          time: new Date().toISOString()
        })
      );
      return;
    }

    if (req.method === "POST") {
      let rawBody = "";
      req.on("data", (chunk) => {
        rawBody += chunk;
      });

      req.on("end", () => {
        try {
          const signatureHeader =
            req.headers["x-callback-signature"] ||
            req.headers["x-mpg-signature"] ||
            req.headers["x-signature"] ||
            req.headers["signature"];

          console.log(`\n📥 [WEBHOOK_INCOMING] ${new Date().toLocaleTimeString()}`);
          console.log(`   Headers:`, {
            "content-type": req.headers["content-type"],
            "x-callback-signature": signatureHeader,
            "user-agent": req.headers["user-agent"]
          });
          console.log(`   Body:`, rawBody || "(empty body)");

          // Verifikasi tanda tangan HMAC-SHA256
          const isValid = verifyMpgWebhookSignature(rawBody, signatureHeader);
          if (!isValid) {
            console.error("[WEBHOOK_UNAUTHORIZED] Tanda tangan HMAC tidak valid.");
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, message: "Invalid signature" }));
            return;
          }

          const payload = JSON.parse(rawBody || "{}");
          console.log(`[WEBHOOK_VERIFIED] Order: ${payload.order_id} | Event: ${payload.event} | Amount: ${payload.amount}`);

        if (payload.event !== "payment.success") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, message: "Event ignored" }));
          return;
        }

        // Idempotency check
        const existing = orderStore.get(payload.order_id);
        if (existing && existing.status === "PAID") {
          console.log(`[WEBHOOK_IDEMPOTENT] Order ${payload.order_id} sudah lunas sebelumnya.`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, message: "Already processed" }));
          return;
        }

        // Update status menjadi PAID
        orderStore.set(payload.order_id, {
          ...(existing || {}),
          orderId: payload.order_id,
          status: "PAID",
          finalAmount: payload.amount,
          detectedBank: payload.detected_bank,
          paidAt: payload.paid_at ? new Date(payload.paid_at) : new Date(),
        });

        console.log(`[PAYMENT_SUCCESS] Order #${payload.order_id} LUNAS via ${payload.detected_bank}!`);

        // Wajib HTTP 200 {"success": true}
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error("[WEBHOOK_ERROR]", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Internal error" }));
      }
    });
    return;
  }
}


  // 4. CHECK ORDER STATUS (GET /api/order-status?order_id=...)
  if (url.pathname === "/api/order-status" && req.method === "GET") {
    const orderId = url.searchParams.get("order_id");
    const order = orderStore.get(orderId);
    if (!order) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Order not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, order }));
    return;
  }

  // 5. PRODUCTS API (/api/products)
  if (url.pathname === "/api/products") {
    if (req.method === "GET") {
      const db = readDb();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, products: db.products }));
      return;
    }

    if (req.method === "POST" || req.method === "PUT") {
      let rawBody = "";
      req.on("data", (chunk) => { rawBody += chunk; });
      req.on("end", () => {
        try {
          const body = JSON.parse(rawBody || "{}");
          const db = readDb();
          if (Array.isArray(body.products)) {
            db.products = body.products;
          }
          writeDb(db);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, products: db.products }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: err.message }));
        }
      });
      return;
    }
  }

  // 6. ORDERS API (/api/orders)
  if (url.pathname === "/api/orders") {
    if (req.method === "GET") {
      const db = readDb();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, orders: db.orders || [] }));
      return;
    }

    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
      let rawBody = "";
      req.on("data", (chunk) => { rawBody += chunk; });
      req.on("end", () => {
        try {
          const body = JSON.parse(rawBody || "{}");
          const db = readDb();
          if (!Array.isArray(db.orders)) db.orders = [];
          if (Array.isArray(body.orders)) {
            db.orders = body.orders;
          } else if (body.order) {
            const idx = db.orders.findIndex((o) => o.id === body.order.id);
            if (idx >= 0) db.orders[idx] = { ...db.orders[idx], ...body.order };
            else db.orders.unshift(body.order);
          }
          writeDb(db);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, orders: db.orders }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: err.message }));
        }
      });
      return;
    }
  }

  // Not Found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint not found" }));
});

server.listen(PORT, () => {
  console.log(`🚀 Pasar Pagi Backend Server aktif di http://localhost:${PORT}`);
  console.log(`   - Products: GET/PUT http://localhost:${PORT}/api/products`);
  console.log(`   - Orders  : GET/POST http://localhost:${PORT}/api/orders`);
  console.log(`   - Checkout: POST http://localhost:${PORT}/api/checkout`);
  console.log(`   - Webhook : POST http://localhost:${PORT}/api/webhook/payment-success`);
});
