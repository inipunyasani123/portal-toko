import Image, { getImageProps } from 'next/image';
import { toko, JUMLAH, NAMA_JUMLAH } from './components/toko-data';
import { Merek, Tanda, IsiEtalase, LantaiAtas } from './components/merek';
import { GaleriLain, SorotTautan, BilahAksi } from './components/interaksi';
import { LANJUT, BACA, GALERI_LAIN, PINTUWEB, PAKET, SIMPLE, FULL, HARGA_PER, WA_DISPLAY, JAM_KERJA, wa } from './components/pintuweb';

const WA = wa('Halo PintuWeb, saya mau buat toko online untuk usaha saya. Boleh minta info?');
const SLUGS = toko.map((t) => t.slug);

/** <picture> potret ponsel: gambar 2× untuk layar < 768 px, gambar biasa untuk layar lebar. Memakai loader statis, bukan optimizer Vercel. */
function Potret({ t, sizes, sizesM = sizes, className = '', prioritas = false }) {
  const { props: d } = getImageProps({ src: t.image, alt: '', fill: true, sizes, priority: prioritas });
  const { props: m } = getImageProps({ src: t.imageM, alt: '', fill: true, sizes: sizesM });
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={m.srcSet} sizes={sizesM} />
      <img {...d} alt="" className={className} />
    </picture>
  );
}

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
  { j: 'Keranjang', d: 'Pilih varian, lalu masukkan ke keranjang. Jumlahnya mengikuti sisa stok.', c: 'Di Lungsin, ukuran baju bisa diganti dari keranjang.' },
  { j: 'Checkout', d: 'Isi alamat, pilih pengiriman dan cara bayar. Ongkir dihitung otomatis.', c: 'Di Takar, ada pilihan ambil di toko tanpa ongkir.' },
  { j: 'Bayar', d: 'Tekan tombol "Simulasikan pembayaran". Status pesanan berubah jadi Dibayar.', c: 'Di Daun Jendela, tanggal kirim tanaman dihitung dari waktu bayar.' },
  { j: 'Lacak', d: 'Masukkan kode pesanan dan 4 angka terakhir nomor HP. Perjalanan paket langsung terlihat.', c: 'Di Tanur, nomor resi contoh muncul setelah status Dikirim.' },
];

const DASBOR = [
  'Lihat penjualan 7 hari terakhir.',
  'Lihat daftar pesanan dan ubah statusnya.',
  'Atur stok tiap varian.',
  'Kembalikan data contoh kapan saja.',
];

const SIMULASI = [
  ['Pembayaran', 'tidak ada uang yang berpindah.'],
  ['Ongkir', 'memakai tarif contoh.'],
  ['Data', 'hanya tersimpan di peramban kamu.'],
];

const TANYA = [
  {
    q: 'Berapa biaya membuat toko online?',
    a: `${SIMPLE.nama} ${SIMPLE.mulai} – ${SIMPLE.sampai} (${SIMPLE.waktu}). ${FULL.nama} ${FULL.mulai} – ${FULL.sampai} (${FULL.waktu}). Domain dan hosting sudah termasuk.`,
  },
  {
    q: 'Empat demo ini setara paket yang mana?',
    a: `Setara ${FULL.nama}. Bedanya, di demo pembayaran dan ongkir hanya simulasi.`,
  },
  {
    q: 'Apakah pembayaran di demo ini sungguhan?',
    a: 'Tidak. Tidak ada uang yang berpindah dan datamu tidak dikirim ke mana pun.',
  },
  {
    q: 'Bisakah saya mengubah produk dan harga sendiri?',
    a: 'Bisa. Kamu bisa menambah, mengubah, atau menyembunyikan produk tanpa menghubungi kami.',
  },
  {
    q: 'Apakah saya perlu meninggalkan marketplace?',
    a: 'Tidak perlu. Banyak penjual memakai keduanya.',
  },
  {
    q: 'Bisa dibuatkan fitur khusus untuk barang saya?',
    a: 'Bisa. Ceritakan kebutuhanmu lewat WhatsApp. Biayanya kami tulis dulu sebelum mulai.',
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
      <span className={`grid shrink-0 place-items-center ${gelap ? 'rounded-lg bg-white px-1.5 py-1' : ''}`} aria-hidden="true">
        <Image src="/toko-online/images/logo-pintuweb.png" alt="" width={22} height={30} className="h-[30px] w-auto" />
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
        <ol className="wadah flex items-center gap-2 py-1">
          <li><a href={PINTUWEB} className="font-semibold underline-offset-4 hover:underline">PintuWeb</a></li>
          <li aria-hidden="true" className="opacity-60">/</li>
          <li aria-current="page">Toko Online</li>
          <li className="ms-auto list-none"><GaleriLain galeri={GALERI_LAIN} pintuweb={PINTUWEB} /></li>
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
        <section id="hero" aria-labelledby="judul-utama" className="relative border-b border-garis">
          <div className="wadah grid gap-6 pb-8 pt-6 sm:gap-10 sm:pb-16 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-20 lg:pt-16">
            <div className="min-w-0 lg:col-span-5 lg:pb-6">
              <p className="label">Toko online · {JUMLAH} demo</p>
              <h1 id="judul-utama" className="mt-4 text-[1.9rem] sm:text-[3.4rem] lg:text-[3.6rem]">
                Coba belanja di {NAMA_JUMLAH.toLowerCase()} toko online.
              </h1>
              <p className="mt-5 hidden max-w-xl text-[1.05rem] leading-relaxed text-tinta-2 sm:block">
                Dari keranjang sampai lacak pesanan. Semua toko fiktif dan pembayarannya hanya simulasi.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
                <a href="#toko" className="tombol tombol-fuksia">Masuk ke {NAMA_JUMLAH.toLowerCase()} toko</a>
                <a href="#paket" className="tombol tombol-garis hidden sm:inline-flex">Paket & harga</a>
              </div>
              <ul className="-mx-4 mt-5 flex scroll-px-4 snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:hidden" aria-label="Geser untuk melihat demo toko">
                {toko.map((t) => (
                  <li key={t.slug} className="w-[7.25rem] shrink-0 snap-start" style={warna(t)}>
                    <a href={`#${t.slug}`} className="block rounded-2xl">
                      <span className="ponsel ponsel-kecil">
                        <span className="ponsel-layar block">
                          <Potret t={t} sizes="116px" />
                        </span>
                      </span>
                      <span className="mt-2 block font-display text-[0.95rem] font-bold leading-tight">{t.nama}</span>
                      <span className="block text-xs text-tinta-3">{t.kategori}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 hidden text-sm text-tinta-3 sm:block">
                Mulai <strong className="font-display text-base font-bold text-tinta">{SIMPLE.mulai}</strong> · pengerjaan {SIMPLE.waktu}
              </p>
            </div>

            <div className="hidden sm:block lg:col-span-7">
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
              <h2 id="judul-toko" className="mt-3 text-[2rem] sm:text-5xl">{NAMA_JUMLAH} toko untuk dicoba</h2>
              <p className="mt-4 text-tinta-2">
                Tiap toko punya cara sendiri untuk membantu pembeli memilih. Semua usahanya fiktif.
              </p>
            </div>

            <ol className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
              {toko.map((t, i) => (
                <li key={t.slug} id={t.slug} className="kartu-toko scroll-mt-20" style={warna(t)}>
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
                          <Potret t={t} sizes="192px" sizesM="132px" className="absolute inset-0 h-full w-full object-cover object-top" />
                        </span>
                      </a>
                      <p className="font-display text-[1.15rem] font-bold leading-snug [grid-area:tag] sm:text-[1.35rem]">{t.tagline}</p>
                      <p className="text-[0.92rem] leading-relaxed text-tinta-2 [grid-area:desc] sm:text-[0.95rem]">
                        <span className="font-semibold text-tinta">{t.kota}.</span> {t.deskripsi}
                      </p>
                      <div className="[grid-area:khas]">
                        <h4 className="label">Yang bisa dicoba</h4>
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
                        <a href={wa(`Halo PintuWeb, saya tertarik toko online seperti contoh ${t.nama} (${t.url}). Boleh minta info?`)} target="_blank" rel="noopener noreferrer" className="tombol tombol-garis">Pesan yang mirip</a>
                      </div>
                      <p className="mt-3 text-sm text-tinta-3">Toko lengkap seperti ini mulai <strong className="font-semibold text-tinta">{FULL.mulai.replace('.000.000', ' juta')}</strong> · {FULL.waktu}</p>
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
                <h2 id="judul-alur" className="mt-3 text-[2rem] sm:text-5xl">Dari keranjang sampai lacak</h2>
              </div>
              <p className="text-redup lg:col-span-5">
                Empat langkah ini bisa kamu coba di semua toko.
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
                <h3 className="text-2xl sm:text-[1.7rem]">Sisi penjual: tanpa login</h3>
                <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-redup">
                  {DASBOR.map((d) => (
                    <li key={d} className="flex gap-3"><span className="text-jambu"><Cek /></span><span>{d}</span></li>
                  ))}
                </ul>
                <p id="judul-dasbor" className="mt-6 text-sm font-semibold text-dinding">Buka halaman penjual</p>
                <ul aria-labelledby="judul-dasbor" className="mt-2 flex flex-wrap gap-2">
                  {toko.map((t) => (
                    <li key={t.slug}>
                      <a href={`${t.url}/admin`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center rounded-full border border-malam-garis px-3.5 text-sm font-semibold text-dinding transition hover:border-dinding">{t.nama}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-dashed border-malam-garis p-6 sm:p-8 lg:col-span-5">
                <h3 className="text-2xl sm:text-[1.7rem]">Yang hanya simulasi</h3>
                <dl className="mt-5 space-y-3 text-[0.95rem] leading-relaxed">
                  {SIMULASI.map(([k, v]) => (
                    <div key={k}><dt className="inline font-semibold text-dinding">{k}: </dt><dd className="inline text-redup">{v}</dd></div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-malam-garis pt-4 text-sm leading-relaxed text-redup">
                  Di toko sungguhan, pembayaran dan ongkir terhubung otomatis.
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
              <h2 id="judul-paket" className="mt-3 text-[2rem] sm:text-5xl">Dua paket toko online</h2>
              <p className="mt-4 text-tinta-2">
                Harga berlaku per {HARGA_PER}. Waktu dihitung setelah foto dan daftar produk lengkap.
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
                        ? 'Keranjang, checkout, dan halaman penjual seperti di demo.'
                        : 'Pembeli memilih produk, lalu pesanannya masuk ke WhatsApp-mu.'}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      <a href={wa(`Halo PintuWeb, saya tertarik paket "${p.nama}". Boleh minta info lebih lanjut?`)} target="_blank" rel="noopener noreferrer" className="tombol tombol-tinta">Tanya {p.nama}</a>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-tinta-3">
              Semua paket ada di <a href={`${PINTUWEB}/paket#toko-online-simple`} className="font-semibold text-fuksia underline underline-offset-4">halaman Paket PintuWeb</a>.
            </p>
          </div>
        </section>

        {/* Tanya jawab */}
        <section id="tanya" aria-labelledby="judul-tanya" className="scroll-mt-16 border-t border-garis bg-kertas py-14 sm:py-20">
          <div className="wadah max-w-3xl">
            <p className="label">Tanya jawab</p>
            <h2 id="judul-tanya" className="mt-3 text-[2rem] sm:text-5xl">Pertanyaan umum</h2>
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
              Kirim daftar produk dan fotomu. Kami bantu pilih paket yang pas.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="tombol tombol-fuksia mt-7">Chat WhatsApp {WA_DISPLAY}</a>
            <p className="mt-3 text-sm text-tinta-3">Jam kerja {JAM_KERJA}</p>
          </div>
        </section>
      </main>

      <footer className="gelap bg-malam pt-10 text-redup max-md:pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="wadah grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <p className="flex items-center gap-2.5 text-dinding"><Logo gelap /></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{NAMA_JUMLAH} demo toko online yang bisa kamu coba.</p>
          </div>
          <nav aria-labelledby="kaki-lanjut" className="text-sm">
            <p id="kaki-lanjut" className="label">Lanjut di PintuWeb</p>
            <ul className="mt-3 space-y-1">
              {LANJUT.map((l) => (
                <li key={l.href}><a href={l.href} className="inline-block py-1 transition hover:text-dinding">{l.label}</a></li>
              ))}
              <li><a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block py-1 transition hover:text-dinding">WhatsApp <span className="whitespace-nowrap">{WA_DISPLAY}</span></a></li>
            </ul>
            <p id="kaki-baca" className="label mt-5">Baca juga</p>
            <ul aria-labelledby="kaki-baca" className="mt-3 space-y-1">
              {BACA.map((l) => (
                <li key={l.href}><a href={l.href} className="inline-block py-1 transition hover:text-dinding">{l.label}</a></li>
              ))}
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
        <p className="wadah mt-10 border-t border-malam-garis pt-4 text-xs">© 2026 PintuWeb. Semua usaha di demo ini fiktif. Berlokasi di Tulungagung.</p>
      </footer>
      <BilahAksi hrefWa={WA} />
      <SorotTautan slugs={SLUGS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </div>
  );
}
