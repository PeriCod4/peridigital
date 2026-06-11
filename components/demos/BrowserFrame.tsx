import type { ReactNode } from "react";

export default function BrowserFrame({
  url = "peridigital.es",
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1">
          <div className="mx-auto flex max-w-xs items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-gray-400">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {url}
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
