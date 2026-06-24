# Kafe Khasta — Sistem Pemesanan & Kasir

Proyek tugas kuliah **Rekayasa Perangkat Lunak** — sistem pemesanan kafe berbasis web. Pelanggan pesan lewat QR di meja, kasir lihat & kelola pesanan di dashboard.

**Stack:** Express 5 + SQLite (backend) · HTML/CSS/JS vanilla (frontend)

---

## Daftar Isi

- [Cara Kerja](#cara-kerja)
- [Siapa Aja yang Pakai?](#siapa-aja-yang-pakai)
- [Struktur File](#struktur-file)
- [Cara Jalankan](#cara-jalankan)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Fitur-Fitur](#fitur-fitur)
- [Akun Login](#akun-login)
- [Tema](#tema)

---

## Cara Kerja

```
                        ┌──────────────┐
  Pelanggan scan QR ──▶ │ order.html   │ ──▶ pilih menu ──▶ pilih metode bayar
                        │ ?meja=N      │     (Tunai/QRIS/Kartu)
                        └──────┬───────┘
                               │ klik "Konfirmasi Pesanan"
                               ▼
                        ┌──────────────┐
                        │  Backend API │ ──▶ Tersimpan di database.db
                        └──────┬───────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
            ┌──────────────┐    ┌──────────────────┐
            │  kasir.html  │   │  dashboard.html  │
            │  (Kanban)    │   │  (halaman depan) │
            │              │   │                  │
            │  Baru        │   │  Tombol:         │
            │  Diproses    │   │  ├ LIHAT PESANAN │
            │  Selesai     │   │  ├ QR CODE       │
            └──────────────┘    └──────────────────┘
```

### Alur dari sisi pelanggan:
1. Scan QR code di meja → buka `order.html?meja=N`
2. Pilih menu dari sidebar (Coffee, Non Coffee, Tea, Makanan, Dessert)
3. Klik **Pesan** tiap item → masuk keranjang
4. Pilih **metode bayar** (Tunai / QRIS / Kartu debit)
5. Klik **Konfirmasi Pesanan** → **review modal** muncul (lihat semua item, total, metode bayar)
6. Klik **Pesan Sekarang** → **success screen** dengan centang hijau
7. Klik **Pesan Lagi** kalau mau order tambahan

### Alur dari sisi kasir:
1. Buka `index.html` → login (`kasir1` / `khasta123`)
2. Masuk ke `dashboard.html` → pilih **LIHAT PESANAN**
3. Di `kasir.html` lihat pesanan masuk di kolom **Baru**
4. Klik **Proses Pesanan** → pindah ke kolom **Diproses**
5. Klik **Tandai Selesai** → pindah ke kolom **Selesai**
6. Klik **Export & Reset** untuk download laporan penjualan (CSV) & kosongkan database
7. Tombol **← Kembali** di pojok kiri untuk kembali ke dashboard utama

---

## Siapa Aja yang Pakai?

| Orang | Akses | Halaman |
|-------|-------|---------|
| **Pelanggan** | Scan QR di meja | `order.html?meja=N` — lihat menu, order, pilih bayar |
| **Kasir** | Login via browser | `index.html` → `dashboard.html` → `kasir.html` |
| **Admin/Owner** | Buka langsung | `qr.html` — generate QR code tiap meja |

> Pelanggan tidak pernah lihat halaman login. QR langsung ke halaman order.

---

## Struktur File

```
Kafe-Khasta/
│
├── index.html          Halaman login kasir
├── dashboard.html      Halaman utama setelah login (tombol: Lihat Pesanan, QR)
├── order.html          Halaman order pelanggan (sidebar menu + keranjang)
├── kasir.html          Dashboard kasir (kanban: Baru/Diproses/Selesai)
├── qr.html             Generate QR code per meja (1-20, bisa diatur)
├── navbar.html         Komponen navbar yang di-load ke halaman lain
│
├── style.css           Style untuk dashboard.html
├── order.css           Style untuk order.html
├── kasir.css           Style untuk kasir.html
├── keranjang.css       Style untuk panel keranjang (floating cart)
├── navbar.css          Style untuk navbar
│
├── navbar.js           Load navbar.html ke dalam halaman
├── keranjang.js        Logic keranjang (tambah/kurang item, pilih bayar, kirim)
├── kasir.js            Logic dashboard kasir (ambil pesanan, update status, export)
│
├── backend/
│   ├── server.js       Entry point Express (port 3000)
│   ├── database.js     Koneksi & schema SQLite (3 tabel)
│   ├── seed.js         Isi data menu (40 item)
│   ├── routes/
│   │   ├── menu.js     GET /api/menu
│   │   └── pesanan.js  POST / GET / PATCH / DELETE /api/pesanan
│   └── package.json
│
├── gambar/             Logo & gambar cafe (3 file)
│
└── README.md
```

---

## Cara Jalankan

Butuh **2 terminal** secara bersamaan.

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Isi data menu ke database

```bash
cd backend
node seed.js
```

Perintah ini akan membuat file `database.db` dan mengisinya dengan 40 item menu.

> Hanya perlu dijalankan **sekali saja**. Kalau sudah pernah, skip langkah ini.

### 3. Terminal 1 — Jalankan server backend

```bash
cd backend
npm start
```

Atau:

```bash
cd backend
node server.js
```

Server berjalan di `http://localhost:3000`.

### 4. Terminal 2 — Expose dengan ngrok

```bash
ngrok http 3000
```

Akan muncul URL publik seperti `https://xxxx.ngrok-free.dev`. URL ini yang dipakai untuk QR code dan diakses pelanggan.

### 5. Buka di browser

| Halaman | URL | Dipakai Oleh |
|---------|-----|--------------|
| Login kasir | `/index.html` | Kasir |
| Dashboard | `/dashboard.html` | Setelah login |
| Order menu | `/order.html?meja=N` | Pelanggan (scan QR) |
| Dashboard kasir | `/kasir.html` | Kasir |
| Generate QR | `/qr.html` | Admin |

---

## API Endpoints

### Menu

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/menu` | Ambil daftar semua menu |

### Pesanan

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| POST | `/api/pesanan` | Buat pesanan baru (kirim dari keranjang) |
| GET | `/api/pesanan` | Ambil semua pesanan (untuk dashboard kasir) |
| PATCH | `/api/pesanan/:id` | Update status pesanan (baru → diproses → selesai) |
| DELETE | `/api/pesanan` | Hapus semua pesanan (setelah export) |

Status pesanan: `baru` → `diproses` → `selesai`

---

## Database Schema

SQLite — 3 tabel di `backend/database.db`:

```
menu
├── id              INTEGER (primary key)
├── nama            TEXT
├── harga           INTEGER
└── kategori        TEXT

pesanan
├── id              INTEGER (primary key)
├── nomor_meja      INTEGER
├── status          TEXT ('baru', 'diproses', 'selesai')
├── metode_pembayaran  TEXT ('Tunai', 'QRIS', 'Kartu')
└── waktu           DATETIME (otomatis)

pesanan_item
├── id              INTEGER (primary key)
├── pesanan_id      INTEGER (foreign key → pesanan.id)
├── nama_menu       TEXT
├── harga           INTEGER
└── jumlah          INTEGER
```

---

## Fitur-Fitur

### Order dari Meja (Pelanggan)
- Scan QR → buka halaman menu
- Sidebar kategori: Coffee Base, Non Coffee, Tea, Main Dishes, Dessert
- Floating keranjang dengan badge jumlah item
- Bisa tambah/kurang jumlah item

### Review & Konfirmasi Pesanan
- Setelah klik **Konfirmasi Pesanan**, muncul modal ringkasan
- Tampil daftar item, jumlah, subtotal, total, dan metode bayar
- Tombol **Kembali** untuk edit, **Pesan Sekarang** untuk kirim

### Tampilan Sukses (Bukan Alert)
- Setelah pesanan berhasil, muncul layar penuh dengan animasi centang
- Informasi: "Pesanan Berhasil! Silakan tunggu di meja"
- Tombol **Pesan Lagi** untuk order tambahan tanpa reload

### Metode Pembayaran
- Tersedia 3 pilihan: **Tunai**, **QRIS**, **Kartu Debit/Kredit**
- Dipilih pelanggan sebelum konfirmasi pesanan
- Tersimpan di database & tampil di dashboard kasir

### Dashboard Kasir (Kanban)
- 3 kolom: **Baru** → **Diproses** → **Selesai**
- Setiap kartu menampilkan: nomor meja, metode bayar, daftar item, total harga
- Klik tombol untuk pindahkan status
- Auto-refresh setiap 5 detik

### Export & Reset
- Tombol **⬇ Export & Reset** di pojok kanan atas dashboard kasir
- Download file CSV (bisa dibuka Excel/Google Sheets)
- Data per-item: ID, Meja, Status, Metode Bayar, Waktu, Menu, Harga, Jumlah, Subtotal
- Grand total otomatis di baris terakhir
- Setelah download, database otomatis dikosongkan

### QR Code Generator
- Input jumlah meja (1-20) — tinggal ganti angka, klik Generate
- QR otomatis pakai URL tempat `qr.html` dibuka (`window.location.origin`)
- Ukuran QR 250×250 px — ideal untuk dicetak & ditempel di meja

---

## Akun Login

| Username | Password |
|----------|----------|
| `kasir1` | `khasta123` |

> Login hanya client-side (hardcoded di JavaScript). Cocok untuk tugas kuliah / demo.

---

## Tema

| Elemen | Warna |
|--------|-------|
| Background navbar | `#2b1b19` (coklat tua) |
| Aksen utama | `#c28b4e` (emas) |
| Hover | `#d4a373` (krem) |
| Font | Poppins (Google Fonts) |
| Ikon | Font Awesome 6 |
