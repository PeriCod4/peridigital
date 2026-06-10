import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PostList from "@/components/PostList";
import LeadCta from "@/components/LeadCta";
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
      <Container className="py-14">
        <header className="mx-auto mb-12 max-w-3xl border-b border-gray-200 pb-8">
          <Link href="/blog/" className="text-sm font-medium text-brand-text hover:underline">
            ← Blog
          </Link>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">{cat.name}</h1>
          <p className="mt-3 text-gray-500">{cat.posts.length} artículos</p>
        </header>
        <PostList posts={cat.posts} />
      </Container>

      <LeadCta
        title={`¿Necesitas ayuda con ${cat.name.toLowerCase()}?`}
        subtitle="Leer está bien, pero podemos hacerlo por ti. Cuéntanos tu caso y te decimos cómo."
        context={`Categoría: ${cat.name}`}
        submitLabel="Quiero que me ayudéis"
        messagePlaceholder="Cuéntanos qué necesitas…"
      />
    </main>
  );
}
