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
    contentHtml: p.content?.rendered ?? "",
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
  return data.map(mapPost);
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await getJSON<{ slug: string }[]>(`${API}/posts?per_page=100&_fields=slug`);
  return data.map((p) => p.slug);
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
