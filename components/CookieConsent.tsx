"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "cd-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
    // Aquí se cargaría la analítica solo si value === "accepted" (cuando se configure GA4).
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-white/10 bg-ink p-5 text-white shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-white/80">
          Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el
          tráfico. Puedes aceptarlas o rechazarlas. Más info en nuestra{" "}
          <Link href="/politica-de-cookies/" className="font-semibold text-brand hover:underline">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide("rejected")}
            className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/50"
          >
            Rechazar
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-dark"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
