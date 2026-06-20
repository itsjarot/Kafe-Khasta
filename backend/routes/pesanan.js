const express = require('express');
const router = express.Router();
const db = require('../database');

// POST /api/pesanan -> buat pesanan baru
router.post('/', (req, res) => {
  const { nomor_meja, items } = req.body;

  // Validasi input dasar
  if (!nomor_meja || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'nomor_meja dan items wajib diisi' });
  }

  // 1. Insert ke tabel pesanan
  db.run(
    'INSERT INTO pesanan (nomor_meja, status) VALUES (?, ?)',
    [nomor_meja, 'baru'],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const pesananId = this.lastID; // ID pesanan yang baru dibuat

      // 2. Insert tiap item ke tabel pesanan_item
      const stmt = db.prepare(
        'INSERT INTO pesanan_item (pesanan_id, nama_menu, harga, jumlah) VALUES (?, ?, ?, ?)'
      );

      items.forEach((item) => {
        stmt.run(pesananId, item.nama, item.harga, item.jumlah);
      });

      stmt.finalize((err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Pesanan berhasil dibuat', pesanan_id: pesananId });
      });
    }
  );
});

// GET /api/pesanan -> ambil semua pesanan (untuk dashboard kasir)
router.get('/', (req, res) => {
  // Ambil semua pesanan
  db.all('SELECT * FROM pesanan ORDER BY waktu DESC', [], (err, pesananRows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (pesananRows.length === 0) {
      return res.json([]);
    }

    // Ambil semua item sekaligus, lalu kelompokkan per pesanan
    db.all('SELECT * FROM pesanan_item', [], (err, itemRows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const result = pesananRows.map((pesanan) => {
        const items = itemRows.filter((item) => item.pesanan_id === pesanan.id);
        return { ...pesanan, items };
      });

      res.json(result);
    });
  });
});

// PATCH /api/pesanan/:id -> update status pesanan
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatus = ['baru', 'diproses', 'selesai'];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: 'status tidak valid' });
  }

  db.run('UPDATE pesanan SET status = ? WHERE id = ?', [status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }
    res.json({ message: 'Status berhasil diperbarui' });
  });
});

module.exports = router;