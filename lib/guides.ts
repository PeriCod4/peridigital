export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  service: string; // slug del servicio relacionado
  icon: string; // emoji coherente con los iconos de servicio de la home
  readTime: string; // tiempo de lectura aproximado
  points: string[]; // 3 cosas que aprendes en la guía
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web",
    title: "¿Cuánto cuesta una página web en 2026?",
    excerpt: "Precios reales por tipo de web, qué incluye y cómo no pagar de más.",
    service: "diseno-web",
    icon: "🌐",
    readTime: "8 min",
    points: [
      "Rangos de precio por tipo (landing, corporativa, ecommerce, a medida)",
      "Qué entra de verdad en el presupuesto y qué se cobra aparte",
      "Señales para detectar un precio inflado o demasiado barato",
    ],
  },
  {
    slug: "software-a-medida-vs-saas",
    title: "Software a medida vs SaaS: cuál elegir",
    excerpt: "Diferencias, costes y por qué el modelo híbrido gana en 2026.",
    service: "soluciones-digitales",
    icon: "🧩",
    readTime: "7 min",
    points: [
      "Coste total real de cada modelo (no solo la cuota mensual)",
      "Cuándo compensa lo a medida y cuándo un SaaS",
      "El enfoque híbrido: lo mejor de ambos sin atarte",
    ],
  },
  {
    slug: "recuperar-carrito-abandonado",
    title: "Cómo recuperar carritos abandonados",
    excerpt: "Automatización con email, SMS y CRM para recuperar ventas perdidas.",
    service: "crm-automatizacion",
    icon: "🔁",
    readTime: "6 min",
    points: [
      "Por qué se abandonan los carritos y cuánto dinero se pierde",
      "Secuencias de email + SMS que recuperan ventas en automático",
      "Cómo medir el retorno real de la recuperación",
    ],
  },
  {
    slug: "accesibilidad-web-2026",
    title: "Ley de accesibilidad web 2026",
    excerpt: "A quién obliga, qué es WCAG 2.1 AA, sanciones y cómo cumplir.",
    service: "accesibilidad-web",
    icon: "♿",
    readTime: "9 min",
    points: [
      "A quién obliga la Ley Europea de Accesibilidad y desde cuándo",
      "Qué es WCAG 2.1 AA en lenguaje claro",
      "Sanciones y checklist para cumplir sin rehacer la web",
    ],
  },
];
