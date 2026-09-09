# 🍎 Pasar Pagi — Toko Buah Segar & Organik

Website e-commerce toko buah online modern dengan antarmuka yang bersih, elegan, dan sistem belanja terverifikasi aman.

---

## 🚀 Cara Menjalankan Aplikasi

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. Buka browser pada alamat:
   * **Lokal**: `http://localhost:5173/`
   * **Jaringan (WiFi)**: `http://<IP-Lokal>:5173/`

---

## ✨ Fitur Utama

- **Navigasi Multi-Halaman**:
  - **Halaman Beranda (`#beranda`)**: Landing page sambutan (*Welcome to Pasar Pagi*), keunggulan produk organik, petikan buah musiman favorit, dan cerita petani.
  - **Halaman Toko Buah (`#toko`)**: Katalog buah lengkap, pencarian real-time, filter kategori (*Beri*, *Sitrus & Apel*, *Tropis*), dan keranjang belanja.
- **Keranjang Belanja Interaktif**:
  - Tombol stepper kuantitas (`+` dan `−`) terintegrasi.
  - Catatan aman buat petani (*sanitized against XSS*).
  - Validasi kupon promo (`TEMANFARMER` potongan 90%).
  - Rincian biaya transparan (Subtotal, Biaya Penanganan, Diskon, Total).
- **Proses Checkout Lengkap**:
  - Pilihan metode pembayaran (QRIS Instan, COD, Transfer Bank).
  - Resi konfirmasi pesanan dengan ID unik (`#PP-XXXXXX`).
  - Pengurangan stok nyata pada katalog saat pesanan dikonfirmasi.
- **Responsif di Semua Perangkat**:
  - Tampilan desktop rapi dan bilah keranjang melayang (*floating cart bar*) pada perangkat mobile.

---

## 🛠️ Stack Teknologi

- **Frontend**: HTML5, CSS3 kustom (*Cormorant Garamond* & *Manrope*), Vanilla JavaScript ES6+
- **Bundler & Server**: Vite 5
- **Security**: Web Crypto API (SHA-256 Hashing), XSS sanitasi teks via `textContent`