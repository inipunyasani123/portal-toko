/** @type {import('next').NextConfig} */
// Portal ini tayang di https://www.pintuweb.id/toko-online: PintuWeb meneruskan path /toko-online ke project ini
// (pola multi-zone), jadi semua rute & aset hidup di bawah basePath yang sama.
const nextConfig = {
  basePath: '/toko-online',
  // Gambar statis tanpa Image Optimization Vercel: varian WebP di public/_img lewat image-loader.js
  // (dibuat scripts/static-images.mjs . --base /toko-online).
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  async headers() {
    return [
      { source: '/_img/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      // sprite nama merek (public/merek.svg): jarang berubah, boleh disimpan sehari
      { source: '/merek.svg', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] },
    ];
  },
  async redirects() {
    // Alamat portal-toko.pintuweb.id di luar basePath -> alamat utama.
    return [
      { source: '/', destination: 'https://www.pintuweb.id/toko-online', basePath: false, permanent: true },
      { source: '/:lama((?!toko-online(?:/|$)).+)', destination: 'https://www.pintuweb.id/toko-online', basePath: false, permanent: true },
    ];
  },
};

export default nextConfig;
