const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/menu -> ambil semua menu
router.get('/', (req, res) => {
  db.all('SELECT * FROM menu', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;