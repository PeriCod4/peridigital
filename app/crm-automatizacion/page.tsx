import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ServiceLayout from "@/components/ServiceLayout";
import AutomationDemo from "@/components/demos/AutomationDemo";

const DESC =
  "Implantación de CRM y automatización de marketing y ventas: centraliza clientes, automatiza flujos (email, carrito abandonado) e integra tu CRM con tu ecommerce.";

export const metadata: Metadata = {
  title: "CRM y automatización de marketing y ventas",
  description: DESC,
  ...pageMeta("/crm-automatizacion/"),
};

export default function Page() {
  return (
    <ServiceLayout
      slug="crm-automatizacion"
      metaDescription={DESC}
      dashboard={{
        project: "CRM & automatización",
        progress: 72,
        metrics: [
          { label: "Flujos activos", value: "5", tone: "brand" },
          { label: "Leads", value: "312" },
          { label: "Aperturas", value: "41%", tone: "green" },
          { label: "Recuperados", value: "+23", tone: "accent" },
        ],
        phases: [
          { name: "Auditoría", status: "done" },
          { name: "Configuración CRM", status: "done" },
          { name: "Flujos de automatización", status: "current" },
          { name: "Integraciones", status: "todo" },
          { name: "Optimización", status: "todo" },
        ],
      }}
      eyebrow="CRM & Automatización"
      title="CRM y automatización que conectan"
      subtitle="Centralizamos la gestión de clientes y automatizamos los procesos clave: mejor comunicación, menos tiempo perdido y más fidelización."
      intro={[
        "Un CRM bien implantado convierte tu lista de contactos en una máquina de ventas: sabes en qué punto está cada cliente y dejas de perder oportunidades por el camino.",
        "Implantamos tu CRM y automatizamos los flujos que más mueven la aguja, con especial foco en la integración CRM + ecommerce: recuperación de carritos abandonados, emails segmentados, secuencias de bienvenida y seguimiento post-venta.",
        "El objetivo no es que trabajes más, sino que el sistema trabaje por ti: que cada cliente reciba el mensaje correcto en el momento correcto, de forma automática.",
      ]}
      demo={<AutomationDemo />}
      demoTitle="Una automatización trabajando sola"
      stats={[
        { value: "~70%", label: "de carritos se abandonan" },
        { value: "24/7", label: "tus flujos no descansan" },
        { value: "1:1", label: "mensaje correcto a cada cliente" },
      ]}
      features={[
        { title: "Implantación de CRM", desc: "Configuración del CRM que mejor encaje (HubSpot, Zoho, Clientify…) adaptado a tu proceso de ventas." },
        { title: "Automatización de marketing", desc: "Flujos de email, lead nurturing y segmentación dinámica que trabajan solos." },
        { title: "CRM para ecommerce", desc: "Carrito abandonado, upsell y fidelización conectando tu tienda online con el CRM." },
        { title: "Integraciones", desc: "Unimos CRM, web, email y herramientas para que el dato fluya sin trabajo manual." },
        { title: "Datos y segmentación", desc: "Audiencias y segmentos accionables para hablarle a cada cliente con el mensaje correcto." },
        { title: "Automatización de procesos", desc: "Quitamos tareas repetitivas internas para que tu equipo se centre en vender." },
      ]}
      benefits={[
        "Recuperas ventas que hoy se pierden",
        "Cada lead recibe seguimiento, sin olvidos",
        "Menos trabajo manual para tu equipo",
        "Clientes mejor atendidos y más fieles",
        "Decisiones con datos, no a ciegas",
        "Todo conectado: web, tienda, email y CRM",
      ]}
      useCases={[
        { title: "Carrito abandonado", desc: "Secuencia automática de email/SMS que recupera compras que se quedaban a medias." },
        { title: "Bienvenida y nurturing", desc: "Acompaña al nuevo contacto hasta la compra con mensajes en el momento justo." },
        { title: "Post-venta y fidelización", desc: "Reseñas, recompra y upsell automatizados para que cada cliente valga más." },
      ]}
      faqs={[
        { q: "¿Qué CRM me conviene?", a: "Depende de tu tamaño y proceso de ventas. Te asesoramos sin atarte a una marca y configuramos el que mejor se adapte." },
        { q: "¿Podéis conectar el CRM con mi tienda online?", a: "Sí, es nuestra especialidad: integramos CRM y ecommerce para automatizar carritos abandonados, segmentación por producto y post-venta." },
        { q: "¿La automatización sustituye a mi equipo?", a: "No: le quita el trabajo repetitivo para que dedique su tiempo a lo que aporta valor." },
        { q: "¿Cumple con la normativa de protección de datos?", a: "Sí. Configuramos los flujos respetando RGPD y el consentimiento del usuario." },
      ]}
      ctaLabel="Quiero automatizar"
      relatedGuide={{ slug: "recuperar-carrito-abandonado", title: "Recuperar carritos abandonados" }}
    />
  );
}
