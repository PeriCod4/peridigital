import Link from "next/link";
import Container from "@/components/Container";
import HeroHome from "@/components/HeroHome";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import Marquee from "@/components/Marquee";
import EcommerceDemo from "@/components/demos/EcommerceDemo";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/wp";
import { PROJECTS } from "@/lib/projects-data";

const PROCESS = [
  ["Auditoría", "Estudiamos tu negocio, tu competencia y a dónde quieres llegar."],
  ["Propuesta", "Te presentamos un plan claro y un presupuesto cerrado, sin sorpresas."],
  ["Desarrollo", "Construimos la solución pensando en convertir y posicionar."],
  ["Formación", "Te enseñamos a gestionarla con total libertad."],
  ["Seguimiento", "Seguimos a tu lado como partners para hacerla crecer."],
];

const HOME_FAQS = [
  { q: "¿Sois una agencia?", a: "Funcionamos como tu equipo de marketing digital: partners que se implican en tu negocio, sin estructura piramidal ni reuniones eternas." },
  { q: "¿Cuánto cuesta trabajar con vosotros?", a: "Depende del proyecto. Hacemos una auditoría inicial gratuita y te damos un presupuesto cerrado antes de empezar." },
  { q: "¿Trabajáis con empresas de toda España?", a: "Sí. Trabajamos en remoto con clientes de toda España, con la misma cercanía que en persona." },
  { q: "¿Hacéis también el SEO?", a: "Sí, a través de PeriSEO, nuestra división especializada en posicionamiento. Web que convierte + que aparece en Google." },
];

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
      <JsonLd data={faqSchema(HOME_FAQS)} />
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
                    <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-brand-text">{s.title}</h3>
                    <p className="mt-3 text-gray-600">{s.desc}</p>
                    <span className="mt-5 inline-block text-sm font-semibold text-brand-text">
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
                  <h4 className="font-bold text-ink group-hover:text-brand-text">{s.title}</h4>
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
              <Link href="/proyectos-web/" className="text-sm font-semibold text-brand-text hover:underline">
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

      {/* Cómo trabajamos */}
      <section className="py-20">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Cómo trabajamos</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Sin tecnicismos ni mareos. Un proceso claro de principio a fin.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-gray-200 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-bold text-ink">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-ink">{t}</h3>
                  <p className="mt-1 text-sm text-gray-600">{d}</p>
                </div>
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

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Preguntas frecuentes</h2>
          </Reveal>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {HOME_FAQS.map((f) => (
              <Reveal key={f.q}>
                <details className="group rounded-2xl border border-gray-200 bg-white p-6">
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
        </Container>
      </section>

      {/* Blog */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Del blog</h2>
              <Link href="/blog/" className="text-sm font-semibold text-brand-text hover:underline">Ver todos →</Link>
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
                      <h3 className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-text" dangerouslySetInnerHTML={{ __html: p.title }} />
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
