"use client";

import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { useMemo, useState } from "react";

type Tool = { name: string; slug: string; category: string };
type Category = { slug: string; title: string };

export function MobileToolSearch({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter((tool) => tool.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, tools]);

  return (
    <div className="md:hidden space-y-3 -mt-6">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          aria-label="Search tools"
          className="w-full h-12 rounded-xl border bg-background/80 pl-10 pr-10 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        <a
          href="#image-tools"
          className="shrink-0 snap-start h-9 px-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center"
        >
          All Tools
        </a>
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="shrink-0 snap-start h-9 px-3 rounded-full border bg-background/70 text-xs font-medium inline-flex items-center whitespace-nowrap hover:bg-muted"
          >
            {category.title}
          </a>
        ))}
      </div>

      {query && (
        <div className="rounded-2xl border bg-background/95 shadow-lg overflow-hidden">
          {results.length > 0 ? (
            results.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center justify-between gap-3 px-4 py-3.5 border-b last:border-b-0 hover:bg-muted transition-colors"
              >
                <span className="text-sm font-medium">{tool.name}</span>
                <ArrowRight size={16} className="shrink-0 text-primary" />
              </Link>
            ))
          ) : (
            <p className="px-4 py-4 text-sm text-muted-foreground">
              No tools found for “{query}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
