import Link from "next/link";
import { getAllPosts } from "@/lib/wp";

export const metadata = {
  title: "Blog | Campero Digital",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      <p className="mb-8 text-sm text-gray-500">{posts.length} artículos</p>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.id} className="border-b pb-4">
            <Link
              href={`/${p.slug}/`}
              className="text-xl font-semibold hover:underline"
              dangerouslySetInnerHTML={{ __html: p.title }}
            />
            <div className="mt-1 text-sm text-gray-500">
              {new Date(p.date).toLocaleDateString("es-ES")}
              {p.categories[0] ? ` · ${p.categories[0].name}` : ""}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
