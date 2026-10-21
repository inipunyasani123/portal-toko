// Potret halaman lewat Chrome DevTools Protocol (tanpa Puppeteer); dipakai untuk og.jpg dan tangkapan ponsel demo.
// node scripts/potret.mjs <url> <out.png> [--w 390] [--h 844] [--dpr 1] [--full] [--klik "<selector>"]... [--jeda ms] [--tunggu 600] [--ev "<js>"] [--scroll 0] [--proxy http://127.0.0.1:8899]
// Mencetak JSON: judul, luapan mendatar, elemen yang meluap, error konsol, hasil --ev.
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const url = args[0], out = args[1];
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const kliks = args.flatMap((a, i) => (a === '--klik' ? [args[i + 1]] : []));
const W = +opt('--w', 390), H = +opt('--h', 844), full = args.includes('--full'), tunggu = +opt('--tunggu', 700), ev = opt('--ev', null), scroll = +opt('--scroll', 0);
const DPR = +opt('--dpr', 1), PROXY = opt('--proxy', null);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const profil = mkdtempSync(path.join(tmpdir(), 'shot-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0', `--user-data-dir=${profil}`, '--no-first-run', ...(PROXY ? [`--proxy-server=${PROXY}`] : []), 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const wsUrl = await new Promise((res, rej) => {
  let buf = '';
  chrome.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); });
  setTimeout(() => rej(new Error('Chrome tidak siap')), 15000);
});
const port = new URL(wsUrl).port;
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const events = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method) events.push(d); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); return r.result?.result?.value ?? (r.result?.exceptionDetails ? `ERR: ${r.result.exceptionDetails.text} ${r.result.exceptionDetails.exception?.description || ''}` : null); };

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DPR, mobile: W < 700 });
await send('Emulation.setTimezoneOverride', { timezoneId: 'Asia/Jakarta' });
const loaded = new Promise((r) => { const t = setInterval(() => { if (events.some((e) => e.method === 'Page.loadEventFired')) { clearInterval(t); r(); } }, 50); });
await send('Page.navigate', { url });
await Promise.race([loaded, sleep(15000)]);
await sleep(tunggu);
for (const sel of kliks) {
  const r = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'TIDAK ADA: ' + ${JSON.stringify(sel)}; el.click(); return 'klik ' + ${JSON.stringify(sel)}; })()`);
  if (String(r).startsWith('TIDAK')) console.error(r);
  await sleep(600);
}
const jeda = +opt('--jeda', 0); if (jeda) await sleep(jeda);
if (scroll) { await evaluate(`window.scrollTo({ top: ${scroll}, behavior: 'instant' })`); await sleep(400); }
const info = await evaluate(`(() => {
  const de = document.documentElement, vw = de.clientWidth, over = de.scrollWidth - vw;
  const bad = [...document.querySelectorAll('body *')].filter((e) => {
    const r = e.getBoundingClientRect(); if (r.width === 0 || r.right <= vw + 1) return false;
    let p = e.parentElement; while (p) { const o = getComputedStyle(p).overflowX; if (['auto','scroll','hidden','clip'].includes(o)) return false; p = p.parentElement; } return true;
  }).slice(0, 8).map((e) => e.tagName + '.' + String(e.className).slice(0, 60) + '>' + Math.round(e.getBoundingClientRect().right));
  return { title: document.title, h1: document.querySelector('h1')?.textContent?.trim().slice(0, 70), canonical: document.querySelector('link[rel=canonical]')?.href, vw, over, bad, tinggi: de.scrollHeight };
})()`);
const hasilEv = ev ? await evaluate(ev) : undefined;
const konsol = events.filter((e) => (e.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(e.params.type)) || e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
  .map((e) => e.method === 'Runtime.exceptionThrown' ? 'EXC ' + (e.params.exceptionDetails.exception?.description || e.params.exceptionDetails.text).slice(0, 200) : e.method === 'Log.entryAdded' ? 'LOG ' + e.params.entry.text.slice(0, 200) : e.params.type + ' ' + e.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 200));
let clip;
if (full) { const m = await send('Page.getLayoutMetrics'); const cs = m.result.cssContentSize; clip = { x: 0, y: 0, width: W, height: Math.min(cs.height, 8000), scale: 1 }; await send('Emulation.setDeviceMetricsOverride', { width: W, height: Math.min(Math.ceil(cs.height), 8000), deviceScaleFactor: DPR, mobile: W < 700 }); await sleep(300); }
const shot = await send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: full });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(JSON.stringify({ ...info, konsol, ev: hasilEv, out }, null, 0));
ws.close(); await new Promise((r) => { chrome.on('exit', r); chrome.kill(); setTimeout(r, 3000); }); try { rmSync(profil, { recursive: true, force: true }); } catch {}
