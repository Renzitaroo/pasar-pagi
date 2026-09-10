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
      price: 15000, 
      stock: 12, 
      produceId: "#4131", 
      desc: "Manis renyah dengan aroma segar alami pegunungan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589286/25-01-11-03-50-09-954_deco_m2ofbh.jpg",
      featured: true
    },
    { 
      id: 2,  
      name: "Jeruk Navel",     
      category: "apel-jeruk", 
      price: 20000, 
      stock: 9,  
      produceId: "#4012", 
      desc: "Kaya vitamin C, bulir manis melimpah tanpa biji.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591406/25-01-11-04-29-12-930_deco_r9gznn.jpg",
      featured: false
    },
    { 
      id: 3,  
      name: "Pisang Cavendish",
      category: "tropis",     
      price: 12000, 
      stock: 20, 
      produceId: "#4011", 
      desc: "Tinggi potasium, kulit kuning mulus pas untuk sarapan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736591160/25-01-11-04-24-17-097_deco_htwecb.jpg",
      featured: false
    },
    { 
      id: 4,  
      name: "Anggur Hitam",    
      category: "beri",       
      price: 35000, 
      stock: 6,  
      produceId: "#4022", 
      desc: "Bulir padat renyah, manis alami dengan antioksidan tinggi.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736589285/25-01-11-03-50-38-513_deco_spywdb.jpg",
      featured: true
    },
    { 
      id: 5,  
      name: "Stroberi Ciwidey",
      category: "beri",       
      price: 45000, 
      stock: 8,  
      produceId: "#4252", 
      desc: "Asam manis berair, dipetik segar saat fajar berkabut.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-44-32-511_deco_doxshi.jpg",
      featured: true
    },
    { 
      id: 6,  
      name: "Blueberry Segar", 
      category: "beri",       
      price: 50000, 
      stock: 5,  
      produceId: "#4264", 
      desc: "Superfood kaya nutrisi pelindung daya tahan tubuh.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614070/25-01-11-10-46-19-754_deco_g51gta.jpg",
      featured: false
    },
    { 
      id: 7,  
      name: "Nanas Madu",      
      category: "tropis",     
      price: 30000, 
      stock: 7,  
      produceId: "#4430", 
      desc: "Manis harum legit, renyah tanpa sensasi gatal di lidah.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614070/25-01-11-10-46-43-469_deco_lhzog2.jpg",
      featured: false
    },
    { 
      id: 8,  
      name: "Mangga Arumanis", 
      category: "tropis",     
      price: 28000, 
      stock: 15, 
      produceId: "#4951", 
      desc: "Daging buah tebal oranye, lembut dan manis istimewa.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-45-34-043_deco_dmdlw1.jpg",
      featured: true
    },
    { 
      id: 9,  
      name: "Kiwi Gold",       
      category: "tropis",     
      price: 19000, 
      stock: 10, 
      produceId: "#4301", 
      desc: "Kaya vitamin C dan serat dengan rasa manis menyegarkan.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614625/25-01-11-10-55-05-579_deco_zbrqpd.jpg",
      featured: false
    },
    { 
      id: 10, 
      name: "Semangka (Potong)",
      category: "tropis",    
      price: 32000, 
      stock: 4,  
      produceId: "#4032", 
      desc: "Manis dingin kaya elektrolit untuk menghidrasi tubuh.", 
      image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614185/25-01-11-10-48-13-815_deco_ogtsmo.jpg",
      featured: false
    }
  ];

  let cart = {};
  let currentCategory = "all";
  let searchQuery = "";
  let currentPage = "home"; // "home" atau "shop"

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
    target.innerHTML = `
      <div class="row">
        <span>Subtotal (${Object.values(cart).reduce((s, i) => s + i.count, 0)} item)</span>
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
      const quantity = cart[product.id] ? cart[product.id].count : 0;
      const sisa = product.stock - quantity;
      const habis = sisa <= 0;

      const card = document.createElement("article");
      card.className = "featured-fruit-card";
      card.innerHTML = `
        <div class="featured-img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <span class="featured-badge">${getCategoryName(product.category)}</span>
        </div>
        <div class="featured-body">
          <div class="featured-meta">
            <h4 class="featured-title">${product.name}</h4>
            <span class="featured-price">${formatMoney(product.price)}</span>
          </div>
          <p class="featured-desc">${product.desc}</p>
          <div class="featured-footer">
            <span class="featured-stock ${habis ? 'text-danger' : ''}">${habis ? 'Stok Habis' : `Sisa ${sisa} buah`}</span>
            <button class="btn-buy-featured" data-id="${product.id}" ${habis ? 'disabled' : ''}>
              <i class="fas fa-cart-plus"></i>
              <span>${quantity > 0 ? `Beli Lagi (${quantity})` : 'Pesan Sekarang'}</span>
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
      const quantity = cart[product.id] ? cart[product.id].count : 0;
      const sisa = product.stock - quantity;
      const habis = sisa <= 0;
      const stokMenipis = sisa > 0 && sisa <= 3;

      const productCard = document.createElement("article");
      productCard.classList.add("product");
      if (habis) productCard.classList.add("sold-out");

      productCard.innerHTML = `
        <div class="product-header-badge">
          <span class="produce-id">${product.produceId}</span>
          <span class="product-category-tag">${getCategoryName(product.category)}</span>
        </div>
        
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
          ${habis ? `<div class="sold-out-overlay"><span>Stok Habis</span></div>` : ""}
          ${stokMenipis ? `<div class="low-stock-ribbon"><i class="fas fa-fire"></i> Tinggal ${sisa}!</div>` : ""}
        </div>

        <div class="item-meta">
          <div class="meta-left">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
          </div>
          <div class="meta-right">
            <p class="price">${formatMoney(product.price)}</p>
            <span class="price-unit">/ buah</span>
          </div>
        </div>

        <div class="product-footer-row">
          <div class="stock-status ${habis ? 'stock-empty' : stokMenipis ? 'stock-warning' : 'stock-ok'}">
            <i class="fas ${habis ? 'fa-ban' : stokMenipis ? 'fa-clock' : 'fa-circle-check'}"></i>
            <span>${habis ? "Stok habis hari ini" : `Sisa stok: ${sisa} buah`}</span>
          </div>

          <div class="quantity-controls">
            <button class="quantity-button minus-button" data-id="${product.id}" ${quantity === 0 ? "disabled" : ""} title="Kurangi">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-display ${quantity > 0 ? 'active' : ''}" id="quantity-${product.id}">
              ${quantity}
            </span>
            <button class="quantity-button plus-button" data-id="${product.id}" ${habis ? "disabled" : ""} title="Tambah">
              <i class="fas fa-plus"></i>
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
      case "tropis": return "Tropis";
      default: return "Buah Segar";
    }
  }

  /* HITUNG JUMLAH BARANG DI KERANJANG */
  function updateCartCount() {
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
    cartCountEl.textContent = totalCount;
    sidebarCartBadgeEl.textContent = `${totalCount} item`;
    mobileCartItems.textContent = `${totalCount} item`;

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
      // RESINKRONISASI HARGA RESMI DARI KATALOG (Anti Manipulasi Client)
      const official = products.find((p) => p.id == item.id);
      if (official) {
        item.price = official.price;
        item.name = official.name;
      }

      const itemTotal = item.count * item.price;
      totalPrice += itemTotal;

      const maxStock = official ? official.stock : item.count;
      const canAddMore = item.count < maxStock;

      const listItem = document.createElement("div");
      listItem.classList.add("cart-item");
      listItem.innerHTML = `
        <div class="cart-item-top">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatMoney(item.price)} / buah</div>
          </div>
          <strong class="cart-item-total">${formatMoney(itemTotal)}</strong>
        </div>
        <div class="cart-item-controls">
          <div class="cart-stepper">
            <button class="cart-qty-btn cart-minus" data-id="${item.id}" title="Kurangi satu">
              <i class="fas fa-minus"></i>
            </button>
            <span class="cart-qty-val">${item.count}</span>
            <button class="cart-qty-btn cart-plus" data-id="${item.id}" ${!canAddMore ? "disabled" : ""} title="Tambah satu">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <button class="cart-delete-btn delete-icon" data-id="${item.id}" title="Hapus dari keranjang">
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

  /* TAMBAH BARANG */
  function addToCart(id) {
    const product = products.find((item) => item.id == id);
    if (!product) return;

    const current = cart[id] ? cart[id].count : 0;
    if (current >= product.stock) {
      showToast(`⚠️ Stok ${product.name} telah mencapai batas maksimum (${product.stock} buah).`);
      return;
    }

    if (!cart[id]) {
      cart[id] = { ...product, count: 0 };
    }
    cart[id].price = product.price; // Selalu pakai harga katalog resmi
    cart[id].count++;
    renderCart();
  }

  /* KURANGI BARANG */
  function removeFromCart(id) {
    if (!cart[id]) return;
    cart[id].count--;
    if (cart[id].count <= 0) {
      delete cart[id];
    }
    renderCart();
  }

  /* HAPUS BARANG */
  function deleteItem(id) {
    if (!cart[id]) return;
    const name = cart[id].name;
    delete cart[id];
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
          <span class="review-item-name">${item.name}</span>
          <span class="review-item-qty">x ${item.count} buah</span>
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

  /* PESANAN MASUK (FIX BUG STOK NYATA BERKURANG) */
  function placeOrder() {
    const breakdown = buildBreakdown(
      Object.values(cart).reduce((sum, item) => sum + item.count * item.price, 0)
    );

    const orderedItems = Object.values(cart).map((i) => ({ ...i }));
    const orderNote = document.getElementById("note").value.trim();
    const orderId = "PP-" + Math.floor(100000 + Math.random() * 900000);
    const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethodName = paymentMethodEl ? paymentMethodEl.parentElement.querySelector("span").textContent : "QRIS Instan";

    // PENGURANGAN STOK NYATA PADA KATALOG
    orderedItems.forEach((ordered) => {
      const official = products.find((p) => p.id == ordered.id);
      if (official) {
        official.stock = Math.max(0, official.stock - ordered.count);
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
        <span>${i.name} &times; ${i.count}</span>
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
    const target = event.target.closest("button, .cart-summary, .perk-coupon, .filter-pill, .payment-option, .modal-overlay, #clear-search, #reset-filter-btn, #brand-logo");
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

    // Klik tombol "Beli Sekarang" di featured fruits Beranda
    if (target.classList.contains("btn-buy-featured")) {
      addToCart(target.dataset.id);
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

    // Tambah di kartu produk toko
    if (target.classList.contains("plus-button")) {
      addToCart(target.dataset.id);
    }
    // Kurang di kartu produk toko
    if (target.classList.contains("minus-button")) {
      removeFromCart(target.dataset.id);
    }
    // Tambah di keranjang (stepper)
    if (target.classList.contains("cart-plus")) {
      addToCart(target.dataset.id);
    }
    // Kurang di keranjang (stepper)
    if (target.classList.contains("cart-minus")) {
      removeFromCart(target.dataset.id);
    }
    // Hapus di keranjang
    if (target.classList.contains("delete-icon") || target.classList.contains("cart-delete-btn")) {
      deleteItem(target.dataset.id);
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