// Constantes del sitio (datos reales de Campero Digital)
export const SITE = {
  name: "Campero Digital",
  url: "https://camperodigital.com",
  description:
    "Agencia digital 360: diseño web y ecommerce, software a medida, CRM y automatización, SEO y mantenimiento. Webs que venden.",
  phone: "+34 609 74 57 29",
  email: "pablo@camperodigital.com",
  logo: "https://camperodigital.com/icon.png",
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

// Los 6 servicios (3 core + SEO/PeriSEO + Mantenimiento + Accesibilidad)
export const SERVICES: ServiceDef[] = [
  { slug: "diseno-web", nav: "Diseño web & Ecommerce", title: "Diseño web y ecommerce", short: "Webs y tiendas online que venden." },
  { slug: "soluciones-digitales", nav: "Soluciones digitales", title: "Soluciones digitales a medida", short: "Software, SaaS y apps para tu negocio." },
  { slug: "crm-automatizacion", nav: "CRM & Automatización", title: "CRM y automatización", short: "Centraliza clientes y automatiza procesos." },
  { slug: "seo", nav: "SEO", title: "SEO con PeriSEO", short: "Aparece en Google con nuestra división SEO." },
  { slug: "mantenimiento-web", nav: "Mantenimiento web", title: "Mantenimiento web", short: "Tu web siempre activa, segura y al día." },
  { slug: "accesibilidad-web", nav: "Accesibilidad web", title: "Accesibilidad web (WCAG)", short: "Cumple la ley 2026 y llega a más gente." },
];
