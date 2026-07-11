"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, ChevronDown, BookOpen } from "lucide-react";

export type TocItem = { id: string; heading: string; level?: number };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [readCount, setReadCount] = useState(0);

  const updateActive = useCallback(() => {
    if (!items.length) return;
    const scrollY = window.scrollY + 120;
    let current = items[0]?.id || "";
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.offsetTop <= scrollY) current = item.id;
    }
    setActiveId(current);
    const idx = items.findIndex(i => i.id === current);
    setReadCount(Math.max(0, idx));
  }, [items]);

  useEffect(() => {
    if (!items.length) return;
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [items, updateActive]);

  if (!items.length) return null;

  const progress = items.length > 1 ? (readCount / (items.length - 1)) * 100 : 0;

  return (
    <nav aria-label="Table of contents" className="not-prose">

      {/* ── Mobile collapsible ── */}
      <div className="lg:hidden mb-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left group"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2.5 text-[#0f172a] font-bold text-sm">
            <div className="w-7 h-7 rounded-lg bg-[#e8f4f7] flex items-center justify-center">
              <List className="w-3.5 h-3.5 text-[#4eafc4]" />
            </div>
            Table of Contents
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full">
              {items.length}
            </span>
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ol className="px-3 pb-4 space-y-0.5 list-none border-t border-gray-50 pt-2">
                {items.map((item, i) => {
                  const active = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          active
                            ? "bg-[#e8f4f7] text-[#4eafc4] font-semibold"
                            : "text-[#64788b] hover:text-[#0f172a] hover:bg-gray-50"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                          active ? "bg-[#4eafc4] text-white" : i < readCount ? "bg-[#d1fae5] text-emerald-600" : "bg-gray-100 text-[#94a3b8]"
                        }`}>{i + 1}</span>
                        <span className="leading-snug line-clamp-2">{item.heading}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Desktop sticky sidebar ── */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#e8f4f7] flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-[#4eafc4]" />
                </div>
                <h2 className="text-[#0f172a] font-bold text-sm">On this page</h2>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full">
                {readCount}/{items.length}
              </span>
            </div>
            {/* progress bar */}
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Items */}
          <ol className="p-2 space-y-0.5 list-none max-h-[calc(100vh-280px)] overflow-y-auto">
            {items.map((item, i) => {
              const active = activeId === item.id;
              const done = i < readCount;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl text-xs leading-relaxed transition-all ${
                      active
                        ? "bg-[#e8f4f7] text-[#2a8aa3] font-semibold"
                        : "text-[#64788b] hover:text-[#0f172a] hover:bg-gray-50"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 transition-colors ${
                      active ? "bg-[#4eafc4] text-white shadow-sm" : done ? "bg-[#d1fae5] text-emerald-600" : "bg-gray-100 text-[#94a3b8] group-hover:bg-[#e8f4f7] group-hover:text-[#4eafc4]"
                    }`}>
                      {done && !active ? "✓" : i + 1}
                    </span>
                    <span className="leading-snug">{item.heading}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
