import Link from "next/link";
import Container from "@/components/Container";
import HeroHome from "@/components/HeroHome";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import Marquee from "@/components/Marquee";
import EcommerceDemo from "@/components/demos/EcommerceDemo";
import { getAllPosts } from "@/lib/wp";
import { PROJECTS } from "@/lib/projects-data";

const MAIN_SERVICES = [
  { title: "Web & Ecommerce", href: "/diseno-web/", desc: "Diseñamos webs y tiendas online seguras, rápidas y enfocadas en la conversión, para que tu negocio venda." },
  { title: "Soluciones digitales", href: "/soluciones-digitales/", desc: "Plugins, aplicaciones y sistemas personalizados para digitalizar y agilizar los procesos de tu empresa." },
  { title: "CRM & Automatización", href: "/crm-automatizacion/", desc: "Centralizamos clientes y automatizamos procesos clave: mejor comunicación, más tiempo y más fidelización." },
];

const OTHER_SERVICES = [
  { title: "SEO", href: "/seo/", desc: "Hacemos que te encuentren en Google con PeriSEO, nuestra división SEO." },
  { title: "Mantenimiento web", href: "/mantenimiento-web/", desc: "Tu web siempre activa, segura y al día, con hosting gestionado." },
  { title: "Accesibilidad web", href: "/accesibilidad-web/", desc: "Cumple la normativa 2026 (WCAG) y llega a más clientes." },
];

const CLIENTS = ["Silence SPA", "Kelindas", "Oliver Bam", "La Fundició", "Factoría Creativa", "Gaela Tulum", "Varullo", "Alpha Link"];

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);
  const featuredProjects = PROJECTS.slice(0, 6);

  return (
    <main>
      <HeroHome />

      {/* Clientes */}
      <section className="border-y border-white/10 bg-ink py-7">
        <Container>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
            Empresas que han confiado en nosotros
          </p>
          <Marquee items={CLIENTS} />
        </Container>
      </section>

      {/* Servicios principales */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Nuestros servicios</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Un servicio 360 para facilitarte la vida: lo que tu negocio necesita, sin mareos.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MAIN_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-2xl border border-gray-200 bg-white p-7">
                  <Link href={s.href} className="group block">
                    <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-brand-dark">{s.title}</h3>
                    <p className="mt-3 text-gray-600">{s.desc}</p>
                    <span className="mt-5 inline-block text-sm font-semibold text-brand-dark">
                      Saber más
                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <h3 className="mt-14 text-lg font-semibold text-ink">Otros servicios</h3>
            <div className="mt-5 grid gap-6 md:grid-cols-3">
              {OTHER_SERVICES.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group rounded-2xl bg-brand/5 p-6 transition-colors hover:bg-brand/10"
                >
                  <h4 className="font-bold text-ink group-hover:text-brand-dark">{s.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Showcase con demo */}
      <section className="bg-ink py-20 text-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                  No solo bonito: que venda
                </p>
                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  Webs y tiendas pensadas para convertir
                </h2>
                <p className="mt-4 text-lg text-white/75">
                  Diseñamos cada detalle para guiar al usuario hacia la compra:
                  rápido, claro y sin fricción. Pruébalo aquí mismo →
                </p>
                <Link
                  href="/diseno-web/"
                  className="mt-7 inline-block rounded-full bg-brand px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
                >
                  Ver diseño web & ecommerce
                </Link>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <EcommerceDemo />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Proyectos */}
      <section className="bg-gray-50 py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Proyectos</h2>
              <Link href="/proyectos-web/" className="text-sm font-semibold text-brand-dark hover:underline">
                Ver todos →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <TiltCard className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex h-16 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="max-h-14 w-auto object-contain" loading="lazy" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{p.description.slice(0, 120)}…</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-brand">
        <Container className="py-20 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
              No trabajamos para ti, trabajamos contigo
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/80">
              Somos partners. Hacemos crecer tu negocio implicándonos como si fuera nuestro.
            </p>
            <Link
              href="/hablemos/"
              className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 font-semibold text-white shadow-xl transition-transform hover:scale-105"
            >
              Empezar proyecto
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Blog */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Del blog</h2>
              <Link href="/blog/" className="text-sm font-semibold text-brand-dark hover:underline">Ver todos →</Link>
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
                        <img src={p.coverUrl} alt={p.coverAlt ?? ""} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] w-full bg-brand/10" />
                    )}
                    <div className="p-6">
                      <div className="text-xs font-medium text-gray-400">{new Date(p.date).toLocaleDateString("es-ES")}</div>
                      <h3 className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-dark" dangerouslySetInnerHTML={{ __html: p.title }} />
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
