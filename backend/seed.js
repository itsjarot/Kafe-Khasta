const db = require('./database');

const menuItems = [
  // Coffee Basse
  { nama: 'Cold White', harga: 22000, kategori: 'Coffee Basse' },
  { nama: 'Butterscotch Machiato', harga: 22000, kategori: 'Coffee Basse' },
  { nama: 'Salted Caramel Coffe Milk', harga: 20000, kategori: 'Coffee Basse' },
  { nama: 'Kopi Susu Gula Aren', harga: 20000, kategori: 'Coffee Basse' },
  { nama: 'Huzelnut Coffe Latte', harga: 20000, kategori: 'Coffee Basse' },
  { nama: 'Mochacino', harga: 22000, kategori: 'Coffee Basse' },
  { nama: 'Cappucino', harga: 20000, kategori: 'Coffee Basse' },
  { nama: 'Affogato', harga: 20000, kategori: 'Coffee Basse' },
  { nama: 'Kopi Khasta', harga: 18000, kategori: 'Coffee Basse' },
  { nama: 'Vietnam Coffe', harga: 20000, kategori: 'Coffee Basse' },
  { nama: 'Americano', harga: 15000, kategori: 'Coffee Basse' },

  // Non Coffee
  { nama: 'Red Velvet', harga: 22000, kategori: 'Non Coffee' },
  { nama: 'Matcha', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Rum Regal Milk', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Chocolate', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Milo', harga: 18000, kategori: 'Non Coffee' },
  { nama: 'Milk Shake Vanila', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Milk Shake Chocolate', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Milk Shake Strawberry', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Biscoff Latte', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Milk Oreo', harga: 20000, kategori: 'Non Coffee' },
  { nama: 'Milk Biscoff', harga: 25000, kategori: 'Non Coffee' },

  // Tea
  { nama: 'Lychee Tea', harga: 18000, kategori: 'Tea' },
  { nama: 'Thai Tea', harga: 18000, kategori: 'Tea' },
  { nama: 'Green Tea', harga: 18000, kategori: 'Tea' },
  { nama: 'Lemon Tea', harga: 15000, kategori: 'Tea' },
  { nama: 'Milk Tea', harga: 15000, kategori: 'Tea' },
  { nama: 'Tea', harga: 13000, kategori: 'Tea' },

  // Main Dishes
  { nama: 'Chiken Katsu', harga: 25000, kategori: 'Main Dishes' },
  { nama: 'Nasi Goreng Khasta', harga: 25000, kategori: 'Main Dishes' },
  { nama: 'Indomie Goreng', harga: 15000, kategori: 'Main Dishes' },
  { nama: 'Indomie Soto', harga: 15000, kategori: 'Main Dishes' },
  { nama: 'Salted Egg', harga: 25000, kategori: 'Main Dishes' },
  { nama: 'Mie Khasta', harga: 15000, kategori: 'Main Dishes' },
  { nama: 'Nasi Goreng Merah', harga: 25000, kategori: 'Main Dishes' },

  // Dessert
  { nama: 'Pisang Nugget', harga: 20000, kategori: 'Dessert' },
  { nama: 'Roti Bakar Coklat Keju', harga: 18000, kategori: 'Dessert' },
  { nama: 'Roti Bakar Coklat', harga: 16000, kategori: 'Dessert' },
  { nama: 'Roti Bakar Keju', harga: 16000, kategori: 'Dessert' },
  { nama: 'Kentang Goreng', harga: 18000, kategori: 'Dessert' },
];

db.serialize(() => {
  // Mengosongkan tabel menu terlebih dahulu biar ga ada duplikat tabel
  db.run('DELETE FROM menu', (err) => {
    if (err) return console.error('Gagal hapus data lama:', err.message);
    console.log('Tabel menu dikosongkan.');
  });

  const stmt = db.prepare('INSERT INTO menu (nama, harga, kategori) VALUES (?, ?, ?)');

  menuItems.forEach((item) => {
    stmt.run(item.nama, item.harga, item.kategori);
  });

  stmt.finalize(() => {
    console.log(`Berhasil seed ${menuItems.length} menu ke database.`);
    db.close();
  });
});