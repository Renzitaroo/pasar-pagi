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
      name: "Apel Fuji Manis",       
      type: "buah",
      category: "apel-jeruk", 
      basePricePerKg: 35000, 
      stockKg: 25, 
      produceId: "#4131", 
      desc: "Manis renyah dengan aroma segar alami pegunungan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589286/25-01-11-03-50-09-954_deco_m2ofbh.jpg",
      featured: true
    },
    { 
      id: 2,  
      name: "Jeruk Pontianak",     
      type: "buah",
      category: "apel-jeruk", 
      basePricePerKg: 30000, 
      stockKg: 20, 
      produceId: "#4012", 
      desc: "Kaya vitamin C, bulir manis melimpah tanpa biji.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591406/25-01-11-04-29-12-930_deco_r9gznn.jpg",
      featured: false
    },
    { 
      id: 3,  
      name: "Pisang Cavendish",
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
      name: "Anggur Red Globe",    
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
      name: "Stroberi Ciwidey",
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
      name: "Blueberry Segar", 
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
      name: "Nanas Madu Subang",      
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
      name: "Mangga Harum Manis", 
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
      name: "Kiwi Hijau Segar",       
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
      name: "Semangka Merah Tanpa Biji",
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
      name: "Bayam Hijau Segar",
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
      name: "Wortel Manis Brastagi",
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
      name: "Brokoli Organik",
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
      name: "Tomat Merah Segar",
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
      name: "Cabai Merah Segar",
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
      name: "Jagung Manis Madu",
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
      name: "Kentang Granola Dieng",
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
      name: "Sawi & Sayur Hijau",
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
  let currentCategory = "all";
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
      savingLabel = "🌟 Borongan Hemat 20%";
    } else if (cleanWeight >= 2.0) {
      discountRate = 0.15;
      savingLabel = "🔥 Grosir Hemat 15%";
    } else if (cleanWeight >= 1.0) {
      discountRate = 0.10;
      savingLabel = "🏷️ Hemat 10% (Porsi Keluarga)";
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

  // Render komponen slider model volume HP
  function renderPhoneVolumeControl(productId, currentWeight) {
    const percent = getVolumePercent(currentWeight);
    const weightLabel = formatWeightLabel(currentWeight);

    return `
      <div class="phone-volume-section">
        <div class="volume-header-row">
          <span class="volume-label"><i class="fas fa-sliders"></i> Geser Takaran:</span>
          <span class="volume-quick-weight v-header-weight-${productId}">${weightLabel}</span>
        </div>

        <div class="volume-control-wrap">
          <button type="button" class="volume-step-btn volume-minus" data-product-id="${productId}" title="Kurangi Volume (-250g)">
            <i class="fas fa-minus"></i>
          </button>

          <div class="volume-capsule-track">
            <div class="volume-capsule-fill v-fill-${productId}" style="width: ${percent}%;"></div>
            <div class="volume-capsule-content">
              <i class="fas fa-scale-balanced"></i>
              <span class="volume-capsule-text v-capsule-text-${productId}">${weightLabel}</span>
            </div>
            <input type="range" 
                   class="volume-native-slider v-native-slider-${productId}" 
                   data-product-id="${productId}" 
                   min="0.25" 
                   max="5.0" 
                   step="0.25" 
                   value="${currentWeight}" 
                   aria-label="Geser takaran buah">
          </div>

          <button type="button" class="volume-step-btn volume-plus" data-product-id="${productId}" title="Tambah Volume (+250g)">
            <i class="fas fa-plus"></i>
          </button>
        </div>

        <div class="volume-preset-chips">
          <button type="button" class="preset-chip ${currentWeight === 0.5 ? 'active' : ''}" data-product-id="${productId}" data-weight="0.5">500 gr</button>
          <button type="button" class="preset-chip ${currentWeight === 1.0 ? 'active' : ''}" data-product-id="${productId}" data-weight="1.0">1 kg</button>
          <button type="button" class="preset-chip ${currentWeight === 2.0 ? 'active' : ''}" data-product-id="${productId}" data-weight="2.0">2 kg</button>
          <button type="button" class="preset-chip ${currentWeight === 3.0 ? 'active' : ''}" data-product-id="${productId}" data-weight="3.0">3 kg</button>
        </div>
      </div>
    `;
  }

  // Update visual slider volume tanpa full-render (60 FPS smooth)
  function updateCardVolumeUI(productId, newWeightKg) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const calc = calculatePriceForWeight(product, newWeightKg);
    selectedWeightKg[productId] = calc.weightKg;
    const percent = getVolumePercent(calc.weightKg);
    const weightLabel = formatWeightLabel(calc.weightKg);

    // Update fill level kapsul
    document.querySelectorAll(`.v-fill-${productId}`).forEach(el => el.style.width = `${percent}%`);
    // Update teks kapsul
    document.querySelectorAll(`.v-capsule-text-${productId}`).forEach(el => el.textContent = weightLabel);
    // Update badge berat header
    document.querySelectorAll(`.v-header-weight-${productId}`).forEach(el => el.textContent = weightLabel);
    // Update input range value
    document.querySelectorAll(`.v-native-slider-${productId}`).forEach(el => el.value = calc.weightKg);
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
  const homeFeaturedSayurGrid = document.getElementById("home-featured-sayur-grid");
  const categoryFiltersEl = document.getElementById("category-filters");
  const catalogHeadingTitle = document.getElementById("catalog-heading-title");
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
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="featured-badge ${isSayur ? 'badge-sayur' : 'badge-buah'}">
          ${isSayur ? '🥬 ' : '🍎 '}${getCategoryName(product.category)}
        </span>
      </div>
      <div class="featured-body">
        ${renderPhoneVolumeControl(product.id, calc.weightKg)}
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
        <p class="featured-desc">${product.desc}</p>
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

  /* RENDER TOMBOL FILTER KATEGORI DINAMIS SESUAI DEPARTEMEN AKTIF */
  function renderCategoryPills() {
    if (!categoryFiltersEl) return;
    categoryFiltersEl.innerHTML = "";

    let categories = [];
    if (currentDepartment === "buah") {
      categories = [
        { id: "all", label: "Semua Buah" },
        { id: "apel-jeruk", label: "🍎 Apel & Jeruk" },
        { id: "tropis", label: "🍌 Buah Tropis" },
        { id: "beri", label: "🍇 Beri & Anggur" }
      ];
    } else if (currentDepartment === "sayur") {
      categories = [
        { id: "all", label: "Semua Sayuran" },
        { id: "sayur-daun", label: "🥬 Sayur Daun" },
        { id: "sayur-umbi", label: "🥕 Sayur Umbi" },
        { id: "sayur-buah", label: "🍅 Sayur Buah" },
        { id: "sayur-bumbu", label: "🌶️ Bumbu & Rempah" }
      ];
    } else {
      categories = [
        { id: "all", label: "Semua Kategori" },
        { id: "apel-jeruk", label: "🍎 Apel & Jeruk" },
        { id: "tropis", label: "🍌 Buah Tropis" },
        { id: "beri", label: "🍇 Beri & Anggur" },
        { id: "sayur-daun", label: "🥬 Sayur Daun" },
        { id: "sayur-umbi", label: "🥕 Sayur Umbi" },
        { id: "sayur-buah", label: "🍅 Sayur Buah" },
        { id: "sayur-bumbu", label: "🌶️ Bumbu & Rempah" }
      ];
    }

    // Kembalikan ke 'all' jika kategori terpilih sebelumnya tidak valid di departemen saat ini
    if (!categories.some(c => c.id === currentCategory)) {
      currentCategory = "all";
    }

    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `filter-pill ${currentCategory === cat.id ? "active" : ""}`;
      btn.dataset.category = cat.id;
      btn.textContent = cat.label;
      categoryFiltersEl.appendChild(btn);
    });
  }

  /* RENDER PRODUK DI HALAMAN TOKO */
  function renderProducts() {
    productSection.innerHTML = "";

    const filtered = products.filter((product) => {
      const matchDepartment = (currentDepartment === "all") || (product.type === currentDepartment);
      const matchCategory = (currentCategory === "all") || (product.category === currentCategory);
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.produceId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDepartment && matchCategory && matchSearch;
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
          <span class="produce-id">${product.produceId}</span>
          <div class="product-tags-wrap">
            <span class="product-dept-badge ${isSayur ? 'badge-sayur' : 'badge-buah'}">
              ${isSayur ? '🥬 Sayur' : '🍎 Buah'}
            </span>
            <span class="product-category-tag">${getCategoryName(product.category)}</span>
          </div>
        </div>
        
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
          ${remainingKg <= 0 ? `<div class="sold-out-overlay"><span>Stok Habis</span></div>` : ""}
          ${stokMenipis ? `<div class="low-stock-ribbon"><i class="fas fa-fire"></i> Tinggal ${remainingKg} kg!</div>` : ""}
        </div>

        ${renderPhoneVolumeControl(product.id, calc.weightKg)}

        <div class="item-meta">
          <div class="meta-left">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="wholesale-saving-badge v-saving-${product.id} ${!calc.savingLabel ? 'empty' : ''}">
              ${calc.savingLabel ? `<i class="fas fa-tag"></i> ${calc.savingLabel}` : ""}
            </div>
          </div>
          <div class="meta-right">
            <p class="price v-price-${product.id}">${formatMoney(calc.totalPrice)}</p>
            <span class="price-unit v-unit-${product.id}">/ ${weightLabel}</span>
          </div>
        </div>

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

  function getCategoryName(cat) {
    switch (cat) {
      case "beri": return "Beri & Anggur";
      case "apel-jeruk": return "Apel & Jeruk";
      case "tropis": return "Buah Tropis";
      case "sayur-daun": return "Sayuran Daun";
      case "sayur-umbi": return "Sayuran Umbi";
      case "sayur-buah": return "Sayuran Buah";
      case "sayur-bumbu": return "Bumbu & Rempah";
      default: return "Hasil Kebun";
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
    const target = event.target.closest("button, .cart-summary, .floating-cart-widget, .perk-coupon, .filter-pill, .dept-pill, .payment-option, .modal-overlay, #clear-search, #reset-filter-btn, #brand-logo, .preset-chip, .volume-step-btn");
    if (!target) return;

    // Navigasi Tabs Navbar
    if (target.id === "nav-home" || target.id === "brand-logo") {
      navigateTo("home");
      return;
    }
    if (target.id === "nav-shop" || target.id === "btn-goto-shop") {
      currentDepartment = "all";
      currentCategory = "all";
      document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === "all"));
      renderCategoryPills();
      navigateTo("shop");
      renderProducts();
      return;
    }
    if (target.id === "btn-view-all-fruits") {
      currentDepartment = "buah";
      currentCategory = "all";
      document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === "buah"));
      renderCategoryPills();
      navigateTo("shop");
      renderProducts();
      return;
    }
    if (target.id === "btn-view-all-sayur") {
      currentDepartment = "sayur";
      currentCategory = "all";
      document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === "sayur"));
      renderCategoryPills();
      navigateTo("shop");
      renderProducts();
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
        currentCategory = "all";
        document.querySelectorAll(".dept-pill").forEach(p => p.classList.toggle("active", p.dataset.dept === dept));
        renderCategoryPills();
        renderProducts();
      }
      return;
    }

    // Step minus slider model volume HP (-0.25 kg / 250 gr)
    if (target.classList.contains("volume-minus") || target.closest(".volume-minus")) {
      const btn = target.classList.contains("volume-minus") ? target : target.closest(".volume-minus");
      const pId = Number(btn.dataset.productId);
      if (pId) {
        const cur = selectedWeightKg[pId] || 1.0;
        const next = Math.max(0.25, Math.round((cur - 0.25) * 4) / 4);
        updateCardVolumeUI(pId, next);
      }
      return;
    }

    // Step plus slider model volume HP (+0.25 kg / 250 gr)
    if (target.classList.contains("volume-plus") || target.closest(".volume-plus")) {
      const btn = target.classList.contains("volume-plus") ? target : target.closest(".volume-plus");
      const pId = Number(btn.dataset.productId);
      if (pId) {
        const cur = selectedWeightKg[pId] || 1.0;
        const next = Math.min(5.0, Math.round((cur + 0.25) * 4) / 4);
        updateCardVolumeUI(pId, next);
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

    // Klik tombol "Beli" di featured fruits/sayuran Beranda
    if (target.classList.contains("btn-buy-featured") || target.closest(".btn-buy-featured")) {
      const btn = target.classList.contains("btn-buy-featured") ? target : target.closest(".btn-buy-featured");
      const pId = Number(btn.dataset.productId);
      if (pId) {
        const p = products.find(prod => prod.id === pId);
        addToCart(pId);
        navigateTo("shop", "cart");
        showToast(`${p && p.type === 'sayur' ? '🥬 Sayuran' : '🍎 Buah'} ditambahkan ke keranjang!`);
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

    // Floating Cart Widget (Pojok Kanan Bawah) / Mobile Cart Bar -> buka toko & scroll ke keranjang
    if (target.id === "header-cart-summary" || target.closest("#header-cart-summary") || target.id === "mobile-cart-btn") {
      navigateTo("shop", "cart");
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
    if (target.id === "checkout-button") {
      openReview();
      return;
    }
    // Konfirmasi pesanan
    if (target.id === "review-confirm") {
      placeOrder();
      return;
    }
    // Kembali atau tutup review modal
    if (target.id === "review-back" || target.id === "modal-close-btn" || target === reviewModal) {
      closeReview();
      return;
    }
    // Tutup success modal
    if (target.id === "success-close-btn" || target === successModal) {
      closeSuccessModal();
      return;
    }
    // Filter Kategori
    if (target.classList.contains("filter-pill")) {
      document.querySelectorAll(".filter-pill").forEach(btn => btn.classList.remove("active"));
      target.classList.add("active");
      currentCategory = target.dataset.category;
      renderProducts();
      return;
    }
    // Clear search
    if (target.id === "clear-search") {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderProducts();
      return;
    }
    // Reset filter
    if (target.id === "reset-filter-btn") {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      currentDepartment = "all";
      currentCategory = "all";
      document.querySelectorAll(".dept-pill").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.dept === "all");
      });
      renderCategoryPills();
      renderProducts();
      return;
    }
    // Opsi Pembayaran di Modal
    if (target.classList.contains("payment-option")) {
      document.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("active"));
      target.classList.add("active");
      const radio = target.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      return;
    }
  });

  /* EVENT INPUT: VOLUME SLIDER (DRAG MULUS REAL-TIME 60 FPS) */
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("volume-native-slider")) {
      const pId = Number(e.target.dataset.productId);
      const val = parseFloat(e.target.value);
      if (pId && !isNaN(val)) {
        updateCardVolumeUI(pId, val);
      }
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

  renderCategoryPills();
  renderHomeFeatured();
  renderProducts();
  renderCart();
});