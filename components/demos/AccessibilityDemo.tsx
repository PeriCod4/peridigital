"use client";

import { useState } from "react";

export default function AccessibilityDemo() {
  const [pos, setPos] = useState(50);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
      <div className="relative overflow-hidden rounded-xl">
        {/* Después (accesible) - fondo */}
        <div className="bg-white p-6">
          <span className="inline-block rounded-full bg-brand/15 px-2 py-0.5 text-xs font-semibold text-brand-text">
            Accesible ✓
          </span>
          <h4 className="mt-3 text-xl font-bold text-ink">Reserva tu cita hoy</h4>
          <p className="mt-2 text-base text-gray-700">
            Texto con contraste AA, tamaño legible y botón claro.
          </p>
          <button className="mt-3 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white">
            Reservar ahora
          </button>
        </div>
        {/* Antes (inaccesible) - recortado */}
        <div
          className="absolute inset-0 bg-gray-100 p-6"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <span className="inline-block rounded-full bg-gray-200 px-2 py-0.5 text-[10px] text-gray-400">
            Sin accesibilidad ✕
          </span>
          <h4 className="mt-3 text-base font-bold text-gray-300">Reserva tu cita hoy</h4>
          <p className="mt-2 text-[11px] text-gray-300">
            Texto gris claro, pequeño y de bajo contraste, difícil de leer.
          </p>
          <button className="mt-3 rounded-lg bg-gray-200 px-3 py-1.5 text-[11px] text-gray-300">
            Reservar ahora
          </button>
        </div>
        {/* línea divisoria */}
        <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="h-full w-0.5 -translate-x-1/2 bg-brand" />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="mt-4 w-full accent-brand"
        aria-label="Comparar antes y después de accesibilidad"
      />
      <p className="mt-2 text-center text-xs text-gray-400">
        ◀ Arrastra para comparar: sin accesibilidad / accesible ▶
      </p>
    </div>
  );
}
