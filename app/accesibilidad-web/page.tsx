import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

const DESC =
  "Auditoría y adaptación de accesibilidad web (WCAG 2.1/2.2). Cumple la Ley Europea de Accesibilidad 2026, evita sanciones y llega a más clientes.";

export const metadata: Metadata = {
  title: "Accesibilidad web (WCAG) y cumplimiento 2026",
  description: DESC,
  alternates: { canonical: "/accesibilidad-web/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="accesibilidad-web"
      metaDescription={DESC}
      eyebrow="Accesibilidad web"
      title="Web accesible que cumple la ley y vende más"
      subtitle="Auditamos y adaptamos tu web a los estándares WCAG para que cumpla la normativa de accesibilidad y la pueda usar todo el mundo."
      intro={[
        "Desde 2025 la Ley Europea de Accesibilidad obliga a muchas empresas a tener su web accesible (WCAG 2.1 nivel AA), con sanciones para quien no cumpla. Pero la accesibilidad no es solo cumplir: una web accesible llega a más personas, mejora la experiencia y ayuda al SEO.",
        "Hacemos una auditoría de tu web, te explicamos qué hay que corregir y lo implementamos: contraste, navegación por teclado, textos alternativos, formularios, estructura y más.",
      ]}
      features={[
        { title: "Auditoría WCAG", desc: "Análisis de tu web frente a WCAG 2.1/2.2 nivel AA, automático y manual, con informe claro." },
        { title: "Adaptación y corrección", desc: "Arreglamos contraste, foco, navegación por teclado, alt text, formularios y estructura." },
        { title: "Cumplimiento legal", desc: "Te ayudamos a cumplir la normativa de accesibilidad y a documentar tu declaración." },
        { title: "Accesibilidad en ecommerce", desc: "Fichas de producto, filtros, carrito y checkout accesibles para no perder ventas." },
        { title: "SEO + experiencia", desc: "Lo accesible suele ser mejor para Google y para todos tus usuarios." },
        { title: "Seguimiento", desc: "Revisiones para mantener la web accesible a medida que añades contenido." },
      ]}
      faqs={[
        { q: "¿Mi empresa está obligada a tener la web accesible?", a: "Muchas sí: la normativa europea afecta a un amplio número de empresas desde 2025-2026. En la auditoría te decimos tu situación concreta." },
        { q: "¿Qué es WCAG 2.1 nivel AA?", a: "Es el estándar técnico de referencia para accesibilidad web. El nivel AA es el exigido habitualmente por la normativa." },
        { q: "¿Sirve para cualquier web?", a: "Sí, auditamos y adaptamos webs corporativas y tiendas online sobre cualquier tecnología." },
      ]}
      ctaLabel="Pide tu auditoría"
    />
  );
}
