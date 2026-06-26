"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Chat y WhatsApp no son críticos para la primera pintura ni la interacción inicial.
// Los cargamos como chunks aparte y solo cuando el navegador está ocioso, para no
// competir con la hidratación inicial (baja TBT/TTI, sobre todo en móvil).
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("./WhatsAppFloat"), { ssr: false });

export default function DeferredWidgets() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cb = () => setShow(true);
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(cb, { timeout: 3000 });
    } else {
      setTimeout(cb, 1500);
    }
  }, []);

  if (!show) return null;
  return (
    <>
      <WhatsAppFloat />
      <ChatWidget />
    </>
  );
}
