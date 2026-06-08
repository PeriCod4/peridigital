"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";

const CONSENT_KEY = "cd-cookie-consent";
let loaded = false;

function loadGA() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`;
  document.head.appendChild(s);

  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", SITE.gaId, { anonymize_ip: true });
}

export default function Analytics() {
  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === "accepted") loadGA();
    } catch {
      /* ignore */
    }
    const onConsent = () => loadGA();
    window.addEventListener("cd-consent-accepted", onConsent);
    return () => window.removeEventListener("cd-consent-accepted", onConsent);
  }, []);

  return null;
}
