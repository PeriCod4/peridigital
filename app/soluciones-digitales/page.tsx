import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

const DESC =
  "Software a medida, SaaS y apps para tu negocio: automatizamos procesos e integramos sistemas (web, CRM, correo, móvil) para que ahorres tiempo y escales.";

export const metadata: Metadata = {
  title: "Soluciones digitales y software a medida",
  description: DESC,
  alternates: { canonical: "/soluciones-digitales/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="soluciones-digitales"
      metaDescription={DESC}
      eyebrow="Soluciones digitales"
      title="Soluciones digitales que ahorran tiempo"
      subtitle="Automatiza tu trabajo, gana tiempo y ahorra dinero con software y aplicaciones hechos a tu medida."
      intro={[
        "La idea de las soluciones digitales es quitarte trabajo y facilitártelo, no darte más. Desarrollamos plugins, aplicaciones y sistemas personalizados para digitalizar y agilizar los procesos internos de tu empresa.",
        "Desde una app para gestionar los productos de tu tienda desde el móvil hasta un sistema de reservas a medida o software de gestión: creamos lo que tu negocio necesita y lo integramos donde le saques partido.",
      ]}
      features={[
        { title: "Software a medida", desc: "Desarrollo de aplicaciones y sistemas personalizados adaptados a tus procesos reales." },
        { title: "Automatización de procesos", desc: "Elimina tareas repetitivas: deja que el sistema trabaje por ti y te ahorre tiempo." },
        { title: "Integración incluida", desc: "Integramos la solución donde le saques partido: web, CRM, correo, móvil. Un todo en uno." },
        { title: "SaaS y apps", desc: "Productos digitales escalables, desde un MVP hasta una plataforma SaaS completa." },
        { title: "Escalable y ampliable", desc: "Si en unos meses se te queda corto, seguimos ampliando el sistema para que cubra tus necesidades." },
        { title: "APIs e integraciones", desc: "Conectamos tus herramientas (pagos, ERP, logística, terceros) con arquitectura moderna." },
      ]}
      faqs={[
        { q: "¿Software a medida o una solución SaaS estándar?", a: "Depende: lo estándar lo resolvemos con SaaS (coste menor) y desarrollamos a medida solo lo que te diferencia. Te asesoramos para que inviertas donde aporta valor." },
        { q: "¿Podéis integrarlo con mi web o mi CRM?", a: "Sí. Diseñamos las soluciones para que se integren con tu web, CRM, correo o móvil mediante APIs." },
        { q: "¿Qué pasa cuando crece mi negocio?", a: "El sistema se amplía. Partimos de una base escalable y seguimos evolucionándolo según tus necesidades." },
      ]}
      ctaLabel="Cuéntanos tu idea"
    />
  );
}
