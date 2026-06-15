"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import LeadCta from "./LeadCta";
import { SERVICES } from "@/lib/site";
import { type Project, normalizeProjects } from "@/lib/projects";

function serviceTitle(slug: string): string {
  return SERVICES.find((s) => s.slug === slug)?.title ?? slug;
}

export default function ProjectDetail({
  initial,
  slug,
}: {
  initial: Project | null;
  slug: string;
}) {
  const [project, setProject] = useState<Project | null>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/data/projects.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        if (data) {
          const found = normalizeProjects(data).find((p) => p.slug === slug);
          if (found) setProject(found);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!project) {
    return (
      <Container className="py-24 text-center">
        <p className="text-gray-500">
          {loaded ? "Proyecto no encontrado." : "Cargando proyecto…"}
        </p>
        <Link href="/proyectos-web/" className="mt-4 inline-block font-semibold text-brand-text hover:underline">
          ← Ver todos los proyectos
        </Link>
      </Container>
    );
  }

  const p = project;

  return (
    <main>
      <Container className="py-12 sm:py-16">
        <Link href="/proyectos-web/" className="text-sm font-semibold text-brand-text hover:underline">
          ← Proyectos
        </Link>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Logo sobre el fondo, sin caja */}
          <div className="flex items-center justify-center py-4">
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={`Proyecto ${p.title}`} className="max-h-48 w-auto object-contain" />
            )}
          </div>

          {/* Cabecera */}
          <div>
            <div className="flex flex-wrap gap-2">
              {(p.servicios ?? []).map((s) => (
                <Link
                  key={s}
                  href={`/${s}/`}
                  className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-brand/20"
                >
                  {serviceTitle(s)}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{p.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">{p.description}</p>

            {(p.tags ?? []).length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{t}</span>
                ))}
              </div>
            )}

            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-block rounded-full bg-gradient-to-r from-brand to-accent px-6 py-3 font-semibold text-ink transition-transform hover:scale-105"
              >
                Visitar la web →
              </a>
            )}
          </div>
        </div>

        {/* Contenido dinámico por bloques */}
        {(p.blocks ?? []).length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl space-y-8">
            {p.blocks!.map((b, i) => {
              if (b.type === "heading") {
                return <h2 key={i} className="text-2xl font-extrabold text-ink sm:text-3xl">{b.text}</h2>;
              }
              if (b.type === "text") {
                return <div key={i} className="wp-content" dangerouslySetInnerHTML={{ __html: b.html }} />;
              }
              if (b.type === "quote") {
                return (
                  <blockquote key={i} className="border-l-4 border-brand pl-5 text-lg italic text-gray-700">
                    <p>{b.text}</p>
                    {b.author && <cite className="mt-2 block text-sm font-semibold not-italic text-gray-500">— {b.author}</cite>}
                  </blockquote>
                );
              }
              if (b.type === "image") {
                return (
                  <figure key={i} className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.url} alt={b.alt ?? p.title} className="w-full rounded-2xl border border-gray-200" loading="lazy" />
                    {b.caption && <figcaption className="text-center text-sm text-gray-500">{b.caption}</figcaption>}
                  </figure>
                );
              }
              // image_text
              return (
                <div key={i} className={`grid items-center gap-6 sm:grid-cols-2 ${b.side === "right" ? "" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.url} alt={b.alt ?? p.title} className={`w-full rounded-2xl border border-gray-200 ${b.side === "right" ? "sm:order-2" : ""}`} loading="lazy" />
                  <div className="wp-content" dangerouslySetInnerHTML={{ __html: b.html }} />
                </div>
              );
            })}
          </div>
        )}

        {/* Cuerpo legacy (si no hay bloques) */}
        {!(p.blocks ?? []).length && p.body && (
          <div className="wp-content mx-auto mt-12 max-w-3xl" dangerouslySetInnerHTML={{ __html: p.body }} />
        )}

        {/* Galería opcional */}
        {(p.gallery ?? []).length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {p.gallery!.map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={g} alt={`${p.title} ${i + 1}`} className="w-full rounded-2xl border border-gray-200" loading="lazy" />
            ))}
          </div>
        )}
      </Container>

      <LeadCta
        title="¿Quieres algo así para tu negocio?"
        subtitle={`Nos encantaría construir tu proyecto como hicimos con ${p.title}. Cuéntanos qué tienes en mente.`}
        context={`Proyecto: ${p.title}`}
        submitLabel="Quiero mi proyecto"
        messagePlaceholder="Describe la web o el sistema que tienes en mente…"
      />
    </main>
  );
}
