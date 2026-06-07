import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Diseño web y ecommerce",
  description:
    "Diseño y desarrollo de páginas web y tiendas online rápidas, optimizadas y pensadas para vender.",
};

const FEATURES = [
  ["Webs corporativas", "Sitios profesionales que transmiten confianza y convierten visitas en clientes."],
  ["Tiendas online", "Ecommerce optimizado para vender: rápido, claro y fácil de gestionar."],
  ["Landing pages", "Páginas de aterrizaje orientadas a conversión para tus campañas."],
  ["Rendimiento y SEO", "Velocidad, Core Web Vitals y bases SEO desde el primer día."],
];

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Diseño web"
        title="Páginas web que venden"
        subtitle="Diseñamos y desarrollamos webs y tiendas online rápidas, cuidadas y optimizadas para convertir."
      />
      <Container className="py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-gray-200 p-7">
              <h2 className="text-xl font-bold text-ink">{t}</h2>
              <p className="mt-3 text-gray-600">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/hablemos/"
            className="inline-block rounded-full bg-brand px-7 py-3 font-semibold text-ink hover:bg-brand-dark"
          >
            Quiero mi web
          </Link>
        </div>
      </Container>
    </main>
  );
}
