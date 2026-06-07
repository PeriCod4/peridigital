import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import UptimeDemo from "@/components/demos/UptimeDemo";

const DESC =
  "Mantenimiento web y hosting gestionado: actualizaciones, copias de seguridad, seguridad, monitorización y soporte para que tu web esté siempre activa.";

export const metadata: Metadata = {
  title: "Mantenimiento web y hosting gestionado",
  description: DESC,
  alternates: { canonical: "/mantenimiento-web/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="mantenimiento-web"
      metaDescription={DESC}
      eyebrow="Mantenimiento web"
      title="Tu web siempre activa, segura y al día"
      subtitle="Nos ocupamos del mantenimiento y el hospedaje de tu web para que tú no tengas que preocuparte de nada."
      intro={[
        "Una web no se acaba el día que se publica: necesita actualizaciones, copias de seguridad y vigilancia para seguir rápida, segura y funcionando.",
        "Gestionamos tu mantenimiento y hosting en los mejores sistemas, sin sablarte, para que tu web esté siempre activa aunque haya un imprevisto. Monitorizamos que esté online y actuamos antes de que tú (o tus clientes) os deis cuenta de un problema.",
        "Y si necesitas cambios o mejoras, tienes packs de horas: somos partners, no un número de ticket.",
      ]}
      demo={<UptimeDemo />}
      demoTitle="Monitorización en tiempo real"
      stats={[
        { value: "99,9%", label: "objetivo de disponibilidad" },
        { value: "24/7", label: "monitorización" },
        { value: "0", label: "preocupaciones para ti" },
      ]}
      featuresTitle="Qué incluyen los planes"
      features={[
        { title: "Actualizaciones", desc: "WordPress, plugins y temas siempre al día para evitar fallos y vulnerabilidades." },
        { title: "Copias de seguridad", desc: "Backups periódicos para restaurar tu web en minutos si algo va mal." },
        { title: "Seguridad", desc: "Monitorización, SSL y medidas anti-hackeo para proteger tu web y tus datos." },
        { title: "Hosting gestionado", desc: "Alojamiento rápido y fiable gestionado por nosotros, sin que tengas que pelearte con el servidor." },
        { title: "Soporte", desc: "Estamos para lo que necesites: somos partners, no un número de ticket." },
        { title: "Mejoras continuas", desc: "Packs de horas para pequeños cambios, optimización y nuevo contenido." },
      ]}
      benefits={[
        "Evitas caídas, hackeos y sustos",
        "Restauras en minutos ante cualquier fallo",
        "Tu web siempre rápida y actualizada",
        "Un único responsable de todo",
        "Coste fijo y previsible al mes",
        "Cambios cuando los necesites",
      ]}
      useCases={[
        { title: "Web corporativa", desc: "Tranquilidad de que tu imagen online siempre está disponible y segura." },
        { title: "Tienda online", desc: "Cada minuto caída es venta perdida: monitorización y respuesta rápida." },
        { title: "Webs con campañas activas", desc: "Si inviertes en anuncios, tu web no se puede permitir estar caída." },
      ]}
      faqs={[
        { q: "¿Necesito mantenimiento si mi web va bien?", a: "Sí: la mayoría de problemas (caídas, hackeos, lentitud) se evitan con mantenimiento preventivo y actualizaciones al día." },
        { q: "¿Incluye el hosting?", a: "Podemos gestionarte también el alojamiento en los mejores sistemas, optimizado y sin coste desproporcionado." },
        { q: "¿Y si necesito cambios en la web?", a: "Ofrecemos packs de horas para cambios, mejoras y nuevo contenido cuando lo necesites." },
        { q: "¿Qué pasa si mi web se cae?", a: "La monitorización nos avisa y actuamos para restaurarla cuanto antes, con copias de seguridad recientes." },
      ]}
      ctaLabel="Ver planes"
    />
  );
}
