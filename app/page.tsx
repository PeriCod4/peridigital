import Link from "next/link";
import Container from "@/components/Container";
import HeroHome from "@/components/HeroHome";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/Marquee";
import EcommerceDemo from "@/components/demos/EcommerceDemo";
import Magnetic from "@/components/fx/Magnetic";
import Counter from "@/components/fx/Counter";
import LeadCta from "@/components/LeadCta";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/jsonld";
import { SERVICES } from "@/lib/site";
import { getAllPosts } from "@/lib/wp";
import { PROJECTS } from "@/lib/projects-data";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta("/");

const ICONS: Record<string, string> = {
  "diseno-web": "🌐",
  "soluciones-digitales": "🧩",
  "crm-automatizacion": "🔁",
  "paid-media": "📣",
  seo: "🔍",
  "analitica-datos": "📊",
  "creacion-de-marca": "✨",
  "mantenimiento-web": "🛠️",
  "accesibilidad-web": "♿",
};

const PROCESS = [
  ["Auditoría", "Estudiamos tu negocio, tu competencia y a dónde quieres llegar."],
  ["Propuesta", "Plan claro y presupuesto cerrado, sin sorpresas."],
  ["Desarrollo", "Construimos pensando en convertir y posicionar."],
  ["Seguimiento", "Seguimos a tu lado como partners para crecer."],
];

const HOME_FAQS = [
  { q: "¿Sois una agencia?", a: "Funcionamos como tu equipo de marketing digital: partners que se implican en tu negocio, sin estructura piramidal ni reuniones eternas." },
  { q: "¿Cuánto cuesta trabajar con vosotros?", a: "Depende del proyecto. Hacemos una auditoría inicial gratuita y te damos un presupuesto cerrado antes de empezar." },
  { q: "¿Trabajáis con empresas de toda España?", a: "Sí. Trabajamos en remoto con clientes de toda España, con la misma cercanía que en persona." },
  { q: "¿Hacéis también el SEO?", a: "Sí, a través de PeriSEO, nuestra división especializada en posicionamiento." },
];

const CLIENTS = ["Silence SPA", "Kelindas", "Oliver Bam", "La Fundició", "Factoría Creativa", "Gaela Tulum", "Varullo", "Alpha Link"];

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);
  const featured = PROJECTS.slice(0, 6);

  return (
    <main className="relative overflow-x-hidden text-ink">
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <HeroHome />

      {/* Clientes */}
      <section className="relative z-10 border-y border-gray-100 bg-gray-50/70 py-8 backdrop-blur-sm">
        <Container>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            Empresas que han confiado en nosotros
          </p>
          <Marquee items={CLIENTS} />
        </Container>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { v: 9, s: "", label: "servicios 360" },
              { v: 9, s: "", label: "proyectos reales" },
              { v: posts.length, s: "", label: "artículos en el blog" },
              { v: 100, s: "%", label: "a tu medida" },
            ].map((st, i) => (
              <Reveal key={st.label} delay={i * 0.08}>
                <div>
                  <div className="text-gradient text-4xl font-extrabold md:text-5xl">
                    <Counter end={st.v} suffix={st.s} />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{st.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Servicios */}
      <section className="relative z-10 py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-text">Servicios</p>
              <h2 className="text-3xl font-extrabold text-ink sm:text-5xl">Todo lo que tu negocio necesita</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Un servicio 360 para facilitarte la vida, sin mareos.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/${s.slug}/`}
                  className="spotlight group block h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-xl shadow-lg shadow-brand/20">
                    {ICONS[s.slug] || "•"}
                  </div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                    {s.nav}
                    <span className="text-brand-text opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Showcase con demo */}
      <section className="relative z-10 py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-text">No solo bonito: que venda</p>
                <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Webs y tiendas pensadas para convertir</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Diseñamos cada detalle para guiar al usuario hacia la compra. Pruébalo aquí mismo →
                </p>
                <Magnetic>
                  <Link
                    href="/diseno-web/"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-accent px-7 py-3.5 font-bold text-ink shadow-xl shadow-brand/30 transition-all hover:shadow-brand/50"
                  >
                    Ver diseño web & ecommerce →
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand to-accent opacity-20 blur-2xl" />
                <div className="relative animate-float">
                  <EcommerceDemo />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cómo trabajamos */}
      <section className="relative z-10 py-20">
        <Container>
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-text">Cómo trabajamos</p>
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Un proceso claro, sin tecnicismos</h2>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="spotlight h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent font-bold text-ink">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-ink">{t}</h3>
                  <p className="mt-1 text-sm text-gray-600">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Proyectos */}
      <section className="relative z-10 py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Proyectos</h2>
              <Link href="/proyectos/" className="text-sm font-semibold text-brand-text hover:underline">Ver todos →</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <div className="spotlight flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                  <div className="flex h-14 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="max-h-12 w-auto object-contain" loading="lazy" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{p.excerpt ?? `${p.description.slice(0, 110)}…`}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 to-accent/10 p-10 text-center sm:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
                No trabajamos para ti, trabajamos contigo
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-600">
                Somos partners. Hacemos crecer tu negocio implicándonos como si fuera nuestro.
              </p>
              <Magnetic>
                <Link href="/hablemos/" className="mt-8 inline-block rounded-xl bg-gradient-to-r from-brand to-accent px-8 py-3.5 font-bold text-ink shadow-xl shadow-brand/30 transition-all hover:shadow-brand/50">
                  Empezar proyecto
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-20">
        <Container>
          <Reveal>
            <h2 className="mb-8 text-center text-3xl font-extrabold text-ink sm:text-4xl">Preguntas frecuentes</h2>
          </Reveal>
          <div className="mx-auto max-w-3xl space-y-4">
            {HOME_FAQS.map((f) => (
              <Reveal key={f.q}>
                <details className="spotlight group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <summary className="cursor-pointer list-none font-semibold text-ink">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="text-brand-text transition-transform group-open:rotate-45">+</span>
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
      <section className="relative z-10 py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Del blog</h2>
              <Link href="/blog/" className="text-sm font-semibold text-brand-text hover:underline">Ver todos →</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link href={`/${p.slug}/`} className="spotlight group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                  {p.coverUrl ? (
                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.coverUrl} alt={p.coverAlt ?? ""} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand/30 to-accent/20" />
                  )}
                  <div className="p-5">
                    <div className="text-xs text-gray-400">{new Date(p.date).toLocaleDateString("es-ES")}</div>
                    <h3 className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-text" dangerouslySetInnerHTML={{ __html: p.title }} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <LeadCta
        title="¿Hablamos de tu proyecto?"
        subtitle="Web, ecommerce, software, CRM, SEO o paid: cuéntanos qué necesitas y te decimos cómo te ayudamos. Somos partners, no una agencia más."
        context="Home"
        submitLabel="Agenda tu reunión"
        messagePlaceholder="Cuéntanos tu proyecto o qué necesitas mejorar…"
      />
    </main>
  );
}
