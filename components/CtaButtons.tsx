import Link from "next/link";
import Magnetic from "./fx/Magnetic";

// Par de CTAs como en la home: principal (gradiente) + secundario (outline).
export default function CtaButtons({ center = true }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${center ? "items-center justify-center" : ""}`}>
      <Magnetic>
        <Link
          href="/hablemos/"
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-accent px-7 py-3.5 font-bold text-ink shadow-xl shadow-brand/30 transition-all hover:shadow-brand/50"
        >
          Agenda una reunión
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </Magnetic>
      <Magnetic>
        <Link
          href="/proyectos-web/"
          className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-bold text-ink shadow-sm transition-all hover:border-brand"
        >
          Ver proyectos
        </Link>
      </Magnetic>
    </div>
  );
}
