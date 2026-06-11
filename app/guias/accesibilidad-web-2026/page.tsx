import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import GuideLayout from "@/components/GuideLayout";

const TITLE = "Ley de accesibilidad web 2026: qué necesitas saber";
const DESC =
  "Ley Europea de Accesibilidad 2026: a quién obliga, qué es WCAG 2.1 nivel AA, sanciones y cómo adaptar tu web. Guía clara para cumplir y no quedarte fuera.";

export const metadata: Metadata = {
  title: "Ley de accesibilidad web 2026: guía para cumplir",
  description: DESC,
  ...pageMeta("/guias/accesibilidad-web-2026/"),
};

export default function Page() {
  return (
    <GuideLayout
      slug="accesibilidad-web-2026"
      title={TITLE}
      description={DESC}
      date="2026-06-08"
      intro={[
        "La accesibilidad web ha dejado de ser “un extra para algunos” y se ha convertido en una obligación legal para muchas empresas. La Ley Europea de Accesibilidad marca plazos y sanciones, y 2026 es un año clave.",
        "En esta guía te explicamos, sin tecnicismos, a quién obliga la normativa, qué hay que cumplir (WCAG 2.1 nivel AA), qué riesgos hay y cómo adaptar tu web sin agobios.",
      ]}
      sections={[
        {
          h2: "Qué es la accesibilidad web",
          paras: [
            "Una web accesible es la que puede usar el mayor número posible de personas, incluidas las que tienen discapacidad visual, auditiva, motora o cognitiva. Eso implica buen contraste, textos legibles, navegación por teclado, textos alternativos en las imágenes, formularios claros y más.",
          ],
        },
        {
          h2: "A quién obliga la normativa",
          paras: [
            "La Ley Europea de Accesibilidad afecta a un amplio número de empresas y servicios digitales, especialmente a partir de determinados tamaños y sectores. Muchas tiendas online y servicios entran dentro del ámbito de aplicación.",
            "Si no estás seguro de si tu caso entra, lo más sencillo es hacer una auditoría: te dice tu situación concreta y qué tendrías que ajustar.",
          ],
        },
        {
          h2: "Qué hay que cumplir: WCAG 2.1 nivel AA",
          paras: [
            "El estándar técnico de referencia son las pautas WCAG (Web Content Accessibility Guidelines), normalmente en su nivel AA. Resumido, exigen cosas como:",
          ],
          list: [
            "Contraste suficiente entre texto y fondo.",
            "Tamaño de texto legible y posibilidad de ampliarlo.",
            "Navegación completa con teclado.",
            "Textos alternativos en imágenes con información.",
            "Formularios con etiquetas y mensajes de error claros.",
            "Estructura de encabezados correcta.",
          ],
        },
        {
          h2: "Qué riesgos hay si no cumples",
          paras: [
            "Más allá de las posibles sanciones por incumplimiento, una web inaccesible deja fuera a clientes potenciales y transmite peor imagen. Y para Google, lo accesible suele coincidir con lo bien hecho, así que también ayuda al SEO.",
          ],
        },
        {
          h2: "Cómo adaptar tu web paso a paso",
          list: [
            "Auditoría: analizar la web frente a WCAG 2.1 AA (automática + manual).",
            "Priorizar: ordenar los problemas por impacto y esfuerzo.",
            "Corregir: contraste, foco, teclado, alt text, formularios, estructura.",
            "Documentar: preparar la declaración de accesibilidad.",
            "Mantener: revisar cuando se añade contenido nuevo.",
          ],
        },
      ]}
      faqs={[
        { q: "¿Mi empresa está obligada a cumplir?", a: "Depende del tamaño y el sector, pero la normativa europea afecta a muchas empresas desde 2025-2026. Una auditoría te aclara tu caso concreto." },
        { q: "¿Qué es WCAG 2.1 nivel AA?", a: "Es el estándar técnico de accesibilidad más usado como referencia legal. El nivel AA es el que suele exigirse." },
        { q: "¿La accesibilidad ayuda al SEO?", a: "Sí. Muchas buenas prácticas de accesibilidad (estructura, textos alternativos, rendimiento) también mejoran el posicionamiento." },
      ]}
      cta={{
        text: "¿Quieres saber si tu web cumple y qué habría que ajustar?",
        label: "Pide tu auditoría de accesibilidad",
        href: "/accesibilidad-web/",
      }}
    />
  );
}
