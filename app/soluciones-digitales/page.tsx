import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import AppDemo from "@/components/demos/AppDemo";

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
      dashboard={{
        project: "Software a medida",
        progress: 55,
        metrics: [
          { label: "Sprint", value: "3/6", tone: "brand" },
          { label: "Funciones", value: "18" },
          { label: "Tests OK", value: "96%", tone: "green" },
          { label: "Versión", value: "v0.4", tone: "accent" },
        ],
        phases: [
          { name: "Análisis", status: "done" },
          { name: "Diseño técnico", status: "done" },
          { name: "Desarrollo", status: "current" },
          { name: "Pruebas", status: "todo" },
          { name: "Entrega", status: "todo" },
        ],
      }}
      eyebrow="Soluciones digitales"
      title="Soluciones digitales que ahorran tiempo"
      subtitle="Automatiza tu trabajo, gana tiempo y ahorra dinero con software y aplicaciones hechos a tu medida."
      intro={[
        "La idea de las soluciones digitales es quitarte trabajo y facilitártelo, no darte más. Desarrollamos plugins, aplicaciones y sistemas personalizados para digitalizar y agilizar los procesos internos de tu empresa.",
        "Desde una app para gestionar los productos de tu tienda desde el móvil hasta un sistema de reservas a medida o un panel de gestión: creamos lo que tu negocio necesita y lo integramos donde le saques partido (web, CRM, correo, móvil).",
        "Empezamos por lo que de verdad te diferencia y lo construimos para que crezca contigo: si dentro de unos meses se te queda corto, lo ampliamos. Un todo en uno, sin mil accesos ni herramientas sueltas.",
      ]}
      demo={<AppDemo />}
      demoTitle="Gestiona tu negocio desde el móvil"
      stats={[
        { value: "−70%", label: "tareas repetitivas" },
        { value: "1", label: "sistema, no mil herramientas" },
        { value: "∞", label: "escalable cuando creces" },
      ]}
      features={[
        { title: "Software a medida", desc: "Desarrollo de aplicaciones y sistemas personalizados adaptados a tus procesos reales." },
        { title: "Automatización de procesos", desc: "Elimina tareas repetitivas: deja que el sistema trabaje por ti y te ahorre tiempo." },
        { title: "Integración incluida", desc: "Integramos la solución donde le saques partido: web, CRM, correo, móvil. Un todo en uno." },
        { title: "SaaS y apps", desc: "Productos digitales escalables, desde un MVP hasta una plataforma SaaS completa." },
        { title: "Escalable y ampliable", desc: "Si en unos meses se te queda corto, seguimos ampliando el sistema para que cubra tus necesidades." },
        { title: "APIs e integraciones", desc: "Conectamos tus herramientas (pagos, ERP, logística, terceros) con arquitectura moderna." },
      ]}
      benefits={[
        "Inviertes solo en lo que te diferencia",
        "Menos errores y menos trabajo manual",
        "Datos centralizados en un único sistema",
        "Acceso desde web y móvil",
        "Arquitectura moderna y mantenible",
        "Crece a tu ritmo, sin rehacerlo todo",
      ]}
      useCases={[
        { title: "App de gestión", desc: "Controla productos, stock o pedidos desde el móvil, sin depender del ordenador." },
        { title: "Sistema de reservas", desc: "Reservas y citas automatizadas con pagos, avisos y gestión de disponibilidad." },
        { title: "Integraciones a medida", desc: "Conecta tu tienda con tu ERP, tu CRM o tu logística para que el dato fluya solo." },
      ]}
      faqs={[
        { q: "¿Software a medida o una solución SaaS estándar?", a: "Depende: lo estándar lo resolvemos con SaaS (coste menor) y desarrollamos a medida solo lo que te diferencia. Te asesoramos para que inviertas donde aporta valor." },
        { q: "¿Podéis integrarlo con mi web o mi CRM?", a: "Sí. Diseñamos las soluciones para que se integren con tu web, CRM, correo o móvil mediante APIs." },
        { q: "¿Qué pasa cuando crece mi negocio?", a: "El sistema se amplía. Partimos de una base escalable y seguimos evolucionándolo según tus necesidades." },
        { q: "¿Cuánto cuesta un desarrollo a medida?", a: "Varía mucho según el alcance. Hacemos un análisis previo y te damos una estimación realista de inversión y plazos antes de empezar." },
      ]}
      ctaLabel="Cuéntanos tu idea"
      relatedGuide={{ slug: "software-a-medida-vs-saas", title: "Software a medida vs SaaS" }}
    />
  );
}
