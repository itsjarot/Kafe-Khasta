#  Kafe Khasta — Sistem Pemesanan & Kasir

Rekaya perangkat lunak - pemesanan kafe berbasis web dari meja. Express 5 + SQLite + HTML/CSS/JS vanilla.

---

##  Cara Kerja

```
Pelanggan scan QR  ──  order.html?meja=N  ──  pilih menu  ──  tambah ke keranjang  ──  KIRIM
                                                                                        │
                                                                                        ▼
                                                                              Backend Express
                                                                              (database.db)
                                                                                        │
                                                                                        ▼
Kasir login  ──  kasir.html  <──  dashboard.html  <──  index.html (login)
     │
     ├── Baru     : lihat pesanan masuk
     ├── Diproses : klik "Proses"
     └── Selesai  : klik "Tandai Selesai"
```

---

##  Struktur File

```
Kafe-Khasta/
│
├── index.html          Halaman login kasir
├── dashboard.html      Halaman utama setelah login
├── order.html          Halaman pemesanan pelanggan
├── kasir.html          Dashboard kasir
├── qr.html             Generator QR Code per meja
├── navbar.html         Komponen navbar
│
├── style.css           Style dashboard
├── order.css           Style halaman order
├── kasir.css           Style dashboard kasir
├── keranjang.css       Style floating keranjang
├── navbar.css          Style navbar
│
├── navbar.js           Load navbar ke halaman
├── keranjang.js        Logic keranjang belanja
├── kasir.js            Logic dashboard kasir
│
├── backend/
│   ├── server.js       Entry point Express (port 3000)
│   ├── database.js     Koneksi & schema SQLite
│   ├── seed.js         Isi data menu
│   ├── routes/
│   │   ├── menu.js     GET /api/menu
│   │   └── pesanan.js  POST / GET / PATCH /api/pesanan
│   └── package.json
│
├── gambar/             Logo & gambar cafe
│
└── README.md
```

---

##  Cara Jalankan

Butuh **2 terminal** secara bersamaan.

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Terminal 1 — Jalankan server backend

```bash
cd backend
npm start
```

Atau manual:

```bash
cd backend
node server.js
```

Server berjalan di `http://localhost:3000`.

### 3. Terminal 2 — Expose dengan ngrok

```bash
ngrok http 3000
```

Akses publik via URL ngrok (misal: `https://xxxx.ngrok-free.dev`).

### 4. Buka di browser


| Halaman         | URL                  | Pengguna      |
| --------------- | -------------------- | ------------- |
| Login kasir     | `/index.html`        | Kasir         |
| Dashboard       | `/dashboard.html`    | Setelah login |
| Order menu      | `/order.html?meja=N` | Pelanggan     |
| Dashboard kasir | `/kasir.html`        | Kasir         |
| Generate QR     | `/qr.html`           | Admin         |


> Pelanggan tidak pernah lewat login. QR langsung ke `order.html?meja=N`.

---

##  API Endpoints

### Menu


| Method | Endpoint    | Fungsi           |
| ------ | ----------- | ---------------- |
| GET    | `/api/menu` | Ambil semua menu |


### Pesanan


| Method | Endpoint           | Fungsi                |
| ------ | ------------------ | --------------------- |
| POST   | `/api/pesanan`     | Buat pesanan baru     |
| GET    | `/api/pesanan`     | Ambil semua pesanan   |
| PATCH  | `/api/pesanan/:id` | Update status pesanan |


Status: `baru` > `diproses` > `selesai`

---

##  Database Schema

SQLite (`backend/database.db`) — 3 tabel:

```
menu           (id, nama, harga, kategori)
pesanan        (id, nomor_meja, status, waktu)
pesanan_item   (id, pesanan_id, nama_menu, harga, jumlah)
               └── FK ke pesanan(id)
```

---

##  Akun Login


| Username | Password    |
| -------- | ----------- |
| `kasir1` | `khasta123` |


> Login client-side. Cocok untuk tugas kuliah / demo.

---

##  Tema


| Elemen            | Warna          |
| ----------------- | -------------- |
| Background navbar | `#2b1b19`      |
| Aksen emas        | `#c28b4e`      |
| Hover krem        | `#d4a373`      |
| Font              | Poppins        |
| Ikon              | Font Awesome 6 |


---

##  Kontributor

Dikerjakan oleh tim untuk tugas kuliah RPL.