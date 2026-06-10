import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import EcommerceDemo from "@/components/demos/EcommerceDemo";

const DESC =
  "Diseño web y tiendas online a medida: webs rápidas, optimizadas para Google y pensadas para vender. WordPress, WooCommerce y ecommerce profesional.";

export const metadata: Metadata = {
  title: "Diseño web y ecommerce a medida",
  description: DESC,
  alternates: { canonical: "/diseno-web/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="diseno-web"
      metaDescription={DESC}
      dashboard={{
        project: "Rediseño web",
        progress: 68,
        metrics: [
          { label: "Avance diseño", value: "68%", tone: "brand" },
          { label: "Páginas", value: "7/10" },
          { label: "Velocidad", value: "95", tone: "green" },
          { label: "Revisiones", value: "2", tone: "accent" },
        ],
        phases: [
          { name: "Auditoría", status: "done" },
          { name: "Propuesta de diseño", status: "done" },
          { name: "Desarrollo", status: "current" },
          { name: "Formación", status: "todo" },
          { name: "Entrega", status: "todo" },
        ],
      }}
      eyebrow="Diseño web & Ecommerce"
      title="Páginas web que venden"
      subtitle="Creamos webs y tiendas online únicas, adaptadas a tu marca y a tus objetivos, para captar al usuario y guiarlo hacia la conversión."
      intro={[
        "Tu web es tu tarjeta de presentación: lo primero que ven de tu marca cuando aún no te conocen. Una web llamativa, que genere interés y que invite a navegar es el detonante para convertir visitas en clientes.",
        "Diseñamos y desarrollamos webs corporativas y tiendas online (WordPress, WooCommerce y el CMS que mejor encaje) rápidas, seguras y optimizadas para Google y para los nuevos motores de IA. Sin plantillas genéricas: cada proyecto se construye alrededor de tu negocio y de lo que necesitas vender.",
        "Y no te dejamos solo cuando publicamos: te formamos para que edites tu web, la mantenemos activa y seguimos a tu lado como partners para hacerla crecer.",
      ]}
      demo={<EcommerceDemo />}
      demoTitle="Tu tienda, lista para vender"
      stats={[
        { value: "+3 s", label: "de carga = clientes que se van" },
        { value: "100%", label: "responsive y mobile-first" },
        { value: "24/7", label: "tu web siempre activa" },
      ]}
      features={[
        { title: "Diseño web a medida", desc: "Webs únicas adaptadas a tu marca, pensadas para captar la atención y convertir de forma natural." },
        { title: "Tiendas online (ecommerce)", desc: "Tiendas WooCommerce/Shopify rápidas y fáciles de gestionar, con pasarela de pago e integraciones." },
        { title: "Webs que posicionan", desc: "Experiencias optimizadas para Google y la IA: tu marca se encuentra fácil y se recuerda." },
        { title: "Mantenimiento y hospedaje", desc: "Gestionamos hosting y mantenimiento en los mejores sistemas, sin sablarte, para que tu web siempre esté activa." },
        { title: "Rendimiento y Core Web Vitals", desc: "Velocidad de carga y métricas optimizadas: cada segundo cuenta para vender y para el SEO." },
        { title: "Formación incluida", desc: "Te enseñamos a editar tu web para que actualices el contenido cuando quieras, con total libertad." },
      ]}
      benefits={[
        "Diseño orientado a conversión, no solo bonito",
        "Carga rápida y buenas Core Web Vitals",
        "Base SEO desde el primer día",
        "Gestionable por ti tras la formación",
        "Integración con pagos, reservas o CRM",
        "Soporte cercano de partners, no de tickets",
      ]}
      useCases={[
        { title: "Tienda online", desc: "Negocio que quiere vender 24/7 con catálogo, pagos y envíos automatizados." },
        { title: "Web corporativa", desc: "Empresa que necesita transmitir confianza y captar contactos cualificados." },
        { title: "Landing de campaña", desc: "Página enfocada a convertir el tráfico de tus anuncios en clientes." },
      ]}
      process={[
        { title: "Auditoría", desc: "Vemos qué necesitas, estudiamos la competencia y lo que hacen bien para mejorarlo. Nos cuentas tu marca y a dónde quieres llegar." },
        { title: "Propuesta", desc: "Te presentamos opciones de diseño personalizadas, siempre con el objetivo de la conversión." },
        { title: "Desarrollo", desc: "Maquetamos la web trabajando palabras clave y contenido que posicione y atraiga usuarios de forma orgánica." },
        { title: "Formación", desc: "Cuando la web está lista, te formamos para que puedas cambiar cualquier contenido tú mismo." },
        { title: "Seguimiento", desc: "Seguimos siendo equipo: somos partners, no una agencia más. Packs de horas para tu crecimiento." },
      ]}
      faqs={[
        { q: "¿Cuánto cuesta una página web?", a: "Depende del alcance (web corporativa, tienda online, funcionalidades a medida). Tras una auditoría gratuita te damos un presupuesto cerrado y sin sorpresas." },
        { q: "¿Trabajáis con WordPress y WooCommerce?", a: "Sí. Trabajamos con WordPress/WooCommerce y otros CMS según lo que mejor se ajuste a tu proyecto y a cómo quieras autogestionarlo." },
        { q: "¿La web estará optimizada para SEO?", a: "Sí. Partimos de una base SEO sólida (estructura, velocidad, contenido). Para posicionamiento avanzado contamos con PeriSEO, nuestra división SEO." },
        { q: "¿Podré actualizar la web yo mismo?", a: "Sí. Incluimos una formación personalizada para que edites textos, imágenes y productos con total libertad." },
        { q: "¿Cuánto tarda en estar lista?", a: "Una web corporativa suele estar entre 3 y 6 semanas; una tienda online algo más según catálogo e integraciones. Te damos un calendario en la propuesta." },
      ]}
      ctaLabel="Pide presupuesto"
      relatedGuide={{ slug: "cuanto-cuesta-una-pagina-web", title: "¿Cuánto cuesta una web?" }}
    />
  );
}
