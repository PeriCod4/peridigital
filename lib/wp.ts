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
  yoast?: Record<string, unknown>;
}

// Reescribe enlaces internos del contenido WP:
//  - quita el dominio camperodigital.com (los hace relativos)
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
    h = h.replace(/^https?:\/\/(www\.)?camperodigital\.com/i, "");
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
  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
    modified: p.modified,
    title: p.title?.rendered ?? "",
    excerpt: p.excerpt?.rendered ?? "",
    contentHtml: localizeUploads(rewriteContentLinks(p.content?.rendered ?? "")),
    coverUrl: media?.source_url ? localizeUploads(media.source_url) : undefined,
    coverAlt: media?.alt_text,
    categories: cats,
    tags,
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
