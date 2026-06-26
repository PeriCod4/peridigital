// Post-build: genera out/data/articles-index.json (índice READ-ONLY de artículos)
// y out/data/projects.json (proyectos, ahora gestionados EN CÓDIGO tras migrar a
// Vercel y retirar el panel admin PHP). projects.json se deriva de lib/projects-data.ts
// en cada build para que el sitio lo sirva siempre sincronizado con el repo.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const posts = JSON.parse(readFileSync("content/posts.json", "utf8"));
const dedupe = readFileSync("lib/dedupe.ts", "utf8");
const redirect = new Set([...dedupe.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1]));

// Mismo localizado que lib/wp.ts: wp-content/uploads (de cualquier host) -> /wp-uploads
const localize = (u) =>
  typeof u === "string" ? u.replace(/https?:\/\/[^"')\s]*?\/wp-content\/uploads/gi, "/wp-uploads") : "";

const index = posts
  .filter((p) => !redirect.has(p.slug))
  .map((p) => {
    const src = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    return {
      slug: p.slug,
      title: (p.title?.rendered || "").replace(/<[^>]+>/g, "").replace(/&[a-z#0-9]+;/g, " ").trim(),
      hasCover: !!src,
      coverUrl: src ? localize(src) : "",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "es"));

mkdirSync("out/data", { recursive: true });
writeFileSync("out/data/articles-index.json", JSON.stringify(index));
console.log(`articles-index.json: ${index.length} artículos`);

// projects.json derivado de lib/projects-data.ts (el array es JSON puro).
const ts = readFileSync("lib/projects-data.ts", "utf8");
const at = ts.indexOf("] = [");
let arr = ts.slice(at + 4).trim();
if (arr.endsWith(";")) arr = arr.slice(0, -1);
const projects = JSON.parse(arr);
writeFileSync("out/data/projects.json", JSON.stringify(projects, null, 2) + "\n");
console.log(`projects.json: ${projects.length} proyectos`);
