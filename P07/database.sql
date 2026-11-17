-- Database dummy untuk P07 (sesuai repo: prakweb_modul7)
-- Jalankan di phpMyAdmin MAMP atau MySQL client

CREATE DATABASE IF NOT EXISTS prakweb_modul7;
USE prakweb_modul7;

CREATE TABLE IF NOT EXISTS mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nim VARCHAR(20) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  jurusan VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data dummy (aman dijalankan ulang)
INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES
('2023001', 'Ahmad Fauzi', 'Teknik Informatika', 'ahmad.fauzi@student.univ.ac.id'),
('2023002', 'Siti Rahma', 'Sistem Informasi', 'siti.rahma@student.univ.ac.id'),
('2023003', 'Budi Santoso', 'Teknik Informatika', 'budi.santoso@student.univ.ac.id'),
('2023004', 'Dewi Lestari', 'Manajemen Informatika', 'dewi.lestari@student.univ.ac.id'),
('2023005', 'Rizki Pratama', 'Teknik Komputer', 'rizki.pratama@student.univ.ac.id')
ON DUPLICATE KEY UPDATE
  nama = VALUES(nama),
  jurusan = VALUES(jurusan),
  email = VALUES(email);
