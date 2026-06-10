"use client";

import { useRef } from "react";
import Link from "next/link";

export interface RelatedItem {
  id: number;
  slug: string;
  title: string;
  coverUrl?: string;
  coverAlt?: string;
  category?: string;
}

function strip(s: string): string {
  return s.replace(/<[^>]+>/g, "").trim();
}

export default function RelatedCarousel({ posts }: { posts: RelatedItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  if (!posts.length) return null;

  function scrollBy(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold text-ink">También te puede interesar</h2>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scrollBy(-1)} aria-label="Anterior" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-ink transition-colors hover:border-brand hover:text-brand-text">←</button>
          <button onClick={() => scrollBy(1)} aria-label="Siguiente" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-ink transition-colors hover:border-brand hover:text-brand-text">→</button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/${p.slug}/`}
            className="spotlight group w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {p.coverUrl ? (
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.coverUrl}
                  alt={p.coverAlt ?? strip(p.title)}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-brand/10" />
            )}
            <div className="p-4">
              {p.category && <div className="text-xs font-medium text-brand-text">{p.category}</div>}
              <h3 className="mt-1 line-clamp-3 font-bold leading-snug text-ink group-hover:text-brand-text" dangerouslySetInnerHTML={{ __html: p.title }} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
