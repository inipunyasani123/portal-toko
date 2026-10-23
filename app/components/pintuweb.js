// Tautan ke situs utama PintuWeb. Portal ini zona terpisah (basePath /toko-online) di domain yang sama, jadi
// semua tautan ke situs utama memakai URL absolut dan <a> biasa: next/link akan menempelkan basePath.
export const PINTUWEB = 'https://www.pintuweb.id';
export const URL_PORTAL = `${PINTUWEB}/toko-online`;

/** Kontak & jam kerja dari PintuWeb/app/lib/site.ts (WA_NUMBER, WA_DISPLAY, HOURS). Ganti di sana = ganti di sini. */
export const WA_NUMBER = '6285190931399';
export const WA_DISPLAY = '+62 851 9093 1399';
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
    mulai: 'Rp300.000',
    sampai: 'Rp2.000.000',
    waktu: '3–5 hari kerja',
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
    mulai: 'Rp3.000.000',
    sampai: 'Rp10.000.000+',
    waktu: '5–8 hari kerja',
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
  { path: 'link-in-bio', label: 'Link in Bio' },
  { path: 'kontes-desain', label: 'Kontes Desain' },
  { path: 'undangan-digital', label: 'Undangan Digital' },
  { path: 'website-portofolio', label: 'Website Portofolio' },
  { path: 'website-reservasi', label: 'Website Reservasi' },
  { path: 'website-properti', label: 'Website Properti' },
  { path: 'aplikasi-to-do', label: 'Aplikasi To-Do' },
  { path: 'toko-online', label: 'Toko Online' },
  { path: 'menu-digital', label: 'Menu Digital' },
  { path: 'aplikasi-mobile', label: 'Aplikasi Mobile' },
];

export const GALERI_LAIN = GALERI.filter((g) => g.path !== 'toko-online');

/** Paket harga (lib/packages.ts: toko-online-simple & toko-online-full), halaman layanan, dan galeri demo PintuWeb. */
export const LANJUT = [
  { href: `${PINTUWEB}/paket#toko-online-simple`, label: 'Harga paket Toko Online' },
  { href: `${PINTUWEB}/services/toko-online`, label: 'Jasa pembuatan toko online' },
  { href: `${PINTUWEB}/demo#toko`, label: 'Semua demo PintuWeb' },
];
