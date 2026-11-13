// File: olah_data.js
// Praktik manipulasi Array of Objects dengan ES6+ (forEach, filter, map, reduce).
// Dijalankan di terminal:  node olah_data.js   (atau: npm run data)

const { projects, formatRupiah } = require("./data.js");

console.log("=== 1. SEMUA DAFTAR PROYEK (forEach) ===");
projects.forEach((proj, idx) => {
  const status = proj.completed ? "[SELESAI]" : "[PROSES]";
  console.log(
    `${idx + 1}. ${status} ${proj.title} (${proj.category}) - ${formatRupiah(proj.budget)}`,
  );
});

console.log("\n=== 2. PROYEK KATEGORI WEB APP (filter) ===");
const webProjects = projects.filter((proj) => proj.category === "Web App");
console.table(webProjects);

console.log("\n=== 3. PROYEK KATEGORI MOBILE APP (filter) ===");
const mobileProjects = projects.filter((proj) => proj.category === "Mobile App");
console.table(mobileProjects);

console.log("\n=== 4. RINGKASAN NAMA & ANGGARAN (map) ===");
const ringkasanProyek = projects.map((proj) => ({
  nama: proj.title,
  kategori: proj.category,
  status: proj.completed ? "Selesai" : "Proses",
  biaya: formatRupiah(proj.budget),
}));
console.table(ringkasanProyek);

console.log("\n=== 5. TOTAL ANGGARAN (reduce) ===");
const totalAnggaran = projects.reduce((total, proj) => total + proj.budget, 0);
console.log(
  `Total Estimasi Anggaran Portofolio: ${formatRupiah(totalAnggaran)}`,
);

const totalSelesai = projects
  .filter((proj) => proj.completed)
  .reduce((total, proj) => total + proj.budget, 0);
console.log(`Total Anggaran Proyek Selesai: ${formatRupiah(totalSelesai)}`);

const totalProses = projects
  .filter((proj) => !proj.completed)
  .reduce((total, proj) => total + proj.budget, 0);
console.log(`Total Anggaran Proyek Proses: ${formatRupiah(totalProses)}`);
