"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "./nav";
import { SERVICES } from "@/lib/site";
import { buttonClasses } from "./Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  // Bloquear scroll del body cuando el drawer está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = NAV_LINKS.filter((l) => l.href !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="PeriDigital — inicio">
          <Image
            src="/brand/icon_peridigital_blanco.webp"
            alt="PeriDigital"
            width={40}
            height={29}
            priority
          />
          <span className="text-lg font-extrabold tracking-tight text-white">
            Peri<span className="text-brand">Digital</span>
          </span>
        </Link>

        {/* Navegación desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="nav-underline text-sm font-medium text-white/80 transition-colors hover:text-brand">
              Servicios
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <ul className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}/`}
                        className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-brand/10"
                      >
                        <span className="block text-sm font-semibold text-ink">{s.nav}</span>
                        <span className="block text-xs text-gray-500">{s.short}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-underline text-sm font-medium text-white/80 transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link href="/hablemos/" className={buttonClasses("primary", "sm")}>
            Hablemos
          </Link>
        </div>

        {/* Botón menú mobile — icono animado (morph hamburguesa↔X, estilo Apple) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 -mr-1 flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${open ? "top-1/2 -translate-y-1/2 rotate-[225deg]" : "top-0"}`} />
            <span className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${open ? "bottom-1/2 translate-y-1/2 -rotate-[225deg]" : "bottom-0"}`} />
          </span>
        </button>
      </nav>

      {/* Menú mobile a pantalla completa que se despliega hacia abajo */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink transition-[transform,opacity] duration-300 ease-out lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* hueco bajo la barra del header (que se queda tal cual encima) */}
        <div className="h-[60px] shrink-0" />

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {/* Servicios (acordeón) */}
          <button
            type="button"
            onClick={() => setMobileServices((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-white transition-colors hover:bg-white/5"
            aria-expanded={mobileServices}
          >
            Servicios
            <svg
              width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${mobileServices ? "max-h-[40rem]" : "max-h-0"}`}>
            <ul className="space-y-0.5 pb-2 pl-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}/`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-brand"
                  >
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-3 border-t border-white/10" />

          <ul className="space-y-0.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/5 hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-5">
          <Link
            href="/hablemos/"
            onClick={() => setOpen(false)}
            className={buttonClasses("primary", "md", true)}
          >
            Hablemos
          </Link>
        </div>
      </div>
    </header>
  );
}
