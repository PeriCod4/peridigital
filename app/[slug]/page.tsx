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
      <section className="bg-ink text-white">
        <Container className="py-14 sm:py-16">
          <Link href="/blog/" className="text-sm font-medium text-brand hover:underline">
            ← Volver al blog
          </Link>
          <h1
            className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div className="mt-4 text-sm text-white/60">
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {post.categories[0] ? ` · ${post.categories[0].name}` : ""}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <article className="mx-auto max-w-3xl">
          {post.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverUrl}
              alt={post.coverAlt ?? ""}
              className="mb-10 w-full rounded-2xl"
            />
          )}
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-14 rounded-2xl bg-brand/10 p-8">
            <h2 className="text-center text-xl font-bold text-ink">
              ¿Hablamos de tu proyecto?
            </h2>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-text"
                >
                  {s.nav}
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
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
