const express = require('express');
const cors = require('cors');
const path = require('path');

const menuRoutes = require('./routes/menu');
const pesananRoutes = require('./routes/pesanan');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());            // izinkan request dari origin lain (order.html, kasir.html)
app.use(express.json());    // supaya req.body bisa membaca JSON

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/pesanan', pesananRoutes);

app.use(express.static(path.join(__dirname, '..')));

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});