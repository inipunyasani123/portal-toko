import HARGA from './harga.json';
// Tautan ke situs utama PintuWeb. Portal ini zona terpisah (basePath /toko-online) di domain yang sama, jadi
// semua tautan ke situs utama memakai URL absolut dan <a> biasa: next/link akan menempelkan basePath.
/** Harga & kontak dibaca dari ./harga.json (salinan https://www.pintuweb.id/harga.json, diambil scripts/ambil-harga.mjs saat build). */
const P = (slug) => HARGA.paket[slug];
const rp = (n) => `Rp${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export const PINTUWEB = 'https://www.pintuweb.id';
export const URL_PORTAL = `${PINTUWEB}/toko-online`;

/** Kontak & jam kerja dari PintuWeb/app/lib/site.ts (WA_NUMBER, WA_DISPLAY, HOURS). Ganti di sana = ganti di sini. */
export const WA_NUMBER = HARGA.wa.nomor;
export const WA_DISPLAY = HARGA.wa.tampil;
export const JAM_KERJA = 'Senin – Sabtu, 08.00 – 19.00 WIB';
export const wa = (teks) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(teks)}`;

/**
 * Dua paket toko online dari PintuWeb/app/lib/packages.ts (slug, title, minPrice/maxPrice, time, subtitle, badge,
 * features), disalin apa adanya. Satu-satunya tempat angka bisnis di portal ini. PRICES_UPDATED di sana: 2026-10-22.
 */
export const HARGA_PER = '22 Oktober 2026';
export const PAKET = [
  {
    slug: 'toko-online-simple',
    nama: 'Toko Online Simple',
    subjudul: 'Mulai jualan online tanpa ribet',
    mulai: rp(P('toko-online-simple').mulai),
    sampai: rp(P('toko-online-simple').sampai) + (P('toko-online-simple').lebih ? '+' : ''),
    waktu: P('toko-online-simple').waktu,
    fitur: [
      'Katalog produk hingga 20 item',
      'Checkout via WhatsApp (langsung order)',
      'Kategori produk & banner promo',
      'Desain responsif + performa cepat',
      'CMS ringan – mudah update produk',
      '2× revisi tampilan/konten',
      'Domain + hosting + SSL sudah termasuk',
    ],
  },
  {
    slug: 'toko-online-full',
    nama: 'Toko Online Full',
    lencana: 'Premium',
    subjudul: 'Toko online lengkap dengan dashboard admin',
    mulai: rp(P('toko-online-full').mulai),
    sampai: rp(P('toko-online-full').sampai) + (P('toko-online-full').lebih ? '+' : ''),
    waktu: P('toko-online-full').waktu,
    fitur: [
      'Keranjang belanja & sistem checkout lengkap',
      'Integrasi payment gateway',
      'Ongkir otomatis (via RajaOngkir)',
      'Dashboard admin – kelola produk & pesanan',
      'Desain mobile-first, loading cepat & SEO-ready',
      'Maintenance & support 3–6 bulan',
      'Domain + hosting + SSL',
    ],
  },
];
export const [SIMPLE, FULL] = PAKET;

/** Galeri yang tayang di www.pintuweb.id/<path> (lihat lib/portals.ts di PintuWeb). */
export const GALERI = [
  { path: 'landing-page', label: 'Landing Page' },
  { path: 'toko-online', label: 'Toko Online' },
  { path: 'aplikasi-mobile', label: 'Aplikasi Mobile' },
  { path: 'menu-digital', label: 'Menu Digital' },
  { path: 'link-in-bio', label: 'Link in Bio' },
  { path: 'kontes-desain', label: 'Konsep Desain' },
  { path: 'undangan-digital', label: 'Undangan Digital' },
  { path: 'website-portofolio', label: 'Portofolio Pribadi' },
  { path: 'website-reservasi', label: 'Reservasi & Booking' },
  { path: 'website-properti', label: 'Properti' },
  { path: 'aplikasi-to-do', label: 'To-Do & Produktivitas' },
];

export const GALERI_LAIN = GALERI.filter((g) => g.path !== 'toko-online');

/** Paket harga (lib/packages.ts: toko-online-simple & toko-online-full), halaman layanan, dan galeri demo PintuWeb. */
export const LANJUT = [
  { href: `${PINTUWEB}/paket#toko-online-simple`, label: 'Harga paket Toko Online' },
  { href: `${PINTUWEB}/services/toko-online`, label: 'Jasa pembuatan toko online' },
  { href: `${PINTUWEB}/demo#toko`, label: 'Semua demo PintuWeb' },
];

/** Artikel PintuWeb yang relevan, di bawah "Baca juga". */
export const BACA = [
  { href: `${PINTUWEB}/artikel/harga-website-toko-online`, label: 'Harga website toko online' },
  { href: `${PINTUWEB}/artikel/toko-online-vs-marketplace`, label: 'Toko online vs marketplace' },
];
