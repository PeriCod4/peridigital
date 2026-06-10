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
        <Link href="/" className="flex items-center gap-2" aria-label="Campero Digital — inicio">
          <Image
            src="/brand/icon_campero_digital_blanco.webp"
            alt="Campero Digital"
            width={40}
            height={29}
            priority
          />
          <span className="text-lg font-extrabold tracking-tight text-white">
            Campero <span className="text-brand">Digital</span>
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

        {/* Botón hamburguesa mobile */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-mr-1 p-1 text-white lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer lateral mobile */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col bg-ink shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="text-base font-extrabold tracking-tight text-white">
            Campero <span className="text-brand">Digital</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1 text-white/80 transition-colors hover:text-brand"
            aria-label="Cerrar menú"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {/* Servicios (acordeón) */}
          <button
            type="button"
            onClick={() => setMobileServices((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold text-white transition-colors hover:bg-white/5"
            aria-expanded={mobileServices}
          >
            Servicios
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-white transition-colors hover:bg-white/5 hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/hablemos/"
            onClick={() => setOpen(false)}
            className={buttonClasses("primary", "md", true)}
          >
            Hablemos
          </Link>
        </div>
      </aside>
    </header>
  );
}
