export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  service: string; // slug del servicio relacionado
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web",
    title: "¿Cuánto cuesta una página web en 2026?",
    excerpt: "Precios reales por tipo de web, qué incluye y cómo no pagar de más.",
    service: "diseno-web",
  },
  {
    slug: "software-a-medida-vs-saas",
    title: "Software a medida vs SaaS: cuál elegir",
    excerpt: "Diferencias, costes y por qué el modelo híbrido gana en 2026.",
    service: "soluciones-digitales",
  },
  {
    slug: "recuperar-carrito-abandonado",
    title: "Cómo recuperar carritos abandonados",
    excerpt: "Automatización con email, SMS y CRM para recuperar ventas perdidas.",
    service: "crm-automatizacion",
  },
  {
    slug: "accesibilidad-web-2026",
    title: "Ley de accesibilidad web 2026",
    excerpt: "A quién obliga, qué es WCAG 2.1 AA, sanciones y cómo cumplir.",
    service: "accesibilidad-web",
  },
];
