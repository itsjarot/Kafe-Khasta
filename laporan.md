# LAPORAN PROYEK RPL
## Sistem Informasi Pemesanan Kafe Berbasis Web
### Kafe Khasta

---

## 1. Pendahuluan

### 1.1 Latar Belakang
Kafe Khasta adalah sebuah kafe yang membutuhkan sistem pemesanan digital untuk menggantikan proses order manual. Pelanggan sering kesulitan memanggil pelayan saat kafe ramai, dan kasir kewalahan mencatat pesanan satu per satu. Sistem ini dibangun agar pelanggan bisa order mandiri lewat QR code di meja, dan kasir bisa melihat pesanan masuk secara real-time dalam satu dashboard.

### 1.2 Tujuan
- Memudahkan pelanggan memesan makanan/minuman tanpa harus menunggu pelayan
- Membantu kasir mengelola pesanan secara terstruktur (Baru > Diproses > Selesai)
- Menyediakan data penjualan yang bisa diexport untuk analisa pemilik

### 1.3 Ruang Lingkup
- 3 peran pengguna: Pelanggan, Kasir, Admin
- 5 kategori menu: Coffee Base, Non Coffee, Tea, Main Dishes, Dessert
- 40 item menu statis
- 3 status pesanan: baru, diproses, selesai
- 3 metode pembayaran: Tunai, QRIS, Kartu Debit/Kredit

---

## 2. Teknologi yang Digunakan

| Komponen | Teknologi | Alasan |
|----------|-----------|--------|
| Backend | Express 5 (Node.js) | Ringan, cepat setup, cocok untuk REST API |
| Database | SQLite3 | Zero-config, file-based, tanpa install database server |
| Frontend | HTML + CSS + JavaScript Vanilla | Tanpa framework, langsung jalan di browser |
| Font | Poppins (Google Fonts) | Mendukung tampilan modern |
| Ikon | Font Awesome 6 | Ikon siap pakai untuk UI |
| QR Code | QRCode.js | Library client-side untuk generate QR |
| Tunneling | ngrok | Expose localhost ke internet untuk demo |

---

## 3. Arsitektur Sistem

### 3.1 Diagram Alur

```
                      +------------------+
Pelanggan scan QR --> |   order.html     | --> pilih menu + metode bayar
                      |   ?meja=N        |
                      +--------+---------+
                               | POST /api/pesanan
                               v
                      +------------------+
                      |   Express API    | --> SQLite database.db
                      |   (port 3000)    |
                      +--------+---------+
                               | GET /api/pesanan
                    +----------+----------+
                    v                     v
            +----------------+   +--------------------+
            |   kasir.html   |   |   dashboard.html   |
            |   (Kanban)     |   |   (halaman depan)  |
            +----------------+   +--------------------+
```

### 3.2 Arsitektur Backend

Backend menggunakan arsitektur routing sederhana:

```
backend/
+-- server.js          Entry point, middleware, static files
+-- database.js        Koneksi SQLite + schema + migrations
+-- seed.js            Seeder data menu
+-- routes/
    +-- menu.js        Endpoint menu
    +-- pesanan.js     Endpoint pesanan (CRUD)
```

### 3.3 Arsitektur Frontend

Frontend terpisah per halaman (multi-page), tidak menggunakan SPA framework:

- `index.html` - Login kasir (halaman awal)
- `dashboard.html` - Halaman utama setelah login
- `order.html` - Halaman order pelanggan
- `kasir.html` - Dashboard kasir (kanban board)
- `qr.html` - Generator QR Code

---

## 4. Database Design

### 4.1 Entity Relationship Diagram

```
+-----------------+     +--------------------+     +-----------------------+
|     menu        |     |     pesanan        |     |   pesanan_item        |
+-----------------+     +--------------------+     +-----------------------+
| id (PK)         |     | id (PK)            |     | id (PK)               |
| nama            |     | nomor_meja         +<----+ pesanan_id (FK) ------+
| harga           |     | status             |     | nama_menu             |
| kategori        |     | metode_pembayaran  |     | harga                 |
+-----------------+     | waktu              |     | jumlah                |
                        +--------------------+     +-----------------------+
```

### 4.2 Spesifikasi Tabel

**menu** - Menyimpan daftar menu kafe (40 item):
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `nama` TEXT NOT NULL - Nama menu
- `harga` INTEGER NOT NULL - Harga dalam rupiah
- `kategori` TEXT NOT NULL - coffeeBasse, nonCoffee, tea, mainDishes, dessert

**pesanan** - Menyimpan data pesanan:
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `nomor_meja` INTEGER NOT NULL - Nomor meja pelanggan
- `status` TEXT DEFAULT 'baru' - Status: baru, diproses, selesai
- `metode_pembayaran` TEXT DEFAULT 'Tunai' - Tunai, QRIS, Kartu
- `waktu` DATETIME DEFAULT CURRENT_TIMESTAMP - Waktu pemesanan

**pesanan_item** - Menyimpan item per pesanan (relasi one-to-many):
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `pesanan_id` INTEGER NOT NULL - Foreign key ke pesanan.id
- `nama_menu` TEXT NOT NULL - Nama menu (denormalized)
- `harga` INTEGER NOT NULL - Harga satuan
- `jumlah` INTEGER NOT NULL - Jumlah yang dipesan

---

## 5. API Endpoints

### 5.1 Menu

| Method | Endpoint | Request Body | Response | Fungsi |
|--------|----------|-------------|----------|--------|
| GET | `/api/menu` | - | Array menu | Ambil semua menu |

### 5.2 Pesanan

| Method | Endpoint | Request Body | Response | Fungsi |
|--------|----------|-------------|----------|--------|
| POST | `/api/pesanan` | `{ nomor_meja, items[], metode_pembayaran }` | `{ message, pesanan_id }` | Buat pesanan baru |
| GET | `/api/pesanan` | - | Array pesanan + items | Ambil semua pesanan |
| PATCH | `/api/pesanan/:id` | `{ status }` | `{ message }` | Update status pesanan |
| DELETE | `/api/pesanan` | - | `{ message }` | Hapus semua pesanan |

### 5.3 Status Pesanan
`baru` > (kasir klik Proses) > `diproses` > (kasir klik Selesai) > `selesai`

---

## 6. Fitur-Fitur Sistem

### 6.1 Order dari Meja (Pelanggan)
- Scan QR code di meja, otomatis buka `order.html?meja=N`
- Sidebar kategori: Coffee Base, Non Coffee, Tea, Main Dishes, Dessert
- Floating keranjang dengan badge jumlah item
- Bisa tambah/kurang jumlah item sebelum konfirmasi

### 6.2 Metode Pembayaran
- 3 pilihan: Tunai, QRIS, Kartu Debit/Kredit
- Dipilih pelanggan sebelum konfirmasi pesanan
- Tersimpan di database dan tampil di dashboard kasir

### 6.3 Review & Konfirmasi Pesanan
- Setelah klik "Konfirmasi Pesanan", muncul modal ringkasan
- Menampilkan daftar item, subtotal per item, total, dan metode bayar
- Tombol "Kembali" untuk edit pesanan
- Tombol "Pesan Sekarang" untuk mengirim

### 6.4 Tampilan Sukses
- Setelah pesanan berhasil dikirim, muncul layar penuh dengan animasi centang
- Informasi: "Pesanan Berhasil! Silakan tunggu di meja N"
- Tombol "Pesan Lagi" untuk order tambahan tanpa reload halaman

### 6.5 Dashboard Kasir (Kanban)
- 3 kolom status: Baru, Diproses, Selesai
- Setiap kartu menampilkan: nomor meja, metode bayar, daftar item, total harga, waktu
- Klik tombol untuk memindahkan status (Proses > Selesai)
- Auto-refresh setiap 5 detik
- Tombol "<- Kembali" ke dashboard utama

### 6.6 Export & Reset Data
- Tombol "Export & Reset" di dashboard kasir
- Download file CSV dengan data per-item (ID, Meja, Status, Metode Bayar, Waktu, Menu, Harga, Jumlah, Subtotal)
- Grand total otomatis di baris terakhir
- File CSV bisa dibuka di Excel atau Google Sheets
- Setelah download, database otomatis dikosongkan

### 6.7 Generator QR Code
- Input jumlah meja (1-20), bisa diatur sesuai kebutuhan
- QR code otomatis menggunakan URL tempat halaman dibuka
- Ukuran QR 250x250 pixel, ideal untuk dicetak
- URL yang di-generate: `{BASE_URL}/order.html?meja=N`

### 6.8 Halaman Login
- Halaman login untuk kasir dengan desain tema kopi
- Kredensial: username `kasir1`, password `khasta123`
- Setelah login berhasil, redirect ke halaman dashboard

---

## 7. Cara Penggunaan

### 7.1 Menjalankan Server
1. Install dependencies: `cd backend && npm install`
2. Seed database: `node seed.js` (cukup sekali)
3. Jalankan server: `npm start` atau `node server.js`
4. Server berjalan di `http://localhost:3000`
5. (Opsional) Expose dengan ngrok: `ngrok http 3000`

### 7.2 Skenario Pelanggan
1. Scan QR code di meja (atau buka `/order.html?meja=1`)
2. Pilih kategori menu dari sidebar
3. Klik "Pesan" pada item yang diinginkan
4. Buka keranjang (floating button kanan bawah)
5. Pilih metode pembayaran
6. Klik "Konfirmasi Pesanan" > review > "Pesan Sekarang"
7. Pesanan masuk ke dashboard kasir

### 7.3 Skenario Kasir
1. Buka halaman login (`/index.html`)
2. Masuk dengan akun kasir
3. Di dashboard, klik "LIHAT PESANAN"
4. Lihat pesanan baru di kolom "Baru"
5. Klik "Proses Pesanan" > pindah ke "Diproses"
6. Klik "Tandai Selesai" > pindah ke "Selesai"
7. Untuk export laporan, klik "Export & Reset"

### 7.4 Skenario Admin
1. Buka `/qr.html`
2. Atur jumlah meja (1-20)
3. Klik "Generate"
4. Cetak QR code dan tempel di meja

---

## 8. Pembagian Tugas Tim

*(Sesuaikan dengan anggota tim masing-masing)*

| Anggota | Peran | Kontribusi |
|---------|-------|------------|
| [Nama 1] | Backend Developer | Server, database, API routes, seeding |
| [Nama 2] | Frontend Developer | order.html, keranjang.js, keranjang.css |
| [Nama 3] | Frontend Developer | kasir.html, kasir.js, dashboard.html |
| [Nama 4] | UI/UX & Integrasi | navbar, qr.html, login page, styling |

---

## 9. Kelebihan dan Kekurangan

### 9.1 Kelebihan
- **Sederhana dan ringan** - Tanpa framework frontend, tanpa database server, langsung jalan
- **QR-based ordering** - Pelanggan tidak perlu install aplikasi atau login
- **Real-time dashboard** - Kasir melihat pesanan baru dalam 5 detik
- **Export data** - Pemilik bisa download laporan penjualan dalam format CSV
- **Mobile responsive** - Tampilan menyesuaikan layar HP dan desktop

### 9.2 Kekurangan
- **Login tidak aman** - Kredensial hardcoded di client-side JavaScript
- **Menu hardcode di frontend** - Perubahan menu harus edit 2 tempat (database + HTML)
- **Database SQLite** - Tidak cocok untuk concurrent tinggi atau production
- **Tidak ada testing** - Belum ada automated test (unit test, integration test)
- **Tidak ada autentikasi API** - Semua endpoint bisa diakses tanpa token
- **Data menu statis** - Tidak ada fitur CRUD menu dari dashboard

### 9.3 Saran Pengembangan
- Migrasi database ke PostgreSQL atau MySQL
- Tambah autentikasi JWT untuk keamanan API
- Pindahkan data menu dari hardcode ke API
- Tambah halaman admin untuk CRUD menu
- Implementasi WebSocket untuk notifikasi real-time
- Tambah fitur cetak struk otomatis
- Deploy menggunakan Docker

---

## 10. Kesimpulan

Sistem informasi pemesanan kafe Kafe Khasta berhasil dibangun menggunakan Express 5, SQLite, dan HTML/CSS/JS vanilla. Sistem mencakup tiga peran pengguna - pelanggan, kasir, dan admin - dengan alur yang jelas dari scan QR hingga penyajian pesanan.

Fitur utama meliputi pemesanan mandiri via QR code, dashboard kasir dengan kanban board, pemilihan metode pembayaran, export data penjualan, dan generator QR code yang dinamis.

Sistem ini cocok untuk tugas kuliah dan demo karena ringan, mudah dijalankan, dan mencakup flow lengkap sebuah sistem informasi. Untuk pengembangan ke tahap production, diperlukan peningkatan pada sisi keamanan, database, dan manajemen data menu.

---

## Referensi

- Express 5 Documentation - https://expressjs.com/
- SQLite3 Documentation - https://www.sqlite.org/docs.html
- QRCode.js - https://github.com/davidshimjs/qrcodejs
- ngrok - https://ngrok.com/
