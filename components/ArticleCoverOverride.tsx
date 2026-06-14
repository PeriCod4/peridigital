"use client";

import { useEffect, useState } from "react";

// Lee /data/article-images.json (editable desde el panel admin) y, si hay una
// portada definida para este artículo, la muestra/reemplaza en runtime. No bloquea
// el render ni rompe el HTML estático.
export default function ArticleCoverOverride({
  slug,
  hasServerCover,
  alt,
}: {
  slug: string;
  hasServerCover: boolean;
  alt: string;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/data/article-images.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        const url = data[slug];
        if (!url || typeof url !== "string") return;
        if (hasServerCover) {
          // Ya hay portada del build: reemplazar su src.
          const sel = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(slug) : slug.replace(/["\\]/g, "\\$&");
          const el = document.querySelector<HTMLImageElement>(`img[data-cover="${sel}"]`);
          if (el) el.src = url;
        } else {
          setSrc(url);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug, hasServerCover]);

  // Si el build ya trae portada, no renderizamos nada (solo swap por DOM arriba).
  if (hasServerCover || !src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="mt-8 w-full rounded-xl" />;
}
