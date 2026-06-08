"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";

export default function CalendlyEmbed() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      className="calendly-inline-widget overflow-hidden rounded-2xl border border-gray-200"
      data-url={`${SITE.calendly}?hide_gdpr_banner=1&primary_color=3ecccb`}
      style={{ minWidth: "320px", height: "640px" }}
    />
  );
}
