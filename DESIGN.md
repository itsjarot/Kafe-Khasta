---
name: Kafe Khasta
description: Sistem pemesanan kafe berbasis web — warm, traditional, bersahaja
colors:
  primary: "#c28b4e"
  primary-rich: "#a66d2f"
  primary-pale: "#d4a373"
  surface-dark: "#2b1b19"
  surface-medium: "#5b3a29"
  surface-light: "#faf6f2"
  surface-card: "#ffffff"
  ink: "#1a1a1a"
  text-body: "#3d3228"
  text-muted: "#8a7a6a"
  text-on-dark: "#f5ede4"
  text-on-gold: "#1a1a1a"
  rule-light: "#e8ddd0"
  rule-on-dark: "rgba(245, 237, 228, 0.12)"
  billiard-green: "#2d5a3d"
  billiard-felt: "#1e4a2e"
typography:
  display:
    fontFamily: "Fraunces, Georgia, Cambria, Times New Roman, serif"
    fontSize: "clamp(2.8rem, 6vw, 5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "'ss01' on, 'case' on"
  headline:
    fontFamily: "Fraunces, Georgia, Cambria, Times New Roman, serif"
    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  mono:
    fontFamily: "'JetBrains Mono', 'SF Mono', Monaco, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-gold}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
    fontWeight: 600
  button-primary-hover:
    backgroundColor: "{colors.primary-rich}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.surface-dark}"
    borderColor: "{colors.surface-dark}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
    fontWeight: 500
  button-secondary-hover:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-on-dark}"
  card-default:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
  input-default:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.rule-light}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  input-focus:
    borderColor: "{colors.primary}"
    boxShadow: "0 0 0 3px rgba(194, 139, 78, 0.15)"
---

# Design System: Kafe Khasta

## 1. Overview: Ruang Hangat

**Creative North Star: "Ruang Hangat"**

Kafe Khasta adalah ruang hangat dengan lampu temaram, meja billiard di pojok, napas jazz di latar, dan secangkir kopi yang nggak buru-buru habis. Hitam-putih di logonya, coklat hangat di setiap sudut — dari kayu meja sampai tangan barista yang ngantar pesanan.

Sistem ini menolak:
- Cafe industrial (beton, pipa, lampu gantung pabrik)
- Korporat seragam (Starbucks, chain coffee)
- AI-generic (cream bg + Inter font + cards everywhere)
- Terlalu terang atau terlalu gelap — tetap hangat, seperti jam 5 sore

**Key Characteristics:**
- Warm brown sebagai fondasi, bukan aksen
- Emas sebagai titik fokus, bukan background
- Tekstur halus dan grain — bukan flat color doang
- Ruang kosong yang lega — nggak buru-buru
- Satu kejutan halus di interaksi (hover, transisi)
- Jazz di nada, tradisional di karakter, bersahaja di eksekusi

## 2. Colors: The Brown Hour

### Primary
- **Emas Khasta** (`#c28b4e`): Aksen utama. Tombol CTA, border fokus, detail yang harus diperhatikan. Tidak dipakai di background — fungsinya sebagai penunjuk, bukan pengisi.
- **Emas Dalam** (`#a66d2f`): Hover state dari emas. Lebih hangat, lebih deep.
- **Emas Muda** (`#d4a373`): Hover ringan, tag, badge.

### Surface & Background
- **Coklat Tua** (`#2b1b19`): Navbar, footer, background elemen berat. Seperti kayu jati tua yang dipoles.
- **Coklat Medium** (`#5b3a29`): Border, aksen sekunder, heading di card putih.
- **Cream Hangat** (`#faf6f2`): Background halaman — bukan putih bersih, tapi putih dengan sentuhan hangat seperti kertas aged.
- **Putih Card** (`#ffffff`): Card, modal, input. Bersih tapi terasa solid.

### Text
- **Ink** (`#1a1a1a`): Heading di atas putih.
- **Body Brown** (`#3d3228`): Body text — coklat sangat soft, bukan hitam pekat.
- **Muted Brown** (`#8a7a6a`): Caption, meta, placeholder. Coklat pudar.
- **Warm White** (`#f5ede4`): Text di atas background gelap.
- **Dark on Gold** (`#1a1a1a`): Text di tombol emas.

### Rules
- **Rule Light** (`#e8ddd0`): Pemisah halus di atas putih.
- **Rule Dark** (`rgba(245, 237, 228, 0.12)`): Pemisah di atas gelap — nyaris tak terlihat, cukup untuk memberi struktur.

### Secondary
- **Hijau Billiard** (`#2d5a3d`), **Felt Billiard** (`#1e4a2e`): Warna aksen sekunder untuk elemen rekreasi. Muncul hanya di konteks billiard — tidak untuk CTA atau navigasi.

### Named Rules

**The Emas on Dark Rule.** Emas hanya dipakai sebagai aksen di atas gelap — tombol, border fokus, ikon aktif. Background gelap tetap coklat, bukan emas.

**The Warm Ground Rule.** Background putih harus selalu di-warm-kan (`#faf6f2` atau tone serupa). Putih bersih (`#ffffff`) hanya untuk card dan komponen terapung.

**The Sparse Gold Rule.** Emas menempati ≤10% dari permukaan. Kelangkaannya yang membuatnya berharga.

## 3. Typography: Fraunces untuk Cerita, Sans untuk Kerja

**Display Font:** Fraunces (dengan Georgia, Cambria, Times New Roman sebagai fallback)
**Body Font:** Plus Jakarta Sans (dengan system-ui, -apple-system, sans-serif sebagai fallback)
**Mono Font:** JetBrains Mono (dengan SF Mono, Monaco sebagai fallback)

**Character:** Fraunces membawa karakter — ada sentuhan tradisional di lekuk serif-nya, tapi tetap terbaca modern. Plus Jakarta Sans di body menjaga semuanya tetap bersih dan nggak berteriak. Pasangan ini duduk di antara "kafe tradisional" dan "WFC yang profesional."

### Hierarchy
- **Display** (300, `clamp(2.8rem, 6vw, 5rem)`, 1.05, -0.02em): Hero, nama kafe, headline besar. Gunakan `font-feature-settings: "ss01"` untuk alternates.
- **Headline** (500, `clamp(1.8rem, 3.5vw, 2.8rem)`, 1.15, -0.01em): Section title, judul menu kategori.
- **Title** (600, 1.15rem, 1.3): Nama menu, card title, button text.
- **Body** (400, 1rem, 1.7): Deskripsi, paragraf, konten utama. Max width 65-70ch.
- **Label** (500, 0.8rem, 0.04em tracking, uppercase): Eyebrow kecil, badge, metadata.
- **Mono** (400, 0.8rem): Harga, kode, angka.

### Named Rules

**The Serif on Display Rule.** Fraunces hanya dipakai di ukuran display dan headline. Body text tetap Plus Jakarta Sans. Serif di body size kehilangan karakternya dan cuma bikin capek baca.

## 4. Elevation: Flat dengan Warm Shadow

Sistem ini mostly flat. Kedalaman datang dari kontras material (coklat tua vs cream), bukan dari bayangan.

- **Card Default:** Bayangan minimal (`0 1px 3px rgba(0,0,0,0.06)`) — cukup buat card terasa "naik" dari background, tanpa drama.
- **Hover Lift:** `0 4px 12px rgba(0,0,0,0.1)` — untuk tombol dan card yang di-hover. Transisi 0.2s ease.
- **Modal / Overlay:** `0 12px 40px rgba(0,0,0,0.2)` — depth yang jelas tapi tetap hangat, bukan bayangan abu-abu dingin.
- **No glow effects.** Tidak ada glowing, neon, atau efek sinar.

### Named Rules

**The Flat by Default Rule.** Semua elemen flat saat diam. Bayangan muncul hanya sebagai respons terhadap state (hover, modal, fokus).

## 5. Components

### Buttons
- **Shape:** Rounded medium (`10px`), tinggi konsisten 44-48px.
- **Primary:** Emas Khasta fill, teks dark. Hover: Emas Dalam, translateY(-1px).
- **Secondary:** Transparan, border Coklat Medium 1.5px, teks Coklat Medium. Hover: filled Coklat Tua, teks putih.
- **Ghost:** No border, teks Coklat Tua. Hover: background cream.
- **All buttons:** transition 0.2s ease, cursor pointer, `:focus-visible` ring emas dengan offset 2px.

### Cards
- **Corner:** `10px` rounded.
- **Background:** White (`#ffffff`) di atas cream hangat.
- **Padding:** 24px internal.
- **Border:** Opsional 1px solid `#e8ddd0` untuk card dalam layout rapat.
- **Shadow:** Hanya `0 1px 3px rgba(0,0,0,0.06)` — ini bukan sistem shadow-heavy.
- **No nesting.** Card tidak pernah di dalam card.

### Inputs
- **Style:** Background white, border 1.5px solid `#e8ddd0`, radius 6px.
- **Focus:** Border emas + ring `rgba(194, 139, 78, 0.15)` dengan offset 0, blur 3px.
- **Error:** Border `#c0392b` (merah hangat, bukan merah dingin).
- **Disabled:** Background `#f0ebe5`, text muted.
- **Placeholder:** `#b5a898` — tetap terbaca tapi tidak mengganggu.

### Navigation
- **Navbar:** Fixed top, Coklat Tua (`#2b1b19`), height 72px.
- **Links:** Putih hangat, hover emas. Transisi 0.2s.
- **Active:** Underline emas atau text emas.
- **Mobile:** Hamburger menu, dropdown penuh dari atas.
- **Logo:** Hitam-putih (existing logo), tinggi 48px dalam navbar.

### Kanban (Kasir Dashboard)
- **Columns:** Background cream, head Coklat Medium dengan border bawah, radius 10px.
- **Cards:** Putih, shadow minimal, avatar nomor meja di kiri.
- **Status Colors:** Baru (emas accent), Diproses (Coklat Medium), Selesai (Hijau Billiard soft).

### Order Menu
- **Sidebar:** Fixed left, background cream hangat, kategori dengan hover color.
- **Menu Items:** Baris horizontal, nama menu + harga + tombol Pesan.
- **Floating Cart:** Panel dari kanan, sticky, dengan badge jumlah item.
- **Review Modal:** Card tengah layar, backdrop gelap 50%, daftar item jelas.

### Signature: QR & Meja Nomor
- Tampil sebagai badge di navbar pelanggan: "Meja 3" dengan ikon small.
- QR page: centered, card putih, QR 250px, dengan nama meja.

## 6. Do's and Don'ts

### Do:
- **Do** gunakan emas sebagai aksen untuk tombol CTA, fokus state, dan elemen interaktif — bukan untuk background atau dekorasi.
- **Do** biarkan cream hangat (`#faf6f2`) jadi kanvas utama.
- **Do** pasangkan Fraunces untuk display + Plus Jakarta Sans untuk body.
- **Do** kasih ruang: padding longgar, line-height 1.7, paragraf nggak mepet.
- **Do** tambah satu detail kejutan di interaksi: hover tombol yang naik 1px, card yang "angkat" saat di-hover.
- **Do** gunakan grain/tekstur halus di background elemen brand-bearing (hero section, footer).
- **Do** jaga logo hitam-putih tetap bersih dan kontras.

### Don't:
- **Don't** gunakan putih bersih (`#ffffff`) sebagai background halaman — cream hangat atau coklat adalah default.
- **Don't** pakai emas di background besar — emas adalah aksen, bukan pengisi.
- **Don't** gunakan cards di dalam cards — card adalah affordance permukaan, bukan wadah tak terbatas.
- **Don't** pasang numbered section markers (01, 02, 03) di atas tiap section — itu AI scaffolding.
- **Don't** pasang uppercase tracked eyebrow di atas tiap heading — pilih satu momen, bukan tiap section.
- **Don't** animasi bounce atau elastic — ease-out cukup.
- **Don't** bayangan glow, neon, atau efek sinar.
- **Don't** font Inter, Poppins, atau system-ui sebagai display — Fraunces adalah karakter utama.
- **Don't** side-stripe borders (border-left 3px sebagai aksen) pada card atau list.
- **Don't** gradient text (`background-clip: text`) — solid color aja.
- **Don't** glassmorphism atau backdrop-filter blur sebagai dekorasi.
- **Don't** hijau billiard di luar konteks billiard — itu aksen spesifik, bukan warna UI umum.
