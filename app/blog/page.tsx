import Container from "@/components/Container";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/wp";

export const metadata = {
  title: "Blog",
  description: "Artículos sobre diseño web, marketing digital, SEO y desarrollo.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <main>
      <Container className="py-14">
        <header className="mx-auto mb-12 max-w-3xl border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-extrabold text-ink sm:text-5xl">Blog</h1>
          <p className="mt-3 text-gray-500">
            Diseño web, marketing digital, SEO y más. {posts.length} artículos.
          </p>
        </header>
        <PostList posts={posts} />
      </Container>
    </main>
  );
}
