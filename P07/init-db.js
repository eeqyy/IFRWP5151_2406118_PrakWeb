const mysql = require('mysql2/promise');
require('dotenv').config();

// Konfigurasi database dari environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'prakweb_modul7',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function initializeDatabase() {
  let connection;
  
  try {
    // Koneksi ke MySQL tanpa database dulu (untuk create database)
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    console.log('Terhubung ke MySQL Server');
    
    // Buat database jika belum ada
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    console.log(`Database '${dbConfig.database}' siap digunakan`);
    
    // Gunakan database
    await connection.query(`USE \`${dbConfig.database}\``);
    
    // Buat tabel mahasiswa
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS mahasiswa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nim VARCHAR(20) NOT NULL UNIQUE,
        nama VARCHAR(100) NOT NULL,
        jurusan VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await connection.query(createTableSQL);
    console.log('Tabel "mahasiswa" siap digunakan');
    
    // Insert data sample jika tabel kosong
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM mahasiswa');
    if (rows[0].count === 0) {
      const sampleData = [
        ['2023001', 'Ahmad Fauzi', 'Teknik Informatika', 'ahmad.fauzi@student.univ.ac.id'],
        ['2023002', 'Siti Rahma', 'Sistem Informasi', 'siti.rahma@student.univ.ac.id'],
        ['2023003', 'Budi Santoso', 'Teknik Informatika', 'budi.santoso@student.univ.ac.id'],
        ['2023004', 'Dewi Lestari', 'Manajemen Informatika', 'dewi.lestari@student.univ.ac.id'],
        ['2023005', 'Rizki Pratama', 'Teknik Komputer', 'rizki.pratama@student.univ.ac.id']
      ];
      
      for (const [nim, nama, jurusan, email] of sampleData) {
        await connection.query(
          'INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)',
          [nim, nama, jurusan, email]
        );
      }
      console.log(' Data sample mahasiswa ditambahkan');
    } else {
      console.log(`ℹ Tabel sudah berisi ${rows[0].count} data mahasiswa`);
    }
    
    console.log('\n Inisialisasi database selesai!');
    console.log(' Jalankan "npm start" untuk memulai server');
    
  } catch (error) {
    console.error('❌ Error inisialisasi database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();