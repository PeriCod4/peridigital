import type { MetadataRoute } from "next";
import { getAllPosts, getCategoriesWithPosts } from "@/lib/wp";
import { SERVICES, SITE } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const posts = await getAllPosts();
  const cats = await getCategoriesWithPosts();

  const staticPages = ["", "blog", "proyectos-web", "nosotros", "hablemos", "aviso-legal", "politica-de-privacidad", "politica-de-cookies"];

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
    ...cats.map((c) => ({
      url: `${base}/categoria/${c.slug}/`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    ...posts.map((p) => ({
      url: `${base}/${p.slug}/`,
      lastModified: p.modified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries;
}
