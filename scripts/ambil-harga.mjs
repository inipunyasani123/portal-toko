// Mengambil harga resmi dari PintuWeb (https://www.pintuweb.id/harga.json) sebelum build (npm "prebuild").
// Berhasil: menulis berkas harga.json (bawaan app/components/harga.json; boleh beri jalur lain sebagai argumen).
// Gagal (jaringan, 404, isi tidak valid): berkas lama di repo DIPAKAI, cetak peringatan, build tetap lanjut.
// Untuk uji: HARGA_URL=http://localhost:3000/harga.json node scripts/ambil-harga.mjs
import fs from 'node:fs'
import path from 'node:path'

const URL_HARGA = process.env.HARGA_URL || 'https://www.pintuweb.id/harga.json'
const tujuan = path.resolve(process.argv[2] || 'app/components/harga.json')

try {
  const res = await fetch(URL_HARGA, { signal: AbortSignal.timeout(8000), headers: { accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (!data || typeof data.paket !== 'object' || !data.wa?.nomor || !data.diperbarui) throw new Error('isi harga.json tidak valid')
  const teks = JSON.stringify(data, null, 2) + '\n'
  const lama = fs.existsSync(tujuan) ? fs.readFileSync(tujuan, 'utf8') : ''
  if (teks !== lama) fs.writeFileSync(tujuan, teks)
  console.log(`[harga] ${URL_HARGA} OK (diperbarui ${data.diperbarui})${teks === lama ? ', tidak ada perubahan' : `, ${path.relative(process.cwd(), tujuan)} diperbarui`}`)
} catch (e) {
  console.warn(`[harga] PERINGATAN: gagal mengambil ${URL_HARGA} (${e.message}). Memakai berkas cadangan ${path.relative(process.cwd(), tujuan)}.`)
}
