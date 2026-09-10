// ============================================================
//  PASAR PAGI — Mesin Belanja & Validasi Keamanan Modern
//  Versi: 2.1 (Multi-Page View: Beranda vs Toko Buah)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Katalog resmi toko. Sumber kebenaran tunggal (Single Source of Truth).
  const products = [
    { 
      id: 1,  
      name: "Apel Fuji",       
      category: "apel-jeruk", 
      stockKg: 25, 
      produceId: "#4131", 
      desc: "Manis renyah dengan aroma segar alami pegunungan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589286/25-01-11-03-50-09-954_deco_m2ofbh.jpg",
      featured: true,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 18000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 32000, saving: "Hemat Rp 4.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 58000, saving: "Grosir Hemat Rp 14.000" }
      }
    },
    { 
      id: 2,  
      name: "Jeruk Navel",     
      category: "apel-jeruk", 
      stockKg: 20, 
      produceId: "#4012", 
      desc: "Kaya vitamin C, bulir manis melimpah tanpa biji.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591406/25-01-11-04-29-12-930_deco_r9gznn.jpg",
      featured: false,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 16000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 28000, saving: "Hemat Rp 4.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 52000, saving: "Grosir Hemat Rp 12.000" }
      }
    },
    { 
      id: 3,  
      name: "Pisang Cavendish",
      category: "tropis",     
      stockKg: 30, 
      produceId: "#4011", 
      desc: "Tinggi potasium, kulit kuning mulus pas untuk sarapan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591160/25-01-11-04-24-17-097_deco_htwecb.jpg",
      featured: false,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 10000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 18000, saving: "Hemat Rp 2.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 32000, saving: "Grosir Hemat Rp 8.000" }
      }
    },
    { 
      id: 4,  
      name: "Anggur Hitam",    
      category: "beri",       
      stockKg: 15, 
      produceId: "#4022", 
      desc: "Bulir padat renyah, manis alami dengan antioksidan tinggi.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589285/25-01-11-03-50-38-513_deco_spywdb.jpg",
      featured: true,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 28000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 50000, saving: "Hemat Rp 6.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 92000, saving: "Grosir Hemat Rp 20.000" }
      }
    },
    { 
      id: 5,  
      name: "Stroberi Ciwidey",
      category: "beri",       
      stockKg: 14, 
      produceId: "#4252", 
      desc: "Asam manis berair, dipetik segar saat fajar berkabut.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-44-32-511_deco_doxshi.jpg",
      featured: true,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 35000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 65000, saving: "Hemat Rp 5.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 120000, saving: "Grosir Hemat Rp 20.000" }
      }
    },
    { 
      id: 6,  
      name: "Blueberry Segar", 
      category: "beri",       
      stockKg: 10, 
      produceId: "#4264", 
      desc: "Superfood kaya nutrisi pelindung daya tahan tubuh.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614070/25-01-11-10-46-19-754_deco_g51gta.jpg",
      featured: false,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 45000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 85000, saving: "Hemat Rp 5.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 160000, saving: "Grosir Hemat Rp 20.000" }
      }
    },
    { 
      id: 7,  
      name: "Nanas Madu",      
      category: "tropis",     
      stockKg: 20, 
      produceId: "#4430", 
      desc: "Manis harum legit, renyah tanpa sensasi gatal di lidah.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614070/25-01-11-10-46-43-469_deco_lhzog2.jpg",
      featured: false,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 14000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 25000, saving: "Hemat Rp 3.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 45000, saving: "Grosir Hemat Rp 11.000" }
      }
    },
    { 
      id: 8,  
      name: "Mangga Arumanis", 
      category: "tropis",     
      stockKg: 25, 
      produceId: "#4951", 
      desc: "Daging buah tebal oranye, lembut dan manis istimewa.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-45-34-043_deco_dmdlw1.jpg",
      featured: true,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 18000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 32000, saving: "Hemat Rp 4.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 58000, saving: "Grosir Hemat Rp 14.000" }
      }
    },
    { 
      id: 9,  
      name: "Kiwi Gold",       
      category: "tropis",     
      stockKg: 16, 
      produceId: "#4301", 
      desc: "Kaya vitamin C dan serat dengan rasa manis menyegarkan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614625/25-01-11-10-55-05-579_deco_zbrqpd.jpg",
      featured: false,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 22000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 40000, saving: "Hemat Rp 4.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 74000, saving: "Grosir Hemat Rp 14.000" }
      }
    },
    { 
      id: 10, 
      name: "Semangka (Potong)",
      category: "tropis",    
      stockKg: 20, 
      produceId: "#4032", 
      desc: "Manis dingin kaya elektrolit untuk menghidrasi tubuh.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614185/25-01-11-10-48-13-815_deco_ogtsmo.jpg",
      featured: false,
      variants: {
        "500g": { label: "500 gr", weightKg: 0.5, price: 12000, saving: null },
        "1kg":  { label: "1 kg", weightKg: 1.0, price: 20000, saving: "Hemat Rp 4.000" },
        "2kg":  { label: "2 kg (Grosir)", weightKg: 2.0, price: 36000, saving: "Grosir Hemat Rp 8.000" }
      }
    }
  ];

  let cart = {};
  let currentCategory = "all";
  let searchQuery = "";
  let currentPage = "home"; // "home" atau "shop"

  // Takaran berat aktif per produk di UI (default "1kg")
  const selectedWeight = {};
  products.forEach(p => { selectedWeight[p.id] = "1kg"; });

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

  // Biaya penanganan transparan (Rp 3.000)
  const HANDLING_FEE = 3000;

  // Kupon divalidasi via HASH SHA-256 (Hardening Client)
  // Hash dari "TEMANFARMER"
  const KUPON_HASH = "a12497e637e42764b41e7c6de1b07a8906d8e8841c7522a471a48a1ee74d61cd";
  const DISKON_KUPON = 0.9;
  let diskon = 0; // 0 = tanpa diskon, 0.9 = potong 90%
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
  const cartDetailsEl = document.getElementById("cart-details");
  const cartSummaryEl = document.getElementById("cart-summary-breakdown");
  const cartCountEl = document.getElementById("cart-count");
  const headerCartTotalEl = document.getElementById("header-cart-total");
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
      window.location.hash = "#toko";

      if (scrollTarget === "cart") {
        setTimeout(scrollToCart, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      pageShopEl.classList.remove("active");
      pageHomeEl.classList.add("active");
      navShopBtn.classList.remove("active");
      navHomeBtn.classList.add("active");
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
        <span>Total Pembayaran</span>
        <span class="grand-total-val">${formatMoney(sums.total)}</span>
      </div>
    `;
  }

  /* RENDER FEATURED FRUITS DI HALAMAN BERANDA */
  function renderHomeFeatured() {
    homeFeaturedGrid.innerHTML = "";
    const featuredItems = products.filter(p => p.featured);

    featuredItems.forEach(product => {
      const curWeight = selectedWeight[product.id] || "1kg";
      const variant = product.variants[curWeight];
      const cartKey = `${product.id}_${curWeight}`;
      const qtyInCart = cart[cartKey] ? cart[cartKey].count : 0;
      const remainingKg = getRemainingStockKg(product);
      const isOut = remainingKg < variant.weightKg;

      const card = document.createElement("article");
      card.className = "featured-fruit-card";
      card.innerHTML = `
        <div class="featured-img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <span class="featured-badge">${getCategoryName(product.category)}</span>
        </div>
        <div class="featured-body">
          <div class="featured-weight-section">
            <div class="weight-pill-group">
              <button type="button" class="weight-pill ${curWeight === '500g' ? 'active' : ''}" data-product-id="${product.id}" data-weight="500g">500 gr</button>
              <button type="button" class="weight-pill ${curWeight === '1kg' ? 'active' : ''}" data-product-id="${product.id}" data-weight="1kg">1 kg</button>
              <button type="button" class="weight-pill ${curWeight === '2kg' ? 'active' : ''}" data-product-id="${product.id}" data-weight="2kg">
                2 kg <span class="grosir-tag">Grosir</span>
              </button>
            </div>
          </div>
          <div class="featured-meta">
            <h4 class="featured-title">${product.name}</h4>
            <div class="featured-price-wrap">
              <span class="featured-price">${formatMoney(variant.price)}</span>
              <span class="featured-unit">/ ${variant.label}</span>
            </div>
          </div>
          ${variant.saving ? `<div class="wholesale-saving-badge"><i class="fas fa-tag"></i> ${variant.saving}</div>` : ""}
          <p class="featured-desc">${product.desc}</p>
          <div class="featured-footer">
            <span class="featured-stock ${isOut ? 'text-danger' : ''}">${isOut ? 'Stok Habis' : `Sisa ${remainingKg} kg`}</span>
            <button class="btn-buy-featured" data-product-id="${product.id}" ${isOut ? 'disabled' : ''}>
              <i class="fas fa-cart-plus"></i>
              <span>${qtyInCart > 0 ? `Beli Lagi (${qtyInCart})` : `Pesan (${variant.label})`}</span>
            </button>
          </div>
        </div>
      `;
      homeFeaturedGrid.appendChild(card);
    });
  }

  /* RENDER PRODUK DI HALAMAN TOKO */
  function renderProducts() {
    productSection.innerHTML = "";

    const filtered = products.filter((product) => {
      const matchCategory = (currentCategory === "all") || (product.category === currentCategory);
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.produceId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    productCountBadge.textContent = `${filtered.length} buah tersedia`;

    if (filtered.length === 0) {
      noProductsMsg.style.display = "block";
      productSection.style.display = "none";
      return;
    } else {
      noProductsMsg.style.display = "none";
      productSection.style.display = "grid";
    }

    filtered.forEach((product) => {
      const curWeight = selectedWeight[product.id] || "1kg";
      const variant = product.variants[curWeight];
      const cartKey = `${product.id}_${curWeight}`;
      const qtyInCart = cart[cartKey] ? cart[cartKey].count : 0;
      const remainingKg = getRemainingStockKg(product);
      const isOut = remainingKg < variant.weightKg;
      const stokMenipis = remainingKg > 0 && remainingKg <= 3;

      const productCard = document.createElement("article");
      productCard.classList.add("product");
      if (isOut && remainingKg <= 0) productCard.classList.add("sold-out");

      productCard.innerHTML = `
        <div class="product-header-badge">
          <span class="produce-id">${product.produceId}</span>
          <span class="product-category-tag">${getCategoryName(product.category)}</span>
        </div>
        
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
          ${remainingKg <= 0 ? `<div class="sold-out-overlay"><span>Stok Habis</span></div>` : ""}
          ${stokMenipis ? `<div class="low-stock-ribbon"><i class="fas fa-fire"></i> Tinggal ${remainingKg} kg!</div>` : ""}
        </div>

        <div class="product-weight-section">
          <div class="weight-selector-wrap">
            <span class="weight-label">Pilih Takaran:</span>
            <div class="weight-pill-group">
              <button type="button" class="weight-pill ${curWeight === '500g' ? 'active' : ''}" data-product-id="${product.id}" data-weight="500g">500 gr</button>
              <button type="button" class="weight-pill ${curWeight === '1kg' ? 'active' : ''}" data-product-id="${product.id}" data-weight="1kg">1 kg</button>
              <button type="button" class="weight-pill ${curWeight === '2kg' ? 'active' : ''}" data-product-id="${product.id}" data-weight="2kg">
                2 kg <span class="grosir-tag">Grosir</span>
              </button>
            </div>
          </div>
        </div>

        <div class="item-meta">
          <div class="meta-left">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            ${variant.saving ? `<div class="wholesale-saving-badge"><i class="fas fa-tag"></i> ${variant.saving}</div>` : ""}
          </div>
          <div class="meta-right">
            <p class="price">${formatMoney(variant.price)}</p>
            <span class="price-unit">/ ${variant.label}</span>
          </div>
        </div>

        <div class="product-footer-row">
          <div class="stock-status ${remainingKg <= 0 ? 'stock-empty' : stokMenipis ? 'stock-warning' : 'stock-ok'}">
            <i class="fas ${remainingKg <= 0 ? 'fa-ban' : stokMenipis ? 'fa-clock' : 'fa-circle-check'}"></i>
            <span>${remainingKg <= 0 ? "Stok habis hari ini" : `Sisa stok: ${remainingKg} kg`}</span>
          </div>

          <div class="quantity-controls">
            ${qtyInCart === 0 ? `
              <button class="btn-add-variant btn-action-add" data-product-id="${product.id}" ${isOut ? "disabled" : ""}>
                <i class="fas fa-cart-plus"></i>
                <span>Beli</span>
              </button>
            ` : `
              <button class="quantity-button minus-button" data-cart-key="${cartKey}" title="Kurangi">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity-display active" id="quantity-${cartKey}">
                ${qtyInCart}
              </span>
              <button class="quantity-button plus-button" data-product-id="${product.id}" ${isOut ? "disabled" : ""} title="Tambah">
                <i class="fas fa-plus"></i>
              </button>
            `}
          </div>
        </div>
      `;
      productSection.appendChild(productCard);
    });
  }

  function getCategoryName(cat) {
    switch (cat) {
      case "beri": return "Beri & Anggur";
      case "apel-jeruk": return "Apel & Jeruk";
      case "tropis": return "Tropis";
      default: return "Buah Segar";
    }
  }

  /* HITUNG JUMLAH BARANG DI KERANJANG */
  function updateCartCount() {
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
    const totalKg = Math.round(Object.values(cart).reduce((sum, item) => sum + (item.weightKg * item.count), 0) * 10) / 10;
    cartCountEl.textContent = totalCount;
    sidebarCartBadgeEl.textContent = `${totalCount} item (${totalKg} kg)`;
    mobileCartItems.textContent = `${totalCount} item (${totalKg} kg)`;

    let subtotal = 0;
    Object.values(cart).forEach((item) => {
      subtotal += item.count * item.price;
    });
    const breakdown = buildBreakdown(subtotal);
    headerCartTotalEl.textContent = formatMoney(breakdown.total);
    mobileCartTotal.textContent = formatMoney(breakdown.total);

    // Floating cart bar di mobile
    if (totalCount > 0 && currentPage === "shop") {
      mobileCartBar.classList.add("visible");
      checkoutBtn.removeAttribute("disabled");
      checkoutBtn.classList.remove("disabled");
    } else {
      mobileCartBar.classList.remove("visible");
      checkoutBtn.setAttribute("disabled", "true");
      checkoutBtn.classList.add("disabled");
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
          <p class="empty-cart-sub">Pilih buah segar favoritmu dari kebun untuk mulai berbelanja.</p>
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
      if (official && official.variants[item.variantKey]) {
        const v = official.variants[item.variantKey];
        item.price = v.price;
        item.name = official.name;
        item.weightLabel = v.label;
        item.weightKg = v.weightKg;
      }

      const itemTotal = item.count * item.price;
      totalPrice += itemTotal;

      const remainingKg = getRemainingStockKg(official);
      const canAddMore = remainingKg >= item.weightKg;

      const listItem = document.createElement("div");
      listItem.classList.add("cart-item");
      listItem.innerHTML = `
        <div class="cart-item-top">
          <div class="cart-item-info">
            <div class="cart-item-name">
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
  function addToCart(productId, weightKey = null) {
    const product = products.find((item) => item.id == productId);
    if (!product) return;

    const chosenWeight = weightKey || selectedWeight[productId] || "1kg";
    const variant = product.variants[chosenWeight];
    if (!variant) return;

    const remainingKg = getRemainingStockKg(product);
    if (remainingKg < variant.weightKg) {
      showToast(`⚠️ Stok ${product.name} tidak mencukupi untuk takaran ${variant.label} (tersisa ${remainingKg} kg).`);
      return;
    }

    const cartKey = `${product.id}_${chosenWeight}`;
    if (!cart[cartKey]) {
      cart[cartKey] = {
        key: cartKey,
        productId: product.id,
        variantKey: chosenWeight,
        name: product.name,
        weightLabel: variant.label,
        weightKg: variant.weightKg,
        price: variant.price,
        count: 0
      };
    }

    cart[cartKey].count++;
    cart[cartKey].price = variant.price; // Selalu sinkronkan harga resmi
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
      msg.innerHTML = `<i class="fas fa-check-circle"></i> Kupon <strong>${code}</strong> aktif! Diskon 90% berhasil dipasang.`;
      msg.className = "coupon-msg ok";
      showToast("🎉 Kupon Teman Petani aktif! Potongan 90% diterapkan.");
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

  /* MODAL REVIEW CHECKOUT */
  function openReview() {
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
          <span class="review-item-name">${item.name} <strong class="review-weight-badge">(${item.weightLabel})</strong></span>
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

    renderBreakdownRows(document.getElementById("review-breakdown"), buildBreakdown(subtotal));
    reviewModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeReview() {
    reviewModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* PESANAN MASUK (PENGURANGAN STOK TIMBANGAN KG) */
  function placeOrder() {
    const breakdown = buildBreakdown(
      Object.values(cart).reduce((sum, item) => sum + item.count * item.price, 0)
    );

    const orderedItems = Object.values(cart).map((i) => ({ ...i }));
    const orderNote = document.getElementById("note").value.trim();
    const orderId = "PP-" + Math.floor(100000 + Math.random() * 900000);
    const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethodName = paymentMethodEl ? paymentMethodEl.parentElement.querySelector("span").textContent : "QRIS Instan";

    // PENGURANGAN STOK NYATA BERBASIS KG
    orderedItems.forEach((ordered) => {
      const official = products.find((p) => p.id === ordered.productId);
      if (official) {
        official.stockKg = Math.max(0, Math.round((official.stockKg - (ordered.weightKg * ordered.count)) * 10) / 10);
      }
    });

    closeReview();

    // Reset keranjang & input
    cart = {};
    diskon = 0;
    appliedCouponCode = "";
    document.getElementById("note").value = "";
    document.getElementById("coupon").value = "";
    document.getElementById("coupon-msg").textContent = "";

    renderCart();

    // Buka Modal Sukses & Resi
    openSuccessModal(orderId, orderedItems, breakdown, paymentMethodName, orderNote);
  }

  function openSuccessModal(orderId, items, breakdown, paymentMethod, note) {
    const receiptEl = document.getElementById("order-receipt-content");
    const itemsListHtml = items.map(i => `
      <div class="receipt-item-row">
        <span>${i.name} (${i.weightLabel}) &times; ${i.count}</span>
        <strong>${formatMoney(i.count * i.price)}</strong>
      </div>
    `).join("");

    receiptEl.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-id-tag">No. Pesanan: <strong>#${orderId}</strong></div>
        <div class="receipt-date">${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      <div class="receipt-divider"></div>
      <div class="receipt-items-box">${itemsListHtml}</div>
      <div class="receipt-divider"></div>
      <div class="receipt-totals-box">
        <div class="receipt-row"><span>Subtotal:</span><span>${formatMoney(breakdown.subtotal)}</span></div>
        <div class="receipt-row"><span>Biaya Penanganan:</span><span>${formatMoney(breakdown.fee)}</span></div>
        ${breakdown.potongan > 0 ? `<div class="receipt-row receipt-discount"><span>Diskon Kupon (90%):</span><span>-${formatMoney(breakdown.potongan)}</span></div>` : ""}
        <div class="receipt-row receipt-grand"><span>Total Bayar:</span><strong>${formatMoney(breakdown.total)}</strong></div>
      </div>
      <div class="receipt-divider"></div>
      <div class="receipt-meta-info">
        <p><i class="fas fa-wallet"></i> Metode: <strong>${paymentMethod}</strong></p>
        ${note ? `<p><i class="fas fa-comment-dots"></i> Catatan: <em>"${escapeHtml(note)}"</em></p>` : ""}
        <p><i class="fas fa-truck"></i> Estimasi Kirim: <strong>Pagi ini pukul 08:30 - 10:00 WIB</strong></p>
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

  function scrollToCart() {
    const sidebar = document.getElementById("cart-sidebar");
    if (sidebar) {
      sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ============================================================
     EVENT LISTENERS GLOBAL
     ============================================================ */

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, .cart-summary, .perk-coupon, .filter-pill, .payment-option, .modal-overlay, #clear-search, #reset-filter-btn, #brand-logo, .weight-pill");
    if (!target) return;

    // Navigasi Tabs Navbar
    if (target.id === "nav-home" || target.id === "brand-logo") {
      navigateTo("home");
      return;
    }
    if (target.id === "nav-shop" || target.id === "btn-goto-shop" || target.id === "btn-view-all-fruits") {
      navigateTo("shop");
      return;
    }
    if (target.id === "btn-shop-back-home") {
      navigateTo("home");
      return;
    }

    // Klik tombol pilihan takaran timbangan (500 gr, 1 kg, 2 kg)
    if (target.classList.contains("weight-pill")) {
      const pId = Number(target.dataset.productId);
      const w = target.dataset.weight;
      if (pId && w) {
        selectedWeight[pId] = w;
        renderProducts();
        renderHomeFeatured();
      }
      return;
    }

    // Klik tombol "Pesan" di featured fruits Beranda
    if (target.classList.contains("btn-buy-featured")) {
      const pId = Number(target.dataset.productId || target.dataset.id);
      addToCart(pId);
      navigateTo("shop", "cart");
      showToast("🍎 Buah ditambahkan ke keranjang!");
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

    // Header Cart Pill -> buka toko & scroll ke keranjang
    if (target.id === "header-cart-summary" || target.id === "mobile-cart-btn") {
      navigateTo("shop", "cart");
      return;
    }

    // Tambah di kartu produk toko (tombol Beli atau plus stepper)
    if (target.classList.contains("plus-button") || target.classList.contains("btn-action-add")) {
      const pId = Number(target.dataset.productId);
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
        addToCart(cart[cartKey].productId, cart[cartKey].variantKey);
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
    }
    // Checkout tombol
    if (target.id === "checkout-button") {
      openReview();
    }
    // Konfirmasi pesanan
    if (target.id === "review-confirm") {
      placeOrder();
    }
    // Kembali atau tutup review modal
    if (target.id === "review-back" || target.id === "modal-close-btn" || target === reviewModal) {
      closeReview();
    }
    // Tutup success modal
    if (target.id === "success-close-btn" || target === successModal) {
      closeSuccessModal();
    }
    // Filter Kategori
    if (target.classList.contains("filter-pill")) {
      document.querySelectorAll(".filter-pill").forEach(btn => btn.classList.remove("active"));
      target.classList.add("active");
      currentCategory = target.dataset.category;
      renderProducts();
    }
    // Clear search
    if (target.id === "clear-search") {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderProducts();
    }
    // Reset filter
    if (target.id === "reset-filter-btn") {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      currentCategory = "all";
      document.querySelectorAll(".filter-pill").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === "all");
      });
      renderProducts();
    }
    // Opsi Pembayaran di Modal
    if (target.classList.contains("payment-option")) {
      document.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("active"));
      target.classList.add("active");
      const radio = target.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    }
  });

  /* EVENT INPUT: SEARCH & NOTE */
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
    renderProducts();
  });

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

  /* ESCAPE KEY LISTENER */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (reviewModal.classList.contains("open")) closeReview();
      if (successModal.classList.contains("open")) closeSuccessModal();
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

  /* INISIALISASI AWAL */
  const initialHash = window.location.hash.toLowerCase();
  if (initialHash === "#toko" || initialHash === "#shop") {
    navigateTo("shop");
  } else {
    navigateTo("home");
  }

  renderHomeFeatured();
  renderProducts();
  renderCart();
});