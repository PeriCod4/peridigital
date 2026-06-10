"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export interface BlogTerm {
  name: string;
  slug: string;
}
export interface BlogListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl?: string;
  coverAlt?: string;
  date: string;
  categories: BlogTerm[];
  tags: BlogTerm[];
}

function strip(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&hellip;/g, "…").replace(/&[a-z#0-9]+;/g, " ").trim();
}

function uniqueTerms(items: BlogListItem[], key: "categories" | "tags") {
  const map = new Map<string, { term: BlogTerm; count: number }>();
  for (const it of items) {
    for (const t of it[key]) {
      if (!t.slug) continue;
      const e = map.get(t.slug);
      if (e) e.count++;
      else map.set(t.slug, { term: t, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export default function BlogExplorer({ items }: { items: BlogListItem[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  // Filtros iniciales desde la URL (?tag= / ?cat= / ?q=)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("tag");
    const c = sp.get("cat");
    const q = sp.get("q");
    if (t) setTag(t);
    if (c) setCat(c);
    if (q) setQuery(q);
  }, []);

  const categories = useMemo(() => uniqueTerms(items, "categories"), [items]);
  const tags = useMemo(() => uniqueTerms(items, "tags"), [items]);

  const filtered = useMemo(() => {
    const q = strip(query).toLowerCase();
    return items.filter((it) => {
      if (cat && !it.categories.some((c) => c.slug === cat)) return false;
      if (tag && !it.tags.some((t) => t.slug === tag)) return false;
      if (q) {
        const hay = (strip(it.title) + " " + strip(it.excerpt)).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, query, cat, tag]);

  const visibleTags = showAllTags ? tags : tags.slice(0, 16);
  const hasFilters = cat || tag || query;

  return (
    <div className="lg:grid lg:grid-cols-[1fr_18rem] lg:gap-12">
      {/* Resultados */}
      <div className="order-2 lg:order-1">
        <div className="mb-6 text-sm text-gray-500">
          {filtered.length} de {items.length} artículos
          {hasFilters && (
            <button
              onClick={() => { setQuery(""); setCat(null); setTag(null); }}
              className="ml-3 font-semibold text-brand-text hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl bg-gray-50 p-8 text-center text-gray-500">
            No hay artículos que coincidan. Prueba con otra búsqueda.
          </p>
        ) : (
          <div className="space-y-10">
            {filtered.map((p) => (
              <article key={p.id} className="border-b border-gray-200 pb-10 last:border-0">
                {p.coverUrl && (
                  <Link href={`/${p.slug}/`} className="group block overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.coverUrl}
                      alt={p.coverAlt ?? strip(p.title)}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(p.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                  {p.categories[0] ? (
                    <>
                      {" · "}
                      <button onClick={() => setCat(p.categories[0].slug)} className="text-brand-text hover:underline">
                        {p.categories[0].name}
                      </button>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-2 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                  <Link href={`/${p.slug}/`} className="hover:text-brand-text" dangerouslySetInnerHTML={{ __html: p.title }} />
                </h2>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {strip(p.excerpt).slice(0, 200)}
                  {strip(p.excerpt).length > 200 ? "…" : ""}
                </p>
                <Link href={`/${p.slug}/`} className="mt-3 inline-block font-semibold text-brand-text hover:underline">
                  Leer más →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Barra lateral: buscador + filtros */}
      <aside className="order-1 mb-10 lg:order-2 lg:mb-0">
        <div className="lg:sticky lg:top-24 space-y-8">
          <div>
            <label htmlFor="blog-search" className="mb-2 block text-sm font-semibold text-ink">Buscar</label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artículos…"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ term, count }) => (
                <button
                  key={term.slug}
                  onClick={() => setCat(cat === term.slug ? null : term.slug)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    cat === term.slug ? "bg-ink text-white" : "bg-gray-100 text-ink hover:bg-brand/15"
                  }`}
                >
                  {term.name} <span className="opacity-60">{count}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map(({ term }) => (
                <button
                  key={term.slug}
                  onClick={() => setTag(tag === term.slug ? null : term.slug)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    tag === term.slug ? "bg-brand text-ink" : "bg-gray-50 text-gray-600 hover:bg-brand/10"
                  }`}
                >
                  #{term.name}
                </button>
              ))}
            </div>
            {tags.length > 16 && (
              <button onClick={() => setShowAllTags((v) => !v)} className="mt-3 text-xs font-semibold text-brand-text hover:underline">
                {showAllTags ? "Ver menos" : `Ver todas (${tags.length})`}
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
