import Link from "next/link";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import LeadCta from "./LeadCta";
import JsonLd from "./JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export interface GuideSection {
  h2: string;
  paras?: string[];
  list?: string[];
}

export interface GuideLayoutProps {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  date: string;
  sections: GuideSection[];
  faqs?: { q: string; a: string }[];
  cta: { label: string; href: string; text: string };
}

export default function GuideLayout(props: GuideLayoutProps) {
  const { slug, title, description, intro, date, sections, faqs, cta } = props;

  return (
    <main>
      <JsonLd
        data={articleSchema({ title, description, slug: `guias/${slug}`, date, modified: date })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: `${SITE.url}/` },
          { name: "Guías", url: `${SITE.url}/guias/` },
          { name: title, url: `${SITE.url}/guias/${slug}/` },
        ])}
      />
      {faqs && faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      <section className="relative text-ink">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <Link href="/guias/" className="text-sm font-semibold text-brand-text hover:underline">
              ← Guías
            </Link>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">
              {title}
            </h1>
          </Reveal>
        </Container>
      </section>

      <Container className="py-12">
        <article className="mx-auto max-w-3xl">
          <div className="wp-content">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {/* Índice */}
            <div className="my-8 rounded-2xl bg-gray-50 p-6">
              <p className="m-0 text-sm font-semibold text-ink">En esta guía:</p>
              <ul className="mb-0 mt-2">
                {sections.map((s) => (
                  <li key={s.h2}>
                    <a href={`#${slugify(s.h2)}`}>{s.h2}</a>
                  </li>
                ))}
              </ul>
            </div>

            {sections.map((s) => (
              <section key={s.h2}>
                <h2 id={slugify(s.h2)}>{s.h2}</h2>
                {s.paras?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {faqs && faqs.length > 0 && (
              <section>
                <h2 id="preguntas-frecuentes">Preguntas frecuentes</h2>
                {faqs.map((f) => (
                  <div key={f.q}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

        </article>
      </Container>

      {/* CTA único con formulario + enlace al servicio relacionado */}
      <LeadCta
        title="¿Te ayudamos con esto?"
        subtitle={cta.text}
        context={`Guía: ${title}`}
        submitLabel="Quiero que me ayudéis"
        messagePlaceholder="Cuéntanos tu caso…"
        secondary={{ label: cta.label, href: cta.href }}
      />
    </main>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
