import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { GUIDES } from "@/lib/guides";

export const metadata = {
  title: "Guías",
  description:
    "Guías prácticas sobre diseño web, ecommerce, software a medida, CRM, automatización y accesibilidad web.",
  alternates: { canonical: "/guias/" },
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Recursos"
        title="Guías para decidir mejor"
        subtitle="Sin tecnicismos: lo que necesitas saber antes de invertir en tu presencia digital."
      />
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {GUIDES.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 2) * 0.08}>
              <TiltCard className="spotlight h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <Link href={`/guias/${g.slug}/`} className="group block">
                  <h2 className="text-xl font-bold text-ink group-hover:text-brand-text">{g.title}</h2>
                  <p className="mt-3 text-gray-600">{g.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-text">
                    Leer guía
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
