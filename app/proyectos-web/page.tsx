import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { PROJECTS } from "@/lib/projects-data";

export const metadata = {
  title: "Proyectos web y ecommerce",
  description:
    "Portfolio de Campero Digital: webs corporativas, tiendas online y sistemas a medida construidos para generar resultados.",
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Proyectos"
        title="Transformamos ideas en webs"
        subtitle="Portfolio de soluciones a medida, en el CMS que mejor se ajuste a tus necesidades, listo para generar resultados."
      />
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <TiltCard className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex h-20 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-16 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <h2 className="mt-4 text-lg font-bold text-ink">{p.title}</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tipologia.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {p.description.slice(0, 220)}
                  {p.description.length > 220 ? "…" : ""}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand/10 p-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink">¿Empezamos el tuyo?</h2>
          <Link
            href="/hablemos/"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </Container>
    </main>
  );
}
