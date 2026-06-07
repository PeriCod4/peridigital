"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const BARS = 40;

export default function UptimeDemo() {
  const [bars, setBars] = useState<boolean[]>(() => Array(BARS).fill(true));
  const [ping, setPing] = useState(42);

  useEffect(() => {
    const t = setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        // 1 de cada ~25 ticks un mini incidente (amarillo)
        next.push(Math.random() > 0.04);
        return next;
      });
      setPing(38 + Math.floor(Math.random() * 18));
    }, 700);
    return () => clearInterval(t);
  }, []);

  const uptime = ((bars.filter(Boolean).length / BARS) * 100).toFixed(1);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-sm font-bold text-ink">tudominio.com</span>
        </div>
        <span className="text-xs text-gray-400">{ping} ms</span>
      </div>
      <div className="mt-4 flex h-12 items-end gap-0.5">
        {bars.map((ok, i) => (
          <motion.div
            key={i}
            layout
            className={`flex-1 rounded-sm ${ok ? "bg-brand" : "bg-yellow-400"}`}
            style={{ height: ok ? "100%" : "55%" }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Disponibilidad</span>
        <span className="font-bold text-brand-dark">{uptime}%</span>
      </div>
      <p className="mt-2 text-xs text-gray-400">Monitorización 24/7 incluida en mantenimiento.</p>
    </div>
  );
}
