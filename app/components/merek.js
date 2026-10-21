// Identitas empat toko di portal: nama merek dengan huruf aslinya (path SVG), tanda merek (disalin dari komponen Logo
// tiap toko), isi etalase, dan lantai atas ruko. Semuanya dekoratif (aria-hidden); nama toko ditulis juga sebagai teks.
import { MEREK_UKURAN } from './merek-svg';

/** Nama merek dari sprite statis public/merek.svg (path huruf asli tiap toko). basePath ditulis manual: href SVG tidak diberi basePath oleh Next. */
export function Merek({ slug, className = '' }) {
  const [w, h] = MEREK_UKURAN[slug];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`block max-w-full ${className}`} aria-hidden="true" focusable="false">
      <use href={`/toko-online/merek.svg#merek-${slug}`} />
    </svg>
  );
}

export function Tanda({ slug, className = '' }) {
  if (slug === 'tanur')
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="18.2" fill="none" stroke="#c97a52" strokeWidth="2.2" />
        <circle cx="20" cy="20" r="14.6" fill="none" stroke="#c97a52" strokeWidth="0.9" strokeDasharray="1.1 2.1" />
        <path d="M12 27.5 V20.5 A8 8 0 0 1 28 20.5 V27.5" fill="none" stroke="#c97a52" strokeWidth="2.3" strokeLinejoin="round" />
        <path d="M9.5 27.6 H30.5" stroke="#c97a52" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M20 25.6 c-3.1-1.5-3-4.4-0.2-7.6 c0.6 1.8 1.8 2.3 2.4 3.8 c0.7 1.8-0.4 3.3-2.2 3.8z" fill="#c97a52" />
      </svg>
    );
  if (slug === 'takar')
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
        <path d="M16 2.6C16 2.6 6.2 14.2 6.2 20.4a9.8 9.8 0 0 0 19.6 0C25.8 14.2 16 2.6 16 2.6Z" fill="#fcfcf9" stroke="#17201c" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.6 16.6h5M8.6 20.6h8.4M9.6 24.6h5" stroke="#17201c" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  if (slug === 'lungsin') {
    const pos = [3, 12, 21];
    return (
      <svg viewBox="0 0 30 30" className={className} aria-hidden="true" focusable="false">
        {pos.map((y) => <rect key={`p${y}`} x="0.5" y={y} width="29" height="6" rx="1" fill="#e3a62a" />)}
        {pos.map((x) => <rect key={`l${x}`} x={x} y="0.5" width="6" height="29" rx="1" fill="#f4efe3" stroke="#111b31" strokeWidth="1.1" />)}
        {pos.flatMap((x, i) => pos.map((y, j) => ((i + j) % 2 === 0 ? <rect key={`a${x}${y}`} x={x - 0.6} y={y} width="7.2" height="6" fill="#e3a62a" stroke="#111b31" strokeWidth="1.1" /> : null)))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 36" className={className} aria-hidden="true" focusable="false">
      <path d="M4 34V15.5C4 8.6 9.4 3 16 3s12 5.6 12 12.5V34Z" fill="none" stroke="#f2f1ea" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M16 3.6V34M4.6 18.5h22.8" stroke="#f2f1ea" strokeWidth="1.8" />
      <path d="M7.2 32.6c-.4-6.2 2.6-10.7 8-12.6.3 5.8-2.5 10.6-8 12.6Z" fill="#8fb36f" />
      <path d="M2 34h28" stroke="#f2f1ea" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Barang yang dipajang di balik kaca etalase, satu per toko, berdiri di atas rak. */
export function IsiEtalase({ slug, className = '' }) {
  const bayang = <ellipse cx="60" cy="93" rx="30" ry="3.2" fill="#22172b" opacity=".13" />;
  if (slug === 'tanur')
    return (
      <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
        {bayang}
        <path d="M49 83h22l-1.6 9H50.6z" fill="#dcc8ad" />
        <path d="M22 50c0 21 17 35 38 35s38-14 38-35z" fill="#9fb4a0" />
        <path d="M22 50c0 21 17 35 38 35-15-3-28-15-31-35z" fill="#3f5b4a" opacity=".28" />
        <path d="M78 52c-1 12-6 22-15 28" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M33 74c1 3 .4 5 1.6 7M44 80c.6 2.4.2 3.6 1 5" stroke="#3f5b4a" strokeOpacity=".45" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="60" cy="50" rx="38" ry="8" fill="#dde6d9" />
        <ellipse cx="60" cy="51.5" rx="33" ry="5.6" fill="#b5c6b4" />
        <circle cx="47" cy="62" r="0.9" fill="#4a2d20" opacity=".5" /><circle cx="70" cy="68" r="0.8" fill="#4a2d20" opacity=".5" /><circle cx="58" cy="74" r="0.7" fill="#4a2d20" opacity=".5" />
      </svg>
    );
  if (slug === 'takar')
    return (
      <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
        {bayang}
        <rect x="18" y="58" width="22" height="34" rx="5" fill="#e2f0f5" stroke="#9fcde2" strokeWidth="1.5" />
        <rect x="21" y="49" width="16" height="10" rx="2" fill="#2e5b46" />
        <path d="M22 70h14M22 76h9" stroke="#2e5b46" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="46" y="44" width="32" height="48" rx="6" fill="#8a4b16" />
        <rect x="49" y="47" width="5" height="40" rx="2.5" fill="#fff" opacity=".22" />
        <rect x="50" y="57" width="24" height="24" rx="2" fill="#fcfcf9" />
        <rect x="50" y="74" width="24" height="7" fill="#f3b51b" />
        <path d="M54 63h16M54 68h10" stroke="#17201c" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="54" y="35" width="16" height="10" rx="2" fill="#17201c" />
        <path d="M56 36v-10a6 6 0 0 1 12 0v10z" fill="#2a3631" />
        <rect x="84" y="62" width="20" height="30" rx="4" fill="#fbe6e1" stroke="#e7b9ae" strokeWidth="1.5" />
        <rect x="86" y="54" width="16" height="9" rx="2" fill="#f3b51b" />
        <path d="M84 62v30" stroke="#f3b51b" strokeWidth="0" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${88 + i * 2.4} 92v-${i % 2 ? 3 : 5}`} stroke="#17201c" strokeOpacity=".5" strokeWidth="0.9" />)}
      </svg>
    );
  if (slug === 'lungsin')
    return (
      <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
        <defs>
          <pattern id="pt-lurik" width="9" height="10" patternUnits="userSpaceOnUse">
            <rect width="9" height="10" fill="#2b4472" />
            <rect x="0" width="1.6" height="10" fill="#e3a62a" />
            <rect x="3.4" width="0.9" height="10" fill="#f7f5ef" opacity=".8" />
            <rect x="5.6" width="1.4" height="10" fill="#a2322a" />
          </pattern>
        </defs>
        <path d="M60 22v-4a4.5 4.5 0 1 0-4.5-4.5" fill="none" stroke="#565f73" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M28 34 60 22l32 12" fill="none" stroke="#565f73" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M37 31 50 26q10 7 20 0l13 5 14 17-10 7-6-5v42H40V50l-6 5-10-7z" fill="url(#pt-lurik)" />
        <path d="M50 26 60 39l10-13" fill="#1d3157" />
        <path d="M60 39v52" stroke="#111b31" strokeOpacity=".5" strokeWidth="1.2" />
        <circle cx="62.5" cy="50" r="1.3" fill="#f7f5ef" /><circle cx="62.5" cy="62" r="1.3" fill="#f7f5ef" /><circle cx="62.5" cy="74" r="1.3" fill="#f7f5ef" />
        <path d="M40 50l-6 5-10-7M80 50l6 5 10-7" fill="none" stroke="#111b31" strokeOpacity=".35" strokeWidth="1" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      {bayang}
      <path d="M60 64c-2-14-12-24-26-28 2 15 12 25 26 28Z" fill="#2c7556" />
      <path d="M60 64C62 48 74 38 90 36c-3 16-14 26-30 28Z" fill="#1f5c43" />
      <path d="M60 64c-6-16-4-32 6-46 7 15 5 31-6 46Z" fill="#2c7556" />
      <path d="M60 64c-9-8-22-10-34-4 10 8 22 9 34 4Z" fill="#8fb36f" />
      <path d="M60 64c9-7 21-8 32-2-10 7-21 8-32 2Z" fill="#8fb36f" opacity=".85" />
      <path d="M60 64c-1-14 1-28 6-44M60 64c-6-9-14-16-25-27M60 64c8-11 17-19 29-27" fill="none" stroke="#123326" strokeOpacity=".45" strokeWidth="1" strokeLinecap="round" />
      <rect x="38" y="62" width="44" height="8" rx="2" fill="#9a4a2b" />
      <path d="M41 70h38l-4.5 22h-29z" fill="#b65c38" />
      <path d="M46 74h28" stroke="#f3dccf" strokeOpacity=".5" strokeWidth="1.4" />
    </svg>
  );
}

/** Lantai atas ruko di atas papan nama: tinggi dan jendelanya beda per toko, jadi deretannya tidak rata. */
export function LantaiAtas({ slug, className = '' }) {
  if (slug === 'tanur')
    return (
      <svg viewBox="0 0 160 58" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax slice">
        <rect width="160" height="58" fill="#e8dac6" />
        <path d="M0 6h160" stroke="#dcc8ad" strokeWidth="4" />
        {[46, 114].map((x) => <path key={x} d={`M${x - 15} 54V34a15 15 0 0 1 30 0v20Z`} fill="#4a3a2e" />)}
        {[46, 114].map((x) => <path key={`n${x}`} d={`M${x - 10} 54V35a10 10 0 0 1 20 0v19Z`} fill="#b6623b" opacity=".55" />)}
      </svg>
    );
  if (slug === 'takar')
    return (
      <svg viewBox="0 0 160 34" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax slice">
        <rect width="160" height="34" fill="#e8ece6" />
        {Array.from({ length: 11 }, (_, i) => <path key={`v${i}`} d={`M${i * 16} 0v34`} stroke="#d4dbd5" strokeWidth="1" />)}
        {[0, 1, 2].map((i) => <path key={`h${i}`} d={`M0 ${i * 16 + 2}h160`} stroke="#d4dbd5" strokeWidth="1" />)}
        <rect x="64" y="8" width="32" height="22" rx="2" fill="#2e5b46" opacity=".85" />
        <path d="M80 8v22" stroke="#e8ece6" strokeWidth="2" />
      </svg>
    );
  if (slug === 'lungsin')
    return (
      <svg viewBox="0 0 160 72" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax slice">
        <rect width="160" height="72" fill="#e3ddce" />
        <g>
          {Array.from({ length: 20 }, (_, i) => <rect key={i} x={i * 8} y="0" width="8" height="8" fill={['#1d3157', '#e3a62a', '#a2322a', '#3e5a2d', '#f7f5ef'][i % 5]} />)}
        </g>
        {[30, 94].map((x) => <rect key={x} x={x} y="22" width="36" height="42" rx="2" fill="#1d3157" />)}
        {[30, 94].map((x) => <path key={`t${x}`} d={`M${x + 3} 25h30v14c-6 4-12 4-15 0-3 4-9 4-15 0Z`} fill="#f7e6bb" opacity=".9" />)}
      </svg>
    );
  return (
    <svg viewBox="0 0 160 50" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax slice">
      <rect width="160" height="50" fill="#e3e9df" />
      <path d="M58 48V28a22 22 0 0 1 44 0v20Z" fill="#15322a" />
      <path d="M62 48V29a18 18 0 0 1 36 0v19Z" fill="#c6d2bf" />
      <path d="M80 11v37M62 31h36" stroke="#15322a" strokeWidth="2.4" />
      <path d="M66 47c0-7 4-12 10-14 0 7-4 12-10 14Z" fill="#1f5c43" />
    </svg>
  );
}
