"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";

type Status = "idle" | "sending" | "ok" | "error";

const ENDPOINT = "https://formsubmit.co/ajax/pablocamperosub@gmail.com";

export interface LeadCtaProps {
  /** Título adaptado al contenido de la página */
  title: string;
  /** Subtítulo / gancho */
  subtitle: string;
  /** Origen (aparece en el asunto del email para saber de qué página viene) */
  context: string;
  /** Texto del botón de envío */
  submitLabel?: string;
  /** Placeholder del campo mensaje, adaptado al servicio */
  messagePlaceholder?: string;
  /** Botón secundario opcional (p. ej. enlace a PeriSEO) */
  secondary?: { label: string; href: string; external?: boolean };
}

// Banner CTA único por página, adaptado al contenido, con formulario integrado.
export default function LeadCta({
  title,
  subtitle,
  context,
  submitLabel = "Enviar",
  messagePlaceholder = "Cuéntanos qué necesitas…",
  secondary,
}: LeadCtaProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      origen: context,
      _subject: `Nuevo contacto · ${context}`,
      _template: "table",
      _captcha: "false",
      _honey: String(data.get("_honey") || ""),
    };
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (res.ok && (json.success === "true" || json.success === true)) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative z-10 py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 to-accent/10 p-8 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Texto adaptado */}
            <div>
              <h2 className="max-w-xl text-3xl font-extrabold text-ink sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-md text-lg text-gray-600">{subtitle}</p>
              {secondary && (
                <div className="mt-7">
                  {secondary.external ? (
                    <a
                      href={secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-semibold text-ink transition-colors hover:border-brand"
                    >
                      {secondary.label} →
                    </a>
                  ) : (
                    <Link
                      href={secondary.href}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-semibold text-ink transition-colors hover:border-brand"
                    >
                      {secondary.label} →
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Formulario */}
            <div className="rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur sm:p-7">
              {status === "ok" ? (
                <div className="flex h-full min-h-[16rem] flex-col items-center justify-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-2xl text-ink">✓</span>
                  <p className="mt-4 text-lg font-semibold text-ink">¡Gracias! Te respondemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      required
                      placeholder="Nombre"
                      aria-label="Nombre"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      aria-label="Email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                    />
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={messagePlaceholder}
                    aria-label="Mensaje"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                  />
                  {status === "error" && (
                    <p className="text-sm text-red-600">No se pudo enviar. Escríbenos a pablo@camperodigital.com.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-gradient-to-r from-brand to-accent px-7 py-3 font-bold text-ink shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === "sending" ? "Enviando…" : submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
