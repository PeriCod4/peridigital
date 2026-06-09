import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { getPostSlugs, getPost } from "@/lib/wp";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { SITE, SERVICES } from "@/lib/site";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Sólo generar las rutas conocidas en build (export estático).
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
        data={breadcrumbSchema([
          { name: "Inicio", url: `${SITE.url}/` },
          { name: "Blog", url: `${SITE.url}/blog/` },
          { name: plainTitle, url: `${SITE.url}/${post.slug}/` },
        ])}
      />

      <Container className="py-12">
        <article className="mx-auto max-w-3xl">
          {/* Cabecera estilo WordPress */}
          <Link href="/blog/" className="text-sm font-medium text-brand-text hover:underline">
            ← Volver al blog
          </Link>
          <div className="mt-5 text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {post.categories[0] ? (
              <>
                {" · "}
                <Link href={`/categoria/${post.categories[0].slug}/`} className="text-brand-text hover:underline">
                  {post.categories[0].name}
                </Link>
              </>
            ) : null}
          </div>
          <h1
            className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          {post.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverUrl}
              alt={post.coverAlt ?? plainTitle}
              className="mt-8 w-full rounded-xl"
            />
          )}

          <div
            className="wp-content mt-8"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Etiquetas */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
              {post.tags.slice(0, 8).map((t) => (
                <span key={t.id} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  #{t.name}
                </span>
              ))}
            </div>
          )}

          {/* CTA discreto a servicios */}
          <div className="mt-12 rounded-2xl bg-brand/10 p-8 text-center">
            <h2 className="text-xl font-bold text-ink">¿Hablamos de tu proyecto?</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SERVICES.slice(0, 6).map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-text"
                >
                  {s.nav}
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/hablemos/"
                className="inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white hover:bg-ink-soft"
              >
                Contactar
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
