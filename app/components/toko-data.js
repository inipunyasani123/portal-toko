// Data empat demo toko online. Semua isi diambil dari folder lokal tiap toko (lib/data.js, README, rute app/):
// nama, tagline, kota, jumlah produk, dan fitur khas yang memang ada. `halaman` = rute yang bisa dicoba langsung.
// `merek` = warna papan nama, kanopi, dan isi etalase dari token warna (app/globals.css) toko itu sendiri.
export const toko = [
  {
    slug: 'tanur',
    nama: 'Tanur',
    kategori: 'Keramik',
    kota: 'Jawa Timur',
    tagline: 'Keramik buatan tangan untuk meja sehari-hari',
    deskripsi:
      'Studio keramik fiktif yang menjual mangkuk, piring, cangkir, teko, dan vas stoneware per angkatan tanur. 14 model dalam empat glasir; harga dan stok dihitung per glasir dan ukuran.',
    khas: [
      ['Pemilih glasir dari ubin uji', 'ilustrasi produk ikut berganti warna sesuai glasir yang dipilih.'],
      ['Stok per glasir × ukuran', 'varian yang habis tidak bisa dipilih, jumlah beli dibatasi sisa stok.'],
      ['Ongkir dari berat keping', 'ditambah kemasan dan peti kayu opsional, layanan Reguler atau Kilat.'],
      ['Label angkatan & kurva bakar', 'cerita proses dari meja putar sampai tanur 1.240 °C.'],
    ],
    halaman: [
      ['/koleksi', 'Koleksi bersaring'],
      ['/#proses', 'Proses & kurva bakar'],
      ['/bantuan', 'Packing & keping pecah'],
      ['/admin', 'Dasbor penjual'],
    ],
    kode: 'TNR',
    url: 'https://toko-tanur.pintuweb.id',
    image: '/toko-online/images/toko/tanur.webp',
    merek: { bg: '#231c17', fg: '#f3ece1', k1: '#b6623b', k2: '#f3ece1', dalam: '#f3ece1', tombolFg: '#ffffff' },
  },
  {
    slug: 'takar',
    nama: 'Takar',
    kategori: 'Perawatan kulit',
    kota: 'Bandung',
    tagline: 'Perawatan kulit berkadar jelas, takaran pakainya jujur',
    deskripsi:
      'Merek perawatan kulit fiktif: pembersih, toner, serum, pelembap, dan tabir surya dengan kadar bahan aktif tertulis di depan botol. 16 produk, sebagian ada dalam kantong isi ulang.',
    khas: [
      ['Penemu produk', 'empat pertanyaan tentang kulitmu, hasilnya rutinitas pagi dan malam beserta alasannya.'],
      ['Penyusun rutinitas', 'urutan otomatis, cek bahan yang bentrok, jadwal 7 malam untuk AHA, BHA, dan retinol.'],
      ['Kamus 58 kandungan', 'semuanya ada di daftar bahan produk, ditulis tanpa janji medis.'],
      ['Harga per ml & perkiraan habis', 'dibandingkan dengan batas pakai setelah kemasan dibuka.'],
    ],
    halaman: [
      ['/cocokkan', 'Cocokkan kulit'],
      ['/rutinitas', 'Susun rutinitas'],
      ['/kandungan', 'Kamus kandungan'],
      ['/isi-ulang', 'Isi ulang'],
    ],
    kode: 'TKR',
    url: 'https://toko-takar.pintuweb.id',
    image: '/toko-online/images/toko/takar.webp',
    merek: { bg: '#f3b51b', fg: '#17201c', k1: '#2e5b46', k2: '#fcfcf9', dalam: '#f3f5f1', tombolBg: '#17201c', tombolFg: '#fcfcf9' },
  },
  {
    slug: 'lungsin',
    nama: 'Lungsin',
    kategori: 'Busana',
    kota: 'Klaten',
    tagline: 'Pakaian harian dari kain lurik tenun, dijahit di Klaten',
    deskripsi:
      'Bengkel jahit fiktif yang menjual kemeja, blus, tunik, kulot, luaran, dan kain lurik per meter. 14 produk dari tujuh kain; stoknya dihitung per kain dan ukuran (S–XXL).',
    khas: [
      ['Ukuranku', 'simpan ukuran badan sekali, tiap produk menandai ukuran yang paling pas.'],
      ['Padu-padan di manekin', 'susun atasan, bawahan, dan luaran, lalu masukkan semuanya ke keranjang.'],
      ['Lookbook lima padanan', 'adegan berilustrasi yang bisa dibuka di padu-padan.'],
      ['Tukar ukuran 14 hari', 'diajukan dari halaman pesanan; ukuran juga bisa diganti di keranjang.'],
    ],
    halaman: [
      ['/padu-padan', 'Padu-padan'],
      ['/panduan-ukuran', 'Panduan ukuran'],
      ['/lookbook', 'Lookbook'],
      ['/perawatan-kain', 'Perawatan kain'],
    ],
    kode: 'LGS',
    url: 'https://toko-lungsin.pintuweb.id',
    image: '/toko-online/images/toko/lungsin.webp',
    merek: { bg: '#1d3157', fg: '#fffdf8', k1: '#1d3157', k2: '#f7f5ef', dalam: '#f7f5ef', tombolFg: '#ffffff' },
  },
  {
    slug: 'daunjendela',
    nama: 'Daun Jendela',
    kategori: 'Tanaman hias',
    kota: 'Bandung Barat',
    tagline: 'Tanaman hias yang dipilih dari cahaya jendelamu',
    deskripsi:
      'Kebun tanaman hias fiktif di Parongpong. 14 tanaman beserta pot, media tanam, dan alat; ukuran tanaman dan pot masing-masing punya stok sendiri.',
    khas: [
      ['Cari yang betah', 'lima pertanyaan: cahaya, udara, waktu luang, hewan peliharaan, dan tempat.'],
      ['Padanan pot', 'disarankan atau kurang cocok untuk tiap tanaman, stok pot ikut dihitung.'],
      ['Kalender rawat', 'jadwal empat minggu dari tanggal tiba, bisa disimpan ke kalender ponsel.'],
      ['Kirim tanaman hidup', 'hanya Senin–Rabu, ongkir dari berat volumetrik kardus.'],
    ],
    halaman: [
      ['/cari-tanaman', 'Cari yang betah'],
      ['/katalog', 'Katalog'],
      ['/kalender-rawat', 'Kalender rawat'],
      ['/pengiriman', 'Pengiriman tanaman'],
    ],
    kode: 'DJ',
    url: 'https://toko-daunjendela.pintuweb.id',
    image: '/toko-online/images/toko/daunjendela.webp',
    merek: { bg: '#1f5c43', fg: '#f2f1ea', k1: '#1f5c43', k2: '#f2f1ea', dalam: '#f2f1ea', tombolFg: '#ffffff' },
  },
];

export const JUMLAH = toko.length;
export const NAMA_JUMLAH = { 4: 'Empat', 5: 'Lima', 6: 'Enam' }[JUMLAH] ?? String(JUMLAH);
