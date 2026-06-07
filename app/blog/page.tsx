import Link from "next/link";
import Container from "@/components/Container";
import { getAllPosts } from "@/lib/wp";

export const metadata = {
  title: "Blog",
  description: "Artículos sobre diseño web, marketing digital, SEO y desarrollo.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <main>
      <section className="bg-ink text-white">
        <Container className="py-16 sm:py-20">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Blog</h1>
          <p className="mt-3 text-white/70">{posts.length} artículos</p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg"
            >
              {p.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.coverUrl}
                  alt={p.coverAlt ?? ""}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[16/9] w-full bg-brand/10" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs font-medium text-gray-400">
                  {new Date(p.date).toLocaleDateString("es-ES")}
                  {p.categories[0] ? ` · ${p.categories[0].name}` : ""}
                </div>
                <h2
                  className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-dark"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
