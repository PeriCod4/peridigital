"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BrowserFrame from "./BrowserFrame";

const PRODUCTS = [
  { id: 1, name: "Zapatilla Runner", price: 89, emoji: "👟" },
  { id: 2, name: "Sudadera Premium", price: 49, emoji: "🧥" },
  { id: 3, name: "Gorra Classic", price: 19, emoji: "🧢" },
  { id: 4, name: "Mochila Urban", price: 65, emoji: "🎒" },
];

export default function EcommerceDemo() {
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [adding, setAdding] = useState<number | null>(null);

  function add(p: (typeof PRODUCTS)[number]) {
    setCart((c) => c + 1);
    setAdding(p.id);
    setToast(`${p.name} añadido`);
    setTimeout(() => setAdding(null), 400);
    setTimeout(() => setToast(null), 1600);
  }

  return (
    <BrowserFrame url="tutienda.com">
      <div className="bg-white">
        {/* topbar tienda */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <span className="text-sm font-extrabold text-ink">tu<span className="text-brand">tienda</span></span>
          <div className="relative">
            <motion.div
              key={cart}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-ink"
            >
              🛒 {cart}
            </motion.div>
          </div>
        </div>
        {/* grid productos */}
        <div className="grid grid-cols-2 gap-3 p-5">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="rounded-xl border border-gray-100 p-3">
              <div className="flex h-16 items-center justify-center rounded-lg bg-gray-50 text-3xl">{p.emoji}</div>
              <div className="mt-2 text-sm font-semibold text-ink">{p.name}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{p.price} €</span>
                <motion.button
                  onClick={() => add(p)}
                  whileTap={{ scale: 0.9 }}
                  animate={adding === p.id ? { backgroundColor: "#2bb3b2" } : {}}
                  className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-ink"
                >
                  + Añadir
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white shadow-lg"
            >
              ✓ {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}
