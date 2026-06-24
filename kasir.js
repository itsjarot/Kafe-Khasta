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

  const bayar = pesanan.metode_pembayaran || 'Tunai';

  card.innerHTML = `
    <h3>Meja ${pesanan.nomor_meja}</h3>
    <div class="waktu">${waktu}</div>
    <div class="bayar">${bayar}</div>
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

// ===== EXPORT & RESET =====
async function exportDanReset() {
  const konfirmasi = confirm(
    'Download data penjualan, lalu hapus semua pesanan?\n\n' +
    'Data akan disimpan sebagai CSV (bisa dibuka di Excel).\n' +
    'Pesanan yang sudah selesai akan dihapus dari database.'
  );
  if (!konfirmasi) return;

  try {
    // 1. Ambil semua pesanan
    const response = await fetch(`${API_URL}/pesanan`);
    const pesananList = await response.json();

    if (pesananList.length === 0) {
      alert('Belum ada data pesanan untuk di-export.');
      return;
    }

    // 2. Buat CSV
    const header = [
      'ID Pesanan',
      'Meja',
      'Status',
      'Metode Bayar',
      'Waktu',
      'Menu',
      'Harga Satuan',
      'Jumlah',
      'Subtotal'
    ];

    const rows = [];
    pesananList.forEach((p) => {
      const waktu = new Date(p.waktu).toLocaleString('id-ID');
      p.items.forEach((item) => {
        const subtotal = item.harga * item.jumlah;
        rows.push([
          p.id,
          p.nomor_meja,
          p.status,
          p.metode_pembayaran || 'Tunai',
          waktu,
          item.nama_menu,
          item.harga,
          item.jumlah,
          subtotal
        ]);
      });
    });

    // Hitung grand total
    const grandTotal = pesananList.reduce((sum, p) => {
      return sum + p.items.reduce((s, item) => s + (item.harga * item.jumlah), 0);
    }, 0);
    rows.push(['', '', '', '', '', '', '', 'GRAND TOTAL', grandTotal]);

    // Konversi ke CSV (pake semicolon biar aman di Excel Indonesia)
    const csvContent = [
      header.join(';'),
      ...rows.map((r) => r.join(';'))
    ].join('\n');

    // 3. Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const tanggal = new Date().toISOString().slice(0, 10);
    link.download = `khasta_penjualan_${tanggal}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // 4. Hapus semua pesanan dari database
    await fetch(`${API_URL}/pesanan`, { method: 'DELETE' });

    alert(`✅ Berhasil!\n${pesananList.length} pesanan di-export.\nDatabase sudah direset.`);
    ambilPesanan(); // refresh board

  } catch (err) {
    alert('Gagal export: ' + err.message);
    console.error(err);
  }
}

// Load pertama kali
ambilPesanan();

// Auto-refresh tiap 5 detik
setInterval(ambilPesanan, 5000);