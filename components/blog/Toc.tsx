"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/wp";

export default function Toc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  function go(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Índice del artículo" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        En este artículo
      </p>
      <ul className="space-y-1.5 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
            <a
              href={`#${h.id}`}
              onClick={(e) => go(e, h.id)}
              className={`-ml-px block border-l-2 py-1 pl-3 transition-colors ${
                active === h.id
                  ? "border-brand font-semibold text-brand-text"
                  : "border-transparent text-gray-500 hover:text-ink"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
