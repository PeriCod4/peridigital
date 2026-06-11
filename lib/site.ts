// Constantes del sitio (datos reales de PeriDigital)
export const SITE = {
  name: "PeriDigital",
  url: "https://peridigital.es",
  description:
    "Agencia digital 360: diseño web y ecommerce, software a medida, CRM y automatización, SEO y mantenimiento. Webs que venden.",
  phone: "+34 609 74 57 29",
  email: "hola@peridigital.es",
  logo: "https://peridigital.es/icon.png",
  periseo: "https://periseo.es",
  sameAs: ["https://periseo.es"],
  gaId: "G-V7P5GQ78LJ",
  calendly: "https://calendly.com/camperodigital/30min",
} as const;

export interface ServiceDef {
  slug: string;
  nav: string;
  title: string;
  short: string;
}

// Servicios (3 core + Paid + SEO + Analítica + Marca + Mantenimiento + Accesibilidad)
export const SERVICES: ServiceDef[] = [
  { slug: "diseno-web", nav: "Diseño web & Ecommerce", title: "Diseño web y ecommerce", short: "Webs y tiendas online que venden." },
  { slug: "soluciones-digitales", nav: "Soluciones digitales", title: "Soluciones digitales a medida", short: "Software, SaaS y apps para tu negocio." },
  { slug: "crm-automatizacion", nav: "CRM & Automatización", title: "CRM y automatización", short: "Centraliza clientes y automatiza procesos." },
  { slug: "paid-media", nav: "Paid Media", title: "Paid Media: Meta y Google Ads", short: "Campañas que convierten en Meta y Google." },
  { slug: "seo", nav: "SEO", title: "SEO con PeriSEO", short: "Aparece en Google con nuestra división SEO." },
  { slug: "analitica-datos", nav: "Analítica & Data", title: "Analítica y datos", short: "Decisiones basadas en datos y medición." },
  { slug: "creacion-de-marca", nav: "Creación de marca", title: "Creación de marca", short: "Branding, logo e identidad desde cero." },
  { slug: "mantenimiento-web", nav: "Mantenimiento web", title: "Mantenimiento web", short: "Tu web siempre activa, segura y al día." },
  { slug: "accesibilidad-web", nav: "Accesibilidad web", title: "Accesibilidad web (WCAG)", short: "Cumple la ley 2026 y llega a más gente." },
];
