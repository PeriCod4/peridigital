import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import LeadCta from "@/components/LeadCta";
import JsonLd from "@/components/JsonLd";
import { GUIDES } from "@/lib/guides";
import { SERVICES } from "@/lib/site";
import { faqSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Guías",
  description:
    "Guías prácticas y gratuitas sobre diseño web, ecommerce, software a medida, CRM, automatización y accesibilidad web. Lo que necesitas saber antes de invertir.",
  ...pageMeta("/guias/"),
};

const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

const HOW = [
  ["Sin tecnicismos", "Escritas en cristiano. Si algo importa, lo explicamos claro; si no, lo dejamos fuera."],
  ["Pensadas para decidir", "No para venderte humo: para que sepas qué pedir, qué evitar y cuánto debería costar."],
  ["Basadas en proyectos reales", "Lo que hemos visto funcionar (y fallar) trabajando con pymes y autónomos de toda España."],
];

const FAQS = [
  { q: "¿Las guías son gratuitas?", a: "Sí, totalmente. Son recursos abiertos para ayudarte a tomar mejores decisiones digitales, sin registro ni compromiso." },
  { q: "¿Cada cuánto publicáis guías nuevas?", a: "Las ampliamos según las dudas más frecuentes de nuestros clientes. Para temas más concretos del día a día tienes también nuestro blog." },
  { q: "¿Y si mi caso no encaja con ninguna guía?", a: "Escríbenos: hacemos una auditoría inicial gratuita de tu caso y te orientamos sin compromiso, encaje o no con una guía." },
];

export default function Page() {
  return (
    <main>
      <JsonLd data={faqSchema(FAQS)} />

      <PageHero
        eyebrow="Recursos"
        title="Guías para decidir mejor"
        subtitle="Sin tecnicismos: lo que necesitas saber antes de invertir en tu presencia digital. Gratis y al grano."
      />

      <Container className="py-16">
        {/* Intro */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-gray-600">
              Antes de contratar nada, mereces entender lo que estás comprando. Estas guías
              recogen, en lenguaje claro, lo que más nos preguntan: precios reales, qué
              tecnología elegir y cómo cumplir la ley. Léelas a tu ritmo.
            </p>
          </div>
        </Reveal>

        {/* Tarjetas de guía */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {GUIDES.map((g, i) => {
            const svc = SERVICE_BY_SLUG[g.service];
            return (
              <Reveal key={g.slug} delay={(i % 2) * 0.08}>
                <TiltCard className="spotlight flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-2xl">
                      {g.icon}
                    </span>
                    <span className="text-xs font-medium text-gray-400">{g.readTime} de lectura</span>
                  </div>

                  <Link href={`/guias/${g.slug}/`} className="group mt-5 block">
                    <h2 className="text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-text">
                      {g.title}
                    </h2>
                    <p className="mt-3 text-gray-600">{g.excerpt}</p>
                  </Link>

                  <ul className="mt-5 space-y-2 text-sm text-gray-700">
                    {g.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-0.5 text-brand-text">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <Link
                      href={`/guias/${g.slug}/`}
                      className="group inline-flex items-center text-sm font-semibold text-brand-text"
                    >
                      Leer guía
                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    {svc && (
                      <Link
                        href={`/${svc.slug}/`}
                        className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-brand/20"
                      >
                        {svc.nav}
                      </Link>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Cómo usar estas guías */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
              Cómo son nuestras guías
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="spotlight h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                  <div className="text-sm font-bold text-brand-text">0{i + 1}</div>
                  <h3 className="mt-2 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-gray-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Enlace al blog */}
        <Reveal>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl bg-ink p-8 text-white sm:flex-row sm:p-10">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">¿Buscas algo más concreto?</h2>
              <p className="mt-2 text-white/75">
                En el blog publicamos artículos sobre diseño web, SEO, marketing y herramientas para tu negocio.
              </p>
            </div>
            <Link
              href="/blog/"
              className="shrink-0 rounded-full bg-brand px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Ir al blog →
            </Link>
          </div>
        </Reveal>

        {/* FAQ */}
        <section className="mt-20">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Preguntas frecuentes</h2>
          </Reveal>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {FAQS.map((f) => (
              <Reveal key={f.q}>
                <details className="spotlight group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
      </Container>

      <LeadCta
        title="¿Dudas con tu proyecto?"
        subtitle="Las guías ayudan, pero cada caso es distinto. Cuéntanos el tuyo y te asesoramos sin compromiso."
        context="Guías"
        submitLabel="Pedir asesoramiento"
        messagePlaceholder="¿Qué estás valorando? Cuéntanos…"
      />
    </main>
  );
}
