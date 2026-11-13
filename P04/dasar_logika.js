// File: dasar_logika.js
// Praktik dasar sintaks, tipe data, dan arrow function.
// Dijalankan di terminal:  node dasar_logika.js   (atau: npm run logika)

const namaProgrammer = "Rizki Dzulfikar";
const tahunMulai = 2022;
const tahunSekarang = new Date().getFullYear();

// Arrow function menghitung pengalaman
const hitungPengalaman = (mulai, sekarang) => sekarang - mulai;
const masaKerja = hitungPengalaman(tahunMulai, tahunSekarang);

// Evaluasi kondisi dengan ternary operator
const statusSenioritas =
  masaKerja >= 2 ? "mid-developer" : "junior developer";

console.log("=== INFORMASI PENGEMBANG ===");
console.log(`Nama: ${namaProgrammer}`);
console.log(`Pengalaman: ${masaKerja} tahun`);
console.log(`Kategori: ${statusSenioritas}`);

// Menguji strict equality vs loose equality
console.log("\n=== UJI PERBANDINGAN TIPE DATA ===");
console.log("10 == '10': ", 10 == "10"); // true (type coercion)
console.log("10 === '10': ", 10 === "10"); // false (strict equality)
console.log("tipe 10: ", typeof 10);
console.log("tipe '10': ", typeof "10");
