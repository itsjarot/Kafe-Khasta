const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'kafe_khasta.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Gagal koneksi ke database:', err.message);
  } else {
    console.log('Terhubung ke database SQLite');
  }
});

db.serialize(() => {

  // Tabel menu
  db.run(`CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL,
    kategori TEXT NOT NULL
  )`);

  // Tabel order
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_pelanggan TEXT NOT NULL,
    total_harga INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabel item order
  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    menu_id INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_id) REFERENCES menu(id)
  )`);

});

module.exports = db;