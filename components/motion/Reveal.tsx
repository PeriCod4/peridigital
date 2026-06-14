"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

// Reveal por scroll SIN ocultar el contenido en SSR. El HTML se renderiza
// VISIBLE; la animación es solo una mejora que se aplica tras montar y únicamente
// a los elementos que aún están fuera de vista (así un scroll rápido en móvil
// nunca muestra la página en blanco, y no hay parpadeo en lo que ya se ve).
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: keyof typeof DIRECTIONS;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return; // ya visible al montar: dejarlo tal cual (sin flash)

    setHidden(true); // debajo del fold: ocultar y animar al entrar
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const off = DIRECTIONS[direction];
  const trans = `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
  let style: CSSProperties = {};
  if (hidden && !shown) {
    style = { opacity: 0, transform: `translate(${off.x}px, ${off.y}px)`, transition: trans, willChange: "opacity, transform" };
  } else if (hidden) {
    style = { opacity: 1, transform: "none", transition: trans };
  }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
