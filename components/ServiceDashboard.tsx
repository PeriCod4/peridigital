"use client";

import { motion } from "motion/react";
import BrowserFrame from "./demos/BrowserFrame";

export interface DashMetric {
  label: string;
  value: string;
  tone?: "brand" | "accent" | "green" | "ink";
}
export interface DashPhase {
  name: string;
  status: "done" | "current" | "todo";
}
export interface DashboardData {
  project?: string;
  progress: number; // 0-100
  metrics: DashMetric[];
  phases: DashPhase[];
}

const TONE: Record<string, string> = {
  brand: "text-brand-text",
  accent: "text-accent",
  green: "text-emerald-500",
  ink: "text-ink",
};

export default function ServiceDashboard({ data }: { data: DashboardData }) {
  return (
    <BrowserFrame url="panel.camperodigital.com">
      <div className="bg-white p-5">
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400">Tu proyecto</p>
            <p className="text-sm font-bold text-ink">{data.project ?? "Proyecto"}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-[11px] font-semibold text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            En tiempo real
          </span>
        </div>

        {/* Progreso global */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-gray-500">Avance del proyecto</span>
            <span className="font-bold text-ink">{data.progress}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
              initial={{ width: "0%" }}
              whileInView={{ width: `${data.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Métricas */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {data.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-xl border border-gray-100 bg-gray-50/60 p-3"
            >
              <p className="text-[11px] text-gray-400">{m.label}</p>
              <p className={`text-xl font-extrabold ${TONE[m.tone ?? "ink"]}`}>{m.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Fases */}
        <div className="mt-4 space-y-1.5">
          {data.phases.map((p) => (
            <div key={p.name} className="flex items-center gap-2.5 text-xs">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  p.status === "done"
                    ? "bg-brand text-ink"
                    : p.status === "current"
                      ? "bg-accent/15 text-accent ring-2 ring-accent/40"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {p.status === "done" ? "✓" : p.status === "current" ? "•" : ""}
              </span>
              <span
                className={
                  p.status === "todo"
                    ? "text-gray-400"
                    : p.status === "current"
                      ? "font-semibold text-ink"
                      : "text-gray-600"
                }
              >
                {p.name}
              </span>
              {p.status === "current" && (
                <span className="ml-auto text-[10px] font-semibold text-accent">en curso</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
