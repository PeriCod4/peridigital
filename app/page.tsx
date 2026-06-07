import Link from "next/link";
import { getAllPosts } from "@/lib/wp";

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 5);
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">Campero Digital</h1>
      <p className="mt-4 text-lg text-gray-600">
        Prototipo Next.js (Fase 1). El diseño real llega en la Fase 2.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-semibold">Últimos artículos</h2>
      <ul className="space-y-3">
        {latest.map((p) => (
          <li key={p.id}>
            <Link
              href={`/${p.slug}/`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: p.title }}
            />
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/blog/" className="font-medium underline">
          Ver todos los artículos →
        </Link>
      </p>
    </main>
  );
}
