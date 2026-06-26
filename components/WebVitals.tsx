"use client";

import { useReportWebVitals } from "next/web-vitals";

// Mide rendimiento REAL en el navegador del visitante (no laboratorio).
// Incluye métricas propias de Next: Next.js-hydration, Next.js-route-change-to-render,
// Next.js-render — además de Core Web Vitals (LCP, CLS, INP, FCP, TTFB).
// - Log en consola SIEMPRE (para ver los números al instante en tu propio equipo).
// - Evento a GA4 solo si gtag ya está cargado (es decir, con consentimiento aceptado).
export default function WebVitals() {
  useReportWebVitals((metric) => {
    const value = Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value);

    // Consola: visible al instante en DevTools → Console
    // eslint-disable-next-line no-console
    console.log(`[web-vitals] ${metric.name}: ${value}${metric.name === "CLS" ? "" : " ms"}`, metric);

    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", metric.name, {
        event_category: "Web Vitals",
        value,
        metric_id: metric.id,
        metric_value: metric.value,
        metric_rating: metric.rating, // good | needs-improvement | poor
        non_interaction: true,
      });
    }
  });

  return null;
}
