"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Container from "./Container";
import Aurora from "./Aurora";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Aurora />
      <Container className="relative py-28 sm:py-36">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Agencia de marketing digital 360
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-4xl text-5xl font-extrabold leading-[1.05] sm:text-7xl"
          >
            Páginas web que{" "}
            <span className="text-gradient">venden</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-white/75"
          >
            Soluciones a medida para lo que TU negocio necesita: diseño web,
            ecommerce, paid media, SEO y software propio.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/hablemos/"
                className="inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-ink shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
              >
                Hablemos
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/proyectos-web/"
                className="inline-block rounded-full border border-white/25 px-8 py-3.5 font-semibold text-white transition-colors hover:border-brand hover:text-brand"
              >
                Ver proyectos
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* indicador de scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
