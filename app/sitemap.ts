import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/wp";
import { SERVICES, SITE } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const posts = await getAllPosts();

  const staticPages = ["", "blog", "guias", "proyectos-web", "nosotros", "hablemos", "aviso-legal", "politica-de-privacidad", "politica-de-cookies"];

  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map((p) => ({
      url: `${base}/${p ? p + "/" : ""}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.6,
    })),
    ...SERVICES.map((s) => ({
      url: `${base}/${s.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...GUIDES.map((g) => ({
      url: `${base}/guias/${g.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Categorías excluidas del sitemap (noindex) — ver app/categoria/[slug]/page.tsx
    ...posts.map((p) => ({
      url: `${base}/${p.slug}/`,
      lastModified: p.modified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries;
}
