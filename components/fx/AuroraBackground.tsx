"use client";

import { useEffect, useRef } from "react";

// Fondo aurora global: 4 manchas que se animan solas y siguen al ratón,
// cada una con su propio factor/velocidad. Respeta prefers-reduced-motion.
const BLOBS = [
  { cls: "aurora-b1", fx: 300, fy: 210, ease: 0.14 },
  { cls: "aurora-b2", fx: -230, fy: 170, ease: 0.09 },
  { cls: "aurora-b3", fx: 190, fy: -260, ease: 0.17 },
  { cls: "aurora-b4", fx: -170, fy: -150, ease: 0.11 },
];

export default function AuroraBackground() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const els = BLOBS.map((b) => el.querySelector<HTMLElement>("." + b.cls)).filter(Boolean) as HTMLElement[];
    const cur = els.map(() => ({ x: 0, y: 0 }));
    const tgt = els.map(() => ({ x: 0, y: 0 }));
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      BLOBS.forEach((b, i) => { tgt[i].x = nx * b.fx; tgt[i].y = ny * b.fy; });
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      let moving = false;
      els.forEach((blob, i) => {
        const ease = BLOBS[i].ease;
        cur[i].x += (tgt[i].x - cur[i].x) * ease;
        cur[i].y += (tgt[i].y - cur[i].y) * ease;
        blob.style.setProperty("--bx", `${cur[i].x.toFixed(1)}px`);
        blob.style.setProperty("--by", `${cur[i].y.toFixed(1)}px`);
        if (Math.abs(tgt[i].x - cur[i].x) > 0.3 || Math.abs(tgt[i].y - cur[i].y) > 0.3) moving = true;
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="aurora-bg" aria-hidden="true" ref={root}>
      <div className="aurora-blob aurora-b1"><i /></div>
      <div className="aurora-blob aurora-b2"><i /></div>
      <div className="aurora-blob aurora-b3"><i /></div>
      <div className="aurora-blob aurora-b4"><i /></div>
    </div>
  );
}
