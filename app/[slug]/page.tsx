import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import { getPostSlugs, getPost } from "@/lib/wp";
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

  return (
    <main>
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

          <div className="mt-14 rounded-2xl bg-brand/10 p-8 text-center">
            <h2 className="text-xl font-bold text-ink">
              ¿Hablamos de tu proyecto?
            </h2>
            <Link
              href="/hablemos/"
              className="mt-5 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white hover:bg-ink-soft"
            >
              Contactar
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}
