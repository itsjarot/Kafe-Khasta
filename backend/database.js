const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Buka file "database".db
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Gagal konek database:', err.message);
  } else {
    console.log('Berhasil konek ke database.db');
  }
});

// Create database 
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      harga INTEGER NOT NULL,
      kategori TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pesanan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomor_meja INTEGER NOT NULL,
      status TEXT DEFAULT 'baru',
      metode_pembayaran TEXT DEFAULT 'Tunai',
      waktu DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: tambah kolom metode_pembayaran kalau DB lama
  db.run("ALTER TABLE pesanan ADD COLUMN metode_pembayaran TEXT DEFAULT 'Tunai'", (err) => {
    if (err && err.message && !err.message.includes('duplicate column')) {
      console.error('Migration error:', err.message);
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS pesanan_item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pesanan_id INTEGER NOT NULL,
      nama_menu TEXT NOT NULL,
      harga INTEGER NOT NULL,
      jumlah INTEGER NOT NULL,
      FOREIGN KEY (pesanan_id) REFERENCES pesanan(id)
    )
  `);
});

// Export koneksi db supaya bisa di panggil file lain
module.exports = db;