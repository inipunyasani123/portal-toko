import './globals.css';
import localFont from 'next/font/local';
import { toko } from './components/toko-data';
import { URL_PORTAL, PINTUWEB } from './components/pintuweb';

// Dua font OFL (lisensi di app/fonts), diunduh dari Google Fonts dengan parameter text= berisi ASCII cetak + – — · × ° ‘ ’ “ ” … é →
// supaya ringan: Bricolage Grotesque instans ukuran optik 96 (judul, 33 KB) dan Figtree variabel (teks, 15 KB).
// Versi next/font/google-nya 77 KB + 20 KB. Kalau teks memakai huruf di luar daftar itu, unduh ulang dengan text= yang ditambah.
const bricolage = localFont({ src: './fonts/bricolage-96.woff2', weight: '200 800', variable: '--font-bricolage', display: 'swap', adjustFontFallback: 'Arial' });
const figtree = localFont({ src: './fonts/figtree.woff2', weight: '300 900', variable: '--font-figtree', display: 'swap', adjustFontFallback: 'Arial' });

// Merek di hasil pencarian & pratinjau tautan = PintuWeb. Jumlah demo dihitung dari data, bukan ditulis tangan.
const TITLE = `Contoh Toko Online: ${toko.length} Demo Siap Coba | PintuWeb`;
const DESCRIPTION = 'Empat demo toko online: keramik, perawatan kulit, busana lurik, dan tanaman hias. Coba katalog, keranjang, checkout, lacak pesanan, dan dasbor penjual.';

// CollectionPage + daftar demonya (ItemList) + jejak. Data dari toko-data, jadi ikut bertambah sendiri.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: TITLE,
  description: DESCRIPTION,
  url: URL_PORTAL,
  inLanguage: 'id-ID',
  isPartOf: { '@type': 'WebSite', name: 'PintuWeb', url: PINTUWEB },
  publisher: { '@type': 'Organization', name: 'PintuWeb', url: PINTUWEB },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: toko.length,
    itemListElement: toko.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: `${t.nama} — ${t.kategori}`, url: t.url })),
  },
  breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'PintuWeb', item: PINTUWEB }, { '@type': 'ListItem', position: 2, name: 'Toko Online', item: URL_PORTAL }] },
};

export const metadata = {
  metadataBase: new URL(URL_PORTAL),
  title: { default: TITLE, template: '%s | PintuWeb' },
  description: DESCRIPTION,
  applicationName: 'PintuWeb',
  keywords: ['contoh toko online', 'demo toko online', 'jasa pembuatan toko online', 'website toko online', 'toko online sendiri'],
  authors: [{ name: 'PintuWeb', url: PINTUWEB }],
  creator: 'PintuWeb',
  publisher: 'PintuWeb',
  alternates: { canonical: URL_PORTAL },
  openGraph: { type: 'website', locale: 'id_ID', url: URL_PORTAL, siteName: 'PintuWeb', title: TITLE, description: DESCRIPTION, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Deretan empat etalase toko demo: Tanur, Takar, Lungsin, dan Daun Jendela' }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

export const viewport = { themeColor: '#f6f1ec', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
