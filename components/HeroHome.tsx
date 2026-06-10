"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import Button from "./Button";

const WORDS = ["clientes", "ventas", "resultados", "crecimiento"];

export default function HeroHome() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative z-10 px-6 pt-32 pb-20 text-center sm:pt-40">
      <Container className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="text-xs font-medium text-gray-600">Agencia digital 360</span>
        </motion.div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-6xl lg:text-7xl">
          Convertimos lo digital en
          <br />
          <span className="relative inline-block min-h-[1.15em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[i]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
                className="text-gradient inline-block"
              >
                {WORDS[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
          Diseño web y ecommerce, software a medida, paid media, CRM y automatización.
          Somos tu equipo de marketing digital, no una agencia más.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/hablemos/" withArrow>
            Agenda una reunión
          </Button>
          <Button href="/proyectos-web/" variant="outline">
            Ver proyectos
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium text-gray-500">
          {["Sin permanencias", "Partners, no agencia", "Resultados medibles"].map((b) => (
            <span key={b} className="flex items-center gap-2">
              <span className="text-brand-text">✓</span> {b}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
