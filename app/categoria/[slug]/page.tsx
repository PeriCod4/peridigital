import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Aurora from "@/components/Aurora";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { getCategoriesWithPosts } from "@/lib/wp";

export async function generateStaticParams() {
  const cats = await getCategoriesWithPosts();
  return cats.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategoriesWithPosts();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — artículos`,
    description: `Artículos sobre ${cat.name.toLowerCase()} de Campero Digital.`,
    alternates: { canonical: `/categoria/${cat.slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cats = await getCategoriesWithPosts();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <Aurora />
        <Container className="relative py-16">
          <Reveal>
            <Link href="/blog/" className="text-sm font-medium text-brand hover:underline">
              ← Blog
            </Link>
            <h1 className="mt-3 text-4xl font-extrabold">{cat.name}</h1>
            <p className="mt-2 text-white/70">{cat.posts.length} artículos</p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cat.posts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <TiltCard className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <Link href={`/${p.slug}/`} className="group flex h-full flex-col">
                  {p.coverUrl ? (
                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.coverUrl} alt={p.coverAlt ?? ""} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full bg-brand/10" />
                  )}
                  <div className="p-5">
                    <div className="text-xs font-medium text-gray-400">{new Date(p.date).toLocaleDateString("es-ES")}</div>
                    <h2 className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-text" dangerouslySetInnerHTML={{ __html: p.title }} />
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
