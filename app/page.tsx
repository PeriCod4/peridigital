import Link from "next/link";
import Container from "@/components/Container";
import { getAllPosts } from "@/lib/wp";

const SERVICES = [
  {
    title: "Web & Ecommerce",
    desc: "Páginas y tiendas online que venden, rápidas y optimizadas para convertir.",
    href: "/diseno-web/",
  },
  {
    title: "Paid Media & CRO",
    desc: "Campañas en Meta y Google Ads + optimización de conversión.",
    href: "/soluciones-digitales/",
  },
  {
    title: "Apps & Softwares",
    desc: "Desarrollo de software y aplicaciones a medida para tu negocio.",
    href: "/soluciones-digitales/",
  },
];

const OTHER_SERVICES = [
  "Analítica & Data",
  "SEO",
  "CRM & Automatización",
  "Creación de marca",
];

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="bg-ink text-white">
        <Container className="py-24 sm:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand">
            Agencia de marketing digital 360
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Páginas web que <span className="text-brand">venden</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Soluciones a medida para lo que TU negocio necesita: diseño web,
            ecommerce, paid media, SEO y software propio.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/hablemos/"
              className="rounded-full bg-brand px-7 py-3 font-semibold text-ink transition-colors hover:bg-brand-dark"
            >
              Hablemos
            </Link>
            <Link
              href="/proyectos-web/"
              className="rounded-full border border-white/25 px-7 py-3 font-semibold text-white transition-colors hover:border-brand hover:text-brand"
            >
              Ver proyectos
            </Link>
          </div>
        </Container>
      </section>

      {/* Servicios */}
      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="text-3xl font-extrabold text-ink">Nuestros servicios</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-2xl border border-gray-200 p-7 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-ink group-hover:text-brand-dark">
                  {s.title}
                </h3>
                <p className="mt-3 text-gray-600">{s.desc}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-brand-dark">
                  Saber más →
                </span>
              </Link>
            ))}
          </div>

          <h3 className="mt-16 text-lg font-semibold text-ink">Otros servicios</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {OTHER_SERVICES.map((o) => (
              <span
                key={o}
                className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-ink"
              >
                {o}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-brand">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-extrabold text-ink">
            Soluciones a medida para lo que TU negocio necesita
          </h2>
          <Link
            href="/hablemos/"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-3 font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Empezar proyecto
          </Link>
        </Container>
      </section>

      {/* Últimos artículos */}
      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-extrabold text-ink">Del blog</h2>
            <Link href="/blog/" className="text-sm font-semibold text-brand-dark hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((p) => (
              <Link
                key={p.id}
                href={`/${p.slug}/`}
                className="group rounded-2xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg"
              >
                <div className="text-xs font-medium text-gray-400">
                  {new Date(p.date).toLocaleDateString("es-ES")}
                </div>
                <h3
                  className="mt-2 font-bold text-ink group-hover:text-brand-dark"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
