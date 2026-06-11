"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import TiltCard from "./motion/TiltCard";
import { PROJECTS } from "@/lib/projects-data";
import {
  type Project,
  normalizeProjects,
  publishedSorted,
  servicesWithProjects,
  projectHref,
} from "@/lib/projects";

export default function ProjectsGrid() {
  // Fallback inmediato = proyectos embebidos en build; luego se refresca del JSON editable.
  const [projects, setProjects] = useState<Project[]>(() => publishedSorted(PROJECTS));
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    let alive = true;
    fetch("/data/projects.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        const norm = publishedSorted(normalizeProjects(data));
        if (norm.length) setProjects(norm);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const services = useMemo(() => servicesWithProjects(projects), [projects]);
  const visible = projects.filter(
    (p) => filter === "todos" || (p.servicios ?? []).includes(filter),
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("todos")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            filter === "todos" ? "bg-ink text-white" : "bg-gray-100 text-ink hover:bg-brand/15"
          }`}
          aria-pressed={filter === "todos"}
        >
          Todos
        </button>
        {services.map((s) => (
          <button
            key={s.slug}
            onClick={() => setFilter(s.slug)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === s.slug ? "bg-ink text-white" : "bg-gray-100 text-ink hover:bg-brand/15"
            }`}
            aria-pressed={filter === s.slug}
          >
            {s.nav}
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
              <Link href={projectHref(p.slug)} className="block h-full">
                <TiltCard className="spotlight flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-20 items-center">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={`Proyecto ${p.title}`} className="max-h-16 w-auto object-contain" loading="lazy" />
                    )}
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-ink">{p.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(p.tags ?? []).map((t) => (
                      <span key={t} className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-ink">{t}</span>
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {p.description.slice(0, 180)}
                    {p.description.length > 180 ? "…" : ""}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-text">Ver proyecto →</span>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
