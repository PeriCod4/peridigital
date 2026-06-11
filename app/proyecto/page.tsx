import type { Metadata } from "next";
import { Suspense } from "react";
import ProyectoClient from "./ProyectoClient";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Proyecto",
  // Ruta de respaldo para proyectos nuevos (sin página estática aún): noindex,
  // el contenido canónico vive en /proyectos/<slug>/.
  robots: { index: false, follow: true },
  ...pageMeta("/proyecto/"),
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProyectoClient />
    </Suspense>
  );
}
