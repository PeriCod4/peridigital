"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TiltCard from "./motion/TiltCard";
import { PROJECTS } from "@/lib/projects-data";

export default function ProjectsGrid() {
  const tags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tipologia.forEach((t) => set.add(t)));
    return ["Todos", ...[...set].sort()];
  }, []);

  const [filter, setFilter] = useState("Todos");
  const visible = PROJECTS.filter(
    (p) => filter === "Todos" || p.tipologia.includes(filter),
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === t ? "bg-ink text-white" : "bg-gray-100 text-ink hover:bg-brand/15"
            }`}
            aria-pressed={filter === t}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex h-20 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`Proyecto ${p.title}`} className="max-h-16 w-auto object-contain" loading="lazy" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-ink">{p.title}</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tipologia.map((t) => (
                    <span key={t} className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-ink">{t}</span>
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {p.description.slice(0, 220)}
                  {p.description.length > 220 ? "…" : ""}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
