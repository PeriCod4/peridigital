"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

// Destino del formulario (FormSubmit, sin backend). Requiere una confirmación
// inicial por email la primera vez (se envía al activar).
const ENDPOINT = "https://formsubmit.co/ajax/pablocamperosub@gmail.com";

export default function ContactForm() {
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
      _subject: "Nuevo contacto desde camperodigital.com",
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

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-brand/10 p-8 text-center">
        <p className="text-lg font-semibold text-ink">¡Gracias! Te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* honeypot anti-spam de FormSubmit */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">Nombre</label>
        <input id="name" name="name" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input id="email" name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">Cuéntanos tu proyecto</label>
        <textarea id="message" name="message" rows={5} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">No se pudo enviar. Inténtalo de nuevo o escríbenos a pablo@camperodigital.com.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="rounded-full bg-brand px-7 py-3 font-semibold text-ink transition-colors hover:bg-brand-dark disabled:opacity-60">
        {status === "sending" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
