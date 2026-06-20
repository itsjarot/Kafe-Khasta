const API_URL = '/api';

async function ambilPesanan() {
  try {
    const response = await fetch(`${API_URL}/pesanan`);
    const data = await response.json();
    renderPesanan(data);
  } catch (err) {
    console.error('Gagal ambil pesanan:', err);
  }
}

function renderPesanan(pesananList) {
  const colBaru = document.getElementById('cards-baru');
  const colDiproses = document.getElementById('cards-diproses');
  const colSelesai = document.getElementById('cards-selesai');

  colBaru.innerHTML = '';
  colDiproses.innerHTML = '';
  colSelesai.innerHTML = '';

  pesananList.forEach((pesanan) => {
    const card = buatCard(pesanan);

    if (pesanan.status === 'baru') colBaru.appendChild(card);
    else if (pesanan.status === 'diproses') colDiproses.appendChild(card);
    else if (pesanan.status === 'selesai') colSelesai.appendChild(card);
  });

  // Tampilkan pesan "kosong" kalau tidak ada kartu
  tampilkanKosongJikaPerlu(colBaru);
  tampilkanKosongJikaPerlu(colDiproses);
  tampilkanKosongJikaPerlu(colSelesai);
}

function tampilkanKosongJikaPerlu(kolom) {
  if (kolom.children.length === 0) {
    kolom.innerHTML = '<p class="empty">Tidak ada pesanan</p>';
  }
}

function buatCard(pesanan) {
  const card = document.createElement('div');
  card.classList.add('card');

  const total = pesanan.items.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);

  const itemsHtml = pesanan.items
    .map(item => `<li>${item.nama_menu} x${item.jumlah}</li>`)
    .join('');

  const waktu = new Date(pesanan.waktu).toLocaleTimeString('id-ID');

  let tombolHtml = '';
  if (pesanan.status === 'baru') {
    tombolHtml = `<button onclick="updateStatus(${pesanan.id}, 'diproses')">Proses Pesanan</button>`;
  } else if (pesanan.status === 'diproses') {
    tombolHtml = `<button onclick="updateStatus(${pesanan.id}, 'selesai')">Tandai Selesai</button>`;
  }
  // status 'selesai' tidak ada tombol lagi

  card.innerHTML = `
    <h3>Meja ${pesanan.nomor_meja}</h3>
    <div class="waktu">${waktu}</div>
    <ul>${itemsHtml}</ul>
    <div class="total">Total: Rp ${total.toLocaleString('id-ID')}</div>
    ${tombolHtml}
  `;

  return card;
}

async function updateStatus(id, statusBaru) {
  try {
    await fetch(`${API_URL}/pesanan/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: statusBaru })
    });
    ambilPesanan(); // refresh langsung setelah update
  } catch (err) {
    console.error('Gagal update status:', err);
  }
}

// Load pertama kali
ambilPesanan();

// Auto-refresh tiap 5 detik
setInterval(ambilPesanan, 5000);