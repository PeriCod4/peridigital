"use client";

import { useState } from "react";

// Logo de proyecto: si hay imagen y carga, la muestra; si falta o falla la carga,
// muestra el nombre del proyecto estilizado (degradado de marca, cursiva).
// Sustituye al parche onerror+span que estaba sólo en el HTML desplegado.
export default function ProjectLogo({
  image,
  title,
  imgClass = "",
  textClass = "text-2xl",
}: {
  image?: string;
  title: string;
  imgClass?: string;
  textClass?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={`Proyecto ${title}`}
        className={imgClass}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className={`bg-gradient-to-r from-brand to-accent bg-clip-text font-extrabold italic text-transparent ${textClass}`}>
      {title}
    </span>
  );
}
