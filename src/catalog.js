// ============================================================
//  PASAR PAGI — Single Source of Truth: Katalog & Cloud Config
// ============================================================

export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Apel",
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
    name: "Jeruk",
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
    name: "Pisang",
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
    name: "Anggur",
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
    name: "Stroberi",
    type: "buah",
    category: "beri",
    basePricePerKg: 70000,
    stockKg: 14,
    produceId: "#4252",
    desc: "Asam manis berair, dipetik segar saat pagi hari.",
    image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614071/25-01-11-10-44-32-511_deco_doxshi.jpg",
    featured: true
  },
  {
    id: 6,
    name: "Blueberry",
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
    name: "Nanas",
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
    name: "Mangga",
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
    name: "Kiwi",
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
    name: "Semangka",
    type: "buah",
    category: "tropis",
    basePricePerKg: 22000,
    stockKg: 20,
    produceId: "#4032",
    desc: "Manis dingin kaya elektrolit untuk menghidrasi tubuh.",
    image: "https://res.cloudinary.com/dgwef8ttm/image/upload/v1736614185/25-01-11-10-48-13-815_deco_ogtsmo.jpg",
    featured: false
  },
  {
    id: 11,
    name: "Bayam",
    type: "sayur",
    category: "sayur-daun",
    basePricePerKg: 12000,
    stockKg: 20,
    produceId: "#5011",
    desc: "Daun hijau renyah kaya zat besi & serat pangan.",
    image: "/assets/sayuran/bayam_hijau.jpg",
    featured: true
  },
  {
    id: 12,
    name: "Wortel",
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
    name: "Brokoli",
    type: "sayur",
    category: "sayur-daun",
    basePricePerKg: 34000,
    stockKg: 15,
    produceId: "#5031",
    desc: "Kuntum hijau padat bebas pestisida sintetis.",
    image: "/assets/sayuran/brokoli_organik.jpg",
    featured: true
  },
  {
    id: 14,
    name: "Tomat",
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
    name: "Cabai",
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
    name: "Jagung",
    type: "sayur",
    category: "sayur-buah",
    basePricePerKg: 14000,
    stockKg: 25,
    produceId: "#5061",
    desc: "Bulir kuning keemasan super manis, renyah legit.",
    image: "/assets/sayuran/jagung_manis.jpg",
    featured: true
  },
  {
    id: 17,
    name: "Kentang",
    type: "sayur",
    category: "sayur-umbi",
    basePricePerKg: 22000,
    stockKg: 20,
    produceId: "#5071",
    desc: "Umbi padat kuning pulen khas Dieng.",
    image: "/assets/sayuran/kentang_granola.jpg",
    featured: false
  },
  {
    id: 18,
    name: "Sawi",
    type: "sayur",
    category: "sayur-daun",
    basePricePerKg: 11000,
    stockKg: 20,
    produceId: "#5081",
    desc: "Batang renyah berair dan daun hijau segar.",
    image: "/assets/sayuran/kangkung_air.jpg",
    featured: false
  }
];

export function formatMoney(amount) {
  return `Rp ${Math.round(Number(amount) || 0).toLocaleString("id-ID")}`;
}

export function getSupabaseConfig() {
  const url = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || localStorage.getItem("pasar_pagi_sb_url") || "";
  const key = (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || localStorage.getItem("pasar_pagi_sb_key") || "";
  return { url: url.replace(/\/+$/, ""), key: key.trim() };
}
