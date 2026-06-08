"use client";

import { useEffect, useCallback } from "react";
import { SITE } from "@/lib/site";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string; pageSettings?: Record<string, string> }) => void;
    };
  }
}

export default function CalendlyButton({
  className = "",
  label = "Reservar un hueco",
}: {
  className?: string;
  label?: string;
}) {
  useEffect(() => {
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const l = document.createElement("link");
      l.id = cssId;
      l.rel = "stylesheet";
      l.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(l);
    }
    const jsId = "calendly-widget-js";
    if (!document.getElementById(jsId)) {
      const s = document.createElement("script");
      s.id = jsId;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const open = useCallback(() => {
    window.Calendly?.initPopupWidget({
      url: `${SITE.calendly}?hide_gdpr_banner=1`,
      pageSettings: {
        backgroundColor: "ffffff",
        primaryColor: "3ecccb",
        textColor: "1b1f24",
      },
    });
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className={
        className ||
        "rounded-full bg-brand px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
      }
    >
      {label}
    </button>
  );
}
