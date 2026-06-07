import Link from "next/link";
import Container from "./Container";
import PageHero from "./PageHero";
import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";
import JsonLd from "./JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export interface ServiceLayoutProps {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  features: { title: string; desc: string }[];
  featuresTitle?: string;
  process?: { title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
  ctaTitle?: string;
  ctaLabel?: string;
  metaDescription: string;
}

export default function ServiceLayout(props: ServiceLayoutProps) {
  const {
    slug,
    eyebrow,
    title,
    subtitle,
    intro,
    features,
    featuresTitle = "Qué incluye",
    process,
    faqs,
    ctaTitle = "¿Hablamos de tu proyecto?",
    ctaLabel = "Pídenos presupuesto",
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
        {/* Intro */}
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-gray-700">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Qué incluye */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{featuresTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full rounded-2xl border border-gray-200 bg-white p-7">
                  <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-3 text-gray-600">{f.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Cómo trabajamos */}
        {process && process.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Cómo trabajamos</h2>
            </Reveal>
            <ol className="mt-8 space-y-5">
              {process.map((s, i) => (
                <Reveal key={s.title} delay={(i % 4) * 0.06}>
                  <li className="flex gap-5 rounded-2xl border border-gray-200 p-6">
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
                  <details className="group rounded-2xl border border-gray-200 p-6">
                    <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
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

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-brand/10 p-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink">{ctaTitle}</h2>
          <Link
            href="/hablemos/"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </main>
  );
}
