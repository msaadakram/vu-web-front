"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export type TocItem = { id: string; heading: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className="not-prose">
      {/* Mobile collapsible */}
      <div className="lg:hidden mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-left"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm">
            <List className="w-4 h-4 text-[#4eafc4]" />
            Table of Contents
          </span>
          <span className={`text-[#94a3b8] text-xs transition-transform ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
        {open && (
          <ol className="px-4 pb-4 space-y-1 list-none">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors border-l-2 ${
                    activeId === item.id
                      ? "bg-[#e8f4f7] text-[#4eafc4] border-[#4eafc4] font-medium"
                      : "text-[#64788b] hover:text-[#0f172a] border-transparent"
                  }`}
                >
                  {item.heading}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Desktop sticky */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-4 h-4 text-[#4eafc4]" />
            <h2 className="text-[#0f172a] font-semibold text-sm">On this page</h2>
          </div>
          <ol className="space-y-0.5 list-none max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block px-3 py-2 rounded-lg text-xs leading-relaxed transition-all border-l-2 ${
                    activeId === item.id
                      ? "bg-[#e8f4f7] text-[#4eafc4] border-[#4eafc4] font-medium"
                      : "text-[#64788b] hover:text-[#0f172a] border-transparent hover:bg-gray-50"
                  }`}
                >
                  {item.heading}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
