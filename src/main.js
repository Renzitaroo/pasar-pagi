// ============================================================
//  PASAR PAGI — Mesin Belanja & Pembayaran Modern
// ============================================================

import { DEFAULT_PRODUCTS, formatMoney, getSupabaseConfig } from "./catalog.js";

document.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));

  // Sinkronisasi awal dari penyimpanan lokal jika Admin sudah mengubah stok/produk
  try {
    const savedCatalog = JSON.parse(localStorage.getItem("pasar_pagi_catalog_v1") || "null");
    if (Array.isArray(savedCatalog) && savedCatalog.length > 0) {
      products.splice(0, products.length, ...savedCatalog);
    } else {
      localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
    }
  } catch {}

  let cart = {};
  let currentDepartment = "all"; // "all" | "buah" | "sayur"
  let searchQuery = "";
  let currentPage = "home"; // "home" | "shop"

  // State berat per produk (default 1.0 kg)
  const selectedWeightKg = {};
  products.forEach(p => { selectedWeightKg[p.id] = 1.0; });

  function formatWeightLabel(kg) {
    return kg < 1 ? `${Math.round(kg * 1000)} gr` : `${Number(kg.toFixed(2))} kg`;
  }

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

    return { weightKg: cleanWeight, totalPrice, ratePerKg, discountRate, savingLabel };
  }

  function getUsedStockKg(productId) {
    return Object.values(cart)
      .filter(item => item.productId === productId)
      .reduce((sum, item) => sum + (item.weightKg * item.count), 0);
  }

  function getRemainingStockKg(product) {
    if (!product) return 0;
    return Math.max(0, Math.round((product.stockKg - getUsedStockKg(product.id)) * 10) / 10);
  }

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

  function updateCardVolumeUI(productId, newWeightKg) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const calc = calculatePriceForWeight(product, newWeightKg);
    selectedWeightKg[productId] = calc.weightKg;
    const weightLabel = formatWeightLabel(calc.weightKg);

    document.querySelectorAll(`.v-price-${productId}`).forEach(el => el.textContent = formatMoney(calc.totalPrice));
    document.querySelectorAll(`.v-unit-${productId}`).forEach(el => el.textContent = `/ ${weightLabel}`);

    document.querySelectorAll(`.v-saving-${productId}`).forEach(el => {
      if (calc.savingLabel) {
        el.className = `wholesale-saving-badge v-saving-${productId}`;
        el.innerHTML = `<i class="fas fa-tag"></i> ${calc.savingLabel}`;
      } else {
        el.className = `wholesale-saving-badge v-saving-${productId} empty`;
        el.innerHTML = "";
      }
    });

    document.querySelectorAll(`.preset-chip[data-product-id="${productId}"]`).forEach(chip => {
      chip.classList.toggle("active", Math.abs(Number(chip.dataset.weight) - calc.weightKg) < 0.05);
    });

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

  const HANDLING_FEE = 3000;

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
  const mobileHeaderCartBadge = document.getElementById("mobile-header-cart-badge");
  const bnavHome = document.getElementById("bnav-home");
  const bnavShop = document.getElementById("bnav-shop");
  const bnavCartBadge = document.getElementById("bnav-cart-badge");
  const bnavAvatarImg = document.getElementById("bnav-avatar-img");
  const bnavUserIcon = document.getElementById("bnav-user-icon");
  const bnavUserLabel = document.getElementById("bnav-user-label");

  // Autentikasi Customer & Riwayat Pesanan
  let currentUser = JSON.parse(localStorage.getItem("pasar_pagi_user") || "null");
  let customerOrders = JSON.parse(localStorage.getItem("pasar_pagi_orders") || "[]");

  const loginModal = document.getElementById("login-modal");
  const profileModal = document.getElementById("profile-modal");
  const ordersModal = document.getElementById("orders-modal");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const userChipBtn = document.getElementById("user-chip-btn");

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

  let editSelectedAvatar = null;
  let editSelectedProduces = new Set();

  function getAvatarDataUri(emoji, bg = "#eaf6ea") {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="${bg}" stroke="#677d6a" stroke-width="2.5"/><text x="50" y="68" font-size="52" text-anchor="middle">${emoji}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // Metode Pembayaran (QRIS & COD)
  let activePaymentMethod = "qris";
  let qrisTimerInterval = null;
  let qrisSecondsLeft = 15 * 60;

  // Mandiri Private Gateway (MPG)
  const MPG_CONFIG = {
    backendUrl: "http://localhost:3001/api/checkout",
    directGatewayUrl: (import.meta.env && import.meta.env.VITE_MPG_GATEWAY_URL) || "https://paymentgateway.daeroom.my.id",
    apiKey: (import.meta.env && import.meta.env.VITE_MPG_API_KEY) || "mpg_live_f89a3c10b7d24e6a8e5c3b1a9f0d7e2c"
  };

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
            checkoutUrl,
            qrString: data.qr_string || data.qris_string || json.qr_string,
            uniqueCode: data.unique_code ?? json.unique_code ?? 0,
            totalAmount: data.amount || data.total_amount || json.total_amount || amount
          };
        }
      }
    } catch {}

    const directUrl = `${MPG_CONFIG.directGatewayUrl}/api/v1/invoice`;
    const res = await fetch(directUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MPG_CONFIG.apiKey}`
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
    if (!checkoutUrl) throw new Error("Gateway tidak mengembalikan checkout_url.");

    return {
      success: true,
      invoiceId: data.id || data.invoice_id || json.invoice_id,
      checkoutUrl,
      qrString: data.qr_string || data.qris_string || json.qr_string,
      uniqueCode: data.unique_code ?? json.unique_code ?? 0,
      totalAmount: data.amount || data.total_amount || json.total_amount || amount,
      status: data.status || json.status || "PENDING"
    };
  }

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

  function buildBreakdown(subtotal) {
    const fee = subtotal > 0 ? HANDLING_FEE : 0;
    const total = Math.max(0, subtotal + fee);
    return { subtotal, fee, total };
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
      <div class="row grand">
        <span class="grand-total-label">Total Pembayaran</span>
        <span class="grand-total-val">${formatMoney(sums.total)}</span>
      </div>
    `;
  }

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

  function renderHomeFeatured() {
    if (homeFeaturedGrid) {
      homeFeaturedGrid.innerHTML = "";
      products.filter(p => p.featured && p.type === "buah").forEach(product => {
        homeFeaturedGrid.appendChild(createFeaturedCard(product));
      });
    }

    if (homeFeaturedSayurGrid) {
      homeFeaturedSayurGrid.innerHTML = "";
      products.filter(p => p.featured && p.type === "sayur").forEach(product => {
        homeFeaturedSayurGrid.appendChild(createFeaturedCard(product));
      });
    }
  }

  function renderProducts() {
    productSection.innerHTML = "";

    const filtered = products.filter((product) => {
      const matchDepartment = (currentDepartment === "all") || (product.type === currentDepartment);
      const q = searchQuery.toLowerCase();
      const matchSearch = product.name.toLowerCase().includes(q) ||
                          (product.desc || "").toLowerCase().includes(q) ||
                          (product.produceId || "").toLowerCase().includes(q);
      return matchDepartment && matchSearch;
    });

    const countBuah = filtered.filter(p => p.type === "buah").length;
    const countSayur = filtered.filter(p => p.type === "sayur").length;

    if (catalogHeadingTitle) {
      catalogHeadingTitle.textContent = currentDepartment === "buah"
        ? "Koleksi Buah Segar"
        : currentDepartment === "sayur"
          ? "Koleksi Sayuran Kebun"
          : "Koleksi Buah & Sayuran";
    }

    productCountBadge.textContent = currentDepartment === "buah"
      ? `${countBuah} buah tersedia`
      : currentDepartment === "sayur"
        ? `${countSayur} sayuran tersedia`
        : `${countBuah} buah & ${countSayur} sayuran (${filtered.length} total)`;

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
    }

    noProductsMsg.style.display = "none";
    productSection.style.display = "grid";

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

  function updateCartCount() {
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
    const totalKg = Math.round(Object.values(cart).reduce((sum, item) => sum + (item.weightKg * item.count), 0) * 10) / 10;

    if (sidebarCartBadgeEl) sidebarCartBadgeEl.textContent = `${totalCount} item (${totalKg} kg)`;
    if (mobileCartItems) mobileCartItems.textContent = `${totalCount} item (${totalKg} kg)`;

    const subtotal = Object.values(cart).reduce((sum, item) => sum + item.count * item.price, 0);
    const breakdown = buildBreakdown(subtotal);
    if (mobileCartTotal) mobileCartTotal.textContent = formatMoney(breakdown.total);

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

    if (bnavCartBadge) {
      bnavCartBadge.textContent = totalCount;
      bnavCartBadge.style.display = totalCount > 0 ? "flex" : "none";
    }
    if (mobileHeaderCartBadge) {
      mobileHeaderCartBadge.textContent = totalCount;
      mobileHeaderCartBadge.style.display = totalCount > 0 ? "flex" : "none";
    }
    if (mobileCartBar) {
      mobileCartBar.classList.toggle("visible", totalCount > 0);
    }
  }

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

    const noteVal = document.getElementById("note").value.trim();
    if (noteVal) {
      const preview = document.createElement("div");
      preview.className = "note-preview";
      const icon = document.createElement("i");
      icon.className = "fas fa-quote-left";
      preview.appendChild(icon);
      const textSpan = document.createElement("span");
      textSpan.textContent = " " + noteVal;
      preview.appendChild(textSpan);
      cartDetailsEl.appendChild(preview);
    }

    renderBreakdownRows(cartSummaryEl, buildBreakdown(totalPrice));
    updateCartCount();
    renderProducts();
    renderHomeFeatured();
  }

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
    cart[cartKey].price = calc.totalPrice;
    renderCart();
  }

  function removeFromCart(cartKey) {
    if (!cart[cartKey]) return;
    cart[cartKey].count--;
    if (cart[cartKey].count <= 0) delete cart[cartKey];
    renderCart();
  }

  function deleteItem(cartKey) {
    if (!cart[cartKey]) return;
    const name = `${cart[cartKey].name} (${cart[cartKey].weightLabel})`;
    delete cart[cartKey];
    renderCart();
    showToast(`🗑️ ${name} dihapus dari keranjang.`);
  }

  let toastTimer = null;
  function showToast(message) {
    const t = document.getElementById("toast");
    t.innerHTML = message;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  // Autentikasi Google & Akun Customer
  function initGoogleAuth() {
    const clientId = (import.meta.env && import.meta.env.VITE_GOOGLE_CLIENT_ID) || "214526431628-vl4u0af2voomkef0rb3hms20l4go8qpm.apps.googleusercontent.com";
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
          setTimeout(() => {
            if (realGisTarget.children.length > 0 && actionBtn) actionBtn.style.display = "none";
          }, 300);
        }

        window.google.accounts.id.prompt();
      } catch {
        if (actionBtn) actionBtn.style.display = "flex";
      }
    } else if (actionBtn) {
      actionBtn.style.display = "flex";
    }
  }

  function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) return;
    const payload = parseJwt(response.credential);
    if (payload) {
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
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      return JSON.parse(jsonPayload);
    } catch {
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

    if (navShopBtn) navShopBtn.style.display = "inline-flex";

    if (currentUser) {
      if (guestEl) guestEl.style.display = "none";
      if (userEl) userEl.style.display = "block";
      const nameEl = document.getElementById("user-chip-name");
      if (nameEl) nameEl.textContent = (currentUser.name || "Pelanggan").split(" ")[0];

      const avatarEl = document.getElementById("user-avatar-img");
      if (avatarEl) {
        avatarEl.src = currentUser.avatarEmoji
          ? getAvatarDataUri(currentUser.avatarEmoji, currentUser.avatarBg || "#eaf6ea")
          : (currentUser.avatar || getAvatarDataUri("🍎", "#fde8e8"));
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

    if (menuBadge) menuBadge.textContent = userOrders.length;

    if (bnavUserLabel) {
      if (currentUser) {
        bnavUserLabel.textContent = (currentUser.name || "Akun").split(" ")[0];
        if (bnavAvatarImg) {
          bnavAvatarImg.src = currentUser.avatarEmoji
            ? getAvatarDataUri(currentUser.avatarEmoji, currentUser.avatarBg || "#eaf6ea")
            : (currentUser.avatar || getAvatarDataUri("🍎", "#fde8e8"));
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
    if (userDropdownMenu.classList.contains("show")) {
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
      let statusBadge = "";
      if (order.status === "paid" || order.status === "Selesai") {
        statusBadge = `<span class="order-hist-status status-paid"><i class="fas fa-check-circle"></i> ${escapeHtml(order.status === "paid" ? "Lunas (QRIS)" : order.status)}</span>`;
      } else if (order.status === "cod" || order.status === "Diproses" || order.status === "Dikirim") {
        statusBadge = `<span class="order-hist-status status-cod"><i class="fas fa-truck-fast"></i> ${escapeHtml(order.status === "cod" ? "COD (Disiapkan)" : order.status)}</span>`;
      } else {
        statusBadge = `<span class="order-hist-status status-pending"><i class="fas fa-clock"></i> ${escapeHtml(order.status === "pending" ? "Menunggu Pembayaran" : (order.status || "Menunggu"))}</span>`;
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
          <div class="order-hist-items">${itemsHtml}</div>
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

  // Sistem Pembayaran
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

    const confirmBtn = document.getElementById("review-confirm");
    if (confirmBtn) {
      if (methodKey === "qris") {
        confirmBtn.innerHTML = `<i class="fas fa-qrcode"></i> Terbitkan & Bayar QRIS`;
      } else {
        confirmBtn.innerHTML = `<i class="fas fa-truck-fast"></i> Pesan Sekarang (COD)`;
      }
    }
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
    const mins = Math.floor(qrisSecondsLeft / 60).toString().padStart(2, "0");
    const secs = (qrisSecondsLeft % 60).toString().padStart(2, "0");
    el.textContent = `${mins}:${secs}`;
  }

  function openReview() {
    closeCartDrawer();
    const toastEl = document.getElementById("toast");
    if (toastEl) toastEl.classList.remove("show");

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
      val.textContent = noteVal;
      n.appendChild(lbl);
      n.appendChild(val);
      noteWrap.appendChild(n);
    }

    const breakdown = buildBreakdown(subtotal);
    renderBreakdownRows(document.getElementById("review-breakdown"), breakdown);

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

    const qrisAmountEl = document.getElementById("qris-total-amount");
    if (qrisAmountEl) qrisAmountEl.textContent = formatMoney(breakdown.total);

    selectPaymentMethod(activePaymentMethod || "qris");

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
      let orderStatus = "Menunggu Pembayaran";
      let mpgData = null;

      const confirmBtn = document.getElementById("review-confirm");
      const originalBtnContent = confirmBtn ? confirmBtn.innerHTML : "";

      if (activePaymentMethod === "cod") {
        paymentMethodName = "Bayar di Tempat (COD)";
        orderStatus = "Diproses";
      } else {
        paymentMethodName = "QRIS Dinamis Mandiri (0% MDR)";
        orderStatus = "Menunggu Pembayaran";

        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Menyiapkan QRIS Mandiri...`;
        }

        try {
          mpgData = await requestMpgInvoice({
            orderId,
            amount: breakdown.total,
            customerName: recipientName,
            customerEmail: currentUser ? currentUser.email : "pelanggan@pasarpagi.id",
            customerPhone: recipientPhone,
            items: orderedItems
          });
        } catch (err) {
          console.warn("[QRIS_FALLBACK]", err.message);
          activePaymentMethod = "cod";
          paymentMethodName = "Bayar di Tempat (COD) [Fallback]";
          orderStatus = "Diproses";
          showToast("Koneksi QRIS sedang sibuk. Pesanan dialihkan ke Bayar di Tempat (COD)!");
        } finally {
          if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = originalBtnContent;
          }
        }
      }

      orderedItems.forEach((ordered) => {
        const official = products.find((p) => p.id === ordered.productId);
        if (official) {
          official.stockKg = Math.max(0, Math.round((official.stockKg - (ordered.weightKg * ordered.count)) * 10) / 10);
        }
      });

      const now = new Date();
      const orderRecord = {
        id: orderId,
        date: now.toISOString(),
        displayDate: now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) + " WIB",
        customer: {
          name: recipientName,
          email: currentUser ? currentUser.email : "guest@pasarpagi.id",
          phone: recipientPhone,
          address: recipientAddress
        },
        items: orderedItems,
        breakdown,
        paymentMethod: activePaymentMethod,
        paymentMethodName,
        bank: null,
        status: orderStatus,
        note: orderNote,
        checkoutUrl: mpgData ? mpgData.checkoutUrl : null,
        qrString: mpgData ? mpgData.qrString : null,
        mpgUniqueCode: mpgData ? mpgData.uniqueCode : 0,
        mpgTotalAmount: mpgData ? mpgData.totalAmount : breakdown.total
      };

      customerOrders.unshift(orderRecord);
      localStorage.setItem("pasar_pagi_orders", JSON.stringify(customerOrders));
      localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
      syncStoreDataToBackend(products, orderRecord);

      if (currentUser) {
        currentUser.phone = recipientPhone;
        currentUser.address = recipientAddress;
        localStorage.setItem("pasar_pagi_user", JSON.stringify(currentUser));
        updateAuthUI();
      }

      closeReview();

      cart = {};
      document.getElementById("note").value = "";
      renderCart();

      openSuccessModal(orderRecord);

      if (orderRecord.checkoutUrl) {
        try {
          const payWin = window.open(orderRecord.checkoutUrl, "_blank");
          if (!payWin || payWin.closed || typeof payWin.closed === "undefined") {
            setTimeout(() => { window.location.href = orderRecord.checkoutUrl; }, 1000);
          }
        } catch {
          window.location.href = orderRecord.checkoutUrl;
        }
      }
    } finally {
      isPlacingOrder = false;
    }
  }

  function openSuccessModal(order) {
    const toastEl = document.getElementById("toast");
    if (toastEl) toastEl.classList.remove("show");

    const receiptEl = document.getElementById("order-receipt-content");
    const itemsListHtml = (order.items || []).map(i => `
      <div class="receipt-item-row">
        <span>${escapeHtml(i.name)} (${i.weightLabel}) &times; ${i.count}</span>
        <strong>${formatMoney(i.count * i.price)}</strong>
      </div>
    `).join("");

    let paymentDetailHtml = "";
    if (order.paymentMethod === "cod") {
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
          <small>Status: <strong style="color: #f57f17;"><i class="fas fa-clock"></i> Menunggu Scan & Pembayaran QRIS</strong> (Otomatis dicek oleh sistem).</small>
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

    // Pasang tautan WhatsApp otomatis
    const STORE_WA_NUMBER = (import.meta.env && import.meta.env.VITE_STORE_WA_NUMBER) || "6281298765432";
    const itemsSummary = (order.items || [])
      .map((it, idx) => `${idx + 1}. ${it.name} (${it.weightLabel}) x${it.count} = ${formatMoney(it.count * it.price)}`)
      .join("\n");

    const waMsg =
`*HALO PASAR PAGI, SAYA MAU KONFIRMASI PESANAN* 🥬🍎
────────────────────────
📦 *No. Pesanan:* #${order.id}
🗓️ *Waktu:* ${order.displayDate}
👤 *Penerima:* ${order.customer.name}
📱 *No. HP:* ${order.customer.phone}
📍 *Alamat:* ${order.customer.address}

🛒 *Daftar Belanja:*
${itemsSummary}

💰 *Total Tagihan:* ${formatMoney(order.breakdown.total)}
💳 *Metode Bayar:* ${order.paymentMethodName}
${order.note ? `📝 *Catatan:* "${order.note}"\n` : ""}────────────────────────
Mohon segera diproses dan dikirimkan ya, terima kasih! 🌱`;

    const waUrl = `https://wa.me/${STORE_WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;
    const successWaBtn = document.getElementById("success-wa-btn");
    if (successWaBtn) {
      successWaBtn.href = waUrl;
    }

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

  const cartSidebarEl = document.getElementById("cart-sidebar");
  if (cartSidebarEl) {
    cartSidebarEl.addEventListener("touchmove", (e) => {
      if (!e.target.closest("#cart-details")) e.preventDefault();
    }, { passive: false });
  }

  const cartBackdropEl = document.getElementById("cart-drawer-overlay");
  if (cartBackdropEl) {
    cartBackdropEl.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  }

  function scrollToCart() {
    if (window.innerWidth <= 768) {
      openCartDrawer();
    } else {
      const sidebar = document.getElementById("cart-sidebar");
      if (sidebar) sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Event Listeners Global
  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "cart-drawer-overlay") {
      closeCartDrawer();
      return;
    }

    if (event.target && event.target.classList && event.target.classList.contains("modal-overlay")) {
      if (event.target === reviewModal) closeReview();
      if (event.target === successModal) closeSuccessModal();
      if (event.target === loginModal) closeLoginModal();
      if (event.target === profileModal) closeProfileModal();
      if (event.target === ordersModal) closeOrdersModal();
      return;
    }

    const target = event.target.closest("button, [data-goto-dept], #mobile-cart-bar, .dept-pill, .payment-option, #clear-search, #header-clear-search, #reset-filter-btn, #brand-logo, .preset-chip");
    if (!target) return;

    if (target.id === "cart-drawer-close-btn" || target.closest("#cart-drawer-close-btn")) {
      closeCartDrawer();
      return;
    }

    if (target.id === "nav-home" || target.id === "brand-logo" || target.id === "btn-shop-back-home" || target.id === "bnav-home" || target.closest("#bnav-home")) {
      navigateTo("home");
      return;
    }

    if (target.id === "nav-shop" || target.id === "btn-goto-shop" || target.id === "bnav-shop" || target.closest("#bnav-shop")) {
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

    if (target.classList.contains("preset-chip")) {
      const pId = Number(target.dataset.productId);
      const w = parseFloat(target.dataset.weight);
      if (pId && !isNaN(w)) updateCardVolumeUI(pId, w);
      return;
    }

    if (target.classList.contains("btn-buy-featured") || target.closest(".btn-buy-featured")) {
      const btn = target.classList.contains("btn-buy-featured") ? target : target.closest(".btn-buy-featured");
      const pId = Number(btn.dataset.productId);
      if (pId) {
        const p = products.find(prod => prod.id === pId);
        addToCart(pId);
        showToast(`${p && p.type === "sayur" ? "🥬" : "🍎"} ${p ? p.name : "Produk"} ditambahkan ke keranjang!`);
      }
      return;
    }

    if (
      target.id === "mobile-cart-btn" || target.closest("#mobile-cart-btn") ||
      target.id === "mobile-cart-bar" || target.closest("#mobile-cart-bar") ||
      target.id === "mobile-header-cart" || target.closest("#mobile-header-cart") ||
      target.id === "bnav-cart" || target.closest("#bnav-cart")
    ) {
      if (currentPage === "shop") scrollToCart();
      else navigateTo("shop", "cart");
      return;
    }

    if (target.id === "bnav-user" || target.closest("#bnav-user")) {
      if (currentUser) openProfileModal();
      else openLoginModal();
      return;
    }

    if (target.classList.contains("plus-button") || target.classList.contains("btn-action-add") || target.closest(".btn-action-add")) {
      const btn = target.classList.contains("plus-button") || target.classList.contains("btn-action-add") ? target : target.closest(".btn-action-add");
      const pId = Number(btn.dataset.productId);
      if (pId) addToCart(pId);
      return;
    }

    if (target.classList.contains("minus-button") || target.classList.contains("cart-minus")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey) removeFromCart(cartKey);
      return;
    }

    if (target.classList.contains("cart-plus")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey && cart[cartKey]) addToCart(cart[cartKey].productId, cart[cartKey].weightKg);
      return;
    }

    if (target.classList.contains("delete-icon") || target.classList.contains("cart-delete-btn")) {
      const cartKey = target.dataset.cartKey;
      if (cartKey) deleteItem(cartKey);
      return;
    }

    if (target.id === "checkout-button" || target.closest("#checkout-button")) {
      openReview();
      return;
    }

    if (target.id === "review-confirm" || target.closest("#review-confirm")) {
      placeOrder();
      return;
    }

    if (target.id === "review-back" || target.closest("#review-back") || target.id === "modal-close-btn" || target.closest("#modal-close-btn")) {
      closeReview();
      return;
    }

    if (target.id === "success-close-btn" || target.closest("#success-close-btn")) {
      closeSuccessModal();
      return;
    }

    if (target.id === "clear-search" || target.id === "header-clear-search" || target.id === "reset-filter-btn") {
      const headerSearchEl = document.getElementById("header-search-input");
      const headerClearEl = document.getElementById("header-clear-search");
      if (searchInput) searchInput.value = "";
      if (headerSearchEl) headerSearchEl.value = "";
      searchQuery = "";
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      if (headerClearEl) headerClearEl.style.display = "none";
      if (target.id === "reset-filter-btn") {
        currentDepartment = "all";
        document.querySelectorAll(".dept-pill").forEach(btn => btn.classList.toggle("active", btn.dataset.dept === "all"));
      }
      renderProducts();
      return;
    }

    if (target.id === "btn-open-login" || target.closest("#btn-open-login") || target.id === "btn-checkout-login") {
      openLoginModal();
      return;
    }

    if (target.id === "login-modal-close" || target.closest("#login-modal-close") || target === loginModal) {
      closeLoginModal();
      return;
    }

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

    const toggleCustomGoogleBtn = target.closest("#btn-toggle-custom-google");
    if (toggleCustomGoogleBtn) {
      const form = document.getElementById("custom-google-form");
      const icon = document.getElementById("toggle-custom-google-icon");
      if (form) {
        const isHidden = form.style.display === "none";
        form.style.display = isHidden ? "flex" : "none";
        if (icon) icon.className = isHidden ? "fas fa-chevron-up" : "fas fa-chevron-down";
      }
      return;
    }

    const demoBtn = target.closest(".demo-user-btn");
    if (demoBtn) {
      const name = demoBtn.dataset.demoName || "Pelanggan Demo";
      const avatarImg = demoBtn.querySelector(".demo-avatar");
      loginUser({
        name,
        email: demoBtn.dataset.demoEmail || "demo@pasarpagi.id",
        phone: demoBtn.dataset.demoPhone || "081234567890",
        address: demoBtn.dataset.demoAddress || "Jalan Melati No. 10",
        avatar: avatarImg ? avatarImg.src : "",
        profileCompleted: true,
        avatarEmoji: "🥑",
        avatarBg: "#eaf6ea"
      });
      closeLoginModal();
      navigateTo("shop");
      showToast(`Login demo berhasil sebagai <strong>${escapeHtml(name)}</strong>!`);
      return;
    }

    if (target.id === "user-chip-btn" || target.closest("#user-chip-btn")) {
      toggleUserDropdown();
      return;
    }

    if (target.id === "menu-btn-profile" || target.closest("#menu-btn-profile") || target.id === "btn-edit-profile-quick") {
      openProfileModal();
      return;
    }

    if (target.id === "menu-btn-orders" || target.closest("#menu-btn-orders") || target.id === "success-view-orders-btn") {
      if (successModal.classList.contains("open")) closeSuccessModal();
      openOrdersModal();
      return;
    }

    if (target.id === "menu-btn-logout" || target.closest("#menu-btn-logout")) {
      logoutUser();
      return;
    }

    if (target.id === "profile-modal-close" || target.id === "profile-modal-cancel" || target === profileModal) {
      closeProfileModal();
      return;
    }

    const editAvatarBtn = target.closest("#profile-cute-avatar-grid .cute-avatar-btn");
    if (editAvatarBtn) {
      const match = CUTE_AVATARS.find(a => a.id === editAvatarBtn.dataset.editAvatarId);
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

    const editProduceChipBtn = target.closest("#profile-fav-produce-chips .produce-chip-btn");
    if (editProduceChipBtn) {
      const pId = editProduceChipBtn.dataset.editProduceId;
      if (pId) {
        if (editSelectedProduces.has(pId)) {
          if (editSelectedProduces.size > 1) editSelectedProduces.delete(pId);
        } else {
          editSelectedProduces.add(pId);
        }
        renderEditProduceChips();
      }
      return;
    }

    if (target.id === "orders-modal-close" || target.closest("#orders-modal-close") || target === ordersModal) {
      closeOrdersModal();
      return;
    }

    const payOpt = target.closest(".payment-option");
    if (payOpt) {
      const method = payOpt.dataset.payment || (payOpt.querySelector('input[type="radio"]') ? payOpt.querySelector('input[type="radio"]').value : "qris");
      selectPaymentMethod(method);
      return;
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#user-chip-btn") && !e.target.closest("#user-dropdown-menu")) {
      closeUserDropdown();
    }
  });

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentUser) return;

      const nameInput = document.getElementById("profile-name");
      const ageInput = document.getElementById("profile-age");
      const wa = document.getElementById("profile-wa").value.trim();
      const addr = document.getElementById("profile-address").value.trim();

      if (nameInput && nameInput.value.trim()) currentUser.name = nameInput.value.trim();
      if (ageInput && !isNaN(parseInt(ageInput.value, 10))) currentUser.age = parseInt(ageInput.value, 10);
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

      const checkoutPhone = document.getElementById("checkout-phone");
      const checkoutAddr = document.getElementById("checkout-address");
      if (checkoutPhone) checkoutPhone.value = wa;
      if (checkoutAddr) checkoutAddr.value = addr;
    });
  }

  const customGoogleForm = document.getElementById("custom-google-form");
  if (customGoogleForm) {
    customGoogleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("custom-google-name")?.value.trim() || "";
      const email = document.getElementById("custom-google-email")?.value.trim() || "";
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

  const headerSearchInput = document.getElementById("header-search-input");
  const headerClearSearch = document.getElementById("header-clear-search");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    if (headerSearchInput && headerSearchInput.value !== e.target.value) headerSearchInput.value = e.target.value;
    clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
    if (headerClearSearch) headerClearSearch.style.display = searchQuery.length > 0 ? "flex" : "none";
    renderProducts();
  });

  if (headerSearchInput) {
    headerSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      if (searchInput && searchInput.value !== e.target.value) searchInput.value = e.target.value;
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
      if (previewEl) previewEl.querySelector("span").textContent = " " + noteVal;
      else renderCart();
    } else if (previewEl) {
      previewEl.remove();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      if (reviewModal?.classList.contains("open")) closeReview();
      if (successModal?.classList.contains("open")) closeSuccessModal();
      if (loginModal?.classList.contains("open")) closeLoginModal();
      if (profileModal?.classList.contains("open")) closeProfileModal();
      if (ordersModal?.classList.contains("open")) closeOrdersModal();
      closeUserDropdown();
    }
  });

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.toLowerCase();
    navigateTo(hash === "#toko" || hash === "#shop" ? "shop" : "home");
  });

  updateAuthUI();
  initGoogleAuth();
  selectPaymentMethod("qris");

  const initialHash = window.location.hash.toLowerCase();
  navigateTo(initialHash === "#toko" || initialHash === "#shop" ? "shop" : "home");

  function updateCategoryCounters() {
    const totalCount = products.length;
    const buahCount = products.filter(p => p.type === "buah").length;
    const sayurCount = products.filter(p => p.type === "sayur").length;
    const allCardSpan = document.querySelector('.ecom-cat-card[data-goto-dept="all"] .cat-info span');
    const buahCardSpan = document.querySelector('.ecom-cat-card[data-goto-dept="buah"] .cat-info span');
    const sayurCardSpan = document.querySelector('.ecom-cat-card[data-goto-dept="sayur"] .cat-info span');
    if (allCardSpan) allCardSpan.textContent = `${totalCount} item tersedia`;
    if (buahCardSpan) buahCardSpan.textContent = `${buahCount} pilihan buah`;
    if (sayurCardSpan) sayurCardSpan.textContent = `${sayurCount} pilihan sayur`;
  }

  async function syncStoreDataToBackend(updatedProducts, newOrder = null) {
    fetch("http://localhost:3001/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: updatedProducts })
    }).catch(() => {});

    if (newOrder) {
      fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder })
      }).catch(() => {});
    }

    const sb = getSupabaseConfig();
    if (sb.url && sb.key) {
      const headers = {
        apikey: sb.key,
        Authorization: `Bearer ${sb.key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      };
      fetch(`${sb.url}/rest/v1/products`, {
        method: "POST",
        headers,
        body: JSON.stringify(updatedProducts)
      }).catch(() => {});
      if (newOrder) {
        fetch(`${sb.url}/rest/v1/orders`, {
          method: "POST",
          headers,
          body: JSON.stringify(newOrder)
        }).catch(() => {});
      }
    }
  }

  async function fetchRemoteCatalogAndOrders() {
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
          const remoteProducts = await res.json();
          if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
            products.splice(0, products.length, ...remoteProducts);
            products.forEach(p => { if (!selectedWeightKg[p.id]) selectedWeightKg[p.id] = 1.0; });
            localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
            updateCategoryCounters();
            renderHomeFeatured();
            renderProducts();
            renderCart();
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
            products.splice(0, products.length, ...data.products);
            products.forEach(p => { if (!selectedWeightKg[p.id]) selectedWeightKg[p.id] = 1.0; });
            localStorage.setItem("pasar_pagi_catalog_v1", JSON.stringify(products));
            updateCategoryCounters();
            renderHomeFeatured();
            renderProducts();
            renderCart();
          }
        }
      } catch {}
    }
  }

  window.addEventListener("storage", (e) => {
    if (e.key === "pasar_pagi_catalog_v1" && e.newValue) {
      try {
        const updated = JSON.parse(e.newValue);
        if (Array.isArray(updated)) {
          products.splice(0, products.length, ...updated);
          products.forEach(p => { if (!selectedWeightKg[p.id]) selectedWeightKg[p.id] = 1.0; });
          updateCategoryCounters();
          renderHomeFeatured();
          renderProducts();
          renderCart();
        }
      } catch {}
    }
    if (e.key === "pasar_pagi_orders" && e.newValue) {
      try {
        customerOrders = JSON.parse(e.newValue || "[]");
        updateAuthUI();
      } catch {}
    }
  });

  updateCategoryCounters();
  renderHomeFeatured();
  renderProducts();
  renderCart();
  fetchRemoteCatalogAndOrders();
});
