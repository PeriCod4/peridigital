import Container from "@/components/Container";
import BlogExplorer, { type BlogListItem } from "@/components/blog/BlogExplorer";
import LeadCta from "@/components/LeadCta";
import { getAllPosts } from "@/lib/wp";

export const metadata = {
  title: "Blog",
  description: "Artículos sobre diseño web, marketing digital, SEO y desarrollo.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const items: BlogListItem[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverUrl: p.coverUrl,
    coverAlt: p.coverAlt,
    date: p.date,
    categories: p.categories.map((c) => ({ name: c.name, slug: c.slug })),
    tags: p.tags.map((t) => ({ name: t.name, slug: t.slug })),
  }));

  return (
    <main>
      <Container className="py-14">
        <header className="mb-10 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-extrabold text-ink sm:text-5xl">Blog</h1>
          <p className="mt-3 text-gray-500">
            Diseño web, marketing digital, SEO y más. Busca y filtra por tema.
          </p>
        </header>
        <BlogExplorer items={items} />
      </Container>

      <LeadCta
        title="¿Te ayudamos a aplicarlo?"
        subtitle="Una cosa es leerlo y otra hacerlo. Cuéntanos tu caso y lo llevamos a tu web o tu negocio."
        context="Blog"
        submitLabel="Quiero que me ayudéis"
        messagePlaceholder="¿Sobre qué tema necesitas ayuda?"
      />
    </main>
  );
}
