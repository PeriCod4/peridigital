import { REDIRECT_SLUGS, POST_REDIRECTS } from "./dedupe";

const API = process.env.WP_API!;

if (!API) {
  throw new Error("WP_API no definido. Configura .env.local (ver .env.example).");
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

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`WP fetch ${res.status} ${url}`);
  return res.json() as Promise<T>;
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
    contentHtml: rewriteContentLinks(p.content?.rendered ?? ""),
    coverUrl: media?.source_url,
    coverAlt: media?.alt_text,
    categories: cats,
    tags,
    yoast: p.yoast_head_json,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const POST_FIELDS =
  "id,slug,date,modified,title,excerpt,content,categories,tags,yoast_head_json,_links,_embedded";

export async function getAllPosts(): Promise<WPPost[]> {
  const data = await getJSON<unknown[]>(
    `${API}/posts?per_page=100&_embed=wp:featuredmedia,wp:term&_fields=${POST_FIELDS}`,
  );
  // Excluir duplicados consolidados (variantes -2/-3 redirigidas al canónico).
  return data.map(mapPost).filter((p) => !REDIRECT_SLUGS.has(p.slug));
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await getJSON<{ slug: string }[]>(`${API}/posts?per_page=100&_fields=slug`);
  return data.map((p) => p.slug).filter((slug) => !REDIRECT_SLUGS.has(slug));
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const data = await getJSON<unknown[]>(
    `${API}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,wp:term`,
  );
  return data[0] ? mapPost(data[0]) : null;
}

export async function getPage(slug: string): Promise<WPPost | null> {
  const data = await getJSON<unknown[]>(
    `${API}/pages?slug=${encodeURIComponent(slug)}&_embed`,
  );
  return data[0] ? mapPost(data[0]) : null;
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
