// File: data.js
// Sumber data tunggal (single source of truth) untuk Modul 4.
// Dipakai oleh main.js (browser) dan olah_data.js (Node.js).

/**
 * Daftar proyek portofolio.
 * @type {Array<{id:number, title:string, category:string, budget:number, completed:boolean}>}
 */
const projects = [
  {
    id: 1,
    title: "Sistem Inventaris Keuangan",
    category: "Web App",
    budget: 2500000,
    completed: true,
  },
  {
    id: 2,
    title: "Sistem Kasir Digital POS",
    category: "Desktop App",
    budget: 5000000,
    completed: true,
  },
  {
    id: 3,
    title: "Landing Page Profil Perusahaan",
    category: "Web App",
    budget: 1500000,
    completed: false,
  },
  {
    id: 4,
    title: "Aplikasi Presensi GPS Mobile",
    category: "Mobile App",
    budget: 4500000,
    completed: true,
  },
  {
    id: 5,
    title: "Aplikasi Mengubah Dosa Jadi Saldo",
    category: "Mobile App",
    budget: 5000000,
    completed: true,
  },
];

/**
 * Format angka menjadi Rupiah.
 * @param {number} angka
 * @returns {string} contoh: "Rp 2.500.000"
 */
const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
};

// Ekspor untuk Node.js (dibaca via require di olah_data.js).
// Di browser, `module` tidak terdefinisi sehingga blok ini dilewati.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { projects, formatRupiah };
}
