"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2.5" itemScope itemType="https://schema.org/FAQPage">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
              isOpen
                ? "border-[#4eafc4]/30 shadow-md shadow-[#4eafc4]/8 bg-white"
                : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex items-start gap-3.5 w-full text-left px-5 py-4 group"
              aria-expanded={isOpen}
            >
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 transition-all ${
                  isOpen
                    ? "bg-gradient-to-br from-[#4eafc4] to-[#2a8aa3] text-white shadow-sm"
                    : "bg-[#e8f4f7] text-[#4eafc4] group-hover:bg-[#d1edf2]"
                }`}
              >
                {idx + 1}
              </span>
              <span
                className={`flex-1 text-sm font-semibold leading-relaxed transition-colors ${
                  isOpen ? "text-[#0f172a]" : "text-[#334155] group-hover:text-[#0f172a]"
                }`}
                itemProp="name"
              >
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 mt-0.5"
              >
                <ChevronDown
                  className={`w-4.5 h-4.5 transition-colors ${
                    isOpen ? "text-[#4eafc4]" : "text-[#94a3b8]"
                  }`}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="px-5 pb-5 pl-[3.75rem]">
                    <div className="border-t border-gray-50 pt-3">
                      <p
                        className="text-[#475569] text-sm leading-[1.8]"
                        itemProp="text"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
