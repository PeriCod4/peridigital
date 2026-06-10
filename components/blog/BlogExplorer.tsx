"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CategoryCover from "./CategoryCover";

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
  const [showAllCats, setShowAllCats] = useState(false);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("tag")) setTag(sp.get("tag"));
    if (sp.get("cat")) setCat(sp.get("cat"));
    if (sp.get("q")) setQuery(sp.get("q") || "");
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

  const TOP_CATS = 8;
  const visibleCats = showAllCats ? categories : categories.slice(0, TOP_CATS);
  const visibleTags = showTags ? tags.slice(0, 40) : [];
  const hasFilters = cat || tag || query;
  const activeTagName = tag ? tags.find((t) => t.term.slug === tag)?.term.name : null;

  return (
    <div>
      {/* Barra de filtros compacta a todo el ancho */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos…"
            aria-label="Buscar artículos"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 sm:max-w-xs"
          />
          <div className="shrink-0 text-sm text-gray-500">
            {filtered.length} de {items.length}
            {hasFilters && (
              <button
                onClick={() => { setQuery(""); setCat(null); setTag(null); }}
                className="ml-3 font-semibold text-brand-text hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Categorías: top + plegable */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setCat(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !cat ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-gray-200 hover:bg-brand/10"
            }`}
          >
            Todas
          </button>
          {visibleCats.map(({ term, count }) => (
            <button
              key={term.slug}
              onClick={() => setCat(cat === term.slug ? null : term.slug)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                cat === term.slug ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-gray-200 hover:bg-brand/10"
              }`}
            >
              {term.name}
              <span className="ml-1 opacity-50">{count}</span>
            </button>
          ))}
          {categories.length > TOP_CATS && (
            <button
              onClick={() => setShowAllCats((v) => !v)}
              className="rounded-full px-3 py-1 text-xs font-semibold text-brand-text hover:underline"
            >
              {showAllCats ? "ver menos" : `+${categories.length - TOP_CATS} categorías`}
            </button>
          )}
          {/* Toggle etiquetas */}
          <button
            onClick={() => (activeTagName ? setTag(null) : setShowTags((v) => !v))}
            className="ml-auto rounded-full px-3 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200 transition-colors hover:bg-brand/10"
          >
            {activeTagName ? `#${activeTagName} ✕` : showTags ? "Ocultar etiquetas" : "Etiquetas ▾"}
          </button>
        </div>

        {/* Etiquetas (sólo si se abren) */}
        {showTags && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-gray-200 pt-3">
            {visibleTags.map(({ term }) => (
              <button
                key={term.slug}
                onClick={() => setTag(tag === term.slug ? null : term.slug)}
                className={`rounded-full px-2.5 py-0.5 text-xs transition-colors ${
                  tag === term.slug ? "bg-brand text-ink" : "bg-white text-gray-500 ring-1 ring-gray-200 hover:bg-brand/10"
                }`}
              >
                #{term.name}
              </button>
            ))}
            {tags.length > 40 && <span className="text-xs text-gray-400">y {tags.length - 40} más…</span>}
          </div>
        )}
      </div>

      {/* Grid de artículos */}
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl bg-gray-50 p-8 text-center text-gray-500">
          No hay artículos que coincidan. Prueba con otra búsqueda.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/${p.slug}/`} className="block overflow-hidden">
                {p.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.coverUrl}
                    alt={p.coverAlt ?? strip(p.title)}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <CategoryCover category={p.categories[0]?.name} seed={p.slug} />
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs text-gray-400">
                  {new Date(p.date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                  {p.categories[0] ? ` · ${p.categories[0].name}` : ""}
                </div>
                <h2 className="mt-2 line-clamp-2 font-bold leading-snug text-ink">
                  <Link href={`/${p.slug}/`} className="hover:text-brand-text" dangerouslySetInnerHTML={{ __html: p.title }} />
                </h2>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">{strip(p.excerpt)}</p>
                <Link href={`/${p.slug}/`} className="mt-3 inline-block text-sm font-semibold text-brand-text hover:underline">
                  Leer más →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
