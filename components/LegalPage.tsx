import Container from "./Container";
import PageHero from "./PageHero";
import { getPage } from "@/lib/wp";
import { notFound } from "next/navigation";

export default async function LegalPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <main>
      <PageHero title={page.title.replace(/<[^>]+>/g, "")} />
      <Container className="py-14">
        <div
          className="wp-content mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: page.contentHtml }}
        />
      </Container>
    </main>
  );
}
