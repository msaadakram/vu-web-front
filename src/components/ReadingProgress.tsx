"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useState, useEffect } from "react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", v => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  return (
    <>
      {/* Top bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#4eafc4] via-[#7dd4e8] to-[#2dd4bf]"
      />
      {/* Percentage pill — appears after 5% scroll */}
      {pct > 5 && pct < 99 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-5 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg shadow-gray-300/40 flex items-center justify-center text-[11px] font-bold text-[#4eafc4] select-none"
          aria-hidden
        >
          {pct}%
        </motion.div>
      )}
    </>
  );
}
