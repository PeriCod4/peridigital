import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "Proyectos web y ecommerce",
  description:
    "Portfolio de Campero Digital: webs corporativas, tiendas online y sistemas a medida construidos para generar resultados.",
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
    </main>
  );
}
