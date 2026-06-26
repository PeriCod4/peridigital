import Container from "@/components/Container";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import LeadCta from "@/components/LeadCta";

export const metadata = {
  ...pageMeta("/proyectos/"),
  title: "Proyectos web y ecommerce",
  description:
    "Portfolio de PeriDigital: webs corporativas, tiendas online y sistemas a medida construidos para generar resultados.",
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Proyectos"
        title="Transformamos ideas en webs"
        subtitle="Portfolio de soluciones a medida, en el CMS que mejor se ajuste a tus necesidades, listo para generar resultados."
      />
      <Container className="py-16">
        <ProjectsGrid />
      </Container>

      <LeadCta
        title="¿Tu proyecto es el siguiente?"
        subtitle="Cuéntanos qué quieres construir —web, tienda online o sistema a medida— y te proponemos cómo hacerlo realidad."
        context="Proyectos"
        submitLabel="Quiero mi proyecto"
        messagePlaceholder="Describe la web o el sistema que tienes en mente…"
      />
    </main>
  );
}
