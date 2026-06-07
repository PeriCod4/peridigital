import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import JsonLd from "@/components/JsonLd";
import SeoRankDemo from "@/components/demos/SeoRankDemo";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

const DESC =
  "SEO profesional con PeriSEO, la división SEO de Campero Digital: auditoría, SEO técnico, contenidos y posicionamiento para que te encuentren en Google.";

export const metadata: Metadata = {
  title: "Posicionamiento SEO con PeriSEO",
  description: DESC,
  alternates: { canonical: "/seo/" },
};

const FEATURES = [
  { title: "Auditoría SEO", desc: "Analizamos tu web y detectamos qué te frena para posicionar, con un plan de acción priorizado." },
  { title: "SEO técnico", desc: "Velocidad, indexación, estructura y datos estructurados: la base para que Google te entienda." },
  { title: "Contenidos y keywords", desc: "Estrategia de palabras clave y contenidos que atraen usuarios listos para comprar." },
  { title: "SEO local e internacional", desc: "Posicionamiento por zonas o por idiomas/divisas según tu mercado." },
  { title: "Link building", desc: "Autoridad con enlaces de calidad, sin trucos que pongan tu web en riesgo." },
  { title: "Automatización con IA", desc: "PeriSEO combina equipo humano con su propia tecnología de IA para auditar y aplicar mejoras." },
];

const FAQS = [
  { q: "¿Qué es PeriSEO?", a: "PeriSEO es la división de SEO de Campero Digital: una agencia + plataforma especializada solo en posicionamiento, con tecnología de IA propia." },
  { q: "¿En cuánto tiempo se ven resultados?", a: "El SEO es medio-largo plazo. Los primeros avances técnicos se ven pronto; el crecimiento de tráfico orgánico se consolida en meses." },
  { q: "¿Hacéis la web y el SEO juntos?", a: "Sí. Diseñamos tu web en Campero Digital y la posicionamos con PeriSEO: web que convierte + que aparece en Google." },
];

export default function Page() {
  return (
    <main>
      <JsonLd data={serviceSchema({ name: "SEO con PeriSEO", description: DESC, slug: "seo" })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: `${SITE.url}/` },
          { name: "SEO", url: `${SITE.url}/seo/` },
        ])}
      />
      <JsonLd data={faqSchema(FAQS)} />

      <PageHero
        eyebrow="SEO"
        title="Que te encuentren en Google cuando más importa"
        subtitle="Trabajamos el SEO con PeriSEO, nuestra división especializada en posicionamiento."
      />

      <Container className="py-16">
        {/* Bloque PeriSEO destacado */}
        <Reveal>
          <div className="rounded-3xl bg-ink p-8 text-white sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              La división SEO de Campero Digital
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Peri<span className="text-brand">SEO</span>
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              PeriSEO es nuestra agencia especializada únicamente en SEO: auditoría,
              SEO técnico, contenidos y link building, potenciados con tecnología de
              IA propia. Si tu objetivo es posicionar, son quienes lo hacen.
            </p>
            <a
              href={SITE.periseo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-brand px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Visitar PeriSEO →
            </a>
          </div>
        </Reveal>

        {/* Demo posiciones */}
        <section className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                De la página 4 a los primeros resultados
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                El 99% de la gente no pasa de la primera página de Google. Trabajamos
                el SEO técnico, las palabras clave y el contenido para que subas
                posiciones en las búsquedas que de verdad te traen clientes.
              </p>
              <p className="mt-3 text-gray-600">
                El SEO es una carrera de fondo: los resultados se consolidan con el
                tiempo, pero bien hecho es el canal más rentable a largo plazo.
              </p>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <SeoRankDemo />
          </Reveal>
        </section>

        {/* Stats */}
        <Reveal>
          <div className="mt-16 grid gap-6 rounded-3xl bg-ink p-8 text-center text-white sm:grid-cols-3">
            <div><div className="text-3xl font-extrabold text-brand sm:text-4xl">#1</div><div className="mt-1 text-sm text-white/70">página = donde están los clics</div></div>
            <div><div className="text-3xl font-extrabold text-brand sm:text-4xl">+IA</div><div className="mt-1 text-sm text-white/70">tecnología propia de PeriSEO</div></div>
            <div><div className="text-3xl font-extrabold text-brand sm:text-4xl">24/7</div><div className="mt-1 text-sm text-white/70">tu contenido trabajando</div></div>
          </div>
        </Reveal>

        {/* Qué hacemos */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Qué incluye</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full rounded-2xl border border-gray-200 bg-white p-7">
                  <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-3 text-gray-600">{f.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Preguntas frecuentes</h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {FAQS.map((f) => (
              <Reveal key={f.q}>
                <details className="group rounded-2xl border border-gray-200 p-6">
                  <summary className="cursor-pointer list-none font-semibold text-ink">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="text-brand transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-2xl bg-brand/10 p-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink">¿Quieres posicionar tu web?</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/hablemos/" className="rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105">
              Hablemos
            </Link>
            <a href={SITE.periseo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/20 px-7 py-3 font-semibold text-ink transition-colors hover:border-brand">
              Ir a PeriSEO
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
