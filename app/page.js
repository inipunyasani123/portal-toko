import Image from 'next/image';
import { toko, JUMLAH, NAMA_JUMLAH } from './components/toko-data';
import { Merek, Tanda, IsiEtalase, LantaiAtas } from './components/merek';
import { LANJUT, GALERI_LAIN, PINTUWEB, PAKET, SIMPLE, FULL, HARGA_PER, WA_DISPLAY, JAM_KERJA, wa } from './components/pintuweb';

const WA = wa('Halo PintuWeb, saya mau buat toko online untuk usaha saya. Boleh minta info?');

/** Variabel warna merek tiap toko untuk papan nama, kanopi, isi etalase, dan tombolnya. */
const warna = (t) => ({
  '--m-bg': t.merek.bg,
  '--m-fg': t.merek.fg,
  '--m-k1': t.merek.k1,
  '--m-k2': t.merek.k2,
  '--m-dalam': t.merek.dalam,
});

// Empat langkah yang memang berjalan di keempat demo (lihat Keranjang/Checkout/Pesanan/Lacak.js tiap toko).
const ALUR = [
  {
    j: 'Keranjang',
    d: 'Pilih varian, lalu jumlahnya dibatasi sisa stok varian itu. Isi keranjang tersimpan di peramban, jadi tidak hilang saat halaman ditutup.',
    c: 'Di Lungsin, ukuran baju bisa diganti langsung dari keranjang.',
  },
  {
    j: 'Checkout',
    d: 'Isi alamat, pilih layanan kirim dan cara bayar: transfer bank, QRIS, atau dompet digital. Ongkir dihitung dari berat paket dan zona tujuan; isian yang keliru ditandai di tempatnya.',
    c: 'Di Takar, ada pilihan ambil di toko tanpa ongkir.',
  },
  {
    j: 'Bayar',
    d: 'Pesanan mendapat kode sendiri dan batas bayar 24 jam. Tombol "Simulasikan pembayaran" mengubah statusnya menjadi Dibayar, dan fakturnya bisa dicetak.',
    c: 'Di Daun Jendela, tanggal kirim tanaman dihitung dari waktu bayar.',
  },
  {
    j: 'Lacak',
    d: 'Masukkan kode pesanan dan 4 angka terakhir nomor HP penerima. Linimasa menampilkan tiap status dengan waktu WIB, sampai paket diterima.',
    c: 'Di Tanur, resi contoh muncul begitu status berubah menjadi Dikirim.',
  },
];

const DASBOR = [
  'Penjualan per hari selama 7 hari terakhir, dihitung per tanggal WIB, dengan tabel pengganti grafik.',
  'Daftar pesanan bersaring status; status tiap pesanan bisa diubah dari sana.',
  'Editor stok per varian dan daftar stok yang menipis.',
  'Tombol "Kembalikan data contoh" untuk mengulang dari awal.',
];

const SIMULASI = [
  ['Pembayaran', 'tidak ada uang yang berpindah.'],
  ['Ongkir', 'tabel tarif contoh, bukan tarif kurir.'],
  ['Data', 'keranjang, pesanan, dan stok hanya tersimpan di peramban pengunjung.'],
  ['Pesanan contoh', 'dibuat saat kunjungan pertama, bertanggal relatif terhadap hari itu.'],
];

const TANYA = [
  {
    q: 'Berapa biaya membuat toko online seperti ini?',
    a: `Ada dua paket. ${SIMPLE.nama}: ${SIMPLE.mulai} – ${SIMPLE.sampai}, dikerjakan ${SIMPLE.waktu}, berisi katalog hingga 20 produk dengan checkout via WhatsApp. ${FULL.nama}: ${FULL.mulai} – ${FULL.sampai}, dikerjakan ${FULL.waktu}, dengan keranjang, checkout lengkap, payment gateway, ongkir otomatis, dan dashboard admin. Domain, hosting, dan SSL sudah termasuk di keduanya.`,
  },
  {
    q: 'Keempat demo ini setara paket yang mana?',
    a: `Keranjang, checkout, halaman pesanan, dan dasbor penjual di keempat demo adalah fitur ${FULL.nama}. Bedanya, di demo pembayaran dan ongkir disimulasikan; di toko sungguhan bagian itu memakai payment gateway dan ongkir otomatis via RajaOngkir. ${SIMPLE.nama} cocok untuk usaha yang pesanannya masih dilayani manual: pelanggan memilih di katalog, lalu pesannya terkirim rapi ke WhatsApp-mu.`,
  },
  {
    q: 'Apakah pembayaran di demo ini sungguhan?',
    a: 'Tidak. Tombol "Simulasikan pembayaran" hanya mengubah status pesanan menjadi Dibayar. Tidak ada uang, kurir, atau data yang dikirim ke server: keranjang, pesanan, dan stok tersimpan di peramban kamu sendiri, dan bisa dikembalikan ke data contoh dari dasbor.',
  },
  {
    q: 'Bagaimana ongkir dihitung?',
    a: `Di demo, ongkir dihitung dari berat paket dan zona provinsi tujuan memakai tabel tarif contoh; Daun Jendela juga memperhitungkan berat volumetrik kardus tanaman. ${FULL.nama} memakai ongkir otomatis via RajaOngkir.`,
  },
  {
    q: 'Bisakah saya mengubah produk dan harga sendiri?',
    a: `Bisa. Kedua paket toko online dilengkapi pengelolaan produk, jadi kamu bisa menambah, mengubah, atau menonaktifkan produk tanpa menghubungi kami. ${SIMPLE.nama} memakai CMS ringan; ${FULL.nama} memakai dashboard admin untuk produk dan pesanan.`,
  },
  {
    q: 'Apakah saya perlu meninggalkan marketplace?',
    a: 'Tidak perlu. Banyak penjual memakai keduanya: marketplace untuk pembeli baru, toko online sendiri untuk pelanggan setia, promosi, dan data pelanggan yang kamu kelola sendiri.',
  },
  {
    q: 'Bisakah dibuatkan alat bantu seperti penemu produk atau tabel ukuran?',
    a: 'Bisa dibicarakan. Alat seperti penemu produk, tabel ukuran, atau kalender rawat dirancang menurut barang yang kamu jual. Ceritakan kebutuhannya lewat WhatsApp; cakupan dan biayanya ditulis di penawaran sebelum pengerjaan dimulai.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TANYA.map((t) => ({ '@type': 'Question', name: t.q, acceptedAnswer: { '@type': 'Answer', text: t.a } })),
};

function IkonKantong({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M4.8 8.2h14.4l-1.1 12a1.7 1.7 0 0 1-1.7 1.5H7.6a1.7 1.7 0 0 1-1.7-1.5l-1.1-12Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.8 10.6V6.4a3.2 3.2 0 0 1 6.4 0v4.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13.6 14.2h3.6v3h-3.6l-1-1.5 1-1.5Z" fill="currentColor" />
    </svg>
  );
}

function Logo({ gelap = false }) {
  return (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.65rem] bg-fuksia text-white" aria-hidden="true">
        <IkonKantong className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1rem] font-bold tracking-tight">PintuWeb</span>{' '}
        <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.16em] ${gelap ? 'text-jambu' : 'text-fuksia'}`}>Toko Online</span>
      </span>
    </>
  );
}

function Cek() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.3rem] h-3.5 w-3.5 shrink-0" aria-hidden="true" focusable="false">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PortalToko() {
  return (
    <div id="atas" className="min-h-screen overflow-x-clip">
      <a href="#konten" className="lewati">Lewati ke konten</a>

      {/* Jejak: portal ini bagian dari PintuWeb */}
      <nav aria-label="Jejak" className="bg-tinta text-xs text-dinding">
        <ol className="wadah flex items-center gap-2 py-1.5">
          <li><a href={PINTUWEB} className="font-semibold underline-offset-4 hover:underline">PintuWeb</a></li>
          <li aria-hidden="true" className="opacity-60">/</li>
          <li aria-current="page">Toko Online</li>
        </ol>
      </nav>

      <header className="sticky top-0 z-40 border-b border-garis bg-dinding/90 backdrop-blur-xl">
        <div className="wadah flex items-center justify-between gap-3 py-2.5">
          <a href="#atas" className="flex items-center gap-2.5 rounded-lg">
            <Logo />
            <span className="sr-only">, ke atas halaman</span>
          </a>
          <nav aria-label="Navigasi halaman" className="hidden items-center gap-6 text-sm font-semibold text-tinta-2 md:flex">
            <a href="#toko" className="transition hover:text-fuksia">{NAMA_JUMLAH} toko</a>
            <a href="#alur" className="transition hover:text-fuksia">Alur belanja</a>
            <a href="#paket" className="transition hover:text-fuksia">Paket & harga</a>
            <a href="#tanya" className="transition hover:text-fuksia">Tanya jawab</a>
          </nav>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="tombol tombol-tinta min-h-10 shrink-0 px-4 text-sm">Pesan toko online</a>
        </div>
      </header>

      <main id="konten" tabIndex={-1}>
        {/* Pahlawan: deretan ruko, satu per toko */}
        <section aria-labelledby="judul-utama" className="relative border-b border-garis">
          <div className="wadah grid gap-10 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-20 lg:pt-16">
            <div className="lg:col-span-5 lg:pb-6">
              <p className="label">Galeri toko online · {JUMLAH} demo</p>
              <h1 id="judul-utama" className="mt-4 text-[2.35rem] sm:text-[3.4rem] lg:text-[3.6rem]">
                Coba belanja di {NAMA_JUMLAH.toLowerCase()} toko, dari keranjang sampai lacak pesanan.
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-tinta-2">
                Keramik, perawatan kulit, busana lurik, dan tanaman hias. Tiap toko fiktif punya katalog bersaring, varian dengan stok sendiri, keranjang, checkout dengan ongkir yang dihitung otomatis, dan dasbor penjual. Belanjalah sepuasnya: pembayarannya simulasi.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#toko" className="tombol tombol-fuksia">Masuk ke {NAMA_JUMLAH.toLowerCase()} toko</a>
                <a href="#paket" className="tombol tombol-garis">Paket & harga</a>
              </div>
              <p className="mt-5 text-sm text-tinta-3">
                Mulai <strong className="font-display text-base font-bold text-tinta">{SIMPLE.mulai}</strong> · pengerjaan {SIMPLE.waktu}
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="deretan grid grid-cols-2 items-end gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-0" aria-label="Deretan toko di galeri ini">
                {toko.map((t) => (
                  <li key={t.slug} style={warna(t)}>
                    <a href={`#${t.slug}`} className="ruko">
                      <span className="ruko-atas block overflow-hidden" aria-hidden="true">
                        <LantaiAtas slug={t.slug} className="block h-auto w-full" />
                      </span>
                      <span className="ruko-papan">
                        <Merek slug={t.slug} className={t.slug === 'daunjendela' ? 'h-[0.85rem] w-auto sm:h-[0.8rem] lg:h-[0.95rem]' : 'h-[1.15rem] w-auto sm:h-[1rem] lg:h-[1.2rem]'} />
                        <span className="sr-only">{t.nama}, </span>
                      </span>
                      <span className="kanopi" aria-hidden="true" />
                      <span className="ruko-jendela kaca flex items-end justify-center px-2 pb-1.5">
                        <IsiEtalase slug={t.slug} className="relative z-[1] w-[86%] max-w-[9rem] lg:w-[94%] lg:max-w-[11rem]" />
                        <span className="absolute inset-x-0 bottom-0 z-[1] h-1.5 bg-tinta/20" aria-hidden="true" />
                        <span className="absolute left-2 top-5 z-[3]">
                          <span className="gantung"><span className="label-gantung" style={{ '--lubang': t.merek.dalam }}>{t.kategori}</span></span>
                        </span>
                      </span>
                      <span className="trotoar" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galeri: satu etalase per toko */}
        <section id="toko" aria-labelledby="judul-toko" className="scroll-mt-16 py-14 sm:py-20">
          <div className="wadah">
            <div className="max-w-2xl">
              <p className="label">Galeri</p>
              <h2 id="judul-toko" className="mt-3 text-[2rem] sm:text-5xl">{NAMA_JUMLAH} etalase, {NAMA_JUMLAH.toLowerCase()} cara memilih barang</h2>
              <p className="mt-4 text-tinta-2">
                Alur belanjanya sama, tetapi tiap toko punya alat bantu yang cocok dengan barangnya: ubin uji glasir, penemu produk menurut kulit, Ukuranku untuk baju, dan pencari tanaman menurut cahaya jendela. Semua usaha di sini fiktif.
              </p>
            </div>

            <ol className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
              {toko.map((t, i) => (
                <li key={t.slug} id={t.slug} className="scroll-mt-20" style={warna(t)}>
                  <article aria-labelledby={`nama-${t.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl border border-garis bg-kertas shadow-[0_24px_50px_-34px_rgba(34,23,43,0.45)]">
                    <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6" style={{ background: t.merek.bg, color: t.merek.fg }}>
                      <Tanda slug={t.slug} className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
                      <h3 id={`nama-${t.slug}`} className="min-w-0">
                        <Merek slug={t.slug} className={t.slug === 'daunjendela' ? 'h-[1.15rem] w-auto sm:h-6' : 'h-6 w-auto sm:h-7'} />
                        <span className="sr-only">{t.nama}</span>
                      </h3>
                      <p className="ms-auto shrink-0 text-right text-[11px] font-bold uppercase leading-snug tracking-[0.12em]">
                        No. {String(i + 1).padStart(2, '0')}<br />{t.kategori}
                      </p>
                    </div>
                    <span className="kanopi kanopi-besar" aria-hidden="true" />

                    <div className="kartu-isi grid gap-x-5 gap-y-4 px-4 pb-5 pt-3 sm:px-6 sm:pb-6">
                      <a href={t.url} target="_blank" rel="noopener noreferrer" className="ponsel [grid-area:ponsel]" tabIndex={-1} aria-hidden="true">
                        <span className="ponsel-layar block">
                          <Image src={t.image} alt="" fill sizes="(min-width: 640px) 192px, 132px" className="object-cover object-top" />
                        </span>
                      </a>
                      <p className="font-display text-[1.15rem] font-bold leading-snug [grid-area:tag] sm:text-[1.35rem]">{t.tagline}</p>
                      <p className="text-[0.92rem] leading-relaxed text-tinta-2 [grid-area:desc] sm:text-[0.95rem]">
                        <span className="font-semibold text-tinta">{t.kota}.</span> {t.deskripsi}
                      </p>
                      <div className="[grid-area:khas]">
                        <h4 className="label">Khas {t.nama}</h4>
                        <ul className="mt-2.5 space-y-2.5">
                          {t.khas.map(([j, d]) => (
                            <li key={j} className="flex gap-2.5 text-[0.92rem] leading-snug text-tinta-2">
                              <span className="titik-label" aria-hidden="true" />
                              <span><strong className="font-semibold text-tinta">{j}</strong>: {d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto border-t border-dashed border-garis-tua/70 px-4 pb-5 pt-4 sm:px-6">
                      <p id={`coba-${t.slug}`} className="text-sm font-semibold text-tinta-3">Coba langsung</p>
                      <ul aria-labelledby={`coba-${t.slug}`} className="mt-2 flex flex-wrap gap-2">
                        {t.halaman.map(([path, label]) => (
                          <li key={path}>
                            <a href={`${t.url}${path}`} target="_blank" rel="noopener noreferrer" className="chip">{label}</a>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="tombol tombol-merek" style={{ '--m-bg': t.merek.tombolBg || t.merek.bg, '--m-fg': t.merek.tombolFg }}>Masuk toko {t.nama}</a>
                        <a href={wa(`Halo PintuWeb, saya tertarik toko online seperti ${t.nama}. Boleh minta info?`)} target="_blank" rel="noopener noreferrer" className="tombol tombol-garis">Pesan yang seperti ini</a>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Alur belanja: label bergantung pada rel */}
        <section id="alur" aria-labelledby="judul-alur" className="gelap scroll-mt-16 bg-malam py-14 text-dinding sm:py-20">
          <div className="wadah">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="label">Alur belanja</p>
                <h2 id="judul-alur" className="mt-3 text-[2rem] sm:text-5xl">Dari keranjang sampai lacak pesanan</h2>
              </div>
              <p className="text-redup lg:col-span-5">
                Empat langkah ini berjalan di keempat toko, langsung di peramban. Coba dengan barang mana pun dari katalog; tidak ada uang atau paket yang benar-benar berpindah.
              </p>
            </div>

            <ol className="rel mt-12 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4" style={{ "--rel": "#6f5a43", "--sela": "1.5rem" }}>
              {ALUR.map((a, i) => (
                <li key={a.j} className="pt-9">
                  <span className="tali" style={{ top: '4px', bottom: 'auto', height: '2.35rem', '--tali': '#a58965' }} aria-hidden="true" />
                  <div className="tag ayun h-full px-5 pb-6 pt-9 lg:pt-10" style={{ '--lubang': 'var(--color-malam)', '--ayun': i % 2 ? '1.5deg' : '-1.5deg' }}>
                    <span className="tag-lubang" aria-hidden="true" />
                    <div className="flex items-baseline gap-3 lg:block">
                      <p className="font-display text-[2.2rem] font-extrabold leading-none text-kraft-tinta lg:text-[2.6rem]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="text-2xl lg:mt-2">{a.j}</h3>
                    </div>
                    <p className="mt-2 text-[0.93rem] leading-relaxed">{a.d}</p>
                    <p className="mt-4 border-t border-dashed border-kraft-tinta/40 pt-3 text-sm leading-snug text-kraft-tinta">{a.c}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <div className="rounded-2xl border border-malam-garis bg-malam-2 p-6 sm:p-8 lg:col-span-7">
                <h3 className="text-2xl sm:text-[1.7rem]">Sisi penjual: dasbor tanpa login</h3>
                <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-redup">
                  {DASBOR.map((d) => (
                    <li key={d} className="flex gap-3"><span className="text-jambu"><Cek /></span><span>{d}</span></li>
                  ))}
                </ul>
                <p id="judul-dasbor" className="mt-6 text-sm font-semibold text-dinding">Buka dasbor demo</p>
                <ul aria-labelledby="judul-dasbor" className="mt-2 flex flex-wrap gap-2">
                  {toko.map((t) => (
                    <li key={t.slug}>
                      <a href={`${t.url}/admin`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center rounded-full border border-malam-garis px-3.5 text-sm font-semibold text-dinding transition hover:border-dinding">{t.nama}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-dashed border-malam-garis p-6 sm:p-8 lg:col-span-5">
                <h3 className="text-2xl sm:text-[1.7rem]">Yang sengaja disimulasikan</h3>
                <dl className="mt-5 space-y-3 text-[0.95rem] leading-relaxed">
                  {SIMULASI.map(([k, v]) => (
                    <div key={k}><dt className="inline font-semibold text-dinding">{k}: </dt><dd className="inline text-redup">{v}</dd></div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-malam-garis pt-4 text-sm leading-relaxed text-redup">
                  Di toko sungguhan dengan paket {FULL.nama}, pembayaran memakai integrasi payment gateway dan ongkir otomatis via RajaOngkir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paket: dua label harga */}
        <section id="paket" aria-labelledby="judul-paket" className="scroll-mt-16 py-14 sm:py-20">
          <div className="wadah">
            <div className="max-w-2xl">
              <p className="label">Paket & harga</p>
              <h2 id="judul-paket" className="mt-3 text-[2rem] sm:text-5xl">Dua label harga, dari katalog WhatsApp sampai toko lengkap</h2>
              <p className="mt-4 text-tinta-2">
                Angkanya sama dengan halaman Paket PintuWeb, berlaku per {HARGA_PER}. Waktu pengerjaan dihitung setelah bahan (foto dan daftar produk) lengkap.
              </p>
            </div>

            <ul className="rel mt-12 grid gap-x-8 gap-y-8 lg:grid-cols-2" style={{ "--rel": "#b8a89c", "--sela": "2rem" }}>
              {PAKET.map((p, i) => (
                <li key={p.slug} id={p.slug} className="scroll-mt-20 pt-12">
                  <span className="tali" style={{ top: '4px', bottom: 'auto', height: '3.3rem', '--tali': '#9c7d5a' }} aria-hidden="true" />
                  <article aria-labelledby={`judul-${p.slug}`} className="tag ayun flex h-full flex-col px-5 pb-7 pt-12 sm:px-9" style={{ '--ayun': i ? '1deg' : '-1deg' }}>
                    <span className="tag-lubang" aria-hidden="true" />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 id={`judul-${p.slug}`} className="text-[1.6rem] sm:text-3xl">{p.nama}</h3>
                      {p.lencana && <span className="rounded-full bg-fuksia px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">{p.lencana}</span>}
                    </div>
                    <p className="mt-1 text-kraft-tinta">{p.subjudul}</p>
                    <p className="mt-5 font-display text-[1.9rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.2rem]">
                      <span className="whitespace-nowrap">{p.mulai} –</span>{' '}<span className="whitespace-nowrap">{p.sampai}</span>
                    </p>
                    <p className="mt-2 text-sm font-semibold">Pengerjaan {p.waktu}</p>
                    <ul className="mt-5 space-y-2 border-t border-dashed border-kraft-tinta/40 pt-5 text-[0.95rem] leading-snug">
                      {p.fitur.map((f) => (
                        <li key={f} className="flex gap-2.5"><span className="text-fuksia-tua"><Cek /></span><span>{f}</span></li>
                      ))}
                    </ul>
                    <p className="mt-5 rounded-xl bg-kertas/70 p-4 text-sm leading-relaxed text-tinta-2">
                      {p === FULL
                        ? 'Keranjang, checkout, dan dasbor penjual yang kamu coba di keempat demo termasuk paket ini. Di demo, pembayaran dan ongkirnya disimulasikan.'
                        : 'Cocok untuk usaha yang pesanannya masih dilayani manual: pelanggan memilih produk di katalog, lalu pesannya terkirim rapi ke WhatsApp-mu.'}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      <a href={wa(`Halo PintuWeb, saya tertarik paket "${p.nama}". Boleh minta info lebih lanjut?`)} target="_blank" rel="noopener noreferrer" className="tombol tombol-tinta">Tanya {p.nama}</a>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-tinta-3">
              Perbandingan semua paket ada di <a href={`${PINTUWEB}/paket#toko-online-simple`} className="font-semibold text-fuksia underline underline-offset-4">halaman Paket PintuWeb</a>.
            </p>
          </div>
        </section>

        {/* Tanya jawab */}
        <section id="tanya" aria-labelledby="judul-tanya" className="scroll-mt-16 border-t border-garis bg-kertas py-14 sm:py-20">
          <div className="wadah max-w-3xl">
            <p className="label">Tanya jawab</p>
            <h2 id="judul-tanya" className="mt-3 text-[2rem] sm:text-5xl">Sebelum membuka toko</h2>
            <div className="mt-8 divide-y divide-garis border-y border-garis">
              {TANYA.map((t, i) => (
                <details key={t.q} name="faq-toko" open={i === 0} className="tanya group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[1.02rem] font-semibold leading-snug">
                    {t.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-garis-tua text-lg leading-none transition group-open:rotate-45 group-open:border-fuksia group-open:bg-fuksia group-open:text-white" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 text-[0.95rem] leading-relaxed text-tinta-2">{t.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Ajakan */}
        <section aria-labelledby="judul-ajakan" className="border-t border-garis">
          <div className="wadah py-16 text-center sm:py-20">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-fuksia text-white" aria-hidden="true"><IkonKantong className="h-9 w-9" /></span>
            <h2 id="judul-ajakan" className="mx-auto mt-6 max-w-xl text-[2rem] sm:text-5xl">Tokomu berikutnya di deretan ini</h2>
            <p className="mx-auto mt-4 max-w-xl text-tinta-2">
              Kirim daftar produk dan foto yang kamu punya. Kami bantu memilih paket, lalu tokomu dikerjakan {SIMPLE.waktu} (Simple) atau {FULL.waktu} (Full) setelah bahannya lengkap.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="tombol tombol-fuksia mt-7">Chat WhatsApp {WA_DISPLAY}</a>
            <p className="mt-3 text-sm text-tinta-3">Jam kerja {JAM_KERJA}</p>
          </div>
        </section>
      </main>

      <footer className="gelap bg-malam pb-6 pt-10 text-redup">
        <div className="wadah grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <p className="flex items-center gap-2.5 text-dinding"><Logo gelap /></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{NAMA_JUMLAH} demo toko online: keramik, perawatan kulit, busana lurik, dan tanaman hias.</p>
          </div>
          <nav aria-labelledby="kaki-lanjut" className="text-sm">
            <p id="kaki-lanjut" className="label">Lanjut di PintuWeb</p>
            <ul className="mt-3 space-y-1">
              {LANJUT.map((l) => (
                <li key={l.href}><a href={l.href} className="inline-block py-1 transition hover:text-dinding">{l.label}</a></li>
              ))}
              <li><a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block py-1 transition hover:text-dinding">WhatsApp <span className="whitespace-nowrap">{WA_DISPLAY}</span></a></li>
            </ul>
          </nav>
          <nav aria-labelledby="kaki-galeri" className="text-sm">
            <p id="kaki-galeri" className="label">Galeri lain</p>
            <ul className="mt-3 space-y-1">
              {GALERI_LAIN.map((g) => (
                <li key={g.path}><a href={`${PINTUWEB}/${g.path}`} className="inline-block py-1 transition hover:text-dinding">{g.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="wadah mt-10 border-t border-malam-garis pt-4 text-xs">© 2026 PintuWeb. Semua usaha di demo ini fiktif. Berlokasi di Trenggalek.</p>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </div>
  );
}
