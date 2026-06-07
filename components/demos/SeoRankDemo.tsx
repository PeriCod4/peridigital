"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const KEYWORDS = [
  { kw: "diseño web ecommerce", from: 28, to: 2 },
  { kw: "software a medida", from: 41, to: 5 },
  { kw: "crm para tiendas online", from: 35, to: 3 },
  { kw: "agencia digital", from: 52, to: 8 },
];

function useCountdown(from: number, to: number, run: boolean) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!run) return;
    setV(from);
    const t = setInterval(() => {
      setV((c) => {
        if (c <= to) {
          clearInterval(t);
          return to;
        }
        return c - 1;
      });
    }, 70);
    return () => clearInterval(t);
  }, [run, from, to]);
  return v;
}

function Row({ kw, from, to, run }: { kw: string; from: number; to: number; run: boolean }) {
  const pos = useCountdown(from, to, run);
  const pct = Math.max(4, 100 - (pos / 60) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-44 truncate text-sm text-gray-600">{kw}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={{ width: "4%" }}
          animate={{ width: run ? `${pct}%` : "4%" }}
          transition={{ duration: 2.8, ease: "easeOut" }}
        />
      </div>
      <span className={`w-14 text-right text-sm font-bold ${pos <= 3 ? "text-brand-dark" : "text-ink"}`}>
        #{pos}
      </span>
    </div>
  );
}

export default function SeoRankDemo() {
  const [run, setRun] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRun(true), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold text-ink">Posiciones en Google</span>
        <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-ink">
          ▲ tráfico orgánico
        </span>
      </div>
      <div className="space-y-4">
        {KEYWORDS.map((k) => (
          <Row key={k.kw} kw={k.kw} from={k.from} to={k.to} run={run} />
        ))}
      </div>
      <p className="mt-5 text-xs text-gray-400">
        Ejemplo ilustrativo de evolución de posicionamiento con PeriSEO.
      </p>
    </div>
  );
}
