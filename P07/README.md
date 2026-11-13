# Modul 7 - Full-Stack JavaScript CRUD Mahasiswa

Aplikasi CRUD (Create, Read, Update, Delete) data mahasiswa menggunakan:
- **Frontend**: HTML, CSS, Vanilla JavaScript (ES6+)
- **Backend**: Node.js + Express.js
- **Database**: MySQL (Laragon)

## 🚀 Fitur Utama

### 1. CRUD Mahasiswa
- **Create**: Tambah data mahasiswa baru (NIM, Nama, Jurusan, Email)
- **Read**: Tampilkan daftar mahasiswa dalam tabel
- **Update**: Edit data mahasiswa yang sudah ada
- **Delete**: Hapus data mahasiswa dengan konfirmasi

### 2. Fitur Interaktif (3 Fitur)

#### 🔍 Fitur 1: Kolom Pencarian Real-Time
- Input pencarian di atas tabel
- Event listener `input` memfilter tabel secara instan
- Menggunakan `listMahasiswa.filter(...)` untuk pencarian
- Mencari di kolom: NIM, Nama, Jurusan, Email

#### ⚠️ Fitur 2: Validasi NIM Duplikat di Frontend
- Validasi sebelum data dikirim ke backend via `fetch()`
- Menggunakan method `.some()` untuk cek NIM di `listMahasiswa`
- Jika NIM sudah ada: batalkan submit & tampilkan alert `"NIM sudah terdaftar!"`

#### 📊 Fitur 3: Indikator Counter Total Mahasiswa
- Teks di atas tabel: `"Total Mahasiswa Terdaftar: X Orang"`
- Otomatis terupdate setiap kali data ditambah/dihapus
- Menggunakan `listMahasiswa.length`

## 📦 Instalasi & Menjalankan

### Prasyarat
- Node.js v18+
- MySQL (Laragon/XAMPP/MySQL standalone)
- npm

### Langkah-langkah

1. **Masuk ke folder project**
```bash
cd P07
```

2. **Install dependencies**
```bash
npm install
```

3. **Konfigurasi Database**
   - Buka file `.env`
   - Sesuaikan `DB_USER`, `DB_PASSWORD` dengan MySQL Anda
   - Pastikan MySQL server berjalan (Laragon: Start All)

4. **Inisialisasi Database**
```bash
npm run init-db
```
   Output:
   ```
   ✅ Terhubung ke MySQL Server
   ✅ Database 'prakweb_modul7' siap digunakan
   ✅ Tabel "mahasiswa" siap digunakan
   ✅ Data sample mahasiswa ditambahkan
   🎉 Inisialisasi database selesai!
   ```

5. **Jalankan Server**
```bash
npm start
```
   Server berjalan di: `http://localhost:3000`

## 📁 Struktur Project

```
P07/
├── package.json          # Dependencies & scripts
├── server.js             # Express server + API routes
├── init-db.js            # Script inisialisasi database
├── .env                  # Konfigurasi environment
├── public/
│   ├── index.html        # Frontend HTML
│   ├── script.js         # Frontend JavaScript (3 fitur interaktif)
│   └── style.css         # Styling
└── README.md             # Dokumentasi ini
```

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/mahasiswa` | Ambil semua mahasiswa |
| GET | `/api/mahasiswa/:id` | Ambil mahasiswa by ID |
| POST | `/api/mahasiswa` | Tambah mahasiswa baru |
| PUT | `/api/mahasiswa/:id` | Update mahasiswa |
| DELETE | `/api/mahasiswa/:id` | Hapus mahasiswa |

## 💡 Teknologi yang Digunakan

- **Express.js** - Web framework Node.js
- **mysql2** - MySQL client untuk Node.js (Promise-based)
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Load environment variables
- **Vanilla JS** - Fetch API, DOM Manipulation, ES6+

## 🎯 Validasi & Error Handling

- **Frontend**: Validasi required field, format email, NIM duplikat (`.some()`)
- **Backend**: Validasi required field, unique constraint NIM di database
- **Error Handling**: Try-catch di semua async function, response JSON konsisten

## 📝 Catatan

- Pastikan MySQL (Laragon) sudah running sebelum `npm run init-db`
- Default port: 3000 (bisa diubah di `.env`)
- Data sample: 5 mahasiswa dummy otomatis dibuat saat init-db pertama kali

## 📤 Git Commands

```bash
git add .
git commit -m "feat: menyelesaikan tugas modul 7 crud fullstack javascript mysql laragon"
git push -u origin pertemuan-7
```