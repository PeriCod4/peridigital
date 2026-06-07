import { getPostSlugs, getPost } from "@/lib/wp";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Sólo generar las rutas conocidas en build (export estático).
export const dynamicParams = false;

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1
        className="mb-4 text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />
      <div className="mb-8 text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString("es-ES")}
      </div>
      {post.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverUrl}
          alt={post.coverAlt ?? ""}
          className="mb-8 w-full rounded-lg"
        />
      )}
      <div
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
