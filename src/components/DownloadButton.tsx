"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Check } from "lucide-react";
import { toast } from "sonner";
import { getToken } from "@/lib/api";

const WAIT_SECONDS = 7;
const BASE_URL = "/api";

type DownloadButtonProps = {
  resourceId: string;
  fileName: string;
  className?: string;
  label?: string;
};

export function DownloadButton({ resourceId, fileName, className, label = "Download" }: DownloadButtonProps) {
  const [phase, setPhase] = useState<"idle" | "preparing" | "fetching" | "done" | "error">("idle");
  const [secondsLeft, setSecondsLeft] = useState(WAIT_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const startDownload = async () => {
    if (phase === "preparing" || phase === "fetching") return;

    setPhase("preparing");
    setSecondsLeft(WAIT_SECONDS);

    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          void runFetch();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const runFetch = async () => {
    setPhase("fetching");
    try {
      const token = getToken();
      abortRef.current = new AbortController();
      const res = await fetch(`${BASE_URL}/resources/${resourceId}/download`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        signal: abortRef.current.signal,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Download failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setPhase("done");
      toast.success("Download started");
      setTimeout(() => setPhase("idle"), 2200);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      toast.error(err instanceof Error ? err.message : "Download failed");
      setPhase("error");
      setTimeout(() => setPhase("idle"), 1800);
    }
  };

  const cancel = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    abortRef.current?.abort();
    setPhase("idle");
    setSecondsLeft(WAIT_SECONDS);
  };

  const busy = phase === "preparing" || phase === "fetching";

  return (
    <button
      onClick={startDownload}
      disabled={busy}
      className={`group relative flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#4eafc4]/25 transition-all duration-300 overflow-hidden disabled:cursor-progress ${className || ""}`}
    >
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <span className="relative inline-flex items-center gap-2">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2"
            >
              <span className="relative">
                <Download className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white/60 rounded-full group-hover:animate-ping" />
              </span>
              {label}
            </motion.span>
          )}
          {phase === "preparing" && (
            <motion.span
              key="preparing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full shrink-0"
              />
              Preparing… {secondsLeft}s
            </motion.span>
          )}
          {phase === "fetching" && (
            <motion.span
              key="fetching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full shrink-0"
              />
              Downloading…
            </motion.span>
          )}
          {phase === "done" && (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Downloaded
            </motion.span>
          )}
          {phase === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Retry
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {busy && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            cancel();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              cancel();
            }
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded px-1.5 py-0.5 transition-colors"
          title="Cancel"
        >
          ✕
        </span>
      )}
    </button>
  );
}
