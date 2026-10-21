import Link from 'next/link';
import { toko } from './components/toko-data';

export const metadata = { title: 'Halaman tidak ditemukan', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main id="konten" className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative pt-14" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-14 w-0.5 -translate-x-1/2 bg-[#9c7d5a]" />
        <div className="tag ayun px-10 pb-7 pt-12" style={{ '--ayun': '-3deg' }}>
          <span className="tag-lubang" />
          <p className="font-display text-6xl font-extrabold leading-none">404</p>
          <p className="mt-2 text-sm font-semibold text-kraft-tinta">Stok: 0</p>
        </div>
      </div>
      <h1 className="mt-8 text-4xl sm:text-5xl">Rak ini kosong</h1>
      <p className="mt-4 max-w-md text-tinta-2">Halaman yang kamu cari tidak dipajang di sini. {toko.length} toko demo menunggu di deretan utama.</p>
      <Link href="/" className="tombol tombol-fuksia mt-8">Kembali ke deretan toko</Link>
    </main>
  );
}
