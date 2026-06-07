"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const STEPS = [
  { icon: "🛒", title: "Carrito abandonado", sub: "El cliente se va sin comprar" },
  { icon: "⏱️", title: "Espera 1 hora", sub: "Trigger automático" },
  { icon: "✉️", title: "Email personalizado", sub: "“¿Te lo pensaste mejor?” -10%" },
  { icon: "📲", title: "Recordatorio SMS", sub: "Si no abre en 24h" },
  { icon: "✅", title: "Venta recuperada", sub: "Vuelve y compra" },
];

export default function AutomationDemo() {
  const [active, setActive] = useState(0);
  const [recovered, setRecovered] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % STEPS.length;
        if (next === STEPS.length - 1) setRecovered((r) => r + 1);
        return next;
      });
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold text-ink">Flujo: recuperación de carrito</span>
        <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-ink">
          {recovered} ventas recuperadas
        </span>
      </div>
      <div className="space-y-2">
        {STEPS.map((s, i) => {
          const on = i <= active;
          return (
            <div key={s.title}>
              <motion.div
                animate={{
                  backgroundColor: i === active ? "rgba(62,204,203,0.15)" : "rgba(0,0,0,0)",
                  borderColor: on ? "#3ecccb" : "#e5e7eb",
                }}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <motion.span
                  animate={{ scale: i === active ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-lg"
                >
                  {s.icon}
                </motion.span>
                <div>
                  <div className={`text-sm font-semibold ${on ? "text-ink" : "text-gray-400"}`}>{s.title}</div>
                  <div className="text-xs text-gray-400">{s.sub}</div>
                </div>
                {on && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-brand"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
              {i < STEPS.length - 1 && (
                <div className="ml-[1.45rem] h-3 w-px bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
