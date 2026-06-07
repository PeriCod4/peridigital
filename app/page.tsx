import Link from "next/link";
import Container from "@/components/Container";
import HeroHome from "@/components/HeroHome";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import Marquee from "@/components/Marquee";
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

const CLIENTS = [
  "Silence Spa",
  "Tienda Filtro",
  "Acero Social",
  "Cerámica Granada",
  "Factoría",
  "CCCO",
];

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <main>
      <HeroHome />

      {/* Marquee de clientes */}
      <section className="border-y border-white/10 bg-ink py-7">
        <Container>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
            Empresas que han confiado en nosotros
          </p>
          <Marquee items={CLIENTS} />
        </Container>
      </section>

      {/* Servicios */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Nuestros servicios
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-2xl border border-gray-200 bg-white p-7">
                  <Link href={s.href} className="group block">
                    <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-brand-dark">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-gray-600">{s.desc}</p>
                    <span className="mt-5 inline-block text-sm font-semibold text-brand-dark">
                      Saber más
                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <h3 className="mt-16 text-lg font-semibold text-ink">Otros servicios</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {OTHER_SERVICES.map((o) => (
                <span
                  key={o}
                  className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-brand/20"
                >
                  {o}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand">
        <Container className="relative py-20 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
              Soluciones a medida para lo que TU negocio necesita
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/hablemos/"
              className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 font-semibold text-white shadow-xl transition-transform hover:scale-105"
            >
              Empezar proyecto
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Del blog */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Del blog</h2>
              <Link
                href="/blog/"
                className="text-sm font-semibold text-brand-dark hover:underline"
              >
                Ver todos →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <TiltCard className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <Link href={`/${p.slug}/`} className="group block">
                    {p.coverUrl ? (
                      <div className="overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.coverUrl}
                          alt={p.coverAlt ?? ""}
                          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] w-full bg-brand/10" />
                    )}
                    <div className="p-6">
                      <div className="text-xs font-medium text-gray-400">
                        {new Date(p.date).toLocaleDateString("es-ES")}
                      </div>
                      <h3
                        className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-dark"
                        dangerouslySetInnerHTML={{ __html: p.title }}
                      />
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
