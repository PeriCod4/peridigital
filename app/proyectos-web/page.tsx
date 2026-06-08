import Link from "next/link";
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

        <div className="mt-14 rounded-2xl bg-brand/10 p-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink">¿Empezamos el tuyo?</h2>
          <Link
            href="/hablemos/"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </Container>
    </main>
  );
}
