import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

const TITLE = "¿Cuánto cuesta una página web en 2026? Precios reales";
const DESC =
  "Cuánto cuesta una página web según el tipo (corporativa, tienda online, a medida), qué incluye el precio y cómo no pagar de más. Guía con rangos reales en España.";

export const metadata: Metadata = {
  title: "¿Cuánto cuesta una página web? Precios 2026",
  description: DESC,
  alternates: { canonical: "/guias/cuanto-cuesta-una-pagina-web/" },
};

export default function Page() {
  return (
    <GuideLayout
      slug="cuanto-cuesta-una-pagina-web"
      title={TITLE}
      description={DESC}
      date="2026-06-08"
      intro={[
        "“¿Cuánto cuesta una página web?” es la primera pregunta de casi todo el mundo, y la respuesta honesta es: depende. No es lo mismo una web corporativa de presentación que una tienda online con cientos de productos o un desarrollo a medida.",
        "En esta guía te damos rangos de precios reales en España, te explicamos qué hay detrás de cada cifra y cómo asegurarte de que pagas por lo que de verdad aporta valor a tu negocio.",
      ]}
      sections={[
        {
          h2: "De qué depende el precio de una web",
          paras: ["El presupuesto de una web se mueve por unos pocos factores clave:"],
          list: [
            "Tipo de web: corporativa, landing, blog o tienda online.",
            "Número de páginas y de productos (en ecommerce).",
            "Diseño: plantilla adaptada vs. diseño 100% a medida.",
            "Funcionalidades: reservas, pagos, área privada, multiidioma, integraciones.",
            "SEO y contenido: si se trabaja el posicionamiento desde el inicio.",
            "Mantenimiento y soporte posteriores.",
          ],
        },
        {
          h2: "Precios orientativos por tipo de web",
          paras: [
            "Estos rangos son orientativos para el mercado español y sirven para hacerte una idea antes de pedir presupuesto:",
          ],
          list: [
            "Landing page / web sencilla: desde unos cientos de euros.",
            "Web corporativa a medida: rango medio, según número de páginas y diseño.",
            "Tienda online (ecommerce): superior a la corporativa por catálogo, pagos e integraciones.",
            "Desarrollo a medida (funcionalidades propias): presupuesto específico según el alcance.",
          ],
        },
        {
          h2: "¿Plantilla o diseño a medida?",
          paras: [
            "Una plantilla es más barata y rápida, pero te pareces a miles de webs y sueles toparte con límites en cuanto quieres algo concreto. Un diseño a medida cuesta más, pero se construye alrededor de tu marca y de tu objetivo de conversión.",
            "Nuestra recomendación: si la web es un canal importante de tu negocio, invierte en diseño a medida orientado a vender. Si solo necesitas presencia básica, una solución más sencilla puede valer para empezar.",
          ],
        },
        {
          h2: "Qué debería incluir un buen presupuesto",
          list: [
            "Diseño adaptado a tu marca y a móvil (responsive).",
            "Velocidad de carga y buenas Core Web Vitals.",
            "Base SEO: estructura, metadatos, sitemap.",
            "Formación para que puedas editar tu web.",
            "Mantenimiento y hosting (o cómo se gestionarán).",
            "Plazos claros y qué pasa con las revisiones.",
          ],
        },
        {
          h2: "Cómo no pagar de más (ni de menos)",
          paras: [
            "El precio más barato suele salir caro: webs lentas, sin SEO, imposibles de editar o que hay que rehacer en un año. Pero tampoco necesitas pagar por funciones que no vas a usar.",
            "La clave es definir bien el objetivo de la web antes de pedir presupuesto. En una auditoría inicial detectamos qué necesitas de verdad y te damos un precio cerrado, sin sorpresas.",
          ],
        },
      ]}
      faqs={[
        { q: "¿Cuánto cuesta una página web sencilla?", a: "Una web sencilla o landing parte de unos cientos de euros. El precio sube con el número de páginas, el diseño a medida y las funcionalidades." },
        { q: "¿Es más caro hacer una tienda online?", a: "Sí, suele costar más que una web corporativa porque incluye catálogo, pasarela de pago, envíos e integraciones." },
        { q: "¿El mantenimiento se paga aparte?", a: "Normalmente sí: el mantenimiento y el hosting son un servicio recurrente. Te explicamos las opciones para que no haya sorpresas." },
      ]}
      cta={{
        text: "¿Quieres saber cuánto costaría tu web concreta? Te lo decimos sin compromiso.",
        label: "Pide presupuesto de tu web",
        href: "/diseno-web/",
      }}
    />
  );
}
