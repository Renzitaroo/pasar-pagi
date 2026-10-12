# Pasar Pagi — Number One Freshness

Platform belanja buah & sayur segar harian (Storefront + Admin Dashboard) dengan sinkronisasi real-time via **Supabase** atau **Local Express API Fallback**.

## Struktur Folder

```text
├── public/                 # Aset gambar statis produk & kategori
├── server/                 # Local backend API fallback (Port 3001) & SQL schema Supabase
│   ├── server.js           # Express server + JSON database fallback
│   └── supabase-schema.sql # Skema tabel & RLS policy untuk Supabase
├── src/                    # Kode sumber aplikasi (Storefront & Admin)
│   ├── catalog.js          # Single source of truth katalog 18 produk & helper Supabase
│   ├── main.js             # Logic utama Storefront (keranjang, filter, checkout WA/PDF)
│   ├── style.css           # Stylesheet utama Storefront
│   ├── admin.js            # Logic Admin Dashboard (CRUD stok, harga, kategori, sinkronisasi)
│   └── admin.css           # Stylesheet Admin Dashboard
├── index.html              # Entry point Storefront Pelanggan
├── admin.html              # Entry point Admin Dashboard (/admin.html)
├── vite.config.js          # Konfigurasi multi-page build Vite
└── vercel.json             # Konfigurasi deployment & security headers Vercel
```

## Cara Menjalankan

```bash
# 1. Jalankan Storefront & Admin UI (http://localhost:5174)
npm run dev

# 2. (Opsional) Jalankan Local Backend API Server (http://localhost:3001)
npm run server

# 3. Build untuk Production
npm run build
```

## Admin Dashboard & Sinkronisasi Database

Buka **`/admin.html`** (contoh: `http://localhost:5174/admin.html`) untuk mengatur harga, stok, status aktif/habis, atau menambah produk baru:
- **Mode Cloud (Supabase)**: Klik **Setup Database** di pojok kanan atas Admin Dashboard atau isi `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` di `.env`.
- **Mode Lokal**: Otomatis tersimpan ke `server/data/products.json` (jika `npm run server` aktif) dan `localStorage` browser.
