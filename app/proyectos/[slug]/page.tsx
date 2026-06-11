import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProjectDetail from "@/components/ProjectDetail";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  const description = p.description.slice(0, 160);
  return {
    title: `${p.title} — Proyecto`,
    description,
    ...pageMeta(`/proyectos/${p.slug}/`, { title: `${p.title} — Proyecto | PeriDigital`, description }),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.title,
          description: p.description,
          url: `${SITE.url}/proyectos/${p.slug}/`,
          ...(p.image ? { image: p.image.startsWith("http") ? p.image : `${SITE.url}${p.image}` } : {}),
          creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
          keywords: [...(p.servicios ?? []), ...(p.tags ?? [])].join(", "),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: `${SITE.url}/` },
          { name: "Proyectos", url: `${SITE.url}/proyectos-web/` },
          { name: p.title, url: `${SITE.url}/proyectos/${p.slug}/` },
        ])}
      />
      <ProjectDetail initial={p} slug={p.slug} />
    </>
  );
}
