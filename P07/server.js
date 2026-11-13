const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Konfigurasi database
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'prakweb_modul7',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool koneksi database
const pool = mysql.createPool(dbConfig);

// Test koneksi database
pool.getConnection()
  .then(conn => {
    console.log('Database terhubung');
    conn.release();
  })
  .catch(err => {
    console.error('Gagal terhubung ke database:', err.message);
  });

// ==================== API ROUTES ====================

// GET /api/mahasiswa - Ambil semua data mahasiswa
app.get('/api/mahasiswa', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mahasiswa ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error GET mahasiswa:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data mahasiswa' });
  }
});

// GET /api/mahasiswa/:id - Ambil data mahasiswa by ID
app.get('/api/mahasiswa/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mahasiswa WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error GET mahasiswa by ID:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data mahasiswa' });
  }
});

// POST /api/mahasiswa - Tambah mahasiswa baru
app.post('/api/mahasiswa', async (req, res) => {
  try {
    const { nim, nama, jurusan, email } = req.body;
    
    // Validasi input
    if (!nim || !nama || !jurusan) {
      return res.status(400).json({ success: false, message: 'NIM, Nama, dan Jurusan wajib diisi' });
    }
    
    // Cek NIM duplikat di database
    const [existing] = await pool.query('SELECT id FROM mahasiswa WHERE nim = ?', [nim]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'NIM sudah terdaftar di database' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)',
      [nim, nama, jurusan, email || null]
    );
    
    const [newMahasiswa] = await pool.query('SELECT * FROM mahasiswa WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Mahasiswa berhasil ditambahkan', data: newMahasiswa[0] });
  } catch (error) {
    console.error('Error POST mahasiswa:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'NIM sudah terdaftar di database' });
    }
    res.status(500).json({ success: false, message: 'Gagal menambahkan mahasiswa' });
  }
});

// PUT /api/mahasiswa/:id - Update data mahasiswa
app.put('/api/mahasiswa/:id', async (req, res) => {
  try {
    const { nim, nama, jurusan, email } = req.body;
    const id = req.params.id;
    
    // Validasi input
    if (!nim || !nama || !jurusan) {
      return res.status(400).json({ success: false, message: 'NIM, Nama, dan Jurusan wajib diisi' });
    }
    
    // Cek apakah mahasiswa ada
    const [existing] = await pool.query('SELECT id FROM mahasiswa WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
    }
    
    // Cek NIM duplikat (kecuali untuk mahasiswa yang sedang diedit)
    const [duplicate] = await pool.query('SELECT id FROM mahasiswa WHERE nim = ? AND id != ?', [nim, id]);
    if (duplicate.length > 0) {
      return res.status(409).json({ success: false, message: 'NIM sudah digunakan mahasiswa lain' });
    }
    
    await pool.query(
      'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ?, email = ? WHERE id = ?',
      [nim, nama, jurusan, email || null, id]
    );
    
    const [updated] = await pool.query('SELECT * FROM mahasiswa WHERE id = ?', [id]);
    res.json({ success: true, message: 'Mahasiswa berhasil diupdate', data: updated[0] });
  } catch (error) {
    console.error('Error PUT mahasiswa:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'NIM sudah terdaftar di database' });
    }
    res.status(500).json({ success: false, message: 'Gagal mengupdate mahasiswa' });
  }
});

// DELETE /api/mahasiswa/:id - Hapus mahasiswa
app.delete('/api/mahasiswa/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    const [result] = await pool.query('DELETE FROM mahasiswa WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
    }
    
    res.json({ success: true, message: 'Mahasiswa berhasil dihapus' });
  } catch (error) {
    console.error('Error DELETE mahasiswa:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus mahasiswa' });
  }
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`API Mahasiswa: http://localhost:${PORT}/api/mahasiswa`);
});