import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "./fx/Magnetic";

export type ButtonVariant = "primary" | "outline" | "outlineDark";
export type ButtonSize = "sm" | "md";

const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-60 disabled:pointer-events-none";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand to-accent text-ink shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/50",
  outline: "border border-gray-300 bg-white text-ink shadow-sm hover:border-brand",
  outlineDark: "border border-white/30 text-white hover:border-brand hover:text-brand",
};

// Genera la cadena de clases del botón (para reutilizar en botones que no usan
// este componente, p. ej. CalendlyButton o el submit de los formularios).
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth = false,
): string {
  return [BASE, SIZES[size], VARIANTS[variant], fullWidth ? "w-full" : ""].join(" ").trim();
}

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  fullWidth?: boolean;
  /** Efecto magnético al pasar el cursor (solo enlaces). Por defecto activo. */
  magnetic?: boolean;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
}

// Botón canónico de la web. Estilo único en todas las páginas (estilo home).
export default function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  withArrow = false,
  fullWidth = false,
  magnetic = true,
  className = "",
}: LinkButtonProps) {
  const classes = `${buttonClasses(variant, size, fullWidth)} ${className}`.trim();
  const inner = (
    <>
      {children}
      {withArrow && <span className="transition-transform group-hover:translate-x-1">→</span>}
    </>
  );

  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );

  // Magnético solo si no es ancho completo (en banners/forms se ve mejor estático).
  if (magnetic && !fullWidth) return <Magnetic>{link}</Magnetic>;
  return link;
}
