"use client";

import { Share2, Check, Copy, Twitter, Linkedin, Link2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ShareButton({ title }: { title?: string }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getUrl = () => (typeof window !== "undefined" ? window.location.href : "");
  const getTitle = () => title || (typeof document !== "undefined" ? document.title : "VirtualU Article");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setShowMenu(false);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: getTitle(), url: getUrl() }); }
      catch { /* user cancelled */ }
    } else {
      setShowMenu(v => !v);
    }
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getTitle())}&url=${encodeURIComponent(getUrl())}`, "_blank", "noopener");
    setShowMenu(false);
  };

  const shareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`, "_blank", "noopener");
    setShowMenu(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={shareNative}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
          copied
            ? "bg-emerald-50 border-emerald-200 text-emerald-600"
            : "bg-white border-gray-200 text-[#64788b] hover:border-[#4eafc4] hover:text-[#4eafc4] hover:shadow-sm"
        }`}
      >
        {copied
          ? <><Check className="w-4 h-4" /> Copied!</>
          : <><Share2 className="w-4 h-4" /> Share</>
        }
      </button>

      {/* Fallback dropdown (no native share) */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-2 right-0 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/60 p-2 min-w-[180px] z-50"
          >
            <button onClick={copyLink} className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm text-[#334155] hover:bg-[#e8f4f7] hover:text-[#2a8aa3] transition-colors font-medium">
              <Copy className="w-4 h-4" /> Copy link
            </button>
            <button onClick={shareTwitter} className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm text-[#334155] hover:bg-[#e8f8f0] hover:text-[#1d9bf0] transition-colors font-medium">
              <Twitter className="w-4 h-4" /> Share on X
            </button>
            <button onClick={shareLinkedin} className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm text-[#334155] hover:bg-[#e8f0fa] hover:text-[#0a66c2] transition-colors font-medium">
              <Linkedin className="w-4 h-4" /> Share on LinkedIn
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
