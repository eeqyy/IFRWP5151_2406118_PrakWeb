# Modul 4 — Dasar Logika Pemrograman (JavaScript)

Dashboard portofolio proyek interaktif: menampilkan statistik, daftar proyek,
dan filter berdasarkan kategori.

## Menjalankan

```bash
npm start     # server lokal -> http://localhost:8080
npm run logika  # node dasar_logika.js
npm run data    # node olah_data.js
```

Tidak ada dependensi yang perlu diinstal untuk script Node.js.
`npm start` memakai `npx serve`, jadi `serve` akan diunduh otomatis saat pertama dijalankan.

## File

| File | Fungsi |
| --- | --- |
| `index.html` | Struktur dashboard; memuat `data.js` lalu `main.js` |
| `style.css` | Gaya dashboard + layout responsif |
| `data.js` | Sumber data tunggal: array `projects` dan `formatRupiah()` |
| `main.js` | Render kartu, hitung statistik, filter kategori |
| `olah_data.js` | Latihan `forEach`, `filter`, `map`, `reduce` |
| `dasar_logika.js` | Latihan sintaks, tipe data, arrow function |
| `package.json` | Metadata dan skrip pintasan |

## Konvensi

- **`data.js` adalah satu-satunya sumber data.** Array `projects` tidak lagi
  diduplikasi di `main.js` dan `olah_data.js`, sehingga angka statistik di
  browser selalu sama dengan hasil di terminal.
- `data.js` ditulis agar bisa dipakai di dua lingkungan:
  - **Browser** — `const projects` menjadi variabel global yang dibaca `main.js`.
  - **Node.js** — diekspor lewat `module.exports`, dibaca dengan `require("./data.js")`.

  ```js
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { projects, formatRupiah };
  }
  ```

- Elemen yang dibuat JavaScript diberi `class` (bukan `id`) agar bisa di-style
  dari `style.css`.
- Tombol filter memakai atribut `data-category` dan `type="button"`.

## Konsep yang Dipelajari

**Dasar logika** (`dasar_logika.js`) — deklarasi variabel, template literal,
arrow function, ternary operator, `typeof`, strict (`===`) vs loose (`==`)
equality, dan perbedaan tipe data.

**Manipulasi data** (`olah_data.js`) — `forEach` untuk iterasi, `filter` untuk
pemilihan berdasarkan kategori, `map` untuk membentuk objek ringkasan,
`reduce` untuk menjumlahkan anggaran, plus `console.table` untuk tabel.

**DOM** (`main.js`) — `getElementById`, `querySelectorAll`, `innerHTML`,
`classList`, `addEventListener`, dan `textContent` untuk memperbarui
ringkasan statistik secara reaktif terhadap filter aktif.

## Data Contoh

| # | Proyek | Kategori | Anggaran | Status |
| --- | --- | --- | --- | --- |
| 1 | Sistem Inventaris Keuangan | Web App | Rp 2.500.000 | Selesai |
| 2 | Sistem Kasir Digital POS | Desktop App | Rp 5.000.000 | Selesai |
| 3 | Landing Page Profil Perusahaan | Web App | Rp 1.500.000 | Dalam Pengerjaan |
| 4 | Aplikasi Presensi GPS Mobile | Mobile App | Rp 4.500.000 | Selesai |
| 5 | Aplikasi Mengubah Dosa Jadi Saldo | Mobile App | Rp 5.000.000 | Selesai |

Total anggaran: **Rp 18.500.000** · Selesai: **4 dari 5** proyek.
