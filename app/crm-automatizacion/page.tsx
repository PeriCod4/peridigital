import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

const DESC =
  "Implantación de CRM y automatización de marketing y ventas: centraliza clientes, automatiza flujos (email, carrito abandonado) e integra tu CRM con tu ecommerce.";

export const metadata: Metadata = {
  title: "CRM y automatización de marketing y ventas",
  description: DESC,
  alternates: { canonical: "/crm-automatizacion/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="crm-automatizacion"
      metaDescription={DESC}
      eyebrow="CRM & Automatización"
      title="CRM y automatización que conectan"
      subtitle="Centralizamos la gestión de clientes y automatizamos los procesos clave: mejor comunicación, menos tiempo perdido y más fidelización."
      intro={[
        "Un CRM bien implantado convierte tu lista de contactos en una máquina de ventas: sabes en qué punto está cada cliente y dejas de perder oportunidades por el camino.",
        "Implantamos tu CRM y automatizamos los flujos que más mueven la aguja, con especial foco en la integración CRM + ecommerce: recuperación de carritos abandonados, emails segmentados y seguimiento post-venta.",
      ]}
      features={[
        { title: "Implantación de CRM", desc: "Configuración del CRM que mejor encaje (HubSpot, Zoho, Clientify…) adaptado a tu proceso de ventas." },
        { title: "Automatización de marketing", desc: "Flujos de email, lead nurturing y segmentación dinámica que trabajan solos." },
        { title: "CRM para ecommerce", desc: "Carrito abandonado, upsell y fidelización conectando tu tienda online con el CRM." },
        { title: "Integraciones", desc: "Unimos CRM, web, email y herramientas para que el dato fluya sin trabajo manual." },
        { title: "Datos y segmentación", desc: "Audiencias y segmentos accionables para hablarle a cada cliente con el mensaje correcto." },
        { title: "Automatización de procesos", desc: "Quitamos tareas repetitivas internas para que tu equipo se centre en vender." },
      ]}
      faqs={[
        { q: "¿Qué CRM me conviene?", a: "Depende de tu tamaño y proceso de ventas. Te asesoramos sin atarte a una marca y configuramos el que mejor se adapte." },
        { q: "¿Podéis conectar el CRM con mi tienda online?", a: "Sí, es nuestra especialidad: integramos CRM y ecommerce para automatizar carritos abandonados, segmentación por producto y post-venta." },
        { q: "¿La automatización sustituye a mi equipo?", a: "No: le quita el trabajo repetitivo para que dedique su tiempo a lo que aporta valor." },
      ]}
      ctaLabel="Quiero automatizar"
    />
  );
}
