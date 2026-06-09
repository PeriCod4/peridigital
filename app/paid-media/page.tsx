import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import AdsDemo from "@/components/demos/AdsDemo";

const DESC =
  "Gestión de campañas de publicidad online en Meta Ads (Facebook/Instagram) y Google Ads. Tráfico cualificado + optimización de conversión (CRO) para más ventas.";

export const metadata: Metadata = {
  title: "Paid Media: campañas en Meta y Google Ads",
  description: DESC,
  alternates: { canonical: "/paid-media/" },
};

export default function Page() {
  return (
    <ServiceLayout
      slug="paid-media"
      metaDescription={DESC}
      eyebrow="Paid Media & CRO"
      title="Publicidad que convierte en Meta y Google"
      subtitle="Maximizamos tu inversión combinando campañas efectivas y optimización de la conversión: atraemos tráfico cualificado y lo convertimos en resultados."
      intro={[
        "Invertir en anuncios sin estrategia es quemar dinero. Nosotros montamos y optimizamos tus campañas en Meta Ads (Facebook e Instagram) y Google Ads para que cada euro trabaje: público correcto, mensaje correcto, momento correcto.",
        "Y no nos quedamos en traer tráfico: trabajamos también la conversión (CRO) de tu web o landing, porque de nada sirve atraer visitas si no compran. Medimos, ajustamos y escalamos lo que funciona.",
      ]}
      demo={<AdsDemo />}
      demoTitle="Campañas optimizadas, no a ciegas"
      stats={[
        { value: "Meta", label: "Facebook & Instagram Ads" },
        { value: "Google", label: "Search · Display · Shopping · YouTube" },
        { value: "+CRO", label: "optimización de conversión" },
      ]}
      features={[
        { title: "Meta Ads", desc: "Campañas en Facebook e Instagram: prospecting, retargeting y catálogo para ecommerce." },
        { title: "Google Ads", desc: "Search, Performance Max, Shopping, Display y YouTube según tu objetivo." },
        { title: "Optimización CRO", desc: "Mejoramos la landing y el embudo para que el tráfico convierta más." },
        { title: "Segmentación y público", desc: "Audiencias precisas, lookalikes y exclusiones para no malgastar presupuesto." },
        { title: "Medición y atribución", desc: "Seguimiento de conversiones bien configurado para saber qué funciona de verdad." },
        { title: "Reporting claro", desc: "Informes sin humo: inversión, resultados y siguiente paso, en cristiano." },
      ]}
      benefits={[
        "Cada euro invertido con cabeza",
        "Tráfico cualificado, no visitas vacías",
        "Tráfico + conversión trabajados juntos",
        "Escalamos lo que funciona",
        "Medición fiable de resultados",
        "Sin permanencias eternas ni humo",
      ]}
      useCases={[
        { title: "Ecommerce", desc: "Campañas de catálogo y retargeting para vender más, con recuperación de carrito." },
        { title: "Captación de leads", desc: "Negocios de servicios que necesitan un flujo constante de contactos cualificados." },
        { title: "Lanzamientos", desc: "Dar a conocer un producto o promoción y medir su impacto desde el día uno." },
      ]}
      faqs={[
        { q: "¿Cuánto presupuesto necesito para anunciarme?", a: "Depende del sector y del objetivo. Te asesoramos sobre una inversión realista y la escalamos según resultados; no tiene sentido empezar a ciegas." },
        { q: "¿Meta Ads o Google Ads?", a: "Suelen complementarse: Google capta demanda existente (quien ya busca) y Meta genera demanda (descubrimiento). Definimos el mix según tu caso." },
        { q: "¿Incluye la optimización de la web?", a: "Sí, trabajamos también el CRO: de nada sirve traer tráfico si la web no convierte. Mejoramos landing y embudo." },
        { q: "¿Cómo sé que funciona?", a: "Con medición de conversiones bien montada e informes claros de inversión vs. resultados. Decidimos con datos." },
      ]}
      ctaLabel="Quiero anunciarme"
    />
  );
}
