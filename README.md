# Repositori Praktikum Pemrograman Web 2026

**Kode Mata Kuliah:** IFRWP5151 · **Kelas:** Teknik Informatika — Institut Teknologi Garut (ITG)

| Nama | NIM | Program Studi |
| --- | --- | --- |
| Rizki Dzulfikar Al-Qatiri | 2406118 | Teknik Informatika |

---

## Struktur Folder

```
.
├── P02/   Modul 2 — Pembuatan Website Statis (HTML murni)
├── P03/   Modul 3 — Penambahan Styling (HTML + CSS)
├── P04/   Modul 4 — Dasar Logika Pemrograman (JavaScript)
├── .vscode/  Konfigurasi debugger VS Code
└── README.md
```

Setiap modul berada di folder terpisah agar mudah dinilai per pertemuan.
Navigasi antar halaman menggunakan link relatif (`about.html`, `style.css`, `data.js`),
sehingga folder dapat dipindahkan atau dibuka secara lokal tanpa konfigurasi path.

---

## Ringkasan Modul

### Modul 1 — Instalasi & Verifikasi Tools

- Instalasi & verifikasi VS Code, Node.js, Laragon, dan Git.
- Uji coba Laragon MySQL berjalan pada port 3306.
- Konfigurasi identitas Git global.

### Modul 2 — `P02/`

Website portofolio pribadi 8 halaman yang dibangun **murni dengan HTML** (tanpa CSS).

| File | Isi |
| --- | --- |
| `index.html` | Beranda / halaman utama |
| `about.html` | Profil dan tujuan |
| `skill.html` | Keahlian teknis & non-teknis |
| `educational.html` | Riwayat pendidikan |
| `experience.html` | Pengalaman organisasi & proyek |
| `project.html` | Daftar proyek |
| `resume.html` | Ringkasan data diri |
| `kontak.html` | Formulir kontak |

Struktur tiap halaman: `header` (judul + navigasi) → `hr` → `main` (`section`/`article`) → `hr` → `footer`.

### Modul 3 — `P03/`

Versi lanjutan dari Modul 2 dengan penambahan **CSS eksternal**.

- Seluruh isi HTML identik dengan `P02/` — perbedaannya hanya pada `style.css`.
- `style.css` mencakup reset, header, navigasi, section, form, aside, footer,
  dan media query untuk tampilan HP (`max-width: 700px`).
- Tema warna: biru `#669bbc` (header) · krem `#ffe4ba` (latar) · merah `#bd0606` (aksen).
- Semua halaman ditautkan ke `style.css` melalui `<link rel="stylesheet" href="style.css">`.

### Modul 4 — `P04/`

Dashboard portofolio proyek interaktif dengan **JavaScript**.

| File | Fungsi |
| --- | --- |
| `index.html` | Struktur dashboard, memuat `data.js` lalu `main.js` |
| `style.css` | Gaya dashboard (termasuk layout responsif) |
| `data.js` | Sumber data tunggal: array `projects` + `formatRupiah()` |
| `main.js` | Render kartu proyek, hitung statistik, dan filter kategori |
| `olah_data.js` | Latihan manipulasi array: `forEach`, `filter`, `map`, `reduce` |
| `dasar_logika.js` | Latihan sintaks, tipe data, dan arrow function |
| `package.json` | Skrip pintasan untuk menjalankan modul ini |

**Cara menjalankan:**

```bash
cd P04

# Menampilkan dashboard di browser (http://localhost:8080)
npm start

# Latihan logika dasar
npm run logika

# Latihan manipulasi data array
npm run data
```

> `data.js` menjadi satu-satunya sumber data, sehingga data yang tampil di browser
> dan data yang diproses di terminal selalu sama. `data.js` mengekspor data melalui
> `module.exports` sehingga bisa di-`require` di Node.js, sekaligus tetap dapat
> diakses sebagai variabel global di browser.

---

## Spesifikasi Perangkat

| Komponen | Versi |
| --- | --- |
| Device | Macbook Air M2 |
| CPU | Apple M2 |
| RAM | 16 GB |
| Storage | 256 GB |
| OS | macOS Tahoe 26.5.2 |
| Node.js | v25.9.0 |
| npm | v11.14.1 |
| Visual Studio Code | 1.121.0 |
| Git | v2.52.0 |

---

## Pembagian Branch Git

| Branch | Isi |
| --- | --- |
| `main` | README dan dokumentasi utama |
| `Modul-2` | Versi lama folder `Pertemuan02/` (Modul 2) |
| `Modul-3` | Modul 2 + Modul 3 (`P02/`, `P03/`) |
| `Modul-4` | Modul 4 (`P04/`) |

Remote: <https://github.com/eeqyy/IFRWP5151_2406118_PrakWeb.git>
