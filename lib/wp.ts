import { readFileSync } from "node:fs";
import { join } from "node:path";
import { REDIRECT_SLUGS, POST_REDIRECTS } from "./dedupe";

// El contenido se construye desde un snapshot local versionado (content/).
// WordPress está archivado tras el lanzamiento; para actualizar el blog se
// refresca el snapshot (scripts/refresh-content) y se reconstruye.
const CONTENT_DIR = join(process.cwd(), "content");

function loadJSON<T>(file: string): T {
  return JSON.parse(readFileSync(join(CONTENT_DIR, file), "utf8")) as T;
}

let _posts: unknown[] | null = null;
let _pages: unknown[] | null = null;
function rawPosts(): unknown[] {
  return (_posts ??= loadJSON<unknown[]>("posts.json"));
}
function rawPages(): unknown[] {
  return (_pages ??= loadJSON<unknown[]>("pages.json"));
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverUrl?: string;
  coverAlt?: string;
  categories: WPTerm[];
  tags: WPTerm[];
  headings: TocHeading[];
  yoast?: Record<string, unknown>;
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

// Inyecta id en los h2/h3 del contenido y devuelve el índice (TOC).
function addHeadingIds(html: string): { html: string; headings: TocHeading[] } {
  const headings: TocHeading[] = [];
  const used = new Set<string>();
  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full, lvl: string, attrs: string, inner: string) => {
      const level = Number(lvl) as 2 | 3;
      const text = inner.replace(/<[^>]+>/g, "").replace(/&[a-z#0-9]+;/g, " ").trim();
      if (!text) return full;
      // respetar id existente
      const existing = attrs.match(/\bid="([^"]+)"/);
      let id = existing ? existing[1] : slugifyHeading(text);
      if (!id) id = `sec-${headings.length + 1}`;
      let unique = id;
      let n = 2;
      while (used.has(unique)) unique = `${id}-${n++}`;
      used.add(unique);
      headings.push({ id: unique, text, level });
      const newAttrs = existing ? attrs : `${attrs} id="${unique}"`;
      return `<h${lvl}${newAttrs}>${inner}</h${lvl}>`;
    },
  );
  return { html: out, headings };
}

// Reescribe enlaces internos del contenido WP:
//  - quita el dominio peridigital.es (los hace relativos)
//  - /blog/<slug> -> /<slug>/ (nuestros artículos cuelgan de la raíz)
//  - duplicados consolidados -> canónico
// Enlaces del contenido que apuntan a artículos inexistentes (colgantes en el
// WP original) -> los redirigimos a una página relevante que sí existe.
const CONTENT_LINK_REMAP: Record<string, string> = {
  "posicionamiento-seo-para-ecommerce": "/seo/",
};

// Imágenes de wp-content/uploads (de cualquier host WP) -> /wp-uploads local,
// descargadas por scripts/localize-images.mjs. El estático no depende del WP.
function localizeUploads(s: string | undefined): string {
  if (!s) return s ?? "";
  return s.replace(/https?:\/\/[^"')\s]*?\/wp-content\/uploads/gi, "/wp-uploads");
}

function rewriteContentLinks(html: string): string {
  if (!html) return html;
  return html.replace(/href="([^"]+)"/g, (full, href: string) => {
    let h = href.trim();
    // Absolutos del propio dominio -> relativos
    h = h.replace(/^https?:\/\/(www\.)?(peridigital\.es|camperodigital\.com)/i, "");
    if (!h.startsWith("/")) return full; // externo o ancla: dejar igual
    // /blog/slug -> /slug/
    h = h.replace(/^\/blog\/([^/?#]+)\/?$/, "/$1/");
    // normaliza /slug -> /slug/
    const m = h.match(/^\/([^/?#]+)\/?$/);
    if (m) {
      const slug = m[1];
      if (CONTENT_LINK_REMAP[slug]) return `href="${CONTENT_LINK_REMAP[slug]}"`;
      const canon = POST_REDIRECTS[slug] || slug;
      h = `/${canon}/`;
    }
    return `href="${h}"`;
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapPost(p: any): WPPost {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const terms: any[][] = p._embedded?.["wp:term"] ?? [];
  const cats: WPTerm[] = (terms[0] ?? []).map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }));
  const tags: WPTerm[] = (terms[1] ?? []).map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }));
  const rawHtml = localizeUploads(rewriteContentLinks(p.content?.rendered ?? ""));
  const { html, headings } = addHeadingIds(rawHtml);
  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
    modified: p.modified,
    title: p.title?.rendered ?? "",
    excerpt: p.excerpt?.rendered ?? "",
    contentHtml: html,
    coverUrl: media?.source_url ? localizeUploads(media.source_url) : undefined,
    coverAlt: media?.alt_text,
    categories: cats,
    tags,
    headings,
    yoast: p.yoast_head_json,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getAllPosts(): Promise<WPPost[]> {
  // Excluir duplicados consolidados (variantes -2/-3 redirigidas al canónico).
  return rawPosts()
    .map(mapPost)
    .filter((p) => !REDIRECT_SLUGS.has(p.slug));
}

export async function getPostSlugs(): Promise<string[]> {
  return (rawPosts() as { slug: string }[])
    .map((p) => p.slug)
    .filter((slug) => !REDIRECT_SLUGS.has(slug));
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const found = (rawPosts() as { slug: string }[]).find((p) => p.slug === slug);
  return found ? mapPost(found) : null;
}

export async function getPage(slug: string): Promise<WPPost | null> {
  const found = (rawPages() as { slug: string }[]).find((p) => p.slug === slug);
  return found ? mapPost(found) : null;
}

export interface CategoryWithPosts {
  slug: string;
  name: string;
  posts: WPPost[];
}

// Categorías derivadas de los posts canónicos. Consolidación: sólo las que
// tienen >= minPosts (evita taxonomía inflada con categorías de 1 post).
export async function getCategoriesWithPosts(minPosts = 2): Promise<CategoryWithPosts[]> {
  const posts = await getAllPosts();
  const map = new Map<string, CategoryWithPosts>();
  for (const p of posts) {
    for (const c of p.categories) {
      if (!c.slug) continue;
      if (!map.has(c.slug)) map.set(c.slug, { slug: c.slug, name: c.name, posts: [] });
      map.get(c.slug)!.posts.push(p);
    }
  }
  return [...map.values()]
    .filter((c) => c.posts.length >= minPosts)
    .sort((a, b) => b.posts.length - a.posts.length);
}

// Artículos relacionados: prioriza misma categoría/etiqueta, rellena con recientes.
export async function getRelatedPosts(slug: string, limit = 8): Promise<WPPost[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const catIds = new Set(current.categories.map((c) => c.id));
  const tagIds = new Set(current.tags.map((t) => t.id));
  const others = all.filter((p) => p.slug !== slug);
  const scored = others
    .map((p) => {
      let score = 0;
      for (const c of p.categories) if (catIds.has(c.id)) score += 2;
      for (const t of p.tags) if (tagIds.has(t.id)) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.p.date).getTime() - new Date(a.p.date).getTime());
  return scored.slice(0, limit).map((s) => s.p);
}
