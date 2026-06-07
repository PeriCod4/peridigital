import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Soluciones Digitales",
  description:
    "Paid media, SEO, software a medida, CRM, automatización y analítica para hacer crecer tu negocio.",
};

const SERVICES = [
  ["Paid Media & CRO", "Campañas en Meta y Google Ads + optimización de la tasa de conversión."],
  ["Apps & Softwares", "Desarrollo de aplicaciones y software a medida para tu operativa."],
  ["SEO", "Posicionamiento orgánico para captar tráfico cualificado de forma sostenible."],
  ["CRM & Automatización", "Implantación de CRM y automatización de procesos de marketing y ventas."],
  ["Analítica & Data", "Medición, dashboards y decisiones basadas en datos."],
  ["Creación de marca", "Identidad visual y estrategia para que tu marca destaque."],
];

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Soluciones Digitales"
        title="Soluciones a medida para lo que TU negocio necesita"
        subtitle="Un partner 360: desde la captación hasta la automatización y el dato."
      />
      <Container className="py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-gray-200 p-7 transition-all hover:border-brand hover:shadow-lg"
            >
              <h2 className="text-lg font-bold text-ink">{t}</h2>
              <p className="mt-3 text-sm text-gray-600">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/hablemos/"
            className="inline-block rounded-full bg-brand px-7 py-3 font-semibold text-ink hover:bg-brand-dark"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </Container>
    </main>
  );
}
