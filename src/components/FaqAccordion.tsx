"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            className={`rounded-xl border overflow-hidden transition-colors ${
              isOpen ? "border-[#4eafc4]/30 shadow-sm" : "border-gray-100"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex items-start gap-3 w-full text-left p-4 text-[#0f172a] font-semibold text-sm hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                  isOpen ? "bg-[#4eafc4] text-white" : "bg-[#e8f4f7] text-[#4eafc4]"
                }`}
              >
                {idx + 1}
              </span>
              <span className="flex-1">{item.question}</span>
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="w-4 h-4 text-[#94a3b8] mt-0.5 shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pl-13">
                    <p className="text-[#64788b] text-sm leading-relaxed">
                      {item.answer}
                    </p>
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
