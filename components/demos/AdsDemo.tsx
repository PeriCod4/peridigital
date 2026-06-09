"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const CAMPAIGNS = [
  { name: "Meta Ads", icon: "📱", color: "#3ecccb", target: 92 },
  { name: "Google Ads", icon: "🔍", color: "#02bdff", target: 78 },
];

function useGrow(target: number, run: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let cur = 0;
    const t = setInterval(() => {
      cur += 3;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      setV(cur);
    }, 40);
    return () => clearInterval(t);
  }, [run, target]);
  return v;
}

function Bar({ c, run }: { c: (typeof CAMPAIGNS)[number]; run: boolean }) {
  const pct = useGrow(c.target, run);
  const conv = Math.round((pct / 100) * 134);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-semibold text-ink">
          <span>{c.icon}</span> {c.name}
        </span>
        <span className="text-gray-500">{conv} conversiones</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full"
          style={{ background: c.color, width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AdsDemo() {
  const [run, setRun] = useState(false);
  const roas = useGrow(420, run); // 4.2x
  useEffect(() => {
    const t = setTimeout(() => setRun(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold text-ink">Rendimiento de campañas</span>
        <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-ink">
          ROAS {(roas / 100).toFixed(1)}x
        </span>
      </div>
      <div className="space-y-4">
        {CAMPAIGNS.map((c) => (
          <Bar key={c.name} c={c} run={run} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-center">
        <div>
          <div className="text-lg font-extrabold text-ink">−38%</div>
          <div className="text-[11px] text-gray-400">coste/lead</div>
        </div>
        <div>
          <div className="text-lg font-extrabold text-ink">×2,3</div>
          <div className="text-[11px] text-gray-400">conversiones</div>
        </div>
        <div>
          <div className="text-lg font-extrabold text-brand-text">+CRO</div>
          <div className="text-[11px] text-gray-400">optimización</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">Ejemplo ilustrativo de optimización de campañas.</p>
    </div>
  );
}
