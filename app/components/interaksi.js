'use client';
import { useEffect, useId, useRef, useState } from 'react';

/** Menu "Galeri lain": popover di bilah jejak. aria-expanded, Esc menutup dan mengembalikan fokus, klik di luar menutup. */
export function GaleriLain({ galeri, pintuweb }) {
  const [buka, setBuka] = useState(false);
  const wadah = useRef(null);
  const tombol = useRef(null);
  const idPanel = useId();

  useEffect(() => {
    if (!buka) return;
    const luar = (e) => { if (wadah.current && !wadah.current.contains(e.target)) setBuka(false); };
    const tuts = (e) => { if (e.key === 'Escape') { setBuka(false); tombol.current?.focus(); } };
    document.addEventListener('pointerdown', luar);
    document.addEventListener('keydown', tuts);
    return () => { document.removeEventListener('pointerdown', luar); document.removeEventListener('keydown', tuts); };
  }, [buka]);

  return (
    <div
      ref={wadah}
      className="relative ms-auto"
      onBlur={(e) => { if (buka && !e.currentTarget.contains(e.relatedTarget)) setBuka(false); }}
    >
      <button
        ref={tombol}
        type="button"
        aria-expanded={buka}
        aria-controls={idPanel}
        onClick={() => setBuka((b) => !b)}
        className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-dinding/40 px-3 text-xs font-semibold text-dinding transition hover:border-dinding"
      >
        Galeri lain
        <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${buka ? 'rotate-180' : ''}`} aria-hidden="true" focusable="false">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={idPanel}
        hidden={!buka}
        className="absolute end-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-garis-tua bg-kertas p-2 text-tinta shadow-[0_24px_50px_-24px_rgba(34,23,43,0.6)]"
      >
        <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-fuksia">Galeri lain di PintuWeb</p>
        <ul>
          {galeri.map((g) => (
            <li key={g.path}>
              <a href={`${pintuweb}/${g.path}`} className="flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold transition hover:bg-fuksia-muda">{g.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Menyorot kartu toko ±2 detik (cincin) saat halaman dibuka dengan #slug atau tautan #slug diklik. */
export function SorotTautan({ slugs }) {
  useEffect(() => {
    let t;
    const sorot = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!slugs.includes(id)) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: 'start' });
      document.querySelectorAll('[data-sorot]').forEach((n) => n.removeAttribute('data-sorot'));
      el.setAttribute('data-sorot', '');
      clearTimeout(t);
      t = setTimeout(() => el.removeAttribute('data-sorot'), 2000);
    };
    sorot();
    window.addEventListener('hashchange', sorot);
    return () => { window.removeEventListener('hashchange', sorot); clearTimeout(t); };
  }, [slugs]);
  return null;
}

/** Bilah aksi lengket di ponsel: muncul setelah hero lewat, hilang saat footer terlihat. */
export function BilahAksi({ hrefWa }) {
  const [lewat, setLewat] = useState(false);
  const [kaki, setKaki] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const foot = document.querySelector('footer');
    if (!hero || !foot || !('IntersectionObserver' in window)) return;
    const a = new IntersectionObserver(([e]) => setLewat(!e.isIntersecting && e.boundingClientRect.bottom < 0));
    const b = new IntersectionObserver(([e]) => setKaki(e.isIntersecting));
    a.observe(hero); b.observe(foot);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);
  const tampil = lewat && !kaki;
  return (
    <div
      role="region"
      aria-label="Aksi cepat"
      className={`bilah-aksi fixed inset-x-0 bottom-0 z-40 border-t border-garis-tua bg-kertas/95 px-4 pt-3 backdrop-blur-xl md:hidden ${tampil ? '' : 'bilah-sembunyi'}`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      aria-hidden={!tampil}
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href="#toko" tabIndex={tampil ? 0 : -1} className="tombol tombol-garis min-h-11 flex-1 px-3 text-sm">Lihat demo</a>
        <a href={hrefWa} target="_blank" rel="noopener noreferrer" tabIndex={tampil ? 0 : -1} className="tombol tombol-fuksia min-h-11 flex-[1.4] px-3 text-sm">Pesan via WhatsApp</a>
      </div>
    </div>
  );
}
