import { SITE } from "./site";

// Convierte una URL relativa en absoluta contra SITE.url.
const abs = (u: string) =>
  u.startsWith("http") ? u : `${SITE.url}${u.startsWith("/") ? "" : "/"}${u}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: SITE.sameAs,
    areaServed: "ES",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "es-ES",
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE.url}/${opts.slug}/`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "ES",
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  modified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    inLanguage: "es-ES",
    datePublished: opts.date,
    dateModified: opts.modified,
    // Imagen obligatoria-recomendada por Google: fallback al OG del sitio.
    image: [opts.image ? abs(opts.image) : `${SITE.url}/opengraph-image`],
    mainEntityOfPage: `${SITE.url}/${opts.slug}/`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
