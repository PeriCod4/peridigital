import type { Metadata } from "next";
import { SITE } from "./site";

// OpenGraph por defecto (refleja los de app/layout.tsx). Next 16 hace
// "shallow merge": si una página define openGraph, REEMPLAZA el del layout
// entero. Por eso cada página que quiera og:url propio debe re-emitir los
// campos comunes vía este helper, además del canonical.
const OG_TITLE = `${SITE.name} — Agencia digital 360`;
const OG_DESC =
  "Webs que venden, software a medida, CRM y automatización, SEO y mantenimiento.";

type OgOverrides = {
  title?: string;
  description?: string;
  type?: "website" | "article";
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

/**
 * Devuelve canonical + openGraph con `url` self (relativo, resuelto contra
 * metadataBase). Mantiene los campos OG del layout para que no se pierdan
 * en el merge superficial de Next.
 */
export function pageMeta(path: string, og: OgOverrides = {}): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: og.type ?? "website",
      locale: "es_ES",
      siteName: SITE.name,
      url: path,
      title: og.title ?? OG_TITLE,
      description: og.description ?? OG_DESC,
      // Re-declarar la imagen OG: Next 16 hace shallow merge, así que el
      // openGraph de una página hija REEMPLAZA el del layout y pierde la
      // imagen inyectada por app/opengraph-image.tsx. La volvemos a apuntar.
      images: og.images ?? [
        { url: "/opengraph-image", width: 1200, height: 630, alt: OG_TITLE, type: "image/png" },
      ],
    },
  };
}
