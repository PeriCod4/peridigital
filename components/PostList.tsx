import Link from "next/link";
import type { WPPost } from "@/lib/wp";

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&hellip;/g, "…").replace(/&[a-z#0-9]+;/g, " ").trim();
}

// Listado de entradas estilo blog WordPress clásico: columna única,
// imagen destacada + meta + título + extracto + "Leer más".
export default function PostList({ posts }: { posts: WPPost[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-12">
        {posts.map((p) => (
          <article key={p.id} className="border-b border-gray-200 pb-12 last:border-0">
            {p.coverUrl && (
              <Link href={`/${p.slug}/`} className="group block overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.coverUrl}
                  alt={p.coverAlt ?? stripHtml(p.title)}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
            )}
            <div className="mt-5 text-sm text-gray-500">
              {new Date(p.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
              {p.categories[0] ? (
                <>
                  {" · "}
                  <Link href={`/categoria/${p.categories[0].slug}/`} className="text-brand-text hover:underline">
                    {p.categories[0].name}
                  </Link>
                </>
              ) : null}
            </div>
            <h2 className="mt-2 text-2xl font-bold leading-snug text-ink sm:text-3xl">
              <Link
                href={`/${p.slug}/`}
                className="transition-colors hover:text-brand-text"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
            </h2>
            {p.excerpt && (
              <p className="mt-3 leading-relaxed text-gray-600">
                {stripHtml(p.excerpt).slice(0, 220)}
                {stripHtml(p.excerpt).length > 220 ? "…" : ""}
              </p>
            )}
            <Link
              href={`/${p.slug}/`}
              className="mt-4 inline-block font-semibold text-brand-text hover:underline"
            >
              Leer más →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
