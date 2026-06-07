"use client";

import { useState } from "react";
import { motion } from "motion/react";
import PhoneFrame from "./PhoneFrame";

export default function AppDemo() {
  const [items, setItems] = useState([
    { name: "Camiseta básica", stock: 12, active: true },
    { name: "Pantalón chino", stock: 3, active: true },
    { name: "Zapatos piel", stock: 0, active: false },
  ]);

  function setStock(i: number, d: number) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, stock: Math.max(0, it.stock + d) } : it)));
  }
  function toggle(i: number) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, active: !it.active } : it)));
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-gray-50">
        <div className="bg-ink px-4 pb-3 pt-7 text-white">
          <p className="text-xs text-white/60">Tu tienda</p>
          <h4 className="text-base font-bold">Gestión de productos</h4>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden p-3">
          {items.map((it, i) => (
            <div key={it.name} className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{it.name}</span>
                <button
                  onClick={() => toggle(i)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${it.active ? "bg-brand" : "bg-gray-300"}`}
                  aria-label="Publicar"
                >
                  <motion.span
                    layout
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white"
                    animate={{ left: it.active ? 18 : 2 }}
                  />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs ${it.stock === 0 ? "text-red-500" : "text-gray-500"}`}>
                  {it.stock === 0 ? "Sin stock" : `${it.stock} en stock`}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setStock(i, -1)} className="h-6 w-6 rounded-full bg-gray-100 font-bold text-ink">−</button>
                  <motion.span key={it.stock} initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="w-5 text-center text-sm font-semibold text-ink">
                    {it.stock}
                  </motion.span>
                  <button onClick={() => setStock(i, 1)} className="h-6 w-6 rounded-full bg-brand font-bold text-ink">+</button>
                </div>
              </div>
            </div>
          ))}
          <p className="px-1 pt-1 text-[10px] text-gray-400">Demo interactivo — prueba a tocar los botones.</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
