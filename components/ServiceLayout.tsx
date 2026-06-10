import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./Container";
import PageHero from "./PageHero";
import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";
import Magnetic from "./fx/Magnetic";
import ServiceDashboard, { type DashboardData } from "./ServiceDashboard";
import JsonLd from "./JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export interface ServiceLayoutProps {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  demo?: ReactNode;
  demoTitle?: string;
  dashboard?: DashboardData;
  stats?: { value: string; label: string }[];
  features: { title: string; desc: string }[];
  featuresTitle?: string;
  benefits?: string[];
  benefitsTitle?: string;
  useCases?: { title: string; desc: string }[];
  process?: { title: string; desc: string }[];
  plans?: { name: string; price: string; period?: string; features: string[]; featured?: boolean }[];
  plansNote?: string;
  faqs?: { q: string; a: string }[];
  ctaTitle?: string;
  ctaLabel?: string;
  relatedGuide?: { slug: string; title: string };
  metaDescription: string;
}

export default function ServiceLayout(props: ServiceLayoutProps) {
  const {
    slug,
    eyebrow,
    title,
    subtitle,
    intro,
    demo,
    demoTitle = "Así se ve en la práctica",
    dashboard,
    stats,
    features,
    featuresTitle = "Qué incluye",
    benefits,
    benefitsTitle = "Por qué con nosotros",
    useCases,
    process,
    plans,
    plansNote,
    faqs,
    ctaLabel = "Pídenos presupuesto",
    relatedGuide,
    metaDescription,
  } = props;

  return (
    <main>
      <JsonLd data={serviceSchema({ name: title, description: metaDescription, slug })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: `${SITE.url}/` },
          { name: title, url: `${SITE.url}/${slug}/` },
        ])}
      />
      {faqs && faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <Container className="py-16">
        {/* Intro + demo */}
        <div className={demo ? "grid items-start gap-12 lg:grid-cols-2" : ""}>
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-gray-700">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href="/hablemos/"
                    className="inline-block rounded-xl bg-gradient-to-r from-brand to-accent px-6 py-3 text-base font-bold text-ink shadow-xl shadow-brand/30 transition-all hover:shadow-brand/50"
                  >
                    {ctaLabel}
                  </Link>
                </Magnetic>
                {relatedGuide && (
                  <Link
                    href={`/guias/${relatedGuide.slug}/`}
                    className="text-sm font-semibold text-brand-text hover:underline"
                  >
                    📖 Guía: {relatedGuide.title} →
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
          {demo && (
            <Reveal direction="left" delay={0.1}>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-text">
                  {demoTitle}
                </p>
                {demo}
              </div>
            </Reveal>
          )}
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <Reveal>
            <div className="mt-16 grid gap-6 rounded-3xl bg-ink p-8 text-center text-white sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-brand sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Panel de seguimiento en tiempo real */}
        {dashboard && (
          <section className="mt-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-text">
                    Tu proyecto, en tiempo real
                  </p>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                    Un panel para ver el avance, sin perseguirnos
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Con este servicio tienes acceso a un panel donde ves en qué punto
                    está tu proyecto en cada momento: la fase actual, lo que ya se ha
                    hecho y los resultados. Transparencia total, sin tener que pedir
                    informes.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><span className="text-brand-text">✓</span> Avance y fase actual en tiempo real</li>
                    <li className="flex items-center gap-2"><span className="text-brand-text">✓</span> Métricas y resultados del servicio</li>
                    <li className="flex items-center gap-2"><span className="text-brand-text">✓</span> Acceso 24/7, sin esperar reuniones</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <ServiceDashboard data={dashboard} />
              </Reveal>
            </div>
          </section>
        )}

        {/* Qué incluye */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{featuresTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <TiltCard className="spotlight h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                  <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-3 text-gray-600">{f.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Beneficios */}
        {benefits && benefits.length > 0 && (
          <section className="mt-16 rounded-3xl bg-gray-50 p-8 sm:p-10">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{benefitsTitle}</h2>
            </Reveal>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <Reveal key={b} delay={(i % 2) * 0.06}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-ink">✓</span>
                    <span className="text-gray-700">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Casos de uso */}
        {useCases && useCases.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Casos de uso</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 3) * 0.08}>
                  <div className="spotlight h-full rounded-2xl border-l-4 border-brand bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-ink">{u.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{u.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Planes / precios */}
        {plans && plans.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Planes</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {plans.map((p, i) => (
                <Reveal key={p.name} delay={(i % 3) * 0.08}>
                  <div
                    className={`spotlight flex h-full flex-col rounded-2xl border p-7 ${
                      p.featured ? "border-brand bg-ink text-white shadow-xl" : "border-gray-200 bg-white shadow-sm"
                    }`}
                  >
                    {p.featured && (
                      <span className="mb-3 inline-block w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink">
                        Más popular
                      </span>
                    )}
                    <h3 className={`text-lg font-bold ${p.featured ? "text-white" : "text-ink"}`}>{p.name}</h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className={`text-3xl font-extrabold ${p.featured ? "text-brand" : "text-ink"}`}>{p.price}</span>
                      {p.period && <span className={`pb-1 text-sm ${p.featured ? "text-white/60" : "text-gray-400"}`}>{p.period}</span>}
                    </div>
                    <ul className={`mt-5 flex-1 space-y-2 text-sm ${p.featured ? "text-white/80" : "text-gray-600"}`}>
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 text-brand">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/hablemos/"
                      className={`mt-6 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                        p.featured ? "bg-brand text-ink" : "bg-ink text-white"
                      }`}
                    >
                      Contratar
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
            {plansNote && <p className="mt-4 text-center text-xs text-gray-400">{plansNote}</p>}
          </section>
        )}

        {/* Cómo trabajamos */}
        {process && process.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Cómo trabajamos</h2>
            </Reveal>
            <ol className="mt-8 space-y-5">
              {process.map((s, i) => (
                <Reveal key={s.title} delay={(i % 4) * 0.06}>
                  <li className="spotlight flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-ink">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">{s.title}</h3>
                      <p className="mt-1 text-gray-600">{s.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Preguntas frecuentes</h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {faqs.map((f) => (
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
        )}

      </Container>
    </main>
  );
}
