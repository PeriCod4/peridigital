// Post-build: genera out/data/articles-index.json (índice READ-ONLY de artículos
// canónicos para que el panel admin liste artículos y les ponga portada).
// NO genera projects.json ni article-images.json: esos son propiedad del admin
// (viven en el servidor y no deben pisarse en cada redeploy).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const posts = JSON.parse(readFileSync("content/posts.json", "utf8"));
const dedupe = readFileSync("lib/dedupe.ts", "utf8");
const redirect = new Set([...dedupe.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1]));

const index = posts
  .filter((p) => !redirect.has(p.slug))
  .map((p) => ({
    slug: p.slug,
    title: (p.title?.rendered || "").replace(/<[^>]+>/g, "").replace(/&[a-z#0-9]+;/g, " ").trim(),
    hasCover: !!p._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
  }))
  .sort((a, b) => a.title.localeCompare(b.title, "es"));

mkdirSync("out/data", { recursive: true });
writeFileSync("out/data/articles-index.json", JSON.stringify(index));
console.log(`articles-index.json: ${index.length} artículos`);
