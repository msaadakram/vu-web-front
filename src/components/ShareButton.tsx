"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ShareButton({ title }: { title?: string }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: title || document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // user cancelled share or clipboard blocked — silent
    }
  };

  return (
    <button
      onClick={onShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#64788b] rounded-xl text-sm font-medium hover:border-[#4eafc4] hover:text-[#4eafc4] hover:shadow-sm transition-all"
    >
      {copied ? <Check className="w-4 h-4 text-[#4eafc4]" /> : <Share2 className="w-4 h-4" />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
