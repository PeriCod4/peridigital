import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

const DESC =
  "Analítica web y medición: implantación de GA4 y Tag Manager, modelos de atribución, dashboards y análisis para tomar decisiones basadas en datos.";

export const metadata: Metadata = {
  title: "Analítica web y datos (GA4)",
  description: DESC,
  alternates: { canonical: "/analitica-datos/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="analitica-datos"
      metaDescription={DESC}
      dashboard={{
        project: "Medición & GA4",
        progress: 60,
        metrics: [
          { label: "Eventos", value: "24", tone: "brand" },
          { label: "Conversiones", value: "100%", tone: "green" },
          { label: "Dashboards", value: "3", tone: "accent" },
          { label: "Cobertura", value: "OK", tone: "green" },
        ],
        phases: [
          { name: "Auditoría de medición", status: "done" },
          { name: "Implantación GA4", status: "done" },
          { name: "Eventos y conversiones", status: "current" },
          { name: "Dashboards", status: "todo" },
          { name: "Formación", status: "todo" },
        ],
      }}
      eyebrow="Analítica & Data"
      title="Decisiones basadas en datos, no en intuición"
      subtitle="Creamos ecosistemas de medición avanzados, modelos de atribución precisos y análisis que impulsan tu crecimiento."
      intro={[
        "La mayoría de negocios miden mal (o no miden) y deciden a ciegas. Nosotros montamos una medición que sí sirve: saber de dónde vienen tus clientes, qué canales rinden y dónde se pierde la venta.",
        "Implantamos GA4 y Google Tag Manager bien configurados, definimos tus conversiones, construimos dashboards claros y te ayudamos a interpretar los datos para actuar, no solo para mirar gráficas.",
      ]}
      stats={[
        { value: "GA4", label: "+ Tag Manager bien montados" },
        { value: "100%", label: "conversiones medidas" },
        { value: "1", label: "dashboard claro, sin ruido" },
      ]}
      features={[
        { title: "Implantación GA4", desc: "Configuración correcta de Google Analytics 4 y eventos, desde cero o arreglando lo existente." },
        { title: "Google Tag Manager", desc: "Etiquetado sin tocar código, escalable y mantenible." },
        { title: "Medición de conversiones", desc: "Definimos y medimos lo que importa: leads, compras, llamadas, formularios." },
        { title: "Modelos de atribución", desc: "Entender qué canal merece el crédito de cada venta." },
        { title: "Dashboards", desc: "Cuadros de mando claros (Looker Studio) con lo que de verdad importa." },
        { title: "Análisis y recomendaciones", desc: "Te explicamos qué dicen los datos y qué hacer con ellos." },
      ]}
      benefits={[
        "Sabes qué canal te trae clientes",
        "Dejas de invertir a ciegas",
        "Mides bien antes de escalar",
        "Datos claros, sin tecnicismos",
        "Cumple con privacidad y consentimiento",
        "Base para optimizar Paid y SEO",
      ]}
      useCases={[
        { title: "Ecommerce", desc: "Medir el embudo de compra completo: añadir al carrito, checkout y venta." },
        { title: "Captación de leads", desc: "Saber qué campañas y páginas generan contactos reales." },
        { title: "Migración a GA4", desc: "Empresas que hicieron mal el salto de Universal Analytics a GA4." },
      ]}
      faqs={[
        { q: "¿Ya tengo Google Analytics, lo necesito?", a: "Muchas cuentas de GA4 están mal configuradas y miden conversiones incorrectas. Auditamos lo que tienes y lo dejamos fino." },
        { q: "¿Esto cumple con el RGPD?", a: "Sí. Configuramos la medición respetando el consentimiento de cookies y la privacidad." },
        { q: "¿Para qué me sirve medir mejor?", a: "Para invertir donde funciona: optimizar tus campañas de Paid, tu SEO y tu web con datos reales." },
      ]}
      ctaLabel="Quiero medir bien"
    />
  );
}
