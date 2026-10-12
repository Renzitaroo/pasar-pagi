import { DEFAULT_PRODUCTS, formatMoney as formatRp, getSupabaseConfig } from "./catalog.js";

const ADMIN_PIN = localStorage.getItem("pasar_pagi_admin_pin") || "admin123";
let products = [];
let orders = [];
let currentFilter = "all";
let searchQuery = "";

const loginGate = document.getElementById("login-gate");
const adminShell = document.getElementById("admin-shell");
const toastEl = document.getElementById("admin-toast");

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

function updateSyncStatusBadge() {
  const sb = getSupabaseConfig();
  const pill = document.getElementById("sync-status-pill");
  const text = document.getElementById("sync-status-text");
  if (sb.url && sb.key) {
    pill.classList.add("cloud-ok");
    text.textContent = "Supabase Cloud Terhubung";
  } else {
    pill.classList.remove("cloud-ok");
    text.textContent = "Sinkronisasi Lokal & Real-Time Aktif";
  }
}

async function loadInitialData() {
  try {
    const saved = JSON.parse(localStorage.getItem("pasar_pagi_catalog_v1") || "null");
    products = Array.isArray(saved) && saved.length > 0 ? saved : [...DEFAULT_PRODUCTS];
  } catch {
    products = [...DEFAULT_PRODUCTS];
  }

  try {
    orders = JSON.parse(localStorage.getItem("pasar_pagi_orders") || "[]");
  } catch {
    orders = [];
  }

  renderAll();

  const sb = getSupabaseConfig();
  let loadedFromCloud = false;
  if (sb.url && sb.key) {
    try {
      const ctrl = new AbortController();
      const tId = setTimeout(() => ctrl.abort(), 2500);
      const headers = { apikey: sb.key, Authorization: `Bearer ${sb.key}` };
      const res = await fetch(`${sb.url}/rest/v1/products?select=*&order=id.asc`, { headers, signal: ctrl.signal });
      clearTimeout(tId);
      if (res.ok) {
        const remote = await res.json();
        if (Array.isArray(remote) && remote.length > 0) {
          products = remote;
          localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
          renderAll();
          loadedFromCloud = true;
        }
      }
    } catch {}
  }

  if (!loadedFromCloud) {
    try {
      const res = await fetch("http://localhost:3001/api/products");
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          products = data.products;
          localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
          renderAll();
        }
      }
    } catch {}
  }
}

async function persistProducts(toastMsg = "Perubahan stok & harga disimpan!") {
  localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
  renderAll();
  if (toastMsg) showToast(toastMsg);

  fetch("http://localhost:3001/api/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products })
  }).catch(() => {});

  const sb = getSupabaseConfig();
  if (sb.url && sb.key) {
    fetch(`${sb.url}/rest/v1/products`, {
      method: "POST",
      headers: {
        apikey: sb.key,
        Authorization: `Bearer ${sb.key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify(products)
    }).catch(() => {});
  }
}

function persistOrders() {
  localStorage.setItem("pasar_pagi_orders", JSON.stringify(orders));
  renderKPIs();
  renderOrdersTable();
  fetch("http://localhost:3001/api/orders", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orders })
  }).catch(() => {});
}

function renderKPIs() {
  const total = products.length;
  const buah = products.filter(p => p.type === "buah").length;
  const sayur = products.filter(p => p.type === "sayur").length;
  const totalStock = Math.round(products.reduce((s, p) => s + (Number(p.stockKg) || 0), 0) * 10) / 10;
  const lowItems = products.filter(p => (Number(p.stockKg) || 0) <= 5);
  const revenue = orders
    .filter(o => o.status !== "Dibatalkan")
    .reduce((s, o) => s + (Number(o.mpgTotalAmount || o.breakdown?.total || 0)), 0);

  document.getElementById("kpi-total-products").textContent = total;
  document.getElementById("kpi-sub-products").textContent = `${buah} Buah • ${sayur} Sayur`;
  document.getElementById("kpi-total-stock").textContent = `${totalStock} kg`;
  document.getElementById("kpi-low-stock").textContent = lowItems.length;
  document.getElementById("kpi-sub-low").textContent = lowItems.length > 0
    ? lowItems.map(i => i.name.trim()).slice(0, 3).join(", ")
    : "Semua stok aman";
  document.getElementById("kpi-total-revenue").textContent = formatRp(revenue);
  document.getElementById("kpi-sub-orders").textContent = `${orders.length} pesanan masuk`;
  document.getElementById("tab-order-count").textContent = orders.length;
}

function renderInventoryTable() {
  const tbody = document.getElementById("inventory-tbody");
  const filtered = products.filter(p => {
    if (currentFilter === "buah" && p.type !== "buah") return false;
    if (currentFilter === "sayur" && p.type !== "sayur") return false;
    if (currentFilter === "low" && (Number(p.stockKg) || 0) > 5) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">Tidak ada produk yang sesuai filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const stock = Number(p.stockKg) || 0;
    const statusClass = stock <= 0 ? "stock-out" : stock <= 5 ? "stock-low" : "stock-ok";
    const statusLabel = stock <= 0 ? "Habis (0 kg)" : stock <= 5 ? `Menipis (${stock} kg)` : "Tersedia";

    return `
      <tr data-id="${p.id}">
        <td>
          <div class="prod-cell">
            <img src="${p.image}" alt="${p.name}" class="prod-thumb" onerror="this.src='https://placehold.co/80x80?text=Produk'">
            <div>
              <span class="prod-name">${p.name}</span>
              <span class="prod-meta">${p.produceId || `#${p.id}`}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="type-badge ${p.type === 'sayur' ? 'type-sayur' : 'type-buah'}">
            ${p.type === 'sayur' ? 'Sayur Kebun' : 'Buah Segar'}
          </span>
        </td>
        <td>
          <div class="inline-price-wrap">
            <span>Rp</span>
            <input type="number" class="inline-price-input" data-price-id="${p.id}" value="${p.basePricePerKg}" step="500" min="500">
          </div>
        </td>
        <td>
          <div class="stock-control-group">
            <button type="button" class="btn-step" data-step-id="${p.id}" data-delta="-1">-1</button>
            <input type="number" class="inline-stock-input" data-stock-id="${p.id}" value="${stock}" step="0.5" min="0">
            <button type="button" class="btn-step" data-step-id="${p.id}" data-delta="1">+1</button>
            <button type="button" class="btn-step" data-step-id="${p.id}" data-delta="5" title="Tambah 5 kg">+5</button>
          </div>
        </td>
        <td>
          <span class="stock-badge ${statusClass}">${statusLabel}</span>
        </td>
        <td>
          <button type="button" class="toggle-btn ${p.featured ? 'on' : ''}" data-feat-id="${p.id}">
            <i class="fas ${p.featured ? 'fa-star' : 'fa-regular fa-star'}"></i>
            ${p.featured ? 'Beranda' : 'Biasa'}
          </button>
        </td>
        <td style="text-align: right; white-space: nowrap;">
          <button type="button" class="btn btn-outline" data-edit-id="${p.id}" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;">
            <i class="fas fa-pen"></i> Edit
          </button>
          <button type="button" class="btn btn-danger" data-del-id="${p.id}" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderOrdersTable() {
  const tbody = document.getElementById("orders-tbody");
  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">Belum ada pesanan masuk.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => {
    const itemsHtml = (o.items || []).map(i => `<div>• <strong>${i.name}</strong> (${i.weightLabel} × ${i.count})</div>`).join("");
    const total = o.mpgTotalAmount || o.breakdown?.total || 0;
    const statuses = ["Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];

    return `
      <tr>
        <td>
          <strong style="display:block; color: var(--green);">${o.id}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${o.displayDate || o.date || "-"}</span>
        </td>
        <td>
          <strong>${o.customer?.name || "Pelanggan"}</strong>
          <div style="font-size: 0.76rem; color: var(--text-sub);">${o.customer?.phone || "-"}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); max-width: 240px;">${o.customer?.address || "-"}</div>
        </td>
        <td style="font-size: 0.8rem; line-height: 1.45;">
          ${itemsHtml}
          ${o.note ? `<div style="margin-top:4px; font-size:0.74rem; color:var(--amber);"><i class="fas fa-comment-dots"></i> "${o.note}"</div>` : ""}
        </td>
        <td>
          <strong style="display:block;">${formatRp(total)}</strong>
          <span style="font-size: 0.74rem; color: var(--text-sub);">${o.paymentMethodName || o.paymentMethod || "QRIS"}</span>
        </td>
        <td>
          <select class="order-status-select" data-order-id="${o.id}">
            ${statuses.map(s => `<option value="${s}" ${o.status === s ? "selected" : ""}>${s}</option>`).join("")}
          </select>
        </td>
        <td style="text-align: right;">
          <button type="button" class="btn btn-danger" data-del-order="${o.id}" style="padding: 0.35rem 0.65rem; font-size: 0.76rem;">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderAll() {
  updateSyncStatusBadge();
  renderKPIs();
  renderInventoryTable();
  renderOrdersTable();
}

function checkAuth() {
  if (sessionStorage.getItem("pasar_pagi_admin_auth") === "1") {
    loginGate.style.display = "none";
    adminShell.style.display = "block";
    loadInitialData();
  } else {
    loginGate.style.display = "flex";
    adminShell.style.display = "none";
  }
}

document.getElementById("admin-login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const pin = document.getElementById("admin-pin").value.trim();
  if (pin === ADMIN_PIN) {
    sessionStorage.setItem("pasar_pagi_admin_auth", "1");
    checkAuth();
    showToast("Selamat datang di Dashboard Admin!");
  } else {
    alert("Password / PIN Admin salah! Gunakan: admin123");
  }
});

document.getElementById("btn-admin-logout").addEventListener("click", () => {
  sessionStorage.removeItem("pasar_pagi_admin_auth");
  checkAuth();
});

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    document.getElementById("tab-panel-inventory").style.display = tab === "inventory" ? "block" : "none";
    document.getElementById("tab-panel-orders").style.display = tab === "orders" ? "block" : "none";
  });
});

document.getElementById("admin-search").addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderInventoryTable();
});

document.querySelectorAll(".filter-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    currentFilter = pill.dataset.filter;
    renderInventoryTable();
  });
});

document.getElementById("inventory-tbody").addEventListener("click", (e) => {
  const stepBtn = e.target.closest("[data-step-id]");
  if (stepBtn) {
    const id = Number(stepBtn.dataset.stepId);
    const delta = Number(stepBtn.dataset.delta);
    const prod = products.find(p => p.id === id);
    if (prod) {
      prod.stockKg = Math.max(0, Math.round(((Number(prod.stockKg) || 0) + delta) * 10) / 10);
      persistProducts(`Stok ${prod.name.trim()} menjadi ${prod.stockKg} kg`);
    }
    return;
  }

  const featBtn = e.target.closest("[data-feat-id]");
  if (featBtn) {
    const id = Number(featBtn.dataset.featId);
    const prod = products.find(p => p.id === id);
    if (prod) {
      prod.featured = !prod.featured;
      persistProducts(`${prod.name.trim()} ${prod.featured ? "ditampilkan di Beranda" : "dihapus dari Beranda"}`);
    }
    return;
  }

  const editBtn = e.target.closest("[data-edit-id]");
  if (editBtn) {
    const id = Number(editBtn.dataset.editId);
    const prod = products.find(p => p.id === id);
    if (prod) openProductModal(prod);
    return;
  }

  const delBtn = e.target.closest("[data-del-id]");
  if (delBtn) {
    const id = Number(delBtn.dataset.delId);
    const prod = products.find(p => p.id === id);
    if (prod && confirm(`Hapus produk "${prod.name.trim()}" dari katalog?`)) {
      products = products.filter(p => p.id !== id);
      const sb = getSupabaseConfig();
      if (sb.url && sb.key) {
        fetch(`${sb.url}/rest/v1/products?id=eq.${id}`, {
          method: "DELETE",
          headers: { apikey: sb.key, Authorization: `Bearer ${sb.key}` }
        }).catch(() => {});
      }
      persistProducts(`Produk ${prod.name.trim()} dihapus`);
    }
  }
});

document.getElementById("inventory-tbody").addEventListener("change", (e) => {
  if (e.target.matches("[data-price-id]")) {
    const id = Number(e.target.dataset.priceId);
    const val = Math.max(500, Number(e.target.value) || 0);
    const prod = products.find(p => p.id === id);
    if (prod) {
      prod.basePricePerKg = val;
      persistProducts(`Harga ${prod.name.trim()} diubah ke ${formatRp(val)}/kg`);
    }
  }
  if (e.target.matches("[data-stock-id]")) {
    const id = Number(e.target.dataset.stockId);
    const val = Math.max(0, Number(e.target.value) || 0);
    const prod = products.find(p => p.id === id);
    if (prod) {
      prod.stockKg = val;
      persistProducts(`Stok ${prod.name.trim()} diatur ke ${val} kg`);
    }
  }
});

document.getElementById("orders-tbody").addEventListener("change", (e) => {
  if (e.target.matches("[data-order-id]")) {
    const id = e.target.dataset.orderId;
    const ord = orders.find(o => o.id === id);
    if (ord) {
      ord.status = e.target.value;
      persistOrders();
      showToast(`Status pesanan ${id} diubah ke: ${ord.status}`);
    }
  }
});

document.getElementById("orders-tbody").addEventListener("click", (e) => {
  const delOrd = e.target.closest("[data-del-order]");
  if (delOrd) {
    const id = delOrd.dataset.delOrder;
    if (confirm(`Hapus riwayat pesanan ${id}?`)) {
      orders = orders.filter(o => o.id !== id);
      persistOrders();
      showToast(`Pesanan ${id} dihapus`);
    }
  }
});

const productModal = document.getElementById("product-modal");
function openProductModal(prod = null) {
  document.getElementById("product-modal-title").textContent = prod ? `Edit Produk: ${prod.name}` : "Tambah Produk Baru";
  document.getElementById("prod-id").value = prod ? prod.id : "";
  document.getElementById("prod-name").value = prod ? prod.name.trim() : "";
  document.getElementById("prod-type").value = prod ? prod.type : "buah";
  document.getElementById("prod-price").value = prod ? prod.basePricePerKg : 25000;
  document.getElementById("prod-stock").value = prod ? prod.stockKg : 20;
  document.getElementById("prod-image").value = prod ? prod.image : "";
  document.getElementById("prod-desc").value = prod ? (prod.desc || "") : "";
  document.getElementById("prod-featured").checked = prod ? !!prod.featured : false;
  productModal.classList.add("open");
}

function closeProductModal() {
  productModal.classList.remove("open");
}

document.getElementById("btn-add-product").addEventListener("click", () => openProductModal(null));
document.getElementById("btn-close-product-modal").addEventListener("click", closeProductModal);
document.getElementById("btn-cancel-product").addEventListener("click", closeProductModal);

document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const idVal = document.getElementById("prod-id").value;
  const name = document.getElementById("prod-name").value.trim();
  const type = document.getElementById("prod-type").value;
  const basePricePerKg = Math.max(500, Number(document.getElementById("prod-price").value) || 0);
  const stockKg = Math.max(0, Number(document.getElementById("prod-stock").value) || 0);
  const image = document.getElementById("prod-image").value.trim();
  const desc = document.getElementById("prod-desc").value.trim();
  const featured = document.getElementById("prod-featured").checked;

  if (idVal) {
    const prod = products.find(p => p.id === Number(idVal));
    if (prod) Object.assign(prod, { name, type, basePricePerKg, stockKg, image, desc, featured });
  } else {
    const nextId = products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
    products.push({
      id: nextId,
      name,
      type,
      category: type === "sayur" ? "sayur-daun" : "tropis",
      basePricePerKg,
      stockKg,
      produceId: `#${4000 + nextId}`,
      desc,
      image,
      featured
    });
  }

  closeProductModal();
  persistProducts(`Produk "${name}" berhasil disimpan!`);
});

document.getElementById("btn-reset-catalog").addEventListener("click", () => {
  if (confirm("Kembalikan seluruh stok & daftar produk ke 18 produk awal?")) {
    products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    persistProducts("Katalog & stok dikembalikan ke default!");
  }
});

const sbModal = document.getElementById("supabase-modal");
document.getElementById("btn-open-supabase").addEventListener("click", () => {
  const sb = getSupabaseConfig();
  document.getElementById("sb-url").value = sb.url;
  document.getElementById("sb-key").value = sb.key;
  sbModal.classList.add("open");
});
document.getElementById("btn-close-supabase-modal").addEventListener("click", () => sbModal.classList.remove("open"));

document.getElementById("btn-save-supabase").addEventListener("click", async () => {
  const url = document.getElementById("sb-url").value.trim().replace(/\/+$/, "");
  const key = document.getElementById("sb-key").value.trim();
  if (!url || !key) {
    alert("Masukkan Supabase Project URL dan Anon Key terlebih dahulu.");
    return;
  }
  localStorage.setItem("pasar_pagi_sb_url", url);
  localStorage.setItem("pasar_pagi_sb_key", key);
  await persistProducts("Tersambung & tersinkronisasi ke Supabase Cloud!");
  sbModal.classList.remove("open");
});

document.getElementById("btn-clear-supabase").addEventListener("click", () => {
  localStorage.removeItem("pasar_pagi_sb_url");
  localStorage.removeItem("pasar_pagi_sb_key");
  updateSyncStatusBadge();
  sbModal.classList.remove("open");
  showToast("Beralih ke Mode Penyimpanan Lokal");
});

document.getElementById("btn-copy-sql").addEventListener("click", () => {
  const sql = document.getElementById("supabase-sql-code").textContent;
  navigator.clipboard.writeText(sql);
  showToast("Kode SQL berhasil disalin!");
});

window.addEventListener("storage", (e) => {
  if (e.key === "pasar_pagi_orders" || e.key === "pasar_pagi_catalog_v1") {
    loadInitialData();
    showToast("Data baru masuk dari halaman toko!");
  }
});

checkAuth();
