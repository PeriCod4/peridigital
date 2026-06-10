import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-brand-text">{c.name}</Link>
            ) : (
              <span className="line-clamp-1 text-gray-700">{c.name}</span>
            )}
            {i < items.length - 1 && <span className="text-gray-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
