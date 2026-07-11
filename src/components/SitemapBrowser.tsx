"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export type SitemapEntry = {
  title: string;
  href: string;
  meta?: string;
};

export type SitemapGroup = {
  label: string;
  entries: SitemapEntry[];
};

export function SitemapBrowser({ groups }: { groups: SitemapGroup[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        entries: g.entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.href.toLowerCase().includes(q) ||
            (e.meta || "").toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.entries.length > 0);
  }, [groups, query]);

  const totalEntries = groups.reduce((sum, g) => sum + g.entries.length, 0);
  const shownEntries = filtered.reduce((sum, g) => sum + g.entries.length, 0);

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-xl mb-10 sm:mb-14">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#94a3b8] pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages, articles, programs…"
          aria-label="Search sitemap"
          className="w-full pl-11 sm:pl-12 pr-10 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#4eafc4] focus:ring-2 focus:ring-[#4eafc4]/20 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94a3b8] hover:text-[#0f172a] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-xs text-[#94a3b8] mb-8">
        {query
          ? `Showing ${shownEntries} of ${totalEntries} pages matching “${query}”`
          : `${totalEntries} pages indexed`}
      </p>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-14 text-center">
          <p className="text-[#64788b] text-sm">
            No pages match your search. Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {filtered.map((group) => (
            <section key={group.label}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[#0f172a] font-bold text-sm uppercase tracking-wider">
                  {group.label}
                </h2>
                <span className="px-2.5 py-0.5 bg-[#e8f4f7] text-[#3a95aa] rounded-full text-xs font-semibold">
                  {group.entries.length}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {group.entries.map((entry) => (
                  <a
                    key={entry.href}
                    href={entry.href}
                    className="group flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-[#4eafc4]/40 hover:shadow-sm transition-all min-w-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4] shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="min-w-0">
                      <span className="block text-sm text-[#0f172a] font-medium truncate group-hover:text-[#4eafc4] transition-colors">
                        {entry.title}
                      </span>
                      {entry.meta && (
                        <span className="block text-xs text-[#94a3b8] truncate">
                          {entry.meta}
                        </span>
                      )}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
