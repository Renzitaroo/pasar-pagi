// ============================================================
//  PASAR PAGI — Mesin Belanja & Validasi Keamanan Modern
//  Versi: 2.1 (Multi-Page View: Beranda vs Toko Buah)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Katalog resmi toko. Sumber kebenaran tunggal (Single Source of Truth).
  // Katalog resmi toko. Sumber kebenaran tunggal (Single Source of Truth).
  const products = [
    { 
      id: 1,  
      name: "Apel ",       
      type: "buah",
      basePricePerKg: 35000, 
      stockKg: 25, 
      produceId: "#4131", 
      desc: "Manis renyah dengan aroma segar alami pegunungan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589286/25-01-11-03-50-09-954_deco_m2ofbh.jpg",
      featured: true
    },
    { 
      id: 2,  
      name: "Jeruk ",     
      type: "buah",
 
      basePricePerKg: 30000, 
      stockKg: 20, 
      produceId: "#4012", 
      desc: "Kaya vitamin C, bulir manis melimpah tanpa biji.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591406/25-01-11-04-29-12-930_deco_r9gznn.jpg",
      featured: false
    },
    { 
      id: 3,  
      name: "Pisang ",
      type: "buah",
      category: "tropis",     
      basePricePerKg: 20000, 
      stockKg: 30, 
      produceId: "#4011", 
      desc: "Tinggi potasium, kulit kuning mulus pas untuk sarapan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591160/25-01-11-04-24-17-097_deco_htwecb.jpg",
      featured: false
    },
    { 
      id: 4,  
      name: "Anggur ",    
      type: "buah",
      category: "beri",       
      basePricePerKg: 55000, 
      stockKg: 15, 
      produceId: "#4022", 
      desc: "Bulir padat renyah, manis alami dengan antioksidan tinggi.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589285/25-01-11-03-50-38-513_deco_spywdb.jpg",
      featured: true
    },
    { 
      id: 5,  
      name: "Stroberi ",
      type: "buah",
      category: "beri",       
      basePricePerKg: 70000, 
      stockKg: 14, 
      produceId: "#4252", 
      desc: "Asam manis berair, dipetik segar saat fajar berkabut.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-44-32-511_deco_doxshi.jpg",
      featured: true
    },
    { 
      id: 6,  
      name: "Blueberry ", 
      type: "buah",
      category: "beri",       
      basePricePerKg: 95000, 
      stockKg: 10, 
      produceId: "#4264", 
      desc: "Superfood kaya nutrisi pelindung daya tahan tubuh.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614070/25-01-11-10-46-19-754_deco_g51gta.jpg",
      featured: false
    },
    { 
      id: 7,  
      name: "Nanas ",      
      type: "buah",
      category: "tropis",     
      basePricePerKg: 28000, 
      stockKg: 20, 
      produceId: "#4430", 
      desc: "Manis harum legit, renyah tanpa sensasi gatal di lidah.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614070/25-01-11-10-46-43-469_deco_lhzog2.jpg",
      featured: false
    },
    { 
      id: 8,  
      name: "Mangga ", 
      type: "buah",
      category: "tropis",     
      basePricePerKg: 35000, 
      stockKg: 25, 
      produceId: "#4951", 
      desc: "Daging buah tebal oranye, lembut dan manis istimewa.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-45-34-043_deco_dmdlw1.jpg",
      featured: true
    },
    { 
      id: 9,  
      name: "Kiwi ",       
      type: "buah",
      category: "tropis",     
      basePricePerKg: 45000, 
      stockKg: 16, 
      produceId: "#4301", 
      desc: "Kaya vitamin C dan serat dengan rasa manis menyegarkan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614625/25-01-11-10-55-05-579_deco_zbrqpd.jpg",
      featured: false
    },
    { 
      id: 10, 
      name: "Semangka ",
      type: "buah",
      category: "tropis",    
      basePricePerKg: 22000, 
      stockKg: 20, 
      produceId: "#4032", 
      desc: "Manis dingin kaya elektrolit untuk menghidrasi tubuh.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614185/25-01-11-10-48-13-815_deco_ogtsmo.jpg",
      featured: false
    },
    // SAYURAN SEGAR KEBUN (ASET HARMONIS STUDIO WHITE BACKGROUND)
    {
      id: 11,
      name: "Bayam ",
      type: "sayur",
      category: "sayur-daun",
      basePricePerKg: 12000,
      stockKg: 20,
      produceId: "#5011",
      desc: "Dipetik fajar hari, daun hijau renyah kaya zat besi & serat pangan.",
      image: "/assets/sayuran/bayam_hijau.jpg",
      featured: true
    },
    {
      id: 12,
      name: "Wortel ",
      type: "sayur",
      category: "sayur-umbi",
      basePricePerKg: 18000,
      stockKg: 25,
      produceId: "#5021",
      desc: "Wortel renyah dataran tinggi, oranye pekat tinggi vitamin A.",
      image: "/assets/sayuran/wortel_brastagi.jpg",
      featured: true
    },
    {
      id: 13,
      name: "Brokoli ",
      type: "sayur",
      category: "sayur-daun",
      basePricePerKg: 34000,
      stockKg: 15,
      produceId: "#5031",
      desc: "Kuntum hijau padat bebas pestisida sintetis, superfood penuh antioksidan.",
      image: "/assets/sayuran/brokoli_organik.jpg",
      featured: true
    },
    {
      id: 14,
      name: "Tomat ",
      type: "sayur",
      category: "sayur-buah",
      basePricePerKg: 15000,
      stockKg: 30,
      produceId: "#5041",
      desc: "Matang pohon merona, segar berair kaya likopen alami.",
      image: "/assets/sayuran/tomat_merah.jpg",
      featured: false
    },
    {
      id: 15,
      name: "Cabai ",
      type: "sayur",
      category: "sayur-bumbu",
      basePricePerKg: 42000,
      stockKg: 15,
      produceId: "#5051",
      desc: "Pedas mantap dari petani lokal, wangi segar untuk masakan harian.",
      image: "/assets/sayuran/cabai_rawit.jpg",
      featured: false
    },
    {
      id: 16,
      name: "Jagung ",
      type: "sayur",
      category: "sayur-buah",
      basePricePerKg: 14000,
      stockKg: 25,
      produceId: "#5061",
      desc: "Bulir kuning keemasan super manis, renyah legit cocok untuk rebus/bakar.",
      image: "/assets/sayuran/jagung_manis.jpg",
      featured: true
    },
    {
      id: 17,
      name: "Kentang ",
      type: "sayur",
      category: "sayur-umbi",
      basePricePerKg: 22000,
      stockKg: 20,
      produceId: "#5071",
      desc: "Umbi padat kuning pulen khas Dieng, sempurna untuk sup & perkedel.",
      image: "/assets/sayuran/kentang_granola.jpg",
      featured: false
    },
    {
      id: 18,
      name: "Sawi ",
      type: "sayur",
      category: "sayur-daun",
      basePricePerKg: 11000,
      stockKg: 20,
      produceId: "#5081",
      desc: "Batang renyah berair dan daun hijau segar, pas untuk tumisan nikmat.",
      image: "/assets/sayuran/kangkung_air.jpg",
      featured: false
    }
  ];

  let cart = {};
  let currentDepartment = "all"; // "all" | "buah" | "sayur"
  let searchQuery = "";
  let currentPage = "home"; // "home" atau "shop"

  // State berat per produk (default 1.0 kg)
  const selectedWeightKg = {};
  products.forEach(p => { selectedWeightKg[p.id] = 1.0; });

  // Format tampilan label berat (gr jika < 1kg, kg jika >= 1kg)
  function formatWeightLabel(kg) {
    if (kg < 1) {
      return `${Math.round(kg * 1000)} gr`;
    }
    return `${Number(kg.toFixed(2))} kg`;
  }

  // Persentase posisi pengisi kapsul volume HP (0% s/d 100%)
  function getVolumePercent(weightKg) {
    const min = 0.25;
    const max = 5.0;
    return Math.min(100, Math.max(0, ((weightKg - min) / (max - min)) * 100));
  }

  // Kalkulasi harga dinamis berdasarkan berat dan diskon grosir bertingkat
  function calculatePriceForWeight(product, weightKg) {
    const cleanWeight = Math.min(5.0, Math.max(0.25, Math.round(weightKg * 4) / 4));
    let discountRate = 0;
    let savingLabel = null;

    if (cleanWeight >= 3.0) {
      discountRate = 0.20;
      savingLabel = "Hemat Grosir 20%";
    } else if (cleanWeight >= 2.0) {
      discountRate = 0.10;
      savingLabel = "Hemat 10%";
    }

    const ratePerKg = Math.round(product.basePricePerKg * (1 - discountRate));
    const totalPrice = Math.round(ratePerKg * cleanWeight);

    return {
      weightKg: cleanWeight,
      totalPrice,
      ratePerKg,
      discountRate,
      savingLabel
    };
  }

  // Helper kalkulasi stok berat (kg)
  function getUsedStockKg(productId) {
    return Object.values(cart)
      .filter(item => item.productId === productId)
      .reduce((sum, item) => sum + (item.weightKg * item.count), 0);
  }

  function getRemainingStockKg(product) {
    if (!product) return 0;
    const used = getUsedStockKg(product.id);
    return Math.max(0, Math.round((product.stockKg - used) * 10) / 10);
  }

  // Render selector takaran berat ringkas (Chips Only - Standar Sayurbox / Astro)
  function renderWeightSelector(productId, currentWeight) {
    return `
      <div class="weight-chip-row" role="group" aria-label="Pilih takaran berat">
        <button type="button" class="preset-chip ${Math.abs(currentWeight - 0.5) < 0.05 ? 'active' : ''}" data-product-id="${productId}" data-weight="0.5">500 gr</button>
        <button type="button" class="preset-chip ${Math.abs(currentWeight - 1.0) < 0.05 ? 'active' : ''}" data-product-id="${productId}" data-weight="1.0">1 kg</button>
        <button type="button" class="preset-chip ${Math.abs(currentWeight - 2.0) < 0.05 ? 'active' : ''}" data-product-id="${productId}" data-weight="2.0">2 kg</button>
        <button type="button" class="preset-chip ${Math.abs(currentWeight - 3.0) < 0.05 ? 'active' : ''}" data-product-id="${productId}" data-weight="3.0">3 kg</button>
      </div>
    `;
  }
  const renderPhoneVolumeControl = renderWeightSelector;

  // Update visual takaran berat & harga tanpa full-render (60 FPS smooth)
  function updateCardVolumeUI(productId, newWeightKg) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const calc = calculatePriceForWeight(product, newWeightKg);
    selectedWeightKg[productId] = calc.weightKg;
    const weightLabel = formatWeightLabel(calc.weightKg);

    // Update harga total
    document.querySelectorAll(`.v-price-${productId}`).forEach(el => el.textContent = formatMoney(calc.totalPrice));
    // Update satuan
    document.querySelectorAll(`.v-unit-${productId}`).forEach(el => el.textContent = `/ ${weightLabel}`);
    
    // Update badge hemat grosir
    document.querySelectorAll(`.v-saving-${productId}`).forEach(el => {
      if (calc.savingLabel) {
        el.className = "wholesale-saving-badge";
        el.innerHTML = `<i class="fas fa-tag"></i> ${calc.savingLabel}`;
      } else {
        el.className = "wholesale-saving-badge empty";
        el.innerHTML = "";
      }
    });

    // Update preset chips
    document.querySelectorAll(`.preset-chip[data-product-id="${productId}"]`).forEach(chip => {
      const chipW = Number(chip.dataset.weight);
      chip.classList.toggle("active", Math.abs(chipW - calc.weightKg) < 0.05);
    });

    // Update teks dan status tombol beli berdasarkan stok & keranjang
    const remainingKg = getRemainingStockKg(product);
    const isOut = remainingKg < calc.weightKg;
    const cartKey = `${productId}_${calc.weightKg}kg`;
    const qtyInCart = cart[cartKey] ? cart[cartKey].count : 0;

    document.querySelectorAll(`.btn-buy-featured[data-product-id="${productId}"], .btn-action-add[data-product-id="${productId}"]`).forEach(btn => {
      btn.disabled = isOut;
    });

    document.querySelectorAll(`.btn-buy-text-${productId}`).forEach(el => {
      el.textContent = isOut ? "Stok Kurang" : (qtyInCart > 0 ? `Beli Lagi (${qtyInCart} di keranjang)` : `Beli (${weightLabel})`);
    });
  }

  // Biaya penanganan transparan (Rp 3.000)
  const HANDLING_FEE = 3000;

  // Kupon divalidasi via HASH SHA-256 (Hardening Client)
  // Hash dari "TEMANFARMER"
  const KUPON_HASH = "a12497e637e42764b41e7c6de1b07a8906d8e8841c7522a471a48a1ee74d61cd";
  const DISKON_KUPON = 0.20;
  let diskon = 0; // 0 = tanpa diskon, 0.20 = potong 20%
  let appliedCouponCode = "";

  async function hashSha256(text) {
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // DOM References
  const pageHomeEl = document.getElementById("page-home");
  const pageShopEl = document.getElementById("page-shop");
  const navHomeBtn = document.getElementById("nav-home");
  const navShopBtn = document.getElementById("nav-shop");

  const productSection = document.getElementById("product-section");
  const homeFeaturedGrid = document.getElementById("home-featured-grid");
  const homeFeaturedSayurGrid = document.getElementById("home-featured-sayur-grid");
  const catalogHeadingTitle = document.getElementById("catalog-heading-title");
  const cartDetailsEl = document.getElementById("cart-details");
  const cartSummaryEl = document.getElementById("cart-summary-breakdown");
  const sidebarCartBadgeEl = document.getElementById("sidebar-cart-badge");
  const checkoutBtn = document.getElementById("checkout-button");
  const reviewModal = document.getElementById("review-modal");
  const successModal = document.getElementById("success-modal");
  const productCountBadge = document.getElementById("product-count-badge");
  const searchInput = document.getElementById("product-search");
  const clearSearchBtn = document.getElementById("clear-search");
  const noProductsMsg = document.getElementById("no-products-msg");
  const mobileCartBar = document.getElementById("mobile-cart-bar");
  const mobileCartItems = document.getElementById("mobile-cart-items");
  const mobileCartTotal = document.getElementById("mobile-cart-total");
  const mobileHeaderCart = document.getElementById("mobile-header-cart");
  const mobileHeaderCartBadge = document.getElementById("mobile-header-cart-badge");
  const mobileBottomNav = document.getElementById("mobile-bottom-nav");
  const bnavHome = document.getElementById("bnav-home");
  const bnavShop = document.getElementById("bnav-shop");
  const bnavCart = document.getElementById("bnav-cart");
  const bnavCartBadge = document.getElementById("bnav-cart-badge");
  const bnavUser = document.getElementById("bnav-user");
  const bnavAvatarImg = document.getElementById("bnav-avatar-img");
  const bnavUserIcon = document.getElementById("bnav-user-icon");
  const bnavUserLabel = document.getElementById("bnav-user-label");

  // ============================================================
  //  STATE: AUTENTIKASI CUSTOMER & RIWAYAT PESANAN
  // ============================================================
  let currentUser = JSON.parse(localStorage.getItem("pasar_pagi_user") || "null");
  let customerOrders = JSON.parse(localStorage.getItem("pasar_pagi_orders") || "[]");

  // DOM References untuk Akun Customer & Modals
  const loginModal = document.getElementById("login-modal");
  const profileSetupModal = document.getElementById("profile-setup-modal");
  const profileModal = document.getElementById("profile-modal");
  const ordersModal = document.getElementById("orders-modal");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const userChipBtn = document.getElementById("user-chip-btn");

  // ============================================================
  //  12 MASKOT KARAKTER BUAH & SAYUR LUCU (PASAR PAGI THEME)
  // ============================================================
  const CUTE_AVATARS = [
    { id: "apel", name: "Si Apel Riang", emoji: "🍎", bg: "#fde8e8", sub: "Ceria, manis & renyah alami" },
    { id: "alpukat", name: "Si Alpukat Gemoy", emoji: "🥑", bg: "#eaf6ea", sub: "Lembut, sehat & kaya nutrisi" },
    { id: "stroberi", name: "Si Stroberi Manis", emoji: "🍓", bg: "#fce7f3", sub: "Imut beraroma segar fajar" },
    { id: "wortel", name: "Si Wortel Ceria", emoji: "🥕", bg: "#ffedd5", sub: "Segar bugar & penuh vitamin" },
    { id: "pisang", name: "Si Pisang Santai", emoji: "🍌", bg: "#fef9c3", sub: "Hangat, santai & penuh energi" },
    { id: "bayam", name: "Si Bayam Kuat", emoji: "🥬", bg: "#dcfce7", sub: "Kuat, hijau & kaya zat besi" },
    { id: "jeruk", name: "Si Jeruk Segar", emoji: "🍊", bg: "#ffedd5", sub: "Pemberi semangat pagi hari" },
    { id: "brokoli", name: "Si Brokoli Imut", emoji: "🥦", bg: "#dcfce7", sub: "Kribo lucu sahabat sehat" },
    { id: "jagung", name: "Si Jagung Manis", emoji: "🌽", bg: "#fef9c3", sub: "Manis legit panen ladang" },
    { id: "anggur", name: "Si Anggur Cantik", emoji: "🍇", bg: "#f3e8ff", sub: "Elegan, manis & berkelas" },
    { id: "jamur", name: "Si Jamur Petualang", emoji: "🍄", bg: "#fee2e2", sub: "Kecil petualang rimba sejuk" },
    { id: "matahari", name: "Si Bunga Kebun", emoji: "🌻", bg: "#fef9c3", sub: "Mekar menyambut embun pagi" }
  ];

  // Pilihan Buah & Sayur Kesukaan
  const FAVORITE_PRODUCE_LIST = [
    { id: "apel", label: "Apel Manis", icon: "🍎" },
    { id: "stroberi", label: "Stroberi Fajar", icon: "🍓" },
    { id: "alpukat", label: "Alpukat Mentega", icon: "🥑" },
    { id: "pisang", label: "Pisang Raja", icon: "🍌" },
    { id: "jeruk", label: "Jeruk Segar", icon: "🍊" },
    { id: "mangga", label: "Mangga Arumanis", icon: "🥭" },
    { id: "bayam", label: "Bayam Hijau", icon: "🥬" },
    { id: "brokoli", label: "Brokoli Kebun", icon: "🥦" },
    { id: "wortel", label: "Wortel Renyah", icon: "🥕" },
    { id: "jagung", label: "Jagung Manis", icon: "🌽" },
    { id: "tomat", label: "Tomat Ceri", icon: "🍅" },
    { id: "anggur", label: "Anggur Manis", icon: "🍇" }
  ];

  let setupSelectedAvatar = CUTE_AVATARS[0];
  let setupSelectedProduces = new Set(["apel", "wortel"]);
  let editSelectedAvatar = null;
  let editSelectedProduces = new Set();

  function getAvatarDataUri(emoji, bg = "#eaf6ea") {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="${bg}" stroke="#677d6a" stroke-width="2.5"/><text x="50" y="68" font-size="52" text-anchor="middle">${emoji}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // ============================================================
  //  STATE: METODE PEMBAYARAN LENGKAP (QRIS, BANK, COD)
  // ============================================================
  const BANK_ACCOUNTS = {
    bca: {
      name: "Bank Central Asia (BCA)",
      code: "BCA",
      number: "8801 0812 3456 7890",
      rawNumber: "8801081234567890",
      holder: "PT PASAR PAGI SEGAR INDONESIA"
    },
    mandiri: {
      name: "Bank Mandiri",
      code: "Mandiri",
      number: "8902 0812 3456 7890",
      rawNumber: "8902081234567890",
      holder: "PT PASAR PAGI SEGAR INDONESIA"
    },
    bri: {
      name: "Bank Rakyat Indonesia (BRI)",
      code: "BRI",
      number: "8805 0812 3456 7890",
      rawNumber: "8805081234567890",
      holder: "PT PASAR PAGI SEGAR INDONESIA"
    },
    bni: {
      name: "Bank Negara Indonesia (BNI)",
      code: "BNI",
      number: "8808 0812 3456 7890",
      rawNumber: "8808081234567890",
      holder: "PT PASAR PAGI SEGAR INDONESIA"
    }
  };
  let selectedBank = "bca";
  let activePaymentMethod = "qris";
  let qrisTimerInterval = null;
  let qrisSecondsLeft = 15 * 60;

  // ============================================================
  // MANDIRI PRIVATE GATEWAY (MPG) - QRIS DINAMIS 0% MDR
  // ============================================================
  const MPG_CONFIG = {
    backendUrl: "http://localhost:3001/api/checkout",
    directGatewayUrl: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_MPG_GATEWAY_URL) || "https://paymentgateway.daeroom.my.id",
    apiKey: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_MPG_API_KEY) || "mpg_live_f89a3c10b7d24e6a8e5c3b1a9f0d7e2c"
  };

  /**
   * Terbitkan Invoice Mandiri Private Gateway (MPG)
   * Mengutamakan backend local proxy (/api/checkout), dengan fallback langsung ke API Gateway jika backend tidak aktif.
   */
  async function requestMpgInvoice({ orderId, amount, customerName, customerEmail, customerPhone, items }) {
    const payload = {
      order_id: orderId,
      amount: Math.round(amount),
      customer_name: customerName || "Pelanggan Pasar Pagi",
      customer_email: customerEmail || "pelanggan@pasarpagi.id",
      customer_phone: customerPhone || "081234567890",
      redirect_url: window.location.origin,
      items: (items || []).map(i => ({
        name: `${i.name || "Item"} (${i.weightLabel || "1kg"})`,
        price: Math.round(i.price || 0),
        quantity: i.count || 1
      }))
    };

    // 1. Coba lewat backend server lokal (port 3001) jika aktif (timeout 1000ms)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      const res = await fetch(MPG_CONFIG.backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const data = json.data || json;
        const checkoutUrl = data.checkout_url || json.checkout_url;
        if (json.success && checkoutUrl) {
          return {
            success: true,
            invoiceId: data.id || data.invoice_id || json.invoice_id,
            checkoutUrl: checkoutUrl,
            qrString: data.qr_string || data.qris_string || json.qr_string,
            uniqueCode: data.unique_code ?? json.unique_code ?? 0,
            totalAmount: data.amount || data.total_amount || json.total_amount || amount
          };
        }
      }
    } catch (e) {
      // Backend lokal offline, lanjutkan otomatis ke gateway resmi
    }

    // 2. Panggil Gateway API langsung
    // Menggunakan header Authorization: Bearer yang diizinkan penuh oleh CORS preflight browser
    try {
      const directUrl = `${MPG_CONFIG.directGatewayUrl}/api/v1/invoice`;
      const res = await fetch(directUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MPG_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          order_id: payload.order_id,
          amount: payload.amount,
          customer_name: payload.customer_name,
          customer_email: payload.customer_email,
          customer_phone: payload.customer_phone,
          items: payload.items
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || `Gateway returned HTTP ${res.status}`);
      }

      const data = json.data || json;
      const checkoutUrl = data.checkout_url || json.checkout_url;
      if (!checkoutUrl) {
        throw new Error("Gateway tidak mengembalikan checkout_url.");
      }

      return {
        success: true,
        invoiceId: data.id || data.invoice_id || json.invoice_id,
        checkoutUrl: checkoutUrl,
        qrString: data.qr_string || data.qris_string || json.qr_string,
        uniqueCode: data.unique_code ?? json.unique_code ?? 0,
        totalAmount: data.amount || data.total_amount || json.total_amount || amount,
        status: data.status || json.status || "PENDING"
      };
    } catch (err) {
      console.error("[MPG] Direct invoice creation error:", err);
      throw err;
    }
  }

  /* ============================================================
     NAVIGASI MULTI-HALAMAN (SPA ROUTER)
     ============================================================ */

  function navigateTo(targetPage, scrollTarget = null) {
    currentPage = targetPage;

    if (targetPage === "shop") {
      pageHomeEl.classList.remove("active");
      pageShopEl.classList.add("active");
      navHomeBtn.classList.remove("active");
      navShopBtn.classList.add("active");
      if (bnavHome) bnavHome.classList.remove("active");
      if (bnavShop) bnavShop.classList.add("active");
      window.location.hash = "#toko";

      if (scrollTarget === "cart") {
        setTimeout(scrollToCart, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      closeCartDrawer();
      pageShopEl.classList.remove("active");
      pageHomeEl.classList.add("active");
      navShopBtn.classList.remove("active");
      navHomeBtn.classList.add("active");
      if (bnavHome) bnavHome.classList.add("active");
      if (bnavShop) bnavShop.classList.remove("active");
      window.location.hash = "#beranda";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    updateCartCount();
  }

  // Format mata uang Rupiah (IDR)
  function formatMoney(amount) {
    const safeAmount = Math.round(Number(amount) || 0);
    return `Rp ${safeAmount.toLocaleString("id-ID")}`;
  }

  // Sumber kebenaran tunggal untuk rincian biaya
  function buildBreakdown(subtotal) {
    const fee = subtotal > 0 ? HANDLING_FEE : 0;
    const grossTotal = subtotal + fee;
    const potongan = Math.round(grossTotal * diskon);
    const total = Math.max(0, grossTotal - potongan);
    return { subtotal, fee, potongan, total };
  }

  function renderBreakdownRows(target, sums) {
    const totalItems = Object.values(cart).reduce((s, i) => s + i.count, 0);
    const totalWeight = Math.round(Object.values(cart).reduce((s, i) => s + (i.weightKg * i.count), 0) * 10) / 10;
    target.innerHTML = `
      <div class="row">
        <span>Subtotal (${totalItems} takaran / ${totalWeight} kg)</span>
        <span>${formatMoney(sums.subtotal)}</span>
      </div>
      <div class="row">
        <span>Biaya penanganan (handling fee)</span>
        <span>${formatMoney(sums.fee)}</span>
      </div>
      ${sums.potongan > 0 ? `
        <div class="row coupon-saving-row">
          <span><i class="fas fa-tag"></i> Diskon Teman Petani (90%)</span>
          <span class="saving-badge">-${formatMoney(sums.potongan)}</span>
        </div>` : ""}
      <div class="row grand">
        <span class="grand-total-label">Total Pembayaran</span>
        <span class="grand-total-val">${formatMoney(sums.total)}</span>
      </div>
    `;
  }

  /* BUILD KARTU UNTUK FEATURED DI BERANDA (BUAH & SAYUR) */
  function createFeaturedCard(product) {
    const curWeight = selectedWeightKg[product.id] || 1.0;
    const calc = calculatePriceForWeight(product, curWeight);
    const remainingKg = getRemainingStockKg(product);
    const isOut = remainingKg < calc.weightKg;
    const weightLabel = formatWeightLabel(calc.weightKg);
    const cartKey = `${product.id}_${calc.weightKg}kg`;
    const qtyInCart = cart[cartKey] ? cart[cartKey].count : 0;
    const isSayur = product.type === "sayur";

    const card = document.createElement("article");
    card.className = `featured-fruit-card ${isSayur ? 'featured-sayur-card' : ''}`;
    card.innerHTML = `
      <div class="featured-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="eager">
      </div>
      <div class="featured-body">
        <div class="featured-meta">
          <h4 class="featured-title">${product.name}</h4>
          <div class="featured-price-wrap">
            <span class="featured-price v-price-${product.id}">${formatMoney(calc.totalPrice)}</span>
            <span class="featured-unit v-unit-${product.id}">/ ${weightLabel}</span>
          </div>
        </div>
        <div class="wholesale-saving-badge v-saving-${product.id} ${!calc.savingLabel ? 'empty' : ''}">
          ${calc.savingLabel ? `<i class="fas fa-tag"></i> ${calc.savingLabel}` : ""}
        </div>
        ${renderWeightSelector(product.id, calc.weightKg)}
        <div class="featured-footer">
          <span class="featured-stock ${isOut ? 'text-danger' : ''}">${isOut ? 'Stok Habis' : `Sisa ${remainingKg} kg`}</span>
          <button class="btn-buy-featured" data-product-id="${product.id}" ${isOut ? 'disabled' : ''}>
            <i class="fas fa-cart-plus"></i>
            <span class="btn-buy-text-${product.id}">${isOut ? 'Stok Kurang' : (qtyInCart > 0 ? `Beli Lagi (${qtyInCart} di keranjang)` : `Beli (${weightLabel})`)}</span>
          </button>
        </div>
      </div>
    `;
    return card;
  }

  /* RENDER FEATURED FRUITS & SAYURAN DI HALAMAN BERANDA */
  function renderHomeFeatured() {
    if (homeFeaturedGrid) {
      homeFeaturedGrid.innerHTML = "";
      const featuredFruits = products.filter(p => p.featured && p.type === "buah");
      featuredFruits.forEach(product => {
        homeFeaturedGrid.appendChild(createFeaturedCard(product));
      });
    }

    if (homeFeaturedSayurGrid) {
      homeFeaturedSayurGrid.innerHTML = "";
      const featuredSayur = products.filter(p => p.featured && p.type === "sayur");
      featuredSayur.forEach(product => {
        homeFeaturedSayurGrid.appendChild(createFeaturedCard(product));
      });
    }
  }

  /* RENDER PRODUK DI HALAMAN TOKO */
  function renderProducts() {
    productSection.innerHTML = "";

    const filtered = products.filter((product) => {
      const matchDepartment = (currentDepartment === "all") || (product.type === currentDepartment);
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.produceId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDepartment && matchSearch;
    });

    const countBuah = filtered.filter(p => p.type === "buah").length;
    const countSayur = filtered.filter(p => p.type === "sayur").length;

    if (catalogHeadingTitle) {
      if (currentDepartment === "buah") {
        catalogHeadingTitle.textContent = "Koleksi Buah Segar";
      } else if (currentDepartment === "sayur") {
        catalogHeadingTitle.textContent = "Koleksi Sayuran Kebun";
      } else {
        catalogHeadingTitle.textContent = "Koleksi Buah & Sayuran";
      }
    }

    if (currentDepartment === "buah") {
      productCountBadge.textContent = `${countBuah} buah tersedia`;
    } else if (currentDepartment === "sayur") {
      productCountBadge.textContent = `${countSayur} sayuran tersedia`;
    } else {
      productCountBadge.textContent = `${countBuah} buah & ${countSayur} sayuran (${filtered.length} total)`;
    }

    if (filtered.length === 0) {
      noProductsMsg.style.display = "block";
      productSection.style.display = "none";
      const noProdHeading = noProductsMsg.querySelector("h4");
      if (noProdHeading) {
        noProdHeading.textContent = currentDepartment === "sayur" 
          ? "Sayuran yang kamu cari tidak ditemukan" 
          : "Produk yang kamu cari tidak ditemukan";
      }
      return;
    } else {
      noProductsMsg.style.display = "none";
      productSection.style.display = "grid";
    }

    filtered.forEach((product) => {
      const curWeight = selectedWeightKg[product.id] || 1.0;
      const calc = calculatePriceForWeight(product, curWeight);
      const remainingKg = getRemainingStockKg(product);
      const isOut = remainingKg < calc.weightKg;
      const stokMenipis = remainingKg > 0 && remainingKg <= 3;
      const weightLabel = formatWeightLabel(calc.weightKg);
      const cartKey = `${product.id}_${calc.weightKg}kg`;
      const qtyInCart = cart[cartKey] ? cart[cartKey].count : 0;
      const isSayur = product.type === "sayur";

      const productCard = document.createElement("article");
      productCard.classList.add("product");
      if (isSayur) productCard.classList.add("product-sayur");
      if (isOut && remainingKg <= 0) productCard.classList.add("sold-out");

      productCard.innerHTML = `
        <div class="product-header-badge">
          <span class="produce-tag-pill">${product.type === "buah" ? "Buah Segar" : "Sayur Kebun"}</span>
        </div>
        
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
          ${remainingKg <= 0 ? `<div class="sold-out-overlay"><span>Stok Habis</span></div>` : ""}
          ${stokMenipis ? `<div class="low-stock-ribbon"><i class="fas fa-fire"></i> Tinggal ${remainingKg} kg!</div>` : ""}
        </div>

        <div class="item-meta">
          <div class="meta-left">
            <h3 class="product-title">${product.name}</h3>
            <div class="wholesale-saving-badge v-saving-${product.id} ${!calc.savingLabel ? 'empty' : ''}">
              ${calc.savingLabel ? `<i class="fas fa-tag"></i> ${calc.savingLabel}` : ""}
            </div>
          </div>
          <div class="meta-right">
            <p class="price v-price-${product.id}">${formatMoney(calc.totalPrice)}</p>
            <span class="price-unit v-unit-${product.id}">/ ${weightLabel}</span>
          </div>
        </div>

        ${renderWeightSelector(product.id, calc.weightKg)}

        <div class="product-footer-row">
          <div class="stock-status ${remainingKg <= 0 ? 'stock-empty' : stokMenipis ? 'stock-warning' : 'stock-ok'}">
            <i class="fas ${remainingKg <= 0 ? 'fa-ban' : stokMenipis ? 'fa-clock' : 'fa-circle-check'}"></i>
            <span>${remainingKg <= 0 ? "Stok habis hari ini" : `Sisa stok: ${remainingKg} kg`}</span>
          </div>

          <div class="quantity-controls">
            <button class="btn-add-variant btn-action-add" data-product-id="${product.id}" ${isOut ? "disabled" : ""}>
              <i class="fas fa-cart-plus"></i>
              <span class="btn-buy-text-${product.id}">${isOut ? "Stok Kurang" : (qtyInCart > 0 ? `Beli Lagi (${qtyInCart} di keranjang)` : `Beli (${weightLabel})`)}</span>
            </button>
          </div>
        </div>
      `;
      productSection.appendChild(productCard);
    });
  }


  /* HITUNG JUMLAH BARANG DI KERANJANG */
  function updateCartCount() {
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
    const totalKg = Math.round(Object.values(cart).reduce((sum, item) => sum + (item.weightKg * item.count), 0) * 10) / 10;

    if (sidebarCartBadgeEl) sidebarCartBadgeEl.textContent = `${totalCount} item (${totalKg} kg)`;
    if (mobileCartItems) mobileCartItems.textContent = `${totalCount} item (${totalKg} kg)`;

    let subtotal = 0;
    Object.values(cart).forEach((item) => {
      subtotal += item.count * item.price;
    });
    const breakdown = buildBreakdown(subtotal);
    if (mobileCartTotal) mobileCartTotal.textContent = formatMoney(breakdown.total);

    // Tombol checkout aktif setiap kali ada item di keranjang
    if (checkoutBtn) {
      if (totalCount > 0) {
        checkoutBtn.removeAttribute("disabled");
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove("disabled");
      } else {
        checkoutBtn.setAttribute("disabled", "true");
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add("disabled");
      }
    }

    // Badge keranjang di Bottom Nav Dock & Header Mobile
    if (bnavCartBadge) {
      bnavCartBadge.textContent = totalCount;
      bnavCartBadge.style.display = totalCount > 0 ? "flex" : "none";
    }
    if (mobileHeaderCartBadge) {
      mobileHeaderCartBadge.textContent = totalCount;
      mobileHeaderCartBadge.style.display = totalCount > 0 ? "flex" : "none";
    }

    // Floating cart bar di mobile
    if (mobileCartBar) {
      if (totalCount > 0) {
        mobileCartBar.classList.add("visible");
      } else {
        mobileCartBar.classList.remove("visible");
      }
    }
  }

  /* RENDER KERANJANG */
  function renderCart() {
    cartDetailsEl.innerHTML = "";
    let totalPrice = 0;

    const cartEntries = Object.values(cart);

    if (cartEntries.length === 0) {
      cartDetailsEl.innerHTML = `
        <div class="empty-cart-state">
          <i class="fas fa-shopping-basket empty-cart-icon"></i>
          <p class="empty-cart-title">Keranjangmu masih kosong</p>
          <p class="empty-cart-sub">Pilih buah manis & sayuran segar favoritmu dari kebun untuk mulai berbelanja.</p>
        </div>
      `;
      renderBreakdownRows(cartSummaryEl, buildBreakdown(0));
      updateCartCount();
      renderProducts();
      renderHomeFeatured();
      return;
    }

    cartEntries.forEach((item) => {
      // RESINKRONISASI HARGA & TAKARAN RESMI DARI KATALOG (Anti Manipulasi Client)
      const official = products.find((p) => p.id === item.productId);
      if (official) {
        const calc = calculatePriceForWeight(official, item.weightKg);
        item.price = calc.totalPrice;
        item.name = official.name;
        item.weightLabel = formatWeightLabel(calc.weightKg);
      }

      const itemTotal = item.count * item.price;
      totalPrice += itemTotal;

      const remainingKg = getRemainingStockKg(official);
      const canAddMore = remainingKg >= item.weightKg;
      const deptIcon = official && official.type === "sayur" ? "🥬" : "🍎";

      const listItem = document.createElement("div");
      listItem.classList.add("cart-item");
      listItem.innerHTML = `
        <div class="cart-item-top">
          <div class="cart-item-info">
            <div class="cart-item-name">
              <span class="cart-dept-icon">${deptIcon}</span>
              ${item.name}
              <span class="cart-item-weight-badge">${item.weightLabel}</span>
            </div>
            <div class="cart-item-price">${formatMoney(item.price)} / ${item.weightLabel}</div>
          </div>
          <strong class="cart-item-total">${formatMoney(itemTotal)}</strong>
        </div>
        <div class="cart-item-controls">
          <div class="cart-stepper">
            <button class="cart-qty-btn cart-minus" data-cart-key="${item.key}" title="Kurangi satu">
              <i class="fas fa-minus"></i>
            </button>
            <span class="cart-qty-val">${item.count}</span>
            <button class="cart-qty-btn cart-plus" data-cart-key="${item.key}" ${!canAddMore ? "disabled" : ""} title="Tambah satu">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <button class="cart-delete-btn delete-icon" data-cart-key="${item.key}" title="Hapus dari keranjang">
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
      `;
      cartDetailsEl.appendChild(listItem);
    });

    // Preview catatan buat petani (Aman dari XSS menggunakan textContent)
    const noteVal = document.getElementById("note").value.trim();
    if (noteVal) {
      const preview = document.createElement("div");
      preview.className = "note-preview";
      const icon = document.createElement("i");
      icon.className = "fas fa-quote-left";
      preview.appendChild(icon);
      
      const textSpan = document.createElement("span");
      textSpan.textContent = " " + noteVal; // Anti-XSS
      preview.appendChild(textSpan);
      cartDetailsEl.appendChild(preview);
    }

    renderBreakdownRows(cartSummaryEl, buildBreakdown(totalPrice));
    updateCartCount();
    renderProducts();
    renderHomeFeatured();
  }

  /* TAMBAH BARANG KE KERANJANG BERDASARKAN TAKARAN */
  function addToCart(productId, customWeight = null) {
    const product = products.find((item) => item.id == productId);
    if (!product) return;

    const chosenWeight = customWeight !== null ? Number(customWeight) : (selectedWeightKg[productId] || 1.0);
    const calc = calculatePriceForWeight(product, chosenWeight);

    const remainingKg = getRemainingStockKg(product);
    if (remainingKg < calc.weightKg) {
      showToast(`⚠️ Stok ${product.name} tidak mencukupi untuk takaran ${formatWeightLabel(calc.weightKg)} (tersisa ${remainingKg} kg).`);
      return;
    }

    const cartKey = `${product.id}_${calc.weightKg}kg`;
    if (!cart[cartKey]) {
      cart[cartKey] = {
        key: cartKey,
        productId: product.id,
        name: product.name,
        weightLabel: formatWeightLabel(calc.weightKg),
        weightKg: calc.weightKg,
        price: calc.totalPrice,
        count: 0
      };
    }

    cart[cartKey].count++;
    cart[cartKey].price = calc.totalPrice; // Selalu sinkronkan harga resmi
    renderCart();
  }

  /* KURANGI BARANG DARI KERANJANG */
  function removeFromCart(cartKey) {
    if (!cart[cartKey]) return;
    cart[cartKey].count--;
    if (cart[cartKey].count <= 0) {
      delete cart[cartKey];
    }
    renderCart();
  }

  /* HAPUS BARANG DARI KERANJANG */
  function deleteItem(cartKey) {
    if (!cart[cartKey]) return;
    const name = `${cart[cartKey].name} (${cart[cartKey].weightLabel})`;
    delete cart[cartKey];
    renderCart();
    showToast(`🗑️ ${name} dihapus dari keranjang.`);
  }

  /* KUPON */
  async function applyCoupon() {
    const couponInput = document.getElementById("coupon");
    const code = couponInput.value.trim().toUpperCase(); // Case-insensitive
    const msg = document.getElementById("coupon-msg");

    if (!code) {
      msg.textContent = "Silakan masukkan kode kupon.";
      msg.className = "coupon-msg err";
      return;
    }

    const hash = await hashSha256(code);
    if (hash === KUPON_HASH) {
      diskon = DISKON_KUPON;
      appliedCouponCode = code;
      msg.innerHTML = `<i class="fas fa-check-circle"></i> Kupon <strong>${code}</strong> aktif! Diskon 20% berhasil dipasang.`;
      msg.className = "coupon-msg ok";
      showToast("🎉 Kupon Teman Petani aktif! Potongan 20% diterapkan.");
    } else {
      diskon = 0;
      appliedCouponCode = "";
      msg.innerHTML = `<i class="fas fa-circle-exclamation"></i> Kode kupon tidak valid.`;
      msg.className = "coupon-msg err";
    }
    renderCart();
  }

  /* TOAST NOTIFIKASI */
  let toastTimer = null;
  function showToast(message) {
    const t = document.getElementById("toast");
    t.innerHTML = message;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ============================================================
     FUNGSI-FUNGSI AUTENTIKASI GOOGLE & AKUN CUSTOMER
     ============================================================ */

  function initGoogleAuth() {
    const clientId = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GOOGLE_CLIENT_ID) || "214526431628-vl4u0af2voomkef0rb3hms20l4go8qpm.apps.googleusercontent.com";
    const realGisWrapper = document.getElementById("google-gis-real-wrapper");
    const realGisTarget = document.getElementById("google-gis-button-target");
    const actionBtn = document.getElementById("btn-google-official-action");

    if (window.google && window.google.accounts && clientId && !clientId.includes("your-google-client-id")) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        if (realGisTarget) {
          realGisTarget.innerHTML = "";
          window.google.accounts.id.renderButton(realGisTarget, {
            theme: "outline",
            size: "large",
            width: 320,
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left"
          });
          if (realGisWrapper) realGisWrapper.style.display = "flex";
          // Jika render button resmi Google berhasil muncul, sembunyikan fallback action button
          setTimeout(() => {
            if (realGisTarget.children.length > 0 && actionBtn) {
              actionBtn.style.display = "none";
            }
          }, 300);
        }

        // Tampilkan prompt One-Tap otomatis jika didukung browser
        window.google.accounts.id.prompt();
      } catch (err) {
        console.warn("Inisialisasi Google Identity Services error:", err);
        if (actionBtn) actionBtn.style.display = "flex";
      }
    } else {
      if (actionBtn) actionBtn.style.display = "flex";
    }
  }

  function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) return;
    const payload = parseJwt(response.credential);
    if (payload) {
      console.log("[GOOGLE_LOGIN_SUCCESS]", payload.name, payload.email);
      const isExisting = currentUser && currentUser.email === payload.email;

      loginUser({
        name: payload.name || "Pelanggan Google",
        email: payload.email || "",
        avatar: payload.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
        phone: isExisting ? currentUser.phone : "",
        address: isExisting ? currentUser.address : "",
        profileCompleted: true
      });

      closeLoginModal();
      navigateTo("shop");
      showToast(`Selamat datang, <strong>${escapeHtml(payload.name || 'Pelanggan')}</strong>!`);
    }
  }


  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Gagal decode JWT Google:", e);
      return null;
    }
  }

  function loginUser(userData) {
    currentUser = userData;
    localStorage.setItem("pasar_pagi_user", JSON.stringify(currentUser));
    updateAuthUI();
  }

  function logoutUser() {
    currentUser = null;
    localStorage.removeItem("pasar_pagi_user");
    updateAuthUI();
    closeUserDropdown();
    showToast("Anda telah keluar dari akun customer.");
  }

  function getUserOrders() {
    if (!currentUser) return customerOrders;
    return customerOrders.filter(o => !o.customer || o.customer.email === currentUser.email || o.customer.name === currentUser.name);
  }

  function updateAuthUI() {
    const guestEl = document.getElementById("auth-guest");
    const userEl = document.getElementById("auth-user");
    const menuBadge = document.getElementById("menu-order-badge");
    const userOrders = getUserOrders();

    const hasCompletedProfile = currentUser && currentUser.profileCompleted;

    if (navShopBtn) {
      navShopBtn.style.display = "inline-flex";
    }

    if (currentUser) {
      if (guestEl) guestEl.style.display = "none";
      if (userEl) userEl.style.display = "block";
      const nameEl = document.getElementById("user-chip-name");
      if (nameEl) nameEl.textContent = (currentUser.name || "Pelanggan").split(" ")[0];
      
      const avatarEl = document.getElementById("user-avatar-img");
      if (avatarEl) {
        if (currentUser.avatarEmoji) {
          avatarEl.src = getAvatarDataUri(currentUser.avatarEmoji, currentUser.avatarBg || "#eaf6ea");
        } else if (currentUser.avatar) {
          avatarEl.src = currentUser.avatar;
        } else {
          avatarEl.src = getAvatarDataUri("🍎", "#fde8e8");
        }
      }

      const menuName = document.getElementById("menu-user-name");
      if (menuName) menuName.textContent = currentUser.name || "Pelanggan";
      const menuEmail = document.getElementById("menu-user-email");
      if (menuEmail) menuEmail.textContent = currentUser.email || "";

      if (!currentUser.profileCompleted) {
        currentUser.profileCompleted = true;
        localStorage.setItem("pasar_pagi_user", JSON.stringify(currentUser));
      }
    } else {
      if (guestEl) guestEl.style.display = "block";
      if (userEl) userEl.style.display = "none";
    }

    if (menuBadge) {
      menuBadge.textContent = userOrders.length;
    }

    // Update Mobile Bottom Nav User Button
    if (bnavUserLabel) {
      if (currentUser) {
        bnavUserLabel.textContent = (currentUser.name || "Akun").split(" ")[0];
        if (bnavAvatarImg) {
          if (currentUser.avatarEmoji) {
            bnavAvatarImg.src = getAvatarDataUri(currentUser.avatarEmoji, currentUser.avatarBg || "#eaf6ea");
          } else if (currentUser.avatar) {
            bnavAvatarImg.src = currentUser.avatar;
          } else {
            bnavAvatarImg.src = getAvatarDataUri("🍎", "#fde8e8");
          }
          bnavAvatarImg.style.display = "block";
        }
        if (bnavUserIcon) bnavUserIcon.style.display = "none";
      } else {
        bnavUserLabel.textContent = "Masuk";
        if (bnavAvatarImg) bnavAvatarImg.style.display = "none";
        if (bnavUserIcon) bnavUserIcon.style.display = "block";
      }
    }
  }

  function openLoginModal() {
    if (loginModal) {
      loginModal.classList.add("open");
      document.body.style.overflow = "hidden";
      initGoogleAuth();
    }
  }

  function closeLoginModal() {
    if (loginModal) {
      loginModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  /* ============================================================
     FUNGSI PEMBUATAN AKUN & ONBOARDING PROFIL (CUTE ICONS & FAVORITES)
     ============================================================ */

  function openProfileSetupModal() {
    closeLoginModal();
    closeUserDropdown();
    if (!profileSetupModal) return;

    // 1. Prefill Nama dari Akun Google
    const nameInput = document.getElementById("setup-name");
    if (nameInput) {
      nameInput.value = (currentUser && currentUser.name) ? currentUser.name : "";
    }

    // 2. Prefill Umur
    const ageInput = document.getElementById("setup-age");
    if (ageInput) {
      ageInput.value = (currentUser && currentUser.age) ? currentUser.age : 24;
    }

    // Prefill Kontak opsional
    const phoneInput = document.getElementById("setup-phone");
    if (phoneInput && currentUser?.phone) phoneInput.value = currentUser.phone;
    const addrInput = document.getElementById("setup-address");
    if (addrInput && currentUser?.address) addrInput.value = currentUser.address;

    // 4. Default Icon Karakter Lucu
    if (currentUser?.avatarEmoji) {
      const match = CUTE_AVATARS.find(a => a.emoji === currentUser.avatarEmoji);
      if (match) setupSelectedAvatar = match;
    } else {
      setupSelectedAvatar = CUTE_AVATARS[0];
    }

    // 3. Default Sayur & Buah Favorit
    if (currentUser?.favoriteProduce && Array.isArray(currentUser.favoriteProduce)) {
      setupSelectedProduces = new Set(currentUser.favoriteProduce);
    } else {
      setupSelectedProduces = new Set(["apel", "wortel"]);
    }

    renderSetupAvatarPreview();
    renderSetupCuteAvatarGrid();
    renderSetupProduceChips();

    profileSetupModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProfileSetupModal() {
    if (profileSetupModal) {
      profileSetupModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function renderSetupAvatarPreview() {
    const circle = document.getElementById("setup-avatar-preview-circle");
    const emojiEl = document.getElementById("setup-avatar-preview-emoji");
    const imgEl = document.getElementById("setup-avatar-preview-img");
    const nameEl = document.getElementById("setup-avatar-preview-name");
    const subEl = document.getElementById("setup-avatar-preview-sub");

    if (setupSelectedAvatar.isGoogle && currentUser?.avatar) {
      if (emojiEl) emojiEl.style.display = "none";
      if (imgEl) {
        imgEl.src = currentUser.avatar;
        imgEl.style.display = "block";
      }
      if (nameEl) nameEl.textContent = "Foto Profil Google";
      if (subEl) subEl.textContent = currentUser.name || "Foto Akun Asli";
      if (circle) circle.style.background = "#ffffff";
    } else {
      if (imgEl) imgEl.style.display = "none";
      if (emojiEl) {
        emojiEl.textContent = setupSelectedAvatar.emoji;
        emojiEl.style.display = "block";
      }
      if (nameEl) nameEl.textContent = setupSelectedAvatar.name;
      if (subEl) subEl.textContent = setupSelectedAvatar.sub || "Karakter Pasar Pagi kamu";
      if (circle) circle.style.background = setupSelectedAvatar.bg;
    }
  }

  function renderSetupCuteAvatarGrid() {
    const grid = document.getElementById("setup-cute-avatar-grid");
    if (!grid) return;

    let html = CUTE_AVATARS.map(avatar => {
      const isSelected = setupSelectedAvatar.id === avatar.id && !setupSelectedAvatar.isGoogle;
      return `
        <button type="button" class="cute-avatar-btn ${isSelected ? 'selected' : ''}" data-avatar-id="${avatar.id}" title="${avatar.name}">
          <div class="cute-avatar-badge" style="background: ${avatar.bg};">
            <span>${avatar.emoji}</span>
          </div>
          <span class="cute-avatar-title">${avatar.name}</span>
          <div class="cute-avatar-check"><i class="fas fa-check"></i></div>
        </button>
      `;
    }).join("");

    if (currentUser && currentUser.avatar && !currentUser.avatar.includes("ui-avatars.com")) {
      const isGoogleSelected = setupSelectedAvatar.isGoogle;
      html += `
        <button type="button" class="cute-avatar-btn ${isGoogleSelected ? 'selected' : ''}" data-avatar-google="true" title="Gunakan Foto Akun Google Asli">
          <div class="cute-avatar-badge" style="background: #ffffff; padding: 2px;">
            <img src="${currentUser.avatar}" alt="Google" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
          </div>
          <span class="cute-avatar-title">Foto Google</span>
          <div class="cute-avatar-check"><i class="fas fa-check"></i></div>
        </button>
      `;
    }

    grid.innerHTML = html;
  }

  function renderSetupProduceChips() {
    const container = document.getElementById("setup-fav-produce-chips");
    if (!container) return;

    container.innerHTML = FAVORITE_PRODUCE_LIST.map(prod => {
      const isSelected = setupSelectedProduces.has(prod.id);
      return `
        <button type="button" class="produce-chip-btn ${isSelected ? 'selected' : ''}" data-produce-id="${prod.id}">
          <span>${prod.icon}</span>
          <span>${prod.label}</span>
          <i class="fas fa-check produce-chip-check"></i>
        </button>
      `;
    }).join("");
  }

  function openProfileModal() {
    if (!currentUser) {
      openLoginModal();
      return;
    }

    const modalAvatar = document.getElementById("profile-modal-avatar");
    const modalEmoji = document.getElementById("profile-modal-emoji");
    const charTag = document.getElementById("profile-char-tag");

    if (currentUser.avatarEmoji) {
      if (modalEmoji) {
        modalEmoji.textContent = currentUser.avatarEmoji;
        modalEmoji.style.display = "block";
      }
      if (modalAvatar) modalAvatar.style.display = "none";
      if (charTag) charTag.textContent = `${currentUser.avatarEmoji} ${currentUser.avatarName || 'Maskot Kebun'}`;
    } else if (currentUser.avatar) {
      if (modalAvatar) {
        modalAvatar.src = currentUser.avatar;
        modalAvatar.style.display = "block";
      }
      if (modalEmoji) modalEmoji.style.display = "none";
      if (charTag) charTag.textContent = "📸 Foto Google";
    }

    const nameInput = document.getElementById("profile-name");
    if (nameInput) nameInput.value = currentUser.name || "";
    const ageInput = document.getElementById("profile-age");
    if (ageInput) ageInput.value = currentUser.age || 24;

    document.getElementById("profile-modal-name").textContent = currentUser.name || "Pelanggan";
    document.getElementById("profile-modal-email").textContent = currentUser.email || "";
    document.getElementById("profile-wa").value = currentUser.phone || "";
    document.getElementById("profile-address").value = currentUser.address || "";

    editSelectedAvatar = currentUser.avatarEmoji ? (CUTE_AVATARS.find(a => a.emoji === currentUser.avatarEmoji) || CUTE_AVATARS[0]) : CUTE_AVATARS[0];
    editSelectedProduces = new Set(currentUser.favoriteProduce || ["apel", "wortel"]);
    renderEditCuteAvatarGrid();
    renderEditProduceChips();

    closeUserDropdown();
    if (profileModal) {
      profileModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function renderEditCuteAvatarGrid() {
    const grid = document.getElementById("profile-cute-avatar-grid");
    if (!grid) return;
    grid.innerHTML = CUTE_AVATARS.map(avatar => {
      const isSelected = editSelectedAvatar && editSelectedAvatar.id === avatar.id;
      return `
        <button type="button" class="cute-avatar-btn ${isSelected ? 'selected' : ''}" data-edit-avatar-id="${avatar.id}" title="${avatar.name}">
          <div class="cute-avatar-badge" style="background: ${avatar.bg};">
            <span>${avatar.emoji}</span>
          </div>
          <span class="cute-avatar-title">${avatar.name}</span>
          <div class="cute-avatar-check"><i class="fas fa-check"></i></div>
        </button>
      `;
    }).join("");
  }

  function renderEditProduceChips() {
    const container = document.getElementById("profile-fav-produce-chips");
    if (!container) return;
    container.innerHTML = FAVORITE_PRODUCE_LIST.map(prod => {
      const isSelected = editSelectedProduces.has(prod.id);
      return `
        <button type="button" class="produce-chip-btn ${isSelected ? 'selected' : ''}" data-edit-produce-id="${prod.id}">
          <span>${prod.icon}</span>
          <span>${prod.label}</span>
          <i class="fas fa-check produce-chip-check"></i>
        </button>
      `;
    }).join("");
  }

  function closeProfileModal() {
    if (profileModal) {
      profileModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function openOrdersModal() {
    closeUserDropdown();
    renderOrdersList();
    if (ordersModal) {
      ordersModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeOrdersModal() {
    if (ordersModal) {
      ordersModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function toggleUserDropdown() {
    if (!userDropdownMenu) return;
    const isShowing = userDropdownMenu.classList.contains("show");
    if (isShowing) {
      closeUserDropdown();
    } else {
      userDropdownMenu.classList.add("show");
      if (userChipBtn) userChipBtn.setAttribute("aria-expanded", "true");
    }
  }

  function closeUserDropdown() {
    if (userDropdownMenu) {
      userDropdownMenu.classList.remove("show");
      if (userChipBtn) userChipBtn.setAttribute("aria-expanded", "false");
    }
  }

  function renderOrdersList() {
    const container = document.getElementById("orders-list-container");
    if (!container) return;
    const userOrders = getUserOrders();

    if (!userOrders || userOrders.length === 0) {
      container.innerHTML = `
        <div class="orders-empty-state">
          <i class="fas fa-basket-shopping"></i>
          <h4>Belum Ada Pesanan</h4>
          <p>Anda belum memiliki riwayat transaksi belanja. Mulai pilih buah manis & sayur segar hari ini!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = userOrders.map(order => {
      let statusBadge = '';
      if (order.status === 'paid') {
        statusBadge = `<span class="order-hist-status status-paid"><i class="fas fa-check-circle"></i> Lunas (QRIS)</span>`;
      } else if (order.status === 'cod') {
        statusBadge = `<span class="order-hist-status status-cod"><i class="fas fa-truck-fast"></i> COD (Disiapkan)</span>`;
      } else {
        statusBadge = `<span class="order-hist-status status-pending"><i class="fas fa-clock"></i> Menunggu Transfer</span>`;
      }

      const itemsHtml = (order.items || []).map(i => `
        <div class="order-hist-item-row">
          <span>${escapeHtml(i.name)} (${i.weightLabel}) &times; ${i.count}</span>
          <strong>${formatMoney(i.count * i.price)}</strong>
        </div>
      `).join("");

      return `
        <div class="order-history-card">
          <div class="order-hist-header">
            <div>
              <span class="order-hist-id">#${order.id}</span>
              <div class="order-hist-date">${order.displayDate || order.date}</div>
            </div>
            ${statusBadge}
          </div>
          <div class="order-hist-items">
            ${itemsHtml}
          </div>
          <div class="order-hist-footer">
            <div class="order-hist-method">
              <i class="fas fa-wallet"></i> ${escapeHtml(order.paymentMethodName || 'Pembayaran')}
            </div>
            <div class="order-hist-total">${formatMoney(order.breakdown ? order.breakdown.total : 0)}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  /* ============================================================
     FUNGSI SISTEM PEMBAYARAN (QRIS, TRANSFER BANK, COD)
     ============================================================ */

  function selectPaymentMethod(methodKey) {
    activePaymentMethod = methodKey;
    document.querySelectorAll(".payment-option").forEach(opt => {
      const isMatch = opt.dataset.payment === methodKey;
      opt.classList.toggle("active", isMatch);
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = isMatch;
    });

    document.querySelectorAll(".payment-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === `panel-${methodKey}`);
    });

    if (methodKey === "qris") {
      startQrisTimer();
    } else {
      stopQrisTimer();
    }
  }

  function selectBank(bankKey) {
    if (!BANK_ACCOUNTS[bankKey]) return;
    selectedBank = bankKey;
    document.querySelectorAll(".bank-chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.bank === bankKey);
    });
    const acc = BANK_ACCOUNTS[bankKey];
    const nameEl = document.getElementById("selected-bank-name");
    const numEl = document.getElementById("selected-bank-number");
    if (nameEl) nameEl.textContent = acc.name;
    if (numEl) numEl.textContent = acc.number;
  }

  function copyBankAccount() {
    const acc = BANK_ACCOUNTS[selectedBank];
    if (!acc) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(acc.rawNumber).then(() => {
        showToast(`Nomor rekening <strong>${acc.code} (${acc.rawNumber})</strong> berhasil disalin!`);
      }).catch(() => fallbackCopy(acc.rawNumber));
    } else {
      fallbackCopy(acc.rawNumber);
    }
  }

  function fallbackCopy(text) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      showToast(`Nomor rekening berhasil disalin: <strong>${text}</strong>`);
    } catch (e) {
      showToast(`Silakan salin manual: ${text}`);
    }
    document.body.removeChild(input);
  }

  function startQrisTimer() {
    stopQrisTimer();
    qrisSecondsLeft = 15 * 60;
    updateQrisTimerDisplay();
    qrisTimerInterval = setInterval(() => {
      qrisSecondsLeft--;
      if (qrisSecondsLeft <= 0) {
        stopQrisTimer();
        const timerEl = document.getElementById("qris-timer");
        if (timerEl) timerEl.textContent = "Kedaluwarsa";
      } else {
        updateQrisTimerDisplay();
      }
    }, 1000);
  }

  function stopQrisTimer() {
    if (qrisTimerInterval) {
      clearInterval(qrisTimerInterval);
      qrisTimerInterval = null;
    }
  }

  function updateQrisTimerDisplay() {
    const el = document.getElementById("qris-timer");
    if (!el) return;
    const mins = Math.floor(qrisSecondsLeft / 60).toString().padStart(2, '0');
    const secs = (qrisSecondsLeft % 60).toString().padStart(2, '0');
    el.textContent = `${mins}:${secs}`;
  }

  /* MODAL REVIEW CHECKOUT */
  function openReview() {
    closeCartDrawer();
    if (Object.keys(cart).length === 0) {
      showToast("Keranjang kamu masih kosong.");
      return;
    }

    const itemsEl = document.getElementById("review-items");
    itemsEl.innerHTML = "";
    let subtotal = 0;

    Object.values(cart).forEach((item) => {
      const line = item.count * item.price;
      subtotal += line;
      const row = document.createElement("div");
      row.className = "review-line";
      row.innerHTML = `
        <div class="review-line-left">
          <span class="review-item-name">${escapeHtml(item.name)} <strong class="review-weight-badge">(${item.weightLabel})</strong></span>
          <span class="review-item-qty">x ${item.count}</span>
        </div>
        <span class="review-item-total">${formatMoney(line)}</span>
      `;
      itemsEl.appendChild(row);
    });

    const noteWrap = document.getElementById("review-note-wrap");
    noteWrap.innerHTML = "";
    const noteVal = document.getElementById("note").value.trim();
    if (noteVal) {
      const n = document.createElement("div");
      n.className = "review-note";
      const lbl = document.createElement("div");
      lbl.className = "review-note-label";
      lbl.innerHTML = `<i class="fas fa-pencil"></i> Catatan Buat Petani:`;
      const val = document.createElement("div");
      val.className = "review-note-text";
      val.textContent = noteVal; // Anti-XSS
      n.appendChild(lbl);
      n.appendChild(val);
      noteWrap.appendChild(n);
    }

    const breakdown = buildBreakdown(subtotal);
    renderBreakdownRows(document.getElementById("review-breakdown"), breakdown);

    // Update info akun pelanggan pada checkout
    const authBanner = document.getElementById("checkout-auth-banner");
    const loggedCard = document.getElementById("checkout-logged-user");
    const nameInput = document.getElementById("checkout-name");
    const phoneInput = document.getElementById("checkout-phone");
    const addressInput = document.getElementById("checkout-address");

    if (currentUser) {
      if (authBanner) authBanner.style.display = "none";
      if (loggedCard) loggedCard.style.display = "flex";
      const avatarEl = document.getElementById("checkout-user-avatar");
      if (avatarEl) avatarEl.src = currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80";
      const nameEl = document.getElementById("checkout-user-name");
      if (nameEl) nameEl.textContent = currentUser.name;
      const emailEl = document.getElementById("checkout-user-email");
      if (emailEl) emailEl.textContent = currentUser.email;

      if (nameInput && !nameInput.value) nameInput.value = currentUser.name;
      if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || "";
      if (addressInput && !addressInput.value) addressInput.value = currentUser.address || "";
    } else {
      if (authBanner) authBanner.style.display = "flex";
      if (loggedCard) loggedCard.style.display = "none";
    }

    // Set jumlah tagihan di QRIS
    const qrisAmountEl = document.getElementById("qris-total-amount");
    if (qrisAmountEl) qrisAmountEl.textContent = formatMoney(breakdown.total);

    // Aktifkan panel metode pembayaran
    selectPaymentMethod(activePaymentMethod || "qris");
    selectBank(selectedBank || "bca");

    reviewModal.classList.add("open");
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  }

  function closeReview() {
    reviewModal.classList.remove("open");
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    stopQrisTimer();
  }

  /* PESANAN MASUK (VALIDASI LENGKAP & INTEGRASI CUSTOMER) */
  let isPlacingOrder = false;
  async function placeOrder() {
    if (isPlacingOrder) return;
    isPlacingOrder = true;
    try {
      const nameInput = document.getElementById("checkout-name");
      const phoneInput = document.getElementById("checkout-phone");
      const addressInput = document.getElementById("checkout-address");

      const recipientName = nameInput ? nameInput.value.trim() : "";
      const recipientPhone = phoneInput ? phoneInput.value.trim() : "";
      const recipientAddress = addressInput ? addressInput.value.trim() : "";

      console.log("[PLACE_ORDER] Start. Recipient:", recipientName, "Phone:", recipientPhone, "Address:", recipientAddress, "Method:", activePaymentMethod);

      if (!recipientName) {
        showToast("Mohon masukkan nama lengkap penerima paket.");
        if (nameInput) nameInput.focus();
        return;
      }
      if (!recipientPhone || recipientPhone.length < 8) {
        showToast("Mohon masukkan nomor WhatsApp / Telepon aktif.");
        if (phoneInput) phoneInput.focus();
        return;
      }
      if (!recipientAddress || recipientAddress.length < 8) {
        showToast("Mohon masukkan alamat lengkap pengiriman.");
        if (addressInput) addressInput.focus();
        return;
      }

      const breakdown = buildBreakdown(
        Object.values(cart).reduce((sum, item) => sum + item.count * item.price, 0)
      );

      const orderedItems = Object.values(cart).map((i) => ({ ...i }));
      const orderNote = document.getElementById("note").value.trim();
      const orderId = "PP-" + Math.floor(100000 + Math.random() * 900000);

      let paymentMethodName = "QRIS Dinamis Mandiri";
      let orderStatus = "pending";
      let bankInfo = null;
      let mpgData = null;

      const confirmBtn = document.getElementById("review-confirm");
      const originalBtnContent = confirmBtn ? confirmBtn.innerHTML : "";

      if (activePaymentMethod === "transfer") {
        bankInfo = BANK_ACCOUNTS[selectedBank] || BANK_ACCOUNTS.bca;
        paymentMethodName = `Transfer Bank (${bankInfo.code})`;
        orderStatus = "pending";
      } else if (activePaymentMethod === "cod") {
        paymentMethodName = "Bayar di Tempat (COD)";
        orderStatus = "cod";
      } else {
        // Mandiri Private Gateway (MPG) QRIS Dinamis
        paymentMethodName = "QRIS Dinamis Mandiri (0% MDR)";
        orderStatus = "pending";

        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Menyiapkan QRIS Mandiri...`;
        }

        try {
          console.log("[PLACE_ORDER] Calling requestMpgInvoice for order:", orderId, "amount:", breakdown.total);
          mpgData = await requestMpgInvoice({
            orderId,
            amount: breakdown.total,
            customerName: recipientName,
            customerEmail: currentUser ? currentUser.email : "pelanggan@pasarpagi.id",
            customerPhone: recipientPhone,
            items: orderedItems
          });
          console.log("[PLACE_ORDER] requestMpgInvoice success:", mpgData);
        } catch (err) {
          console.error("[CHECKOUT_ERROR] Gagal menerbitkan QRIS MPG:", err);
          showToast("Gagal menerbitkan QRIS Dinamis. Coba lagi atau gunakan Transfer Bank.");
          if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = originalBtnContent;
          }
          return;
        } finally {
          if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = originalBtnContent;
          }
        }
      }

    // PENGURANGAN STOK NYATA BERBASIS KG
    orderedItems.forEach((ordered) => {
      const official = products.find((p) => p.id === ordered.productId);
      if (official) {
        official.stockKg = Math.max(0, Math.round((official.stockKg - (ordered.weightKg * ordered.count)) * 10) / 10);
      }
    });

    // SIMPAN KE RIWAYAT PESANAN (ORDER HISTORY)
    const now = new Date();
    const orderRecord = {
      id: orderId,
      date: now.toISOString(),
      displayDate: now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + " WIB",
      customer: {
        name: recipientName,
        email: currentUser ? currentUser.email : "guest@pasarpagi.id",
        phone: recipientPhone,
        address: recipientAddress
      },
      items: orderedItems,
      breakdown: breakdown,
      paymentMethod: activePaymentMethod,
      paymentMethodName: paymentMethodName,
      bank: bankInfo,
      status: orderStatus,
      note: orderNote,
      checkoutUrl: mpgData ? mpgData.checkoutUrl : null,
      qrString: mpgData ? mpgData.qrString : null,
      mpgUniqueCode: mpgData ? mpgData.uniqueCode : 0,
      mpgTotalAmount: mpgData ? mpgData.totalAmount : breakdown.total
    };

    customerOrders.unshift(orderRecord);
    localStorage.setItem("pasar_pagi_orders", JSON.stringify(customerOrders));

    // Perbarui profil default jika pengguna telah login
    if (currentUser) {
      currentUser.phone = recipientPhone;
      currentUser.address = recipientAddress;
      localStorage.setItem("pasar_pagi_user", JSON.stringify(currentUser));
      updateAuthUI();
    }

    closeReview();

    // Reset keranjang & input
    cart = {};
    diskon = 0;
    appliedCouponCode = "";
    document.getElementById("note").value = "";
    document.getElementById("coupon").value = "";
    document.getElementById("coupon-msg").textContent = "";

    renderCart();

    // Buka Modal Sukses & Resi Lengkap
    openSuccessModal(orderRecord);

    // Opsi A (Hosted Checkout Redirect): Buka layar barcode QRIS resmi MPG
    if (orderRecord.checkoutUrl) {
      try {
        const payWin = window.open(orderRecord.checkoutUrl, "_blank");
        if (!payWin || payWin.closed || typeof payWin.closed === "undefined") {
          // Jika popup diblokir oleh setelan browser, alihkan otomatis setelah 1 detik
          setTimeout(() => {
            window.location.href = orderRecord.checkoutUrl;
          }, 1000);
        }
      } catch (err) {
        window.location.href = orderRecord.checkoutUrl;
      }
    }
  } finally {
    isPlacingOrder = false;
  }
}

  function openSuccessModal(order) {
    const receiptEl = document.getElementById("order-receipt-content");
    const itemsListHtml = (order.items || []).map(i => `
      <div class="receipt-item-row">
        <span>${escapeHtml(i.name)} (${i.weightLabel}) &times; ${i.count}</span>
        <strong>${formatMoney(i.count * i.price)}</strong>
      </div>
    `).join("");

    let paymentDetailHtml = "";
    if (order.paymentMethod === "transfer" && order.bank) {
      paymentDetailHtml = `
        <div class="receipt-payment-guide-box">
          <p><i class="fas fa-building-columns"></i> Transfer ke <strong>${order.bank.name}</strong>:</p>
          <div class="receipt-acc-row">
            <code>${order.bank.number}</code>
            <span>a.n ${order.bank.holder}</span>
          </div>
          <small>Status: <strong style="color: #f57f17;">Menunggu Transfer</strong>. Pesanan diproses setelah dana masuk.</small>
        </div>
      `;
    } else if (order.paymentMethod === "cod") {
      paymentDetailHtml = `
        <div class="receipt-payment-guide-box">
          <p><i class="fas fa-hand-holding-dollar"></i> Metode: <strong>Bayar di Tempat (COD)</strong></p>
          <small>Status: <strong style="color: #1565c0;">Pesanan Sedang Disiapkan</strong>. Siapkan uang pas <strong>${formatMoney(order.breakdown.total)}</strong> saat kurir tiba.</small>
        </div>
      `;
    } else {
      paymentDetailHtml = `
        <div class="receipt-payment-guide-box">
          <p><i class="fas fa-qrcode"></i> Metode: <strong>QRIS Dinamis Mandiri (0% MDR)</strong></p>
          ${order.checkoutUrl ? `
            <div style="margin: 0.75rem 0; padding: 0.85rem; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.35rem;">
                <span style="font-size: 0.85rem; color: #166534; font-weight: 700;">
                  <i class="fas fa-shield-halved"></i> Mandiri Private Gateway
                </span>
                <span style="font-size: 0.8rem; background: #bbf7d0; color: #14532d; padding: 2px 8px; border-radius: 999px; font-weight: 700;">
                  +Kode Unik: Rp ${order.mpgUniqueCode || 0}
                </span>
              </div>
              <div style="margin-bottom: 0.65rem; font-size: 0.95rem; color: #14532d;">
                Nominal Tagihan Pas: <strong style="font-size: 1.1rem; color: #15803d;">${formatMoney(order.mpgTotalAmount || order.breakdown.total)}</strong>
              </div>
              <a href="${order.checkoutUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; text-decoration: none; padding: 0.65rem 1rem; border-radius: 8px; font-weight: 700; background: #16a34a; color: #ffffff; box-shadow: 0 4px 10px rgba(22,163,74,0.3); transition: all 0.2s ease;">
                <i class="fas fa-arrow-up-right-from-square"></i> Buka Barcode QRIS (Hosted Checkout)
              </a>
              <small style="display: block; margin-top: 0.5rem; text-align: center; color: #15803d; font-size: 0.78rem;">
                <i class="fas fa-mobile-screen-button"></i> Scan langsung dengan Livin' Mandiri, BCA, GoPay, OVO, ShopeePay, DANA
              </small>
            </div>
          ` : ""}
          <small>Status: <strong style="color: ${order.status === 'PAID' || order.status === 'paid' ? '#16a34a' : '#f57f17'};">${order.status === 'PAID' || order.status === 'paid' ? '<i class="fas fa-check-circle"></i> Terverifikasi Lunas' : '<i class="fas fa-clock"></i> Menunggu Scan & Pembayaran QRIS'}</strong> (Otomatis dicek oleh listener kasir).</small>
        </div>
      `;
    }

    receiptEl.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-id-tag">No. Pesanan: <strong>#${order.id}</strong></div>
        <div class="receipt-date">${order.displayDate}</div>
      </div>
      <div class="receipt-divider"></div>
      <div class="receipt-items-box">${itemsListHtml}</div>
      <div class="receipt-divider"></div>
      <div class="receipt-totals-box">
        <div class="receipt-row"><span>Subtotal:</span><span>${formatMoney(order.breakdown.subtotal)}</span></div>
        <div class="receipt-row"><span>Biaya Penanganan:</span><span>${formatMoney(order.breakdown.fee)}</span></div>
        ${order.breakdown.potongan > 0 ? `<div class="receipt-row receipt-discount"><span>Diskon Kupon:</span><span>-${formatMoney(order.breakdown.potongan)}</span></div>` : ""}
        <div class="receipt-row receipt-grand"><span>Total Bayar:</span><strong>${formatMoney(order.breakdown.total)}</strong></div>
      </div>
      <div class="receipt-divider"></div>
      ${paymentDetailHtml}
      <div class="receipt-meta-info" style="margin-top: 0.75rem;">
        <p><i class="fas fa-user"></i> Penerima: <strong>${escapeHtml(order.customer.name)}</strong> (${escapeHtml(order.customer.phone)})</p>
        <p><i class="fas fa-location-dot"></i> Alamat: <em>${escapeHtml(order.customer.address)}</em></p>
        ${order.note ? `<p><i class="fas fa-comment-dots"></i> Catatan Petani: <em>"${escapeHtml(order.note)}"</em></p>` : ""}
        <p><i class="fas fa-truck"></i> Estimasi Kirim: <strong>Pagi ini pukul 08:30 - 10:30 WIB</strong></p>
      </div>
    `;

    successModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeSuccessModal() {
    successModal.classList.remove("open");
    document.body.style.overflow = "";
    showToast("Terima kasih! Pesananmu sedang disiapkan.");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function openCartDrawer() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (sidebar) sidebar.classList.add("drawer-open");
    if (overlay) overlay.classList.add("drawer-open");
    document.body.classList.add("drawer-open");
    document.documentElement.classList.add("drawer-open");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (sidebar) sidebar.classList.remove("drawer-open");
    if (overlay) overlay.classList.remove("drawer-open");
    document.body.classList.remove("drawer-open");
    document.documentElement.classList.remove("drawer-open");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  // Kunci touch gesture agar keranjang tidak bisa di-swipe ke bawah
  const cartSidebarEl = document.getElementById("cart-sidebar");
  if (cartSidebarEl) {
    cartSidebarEl.addEventListener("touchmove", (e) => {
      // Hanya izinkan scroll jika jari berada di dalam daftar item belanja yang melebihi tinggi
      if (!e.target.closest("#cart-details")) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  const cartBackdropEl = document.getElementById("cart-drawer-overlay");
  if (cartBackdropEl) {
    cartBackdropEl.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  function scrollToCart() {
    if (window.innerWidth <= 768) {
      openCartDrawer();
    } else {
      const sidebar = document.getElementById("cart-sidebar");
      if (sidebar) {
        sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  /* ============================================================
     EVENT LISTENERS GLOBAL
     ============================================================ */

  document.addEventListener("click", (event) => {
    // Tutup drawer keranjang jika backdrop di-klik
    if (event.target && event.target.id === "cart-drawer-overlay") {
      closeCartDrawer();
      return;
    }

    // 1. Tangani penutupan jika pengguna klik langsung di luar kartu (pada latar belakang gelap / backdrop)
    if (event.target && event.target.classList && event.target.classList.contains("modal-overlay")) {
      if (event.target === reviewModal) closeReview();
      if (event.target === successModal) closeSuccessModal();
      if (event.target === loginModal) closeLoginModal();
      if (event.target === profileSetupModal) closeProfileSetupModal();
      if (event.target === profileModal) closeProfileModal();
      if (event.target === ordersModal) closeOrdersModal();
      return;
    }

    const target = event.target.closest("button, [data-goto-dept], #mobile-cart-bar, .perk-coupon, .dept-pill, .payment-option, #clear-search, #header-clear-search, #reset-filter-btn, #brand-logo, .preset-chip");
    if (!target) return;

    // Tutup Drawer Keranjang Mobile
    if (target.id === "cart-drawer-close-btn" || target.closest("#cart-drawer-close-btn")) {
      closeCartDrawer();
      return;
    }

    // Navigasi Tabs Navbar
    if (target.id === "nav-home" || target.id === "brand-logo") {
      navigateTo("home");
      return;
    }
    if (target.id === "nav-shop" || target.id === "btn-goto-shop") {
      currentDepartment = "all";
      document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === "all"));
      navigateTo("shop");
      renderProducts();
      return;
    }
    const gotoDeptEl = target.closest("[data-goto-dept]");
    if (gotoDeptEl) {
      const dept = gotoDeptEl.dataset.gotoDept || "all";
      currentDepartment = dept;
      document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === dept));
      navigateTo("shop");
      renderProducts();
      return;
    }
    // Prev / Next Tombol Carousel Poster
    if (target.id === "banner-prev-btn" || target.closest("#banner-prev-btn")) {
      scrollBannerCarousel(-1);
      return;
    }
    if (target.id === "banner-next-btn" || target.closest("#banner-next-btn")) {
      scrollBannerCarousel(1);
      return;
    }

    // Klik Indikator Dot Carousel Poster
    if (target.classList.contains("carousel-dot")) {
      const idx = Number(target.dataset.index) || 0;
      scrollBannerCarouselToIndex(idx);
      return;
    }
    if (target.id === "btn-shop-back-home") {
      navigateTo("home");
      return;
    }

    // Klik Filter Departemen (Semua, Buah Segar, Sayuran Kebun)
    if (target.classList.contains("dept-pill") || target.closest(".dept-pill")) {
      const btn = target.classList.contains("dept-pill") ? target : target.closest(".dept-pill");
      const dept = btn.dataset.dept;
      if (dept) {
        currentDepartment = dept;
        document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === dept));
        renderProducts();
      }
      return;
    }


    // Klik preset chip cepat (500 gr, 1 kg, 2 kg, 3 kg)
    if (target.classList.contains("preset-chip")) {
      const pId = Number(target.dataset.productId);
      const w = parseFloat(target.dataset.weight);
      if (pId && !isNaN(w)) {
        updateCardVolumeUI(pId, w);
      }
      return;
    }

    // Klik tombol "Beli" di featured fruits/sayuran Beranda (tetap di beranda, feedback toast & badge)
    if (target.classList.contains("btn-buy-featured") || target.closest(".btn-buy-featured")) {
      const btn = target.classList.contains("btn-buy-featured") ? target : target.closest(".btn-buy-featured");
      const pId = Number(btn.dataset.productId);
      if (pId) {
        const p = products.find(prod => prod.id === pId);
        addToCart(pId);
        showToast(`${p && p.type === 'sayur' ? '🥬' : '🍎'} ${p ? p.name : 'Produk'} ditambahkan ke keranjang!`);
      }
      return;
    }

    // Klaim kupon di Beranda -> otomatis apply dan masuk Toko
    if (target.id === "btn-claim-coupon" || target.id === "perk-coupon-click" || target.classList.contains("perk-coupon")) {
      const couponInput = document.getElementById("coupon");
      couponInput.value = "TEMANFARMER";
      applyCoupon();
      navigateTo("shop", "cart");
      return;
    }

    // Mobile Floating Cart Bar -> buka toko / scroll ke keranjang
    if (target.id === "mobile-cart-btn" || target.closest("#mobile-cart-btn") || target.id === "mobile-cart-bar" || target.closest("#mobile-cart-bar")) {
      if (currentPage === "shop") {
        scrollToCart();
      } else {
        navigateTo("shop", "cart");
      }
      return;
    }

    // Mobile Header Quick Cart Button
    if (target.id === "mobile-header-cart" || target.closest("#mobile-header-cart")) {
      if (currentPage === "shop") {
        scrollToCart();
      } else {
        navigateTo("shop", "cart");
      }
      return;
    }

    // Mobile Bottom Navigation Dock Items
    if (target.id === "bnav-home" || target.closest("#bnav-home")) {
      navigateTo("home");
      return;
    }

    if (target.id === "bnav-shop" || target.closest("#bnav-shop")) {
      navigateTo("shop");
      return;
    }

    if (target.id === "bnav-cart" || target.closest("#bnav-cart")) {
      if (currentPage === "shop") {
        scrollToCart();
      } else {
        navigateTo("shop", "cart");
      }
      return;
    }

    if (target.id === "bnav-user" || target.closest("#bnav-user")) {
      if (currentUser) {
        openProfileModal();
      } else {
        openLoginModal();
      }
      return;
    }

    // Tambah di kartu produk toko (tombol Beli atau plus stepper)
    if (target.classList.contains("plus-button") || target.classList.contains("btn-action-add") || target.closest(".btn-action-add")) {
      const btn = target.classList.contains("plus-button") || target.classList.contains("btn-action-add") ? target : target.closest(".btn-action-add");
      const pId = Number(btn.dataset.productId);
      if (pId) {
        addToCart(pId);
      }
      return;
    }

    // Kurang di kartu produk toko (minus stepper)
    if (target.classList.contains("minus-button")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey) {
        removeFromCart(cartKey);
      }
      return;
    }

    // Tambah di keranjang sidebar (stepper)
    if (target.classList.contains("cart-plus")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey && cart[cartKey]) {
        addToCart(cart[cartKey].productId, cart[cartKey].weightKg);
      }
      return;
    }

    // Kurang di keranjang sidebar (stepper)
    if (target.classList.contains("cart-minus")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey) {
        removeFromCart(cartKey);
      }
      return;
    }

    // Hapus di keranjang sidebar
    if (target.classList.contains("delete-icon") || target.classList.contains("cart-delete-btn")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey) {
        deleteItem(cartKey);
      }
      return;
    }
    // Kupon tombol di toko
    if (target.id === "apply-coupon") {
      applyCoupon();
      return;
    }
    // Checkout tombol
    if (target.id === "checkout-button" || target.closest("#checkout-button")) {
      openReview();
      return;
    }
    // Konfirmasi pesanan
    if (target.id === "review-confirm" || target.closest("#review-confirm")) {
      placeOrder();
      return;
    }
    // Kembali atau tutup review modal
    if (target.id === "review-back" || target.closest("#review-back") || target.id === "modal-close-btn" || target.closest("#modal-close-btn")) {
      closeReview();
      return;
    }
    // Tutup success modal
    if (target.id === "success-close-btn" || target.closest("#success-close-btn")) {
      closeSuccessModal();
      return;
    }
    // Clear search
    if (target.id === "clear-search" || target.id === "header-clear-search") {
      const headerSearchEl = document.getElementById("header-search-input");
      const headerClearEl = document.getElementById("header-clear-search");
      if (searchInput) searchInput.value = "";
      if (headerSearchEl) headerSearchEl.value = "";
      searchQuery = "";
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      if (headerClearEl) headerClearEl.style.display = "none";
      renderProducts();
      return;
    }
    // Reset filter
    if (target.id === "reset-filter-btn") {
      const headerSearchEl = document.getElementById("header-search-input");
      const headerClearEl = document.getElementById("header-clear-search");
      if (searchInput) searchInput.value = "";
      if (headerSearchEl) headerSearchEl.value = "";
      searchQuery = "";
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      if (headerClearEl) headerClearEl.style.display = "none";
      currentDepartment = "all";
      document.querySelectorAll(".dept-pill").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.dept === "all");
      });
      renderProducts();
      return;
    }

    // ============================================================
    //  EVENT LISTENERS: AKUN CUSTOMER & GOOGLE LOGIN
    // ============================================================

    // Buka Modal Login Google
    if (target.id === "btn-open-login" || target.closest("#btn-open-login") || target.id === "btn-checkout-login") {
      openLoginModal();
      return;
    }

    // Tutup Modal Login
    if (target.id === "login-modal-close" || target.closest("#login-modal-close") || target === loginModal) {
      closeLoginModal();
      return;
    }

    // Tombol Resmi Google Sign-In Action (Lanjutkan dengan Akun Google)
    if (target.id === "btn-google-official-action" || target.closest("#btn-google-official-action")) {
      const realTargetBtn = document.querySelector("#google-gis-button-target div[role='button'], #google-gis-button-target iframe");
      if (realTargetBtn) {
        realTargetBtn.click();
      } else if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.prompt();
      } else {
        const form = document.getElementById("custom-google-form");
        if (form) form.style.display = "flex";
        showToast("Layanan Google sedang dimuat, Anda juga dapat memasukkan Gmail secara langsung.");
      }
      return;
    }

    // Login Akun Google Utama Pengguna (Guntur Rizqi)
    if (target.id === "btn-login-guntur" || target.closest("#btn-login-guntur")) {
      loginUser({
        name: "Guntur Rizqi",
        email: "gunturrizqi444@gmail.com",
        phone: currentUser?.phone || "081298765432",
        address: currentUser?.address || "Pamulang, Tangerang Selatan",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
        profileCompleted: true,
        avatarEmoji: "🍎",
        avatarBg: "#fde8e8"
      });
      closeLoginModal();
      navigateTo("shop");
      showToast(`Login Google berhasil sebagai <strong>Guntur Rizqi</strong>!`);
      return;
    }

    // Toggle Form Akun Google Lainnya
    const toggleCustomGoogleBtn = target.closest("#btn-toggle-custom-google");
    if (toggleCustomGoogleBtn) {
      const form = document.getElementById("custom-google-form");
      const icon = document.getElementById("toggle-custom-google-icon");
      if (form) {
        const isHidden = form.style.display === "none";
        form.style.display = isHidden ? "flex" : "none";
        if (icon) {
          icon.className = isHidden ? "fas fa-chevron-up" : "fas fa-chevron-down";
        }
      }
      return;
    }

    // Demo User Login (Pilihan profil instan)
    const demoBtn = target.closest(".demo-user-btn");
    if (demoBtn) {
      const name = demoBtn.dataset.demoName || "Pelanggan Demo";
      const email = demoBtn.dataset.demoEmail || "demo@pasarpagi.id";
      const phone = demoBtn.dataset.demoPhone || "081234567890";
      const address = demoBtn.dataset.demoAddress || "Jalan Melati No. 10";
      const avatarImg = demoBtn.querySelector(".demo-avatar");
      const avatar = avatarImg ? avatarImg.src : "";

      loginUser({
        name,
        email,
        phone,
        address,
        avatar,
        profileCompleted: true,
        avatarEmoji: "🥑",
        avatarBg: "#eaf6ea"
      });
      closeLoginModal();
      navigateTo("shop");
      showToast(`Login demo berhasil sebagai <strong>${escapeHtml(name)}</strong>!`);
      return;
    }

    // Toggle Dropdown Menu Profil
    if (target.id === "user-chip-btn" || target.closest("#user-chip-btn")) {
      toggleUserDropdown();
      return;
    }

    // Buka Modal Profil / Edit Alamat
    if (target.id === "menu-btn-profile" || target.closest("#menu-btn-profile") || target.id === "btn-edit-profile-quick") {
      openProfileModal();
      return;
    }

    // Buka Modal Riwayat Pesanan
    if (target.id === "menu-btn-orders" || target.closest("#menu-btn-orders") || target.id === "success-view-orders-btn") {
      if (successModal.classList.contains("open")) closeSuccessModal();
      openOrdersModal();
      return;
    }

    // Logout Akun
    if (target.id === "menu-btn-logout" || target.closest("#menu-btn-logout")) {
      logoutUser();
      return;
    }

    // Tutup Modal Profil Edit
    if (target.id === "profile-modal-close" || target.id === "profile-modal-cancel" || target === profileModal) {
      closeProfileModal();
      return;
    }

    // Tutup Modal Pembuatan Profil Baru
    if (target.id === "profile-setup-close" || target.closest("#profile-setup-close") || target === profileSetupModal) {
      closeProfileSetupModal();
      return;
    }

    // Pemilihan Icon Karakter Lucu di Modal Setup
    const cuteAvatarBtn = target.closest("#setup-cute-avatar-grid .cute-avatar-btn");
    if (cuteAvatarBtn) {
      if (cuteAvatarBtn.dataset.avatarGoogle) {
        setupSelectedAvatar = { isGoogle: true, name: "Foto Profil Google", sub: currentUser?.name || "Foto Akun Asli" };
      } else {
        const aId = cuteAvatarBtn.dataset.avatarId;
        const match = CUTE_AVATARS.find(a => a.id === aId);
        if (match) setupSelectedAvatar = match;
      }
      renderSetupAvatarPreview();
      renderSetupCuteAvatarGrid();
      return;
    }

    // Pemilihan Sayur / Buah Kesukaan di Modal Setup
    const produceChipBtn = target.closest("#setup-fav-produce-chips .produce-chip-btn");
    if (produceChipBtn) {
      const pId = produceChipBtn.dataset.produceId;
      if (pId) {
        if (setupSelectedProduces.has(pId)) {
          if (setupSelectedProduces.size > 1) {
            setupSelectedProduces.delete(pId);
          } else {
            showToast("Pilih minimal 1 buah atau sayuran kesukaan!");
          }
        } else {
          setupSelectedProduces.add(pId);
        }
        renderSetupProduceChips();
      }
      return;
    }

    // Pemilihan Ganti Icon Karakter di Modal Profil Edit
    const editAvatarBtn = target.closest("#profile-cute-avatar-grid .cute-avatar-btn");
    if (editAvatarBtn) {
      const aId = editAvatarBtn.dataset.editAvatarId;
      const match = CUTE_AVATARS.find(a => a.id === aId);
      if (match) {
        editSelectedAvatar = match;
        const modalEmoji = document.getElementById("profile-modal-emoji");
        const modalAvatar = document.getElementById("profile-modal-avatar");
        const charTag = document.getElementById("profile-char-tag");
        if (modalEmoji) {
          modalEmoji.textContent = match.emoji;
          modalEmoji.style.display = "block";
        }
        if (modalAvatar) modalAvatar.style.display = "none";
        if (charTag) charTag.textContent = `${match.emoji} ${match.name}`;
        renderEditCuteAvatarGrid();
      }
      return;
    }

    // Pemilihan Sayur / Buah Kesukaan di Modal Profil Edit
    const editProduceChipBtn = target.closest("#profile-fav-produce-chips .produce-chip-btn");
    if (editProduceChipBtn) {
      const pId = editProduceChipBtn.dataset.editProduceId;
      if (pId) {
        if (editSelectedProduces.has(pId)) {
          if (editSelectedProduces.size > 1) {
            editSelectedProduces.delete(pId);
          }
        } else {
          editSelectedProduces.add(pId);
        }
        renderEditProduceChips();
      }
      return;
    }

    // Tutup Modal Riwayat Pesanan
    if (target.id === "orders-modal-close" || target.closest("#orders-modal-close") || target === ordersModal) {
      closeOrdersModal();
      return;
    }

    // ============================================================
    //  EVENT LISTENERS: METODE PEMBAYARAN (QRIS, BANK, COD)
    // ============================================================

    // Opsi Pembayaran di Modal Checkout
    const payOpt = target.closest(".payment-option");
    if (payOpt) {
      const method = payOpt.dataset.payment || (payOpt.querySelector('input[type="radio"]') ? payOpt.querySelector('input[type="radio"]').value : "qris");
      selectPaymentMethod(method);
      return;
    }

    // Pilih Bank Transfer (BCA, Mandiri, BRI, BNI)
    const bankChip = target.closest(".bank-chip");
    if (bankChip && bankChip.dataset.bank) {
      selectBank(bankChip.dataset.bank);
      return;
    }

    // Salin Nomor Rekening Bank
    if (target.id === "btn-copy-account" || target.closest("#btn-copy-account")) {
      copyBankAccount();
      return;
    }
  });

  /* TUTUP DROPDOWN MENU KETIKA KLIK DI LUAR */
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#user-chip-btn") && !e.target.closest("#user-dropdown-menu")) {
      closeUserDropdown();
    }
  });

  /* SUBMIT FORM PEMBUATAN AKUN & ONBOARDING PROFIL */
  const profileSetupForm = document.getElementById("profile-setup-form");
  if (profileSetupForm) {
    profileSetupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentUser) return;

      const nameInput = document.getElementById("setup-name");
      const ageInput = document.getElementById("setup-age");
      const phoneInput = document.getElementById("setup-phone");
      const addrInput = document.getElementById("setup-address");

      const name = nameInput ? nameInput.value.trim() : (currentUser.name || "Pelanggan");
      const age = ageInput ? parseInt(ageInput.value, 10) : 24;
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const address = addrInput ? addrInput.value.trim() : "";

      if (!name) {
        showToast("Nama lengkap wajib diisi!");
        return;
      }
      if (isNaN(age) || age < 5 || age > 120) {
        showToast("Mohon masukkan umur yang valid (5 - 120 tahun)!");
        return;
      }

      currentUser.name = name;
      currentUser.age = age;
      currentUser.favoriteProduce = Array.from(setupSelectedProduces);

      if (setupSelectedAvatar.isGoogle) {
        currentUser.avatarEmoji = "";
        currentUser.avatarName = "Foto Google";
        currentUser.avatarBg = "#ffffff";
      } else {
        currentUser.avatarEmoji = setupSelectedAvatar.emoji;
        currentUser.avatarName = setupSelectedAvatar.name;
        currentUser.avatarBg = setupSelectedAvatar.bg;
        currentUser.avatar = getAvatarDataUri(setupSelectedAvatar.emoji, setupSelectedAvatar.bg);
      }

      if (phone) currentUser.phone = phone;
      if (address) currentUser.address = address;
      currentUser.profileCompleted = true;

      localStorage.setItem("pasar_pagi_user", JSON.stringify(currentUser));
      closeProfileSetupModal();
      updateAuthUI();
      showToast(`🎉 Profil berhasil dibuat! Selamat datang, <strong>${escapeHtml(currentUser.name)}</strong>. Toko Buah & Sayur kini terbuka!`);

      // Buka Toko Buah & Sayur secara otomatis
      setTimeout(() => {
        navigateTo("shop");
      }, 350);
    });
  }

  /* SUBMIT FORM PROFIL CUSTOMER (EDIT) */
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentUser) return;

      const nameInput = document.getElementById("profile-name");
      const ageInput = document.getElementById("profile-age");
      const wa = document.getElementById("profile-wa").value.trim();
      const addr = document.getElementById("profile-address").value.trim();

      if (nameInput && nameInput.value.trim()) {
        currentUser.name = nameInput.value.trim();
      }
      if (ageInput && !isNaN(parseInt(ageInput.value, 10))) {
        currentUser.age = parseInt(ageInput.value, 10);
      }
      if (editSelectedAvatar) {
        currentUser.avatarEmoji = editSelectedAvatar.emoji;
        currentUser.avatarName = editSelectedAvatar.name;
        currentUser.avatarBg = editSelectedAvatar.bg;
        currentUser.avatar = getAvatarDataUri(editSelectedAvatar.emoji, editSelectedAvatar.bg);
      }
      if (editSelectedProduces && editSelectedProduces.size > 0) {
        currentUser.favoriteProduce = Array.from(editSelectedProduces);
      }

      currentUser.phone = wa;
      currentUser.address = addr;
      localStorage.setItem("pasar_pagi_user", JSON.stringify(currentUser));
      closeProfileModal();
      updateAuthUI();
      showToast("Data profil dan alamat pengiriman berhasil diperbarui!");

      // Update field checkout jika sedang terbuka
      const checkoutPhone = document.getElementById("checkout-phone");
      const checkoutAddr = document.getElementById("checkout-address");
      if (checkoutPhone) checkoutPhone.value = wa;
      if (checkoutAddr) checkoutAddr.value = addr;
    });
  }

  /* SUBMIT FORM LOGIN GOOGLE KUSTOM */
  const customGoogleForm = document.getElementById("custom-google-form");
  if (customGoogleForm) {
    customGoogleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("custom-google-name");
      const emailInput = document.getElementById("custom-google-email");
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      if (!name || !email) return;

      loginUser({
        name,
        email,
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2e7d32&color=fff`
      });
      closeLoginModal();
      showToast(`Login Google berhasil sebagai <strong>${escapeHtml(name)}</strong>!`);
    });
  }


  /* EVENT INPUT: SEARCH & NOTE */
  const headerSearchInput = document.getElementById("header-search-input");
  const headerClearSearch = document.getElementById("header-clear-search");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    if (headerSearchInput && headerSearchInput.value !== e.target.value) {
      headerSearchInput.value = e.target.value;
    }
    clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
    if (headerClearSearch) headerClearSearch.style.display = searchQuery.length > 0 ? "flex" : "none";
    renderProducts();
  });

  if (headerSearchInput) {
    headerSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      if (searchInput && searchInput.value !== e.target.value) {
        searchInput.value = e.target.value;
      }
      if (clearSearchBtn) clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
      if (headerClearSearch) headerClearSearch.style.display = searchQuery.length > 0 ? "flex" : "none";
      if (currentPage !== "shop" && searchQuery.length > 0) {
        currentPage = "shop";
        pageHomeEl.classList.remove("active");
        pageShopEl.classList.add("active");
        navHomeBtn.classList.remove("active");
        navShopBtn.classList.add("active");
        if (bnavHome) bnavHome.classList.remove("active");
        if (bnavShop) bnavShop.classList.add("active");
      }
      renderProducts();
    });
  }

  document.getElementById("note").addEventListener("input", () => {
    const previewEl = document.querySelector(".note-preview");
    const noteVal = document.getElementById("note").value.trim();
    if (noteVal) {
      if (previewEl) {
        previewEl.querySelector("span").textContent = " " + noteVal;
      } else {
        renderCart();
      }
    } else if (previewEl) {
      previewEl.remove();
    }
  });

  /* ENTER KEY LISTENERS */
  document.getElementById("coupon").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyCoupon();
    }
  });

  /* ESCAPE KEY LISTENER (TUTUP SEMUA MODAL YANG TERBUKA) */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      if (reviewModal && reviewModal.classList.contains("open")) closeReview();
      if (successModal && successModal.classList.contains("open")) closeSuccessModal();
      if (loginModal && loginModal.classList.contains("open")) closeLoginModal();
      if (profileSetupModal && profileSetupModal.classList.contains("open")) closeProfileSetupModal();
      if (profileModal && profileModal.classList.contains("open")) closeProfileModal();
      if (ordersModal && ordersModal.classList.contains("open")) closeOrdersModal();
      closeUserDropdown();
    }
  });

  /* ROUTING DENGAN HASH CHANGE (Browser Back/Forward) */
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#toko" || hash === "#shop") {
      navigateTo("shop");
    } else {
      navigateTo("home");
    }
  });

  /* ============================================================
     BANNER CAROUSEL POSTER CONTROLLER (PILIHAN 2)
     ============================================================ */
  const bannerCarouselTrack = document.getElementById("banner-carousel-track");
  const bannerIndicators = document.querySelectorAll("#banner-indicators .carousel-dot");
  let carouselAutoPlayTimer = null;

  function updateCarouselActiveDot() {
    if (!bannerCarouselTrack || bannerIndicators.length === 0) return;
    const scrollLeft = bannerCarouselTrack.scrollLeft;
    const slides = bannerCarouselTrack.querySelectorAll(".banner-poster-slide");
    if (!slides.length) return;
    const slideWidth = slides[0].offsetWidth + 16;
    const activeIndex = Math.min(Math.max(0, Math.round(scrollLeft / slideWidth)), bannerIndicators.length - 1);
    bannerIndicators.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === activeIndex);
    });
  }

  function scrollBannerCarousel(direction) {
    if (!bannerCarouselTrack) return;
    const slides = bannerCarouselTrack.querySelectorAll(".banner-poster-slide");
    if (!slides.length) return;
    const slideWidth = slides[0].offsetWidth + 16;
    bannerCarouselTrack.scrollBy({ left: direction * slideWidth, behavior: "smooth" });
  }

  function scrollBannerCarouselToIndex(index) {
    if (!bannerCarouselTrack) return;
    const slides = bannerCarouselTrack.querySelectorAll(".banner-poster-slide");
    if (!slides[index]) return;
    const targetScroll = slides[index].offsetLeft - bannerCarouselTrack.offsetLeft;
    bannerCarouselTrack.scrollTo({ left: targetScroll, behavior: "smooth" });
  }

  function startCarouselAutoPlay() {
    stopCarouselAutoPlay();
    carouselAutoPlayTimer = setInterval(() => {
      if (!bannerCarouselTrack || currentPage !== "home") return;
      const slides = bannerCarouselTrack.querySelectorAll(".banner-poster-slide");
      if (!slides.length) return;
      const slideWidth = slides[0].offsetWidth + 16;
      const maxScroll = bannerCarouselTrack.scrollWidth - bannerCarouselTrack.clientWidth;
      if (bannerCarouselTrack.scrollLeft >= maxScroll - 20) {
        bannerCarouselTrack.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        bannerCarouselTrack.scrollBy({ left: slideWidth, behavior: "smooth" });
      }
    }, 5500);
  }

  function stopCarouselAutoPlay() {
    if (carouselAutoPlayTimer) {
      clearInterval(carouselAutoPlayTimer);
      carouselAutoPlayTimer = null;
    }
  }

  if (bannerCarouselTrack) {
    let scrollRaf = null;
    bannerCarouselTrack.addEventListener("scroll", () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(updateCarouselActiveDot);
    }, { passive: true });

    bannerCarouselTrack.addEventListener("mouseenter", stopCarouselAutoPlay);
    bannerCarouselTrack.addEventListener("mouseleave", startCarouselAutoPlay);
    bannerCarouselTrack.addEventListener("touchstart", stopCarouselAutoPlay, { passive: true });
    bannerCarouselTrack.addEventListener("touchend", () => {
      setTimeout(startCarouselAutoPlay, 3000);
    }, { passive: true });

    startCarouselAutoPlay();
  }

  /* INISIALISASI AWAL APLIKASI */
  // Inisialisasi Auth & Pembayaran
  updateAuthUI();
  initGoogleAuth();
  selectBank("bca");
  selectPaymentMethod("qris");

  // Direct Click Binding untuk Keandalan Checkout & Modal Pembayaran
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openReview();
    });
  }
  const reviewConfirmBtn = document.getElementById("review-confirm");
  if (reviewConfirmBtn) {
    reviewConfirmBtn.addEventListener("click", (e) => {
      e.preventDefault();
      placeOrder();
    });
  }
  const reviewBackBtn = document.getElementById("review-back");
  if (reviewBackBtn) {
    reviewBackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeReview();
    });
  }
  const modalCloseBtn = document.getElementById("modal-close-btn");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeReview();
    });
  }

  const initialHash = window.location.hash.toLowerCase();
  if (initialHash === "#toko" || initialHash === "#shop") {
    navigateTo("shop");
  } else {
    navigateTo("home");
  }

  // Render Konten
  renderHomeFeatured();
  renderProducts();
  renderCart();
});