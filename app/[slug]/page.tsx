import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import Toc from "@/components/blog/Toc";
import RelatedCarousel, { type RelatedItem } from "@/components/blog/RelatedCarousel";
import LeadCta from "@/components/LeadCta";
import { getPostSlugs, getPost, getRelatedPosts } from "@/lib/wp";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.title.replace(/<[^>]+>/g, "");
  const description = post.excerpt.replace(/<[^>]+>/g, "").trim().slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const plainTitle = post.title.replace(/<[^>]+>/g, "");
  const plainDesc = post.excerpt.replace(/<[^>]+>/g, "").trim().slice(0, 160);
  const cat = post.categories[0];

  const related = await getRelatedPosts(post.slug, 8);
  const relatedItems: RelatedItem[] = related.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    coverUrl: p.coverUrl,
    coverAlt: p.coverAlt,
    category: p.categories[0]?.name,
  }));

  const crumbs = [
    { name: "Inicio", href: "/" },
    { name: "Blog", href: "/blog/" },
    ...(cat ? [{ name: cat.name, href: `/categoria/${cat.slug}/` }] : []),
    { name: plainTitle },
  ];

  return (
    <main>
      <JsonLd
        data={articleSchema({
          title: plainTitle,
          description: plainDesc,
          slug: post.slug,
          date: post.date,
          modified: post.modified,
          image: post.coverUrl,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((c) => ({ name: c.name, url: c.href ? `${SITE.url}${c.href}` : `${SITE.url}/${post.slug}/` })),
        )}
      />

      <Container className="py-10">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
          {/* Artículo */}
          <article className="min-w-0 max-w-3xl">
            <div className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
              {cat ? (
                <>
                  {" · "}
                  <Link href={`/categoria/${cat.slug}/`} className="text-brand-text hover:underline">{cat.name}</Link>
                </>
              ) : null}
            </div>
            <h1
              className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {post.coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverUrl} alt={post.coverAlt ?? plainTitle} className="mt-8 w-full rounded-xl" />
            )}

            {/* Índice móvil (colapsable) */}
            {post.headings.length >= 2 && (
              <details className="mt-8 rounded-xl border border-gray-200 p-4 lg:hidden">
                <summary className="cursor-pointer font-semibold text-ink">Índice del artículo</summary>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {post.headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                      <a href={`#${h.id}`} className="text-gray-600 hover:text-brand-text">{h.text}</a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="wp-content mt-8" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
                {post.tags.slice(0, 10).map((t) => (
                  <Link
                    key={t.id}
                    href={`/blog/?tag=${t.slug}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-brand/10"
                  >
                    #{t.name}
                  </Link>
                ))}
              </div>
            )}

          </article>

          {/* TOC lateral fijo (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Toc headings={post.headings} />
            </div>
          </aside>
        </div>

        {/* Relacionados */}
        <RelatedCarousel posts={relatedItems} />
      </Container>

      <LeadCta
        title="¿Te ayudamos con esto?"
        subtitle="Si lo de este artículo es justo lo que necesitas en tu web o negocio, cuéntanoslo y lo hacemos realidad."
        context={`Artículo: ${plainTitle}`}
        submitLabel="Quiero que me ayudéis"
        messagePlaceholder="Cuéntanos tu caso…"
      />
    </main>
  );
}
