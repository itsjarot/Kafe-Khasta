// ===== SETUP =====
const params = new URLSearchParams(window.location.search);
const nomorMeja = params.get('meja') || 1;

const API_URL = '/api';

let keranjang = []; // { nama, harga, jumlah }
let metodePembayaran = 'Tunai';


// ===== BUAT UI KERANJANG =====
function buatUIKeranjang() {
  // Floating button
  const fab = document.createElement('div');
  fab.id = 'cart-fab';
  fab.innerHTML = `🛒 <span id="cart-count">0</span>`;
  document.body.appendChild(fab);

  // Panel keranjang (awalnya hidden)
  const panel = document.createElement('div');
  panel.id = 'cart-panel';
  panel.classList.add('hidden');
  panel.innerHTML = `
    <h3>Keranjang - Meja ${nomorMeja}</h3>
    <div id="cart-items"></div>
    <div id="cart-total"></div>
    <div id="cart-payment">
      <label>Metode Bayar</label>
      <select id="payment-select">
        <option value="Tunai">Tunai</option>
        <option value="QRIS">QRIS</option>
        <option value="Kartu">Kartu Debit/Kredit</option>
      </select>
    </div>
    <button id="cart-confirm">Konfirmasi Pesanan</button>
  `;
  document.body.appendChild(panel);

  // Toggle panel saat FAB diklik
  fab.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });

  // Klik tombol konfirmasi
  document.getElementById('cart-confirm').addEventListener('click', kirimPesanan);

  // Simpan pilihan metode bayar
  document.getElementById('payment-select').addEventListener('change', (e) => {
    metodePembayaran = e.target.value;
  });
}

buatUIKeranjang();


productGrid.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const menuItem = e.target.closest('.menu-item');
    const nama = menuItem.querySelector('h3').textContent.trim();
    const hargaText = menuItem.querySelector('p').textContent; // "Rp 22.000"
    const harga = parseInt(hargaText.replace(/[^0-9]/g, ''));

    tambahKeKeranjang(nama, harga);
  }
});

function tambahKeKeranjang(nama, harga) {
  const existing = keranjang.find(item => item.nama === nama);
  if (existing) {
    existing.jumlah += 1;
  } else {
    keranjang.push({ nama, harga, jumlah: 1 });
  }
  renderKeranjang();
}

function kurangiDariKeranjang(nama) {
  const existing = keranjang.find(item => item.nama === nama);
  if (!existing) return;

  existing.jumlah -= 1;
  if (existing.jumlah <= 0) {
    keranjang = keranjang.filter(item => item.nama !== nama);
  }
  renderKeranjang();
}


// ===== RENDER KERANJANG =====
function renderKeranjang() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');

  // Update badge jumlah item
  const totalItem = keranjang.reduce((sum, item) => sum + item.jumlah, 0);
  cartCountEl.textContent = totalItem;

  // Render daftar item
  if (keranjang.length === 0) {
    cartItemsEl.innerHTML = '<p>Keranjang masih kosong</p>';
  } else {
    cartItemsEl.innerHTML = keranjang.map(item => `
      <div class="cart-item">
        <span>${item.nama}</span>
        <div>
          <button onclick="kurangiDariKeranjang('${item.nama}')">-</button>
          <span>${item.jumlah}</span>
          <button onclick="tambahKeKeranjang('${item.nama}', ${item.harga})">+</button>
        </div>
        <span>Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
      </div>
    `).join('');
  }

  // Hitung total
  const total = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
  cartTotalEl.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
}


// ===== KIRIM PESANAN =====
async function kirimPesanan() {
  if (keranjang.length === 0) {
    alert('Keranjang masih kosong!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/pesanan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nomor_meja: nomorMeja,
        items: keranjang,
        metode_pembayaran: metodePembayaran
      })
    });

    if (!response.ok) throw new Error('Gagal mengirim pesanan');

    alert('Pesanan berhasil dikirim!');
    keranjang = [];
    renderKeranjang();
    document.getElementById('cart-panel').classList.add('hidden');

  } catch (err) {
    alert('Terjadi kesalahan: ' + err.message);
    console.error(err);
  }
}