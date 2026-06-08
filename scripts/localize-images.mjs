// Descarga las imágenes de wp-content/uploads referenciadas por los artículos
// a public/wp-uploads, para que el estático no dependa del WordPress en runtime.
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const WP_API = process.env.WP_API || "https://camperodigital.com/wp-json/wp/v2";
const ORIGIN = new URL(WP_API).origin;
const OUT = "public/wp-uploads";

const res = await fetch(`${WP_API}/posts?per_page=100&_embed=wp:featuredmedia`);
const posts = await res.json();

const urls = new Set();
const re = /https?:\/\/[^"'\s)]+\/wp-content\/uploads\/[^"'\s)]+\.(?:webp|jpg|jpeg|png|gif|svg|avif)/gi;
for (const p of posts) {
  const html = p?.content?.rendered || "";
  for (const m of html.matchAll(re)) urls.add(m[0].split("?")[0]);
  const media = p?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (media) urls.add(media.split("?")[0]);
}

console.log(`Imágenes a descargar: ${urls.size}`);
let ok = 0,
  fail = 0;
for (const url of urls) {
  const rel = url.split("/wp-content/uploads/")[1];
  if (!rel) continue;
  const dest = join(OUT, rel);
  if (existsSync(dest)) {
    ok++;
    continue;
  }
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    ok++;
  } catch (e) {
    console.warn(`  fallo: ${url} (${e.message})`);
    fail++;
  }
}
console.log(`Descargadas: ${ok} | fallos: ${fail}`);
