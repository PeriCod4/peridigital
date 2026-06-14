import { PROJECTS, type Project, type ProjectBlock } from "./projects-data";
import { SERVICES, type ServiceDef } from "./site";

export type { Project, ProjectBlock } from "./projects-data";

const BLOCK_TYPES = new Set(["heading", "text", "quote", "image", "image_text"]);

function normalizeBlocks(raw: unknown): ProjectBlock[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: ProjectBlock[] = [];
  for (const b of raw as Record<string, unknown>[]) {
    if (!b || typeof b.type !== "string" || !BLOCK_TYPES.has(b.type)) continue;
    const t = b.type;
    const s = (k: string) => (typeof b[k] === "string" ? (b[k] as string) : "");
    if (t === "heading") out.push({ type: "heading", text: s("text") });
    else if (t === "text") out.push({ type: "text", html: s("html") });
    else if (t === "quote") out.push({ type: "quote", text: s("text"), author: s("author") || undefined });
    else if (t === "image") out.push({ type: "image", url: s("url"), alt: s("alt") || undefined, caption: s("caption") || undefined });
    else if (t === "image_text")
      out.push({ type: "image_text", url: s("url"), alt: s("alt") || undefined, html: s("html"), side: b.side === "right" ? "right" : "left" });
  }
  return out.length ? out : undefined;
}

// Slugs con página estática generada en build (generateStaticParams).
export const BUILT_SLUGS = new Set(PROJECTS.map((p) => p.slug));

// Enlace al detalle: si el proyecto existe en build -> URL bonita SSG;
// si es nuevo (creado por el admin) -> ruta cliente que lee el JSON.
export function projectHref(slug: string): string {
  return BUILT_SLUGS.has(slug) ? `/proyectos/${slug}/` : `/proyecto/?p=${slug}`;
}

// Valida/normaliza el JSON que viene de /data/projects.json (editable por el admin).
export function normalizeProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) return [];
  const out: Project[] = [];
  for (const r of raw as Record<string, unknown>[]) {
    if (!r || typeof r.slug !== "string" || typeof r.title !== "string") continue;
    out.push({
      slug: r.slug,
      title: r.title,
      image: typeof r.image === "string" ? r.image : "",
      servicios: Array.isArray(r.servicios) ? (r.servicios as string[]).filter((s) => typeof s === "string") : [],
      tags: Array.isArray(r.tags) ? (r.tags as string[]).filter((s) => typeof s === "string") : [],
      description: typeof r.description === "string" ? r.description : "",
      url: typeof r.url === "string" && r.url ? r.url : undefined,
      blocks: normalizeBlocks(r.blocks),
      body: typeof r.body === "string" ? r.body : undefined,
      gallery: Array.isArray(r.gallery) ? (r.gallery as string[]).filter((s) => typeof s === "string") : undefined,
      published: r.published !== false,
      order: typeof r.order === "number" ? r.order : 0,
    });
  }
  return out;
}

export function publishedSorted(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// Servicios (en el orden de SERVICES) que tienen al menos un proyecto publicado.
export function servicesWithProjects(projects: Project[]): ServiceDef[] {
  const present = new Set<string>();
  for (const p of projects) {
    if (p.published === false) continue;
    for (const s of p.servicios ?? []) present.add(s);
  }
  return SERVICES.filter((s) => present.has(s.slug));
}

export function serviceLabel(slug: string): string {
  return SERVICES.find((s) => s.slug === slug)?.nav ?? slug;
}
