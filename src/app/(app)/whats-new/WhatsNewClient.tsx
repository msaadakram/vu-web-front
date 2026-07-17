"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  Sparkles,
  Chrome,
  Smartphone,
  ArrowRight,
  ArrowUpRight,
  Check,
  Zap,
  Bell,
  BookOpen,
  Newspaper,
  Library,
  Download,
  Star,
  Shield,
  Clock,
  Calendar,
  ChevronRight,
  Rocket,
  Puzzle,
  Monitor,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

type BlogItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  createdAt: string;
  coverImage?: string;
};
type ResourceItem = {
  _id: string;
  title: string;
  type: string;
  course?: string;
  createdAt: string;
};

export type Feed = { blogs: BlogItem[]; news: BlogItem[]; resources: ResourceItem[] };

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 14 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);
  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso), now = new Date();
    const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return ""; }
}

const RESOURCE_META: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  assignment:  { label: "Assignment",  bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500" },
  "past-paper":{ label: "Past Paper",  bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-500" },
  handout:     { label: "Handout",     bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500" },
  notes:       { label: "Notes",       bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  other:       { label: "Other",       bg: "bg-slate-100",  text: "text-slate-700",   dot: "bg-slate-500" },
};
function resourceMeta(type: string) {
  return RESOURCE_META[type] || RESOURCE_META.other;
}

/* ──────────────────────────────────────────────────────────── */
/*  Hero                                                          */
/* ──────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="relative overflow-hidden">
      {/* ambient blobs */}
      <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] bg-[#4eafc4]/18 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-60px] right-[-60px] w-[360px] h-[360px] bg-[#1c3557]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(78,175,196,0.08),transparent_55%)] pointer-events-none" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-5xl mx-auto px-4 pt-16 pb-10 sm:pt-24 sm:pb-14 text-center"
      >
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur border border-[#4eafc4]/25 text-[#1c3557] rounded-full text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4eafc4]" />
          What&apos;s New — July 2026
        </motion.span>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-[#0f1e35] mb-5"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(2.1rem, 6vw, 4rem)", lineHeight: 1.05 }}
        >
          A fresh way to experience{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#1c3557] via-[#4eafc4] to-[#2dd4bf] bg-clip-text text-transparent">
              VirtualU
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease }}
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] rounded-full origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-[#64788f] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Two new ways to study smarter — the VirtualU Chrome Extension for instant
          in-browser access, and the VULMS mobile app for your lectures, handouts,
          and past papers on the go. Plus the latest blogs, news, and resources.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#chrome-extension"
            className="group inline-flex items-center gap-2 px-5 py-3 bg-[#1c3557] text-white rounded-full text-sm font-semibold hover:bg-[#153050] transition-colors duration-300 shadow-lg shadow-[#1c3557]/20"
          >
            <Chrome className="w-4 h-4" />
            Add to Chrome
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="#vulms-app"
            className="group inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#1c3557]/12 text-[#1c3557] rounded-full text-sm font-semibold hover:border-[#4eafc4] hover:text-[#4eafc4] transition-colors duration-300"
          >
            <Smartphone className="w-4 h-4" />
            Get the VULMS App
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Launch spotlight — Chrome Extension                          */
/* ──────────────────────────────────────────────────────────── */
function ExtensionSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const features = [
    "One-click download of past papers & handouts",
    "Auto-fills course codes on the VU LMS portal",
    "New-resource notifications while you browse",
    "Dark mode that matches your LMS",
  ];
  return (
    <section id="chrome-extension" className="max-w-5xl mx-auto px-4 py-10 sm:py-14 scroll-mt-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className="relative grid lg:grid-cols-2 gap-8 items-stretch bg-white rounded-3xl border border-[#1c3557]/8 shadow-xl shadow-[#1c3557]/5 overflow-hidden"
      >
        {/* Left — copy */}
        <div className="p-7 sm:p-10 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8f4f7] text-[#1c3557] rounded-full text-[11px] font-semibold tracking-wide uppercase">
              <Rocket className="w-3 h-3 text-[#4eafc4]" /> New Release
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[11px] font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> v1.0
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1c3557] to-[#153050] flex items-center justify-center shadow-md">
              <Chrome className="w-6 h-6 text-[#4eafc4]" />
            </div>
            <h2
              className="text-[#0f1e35]"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}
            >
              VirtualU Chrome Extension
            </h2>
          </div>

          <p className="text-[#64788f] leading-relaxed mb-6">
            Search and pull VirtualU resources straight from any browser tab. The
            extension lives in your toolbar — no more switching windows mid-study
            session to grab a handout or past paper.
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease }}
                className="flex items-start gap-3 text-sm text-[#0f1e35]"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#4eafc4]/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#4eafc4]" />
                </span>
                {f}
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#1c3557] text-white rounded-full text-sm font-semibold hover:bg-[#153050] transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
              Add to Chrome — Free
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-xs text-[#64788f] inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#4eafc4]" /> No login data stored
            </span>
          </div>
        </div>

        {/* Right — mockup */}
        <div className="relative bg-gradient-to-br from-[#0c1b2e] via-[#102844] to-[#1a3a5c] p-7 sm:p-10 flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4eafc4]/18 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2dd4bf]/10 rounded-full blur-2xl pointer-events-none" />

          {/* browser chrome */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="relative w-full max-w-sm bg-white/95 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f1f5f9] border-b border-slate-200">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-2 h-6 bg-white rounded-md flex items-center px-3 text-[10px] text-slate-400 border border-slate-200">
                lms.vu.edu.pk
              </div>
              {/* extension icon */}
              <motion.div
                animate={inView ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
                className="w-6 h-6 rounded-md bg-gradient-to-br from-[#1c3557] to-[#153050] flex items-center justify-center shadow-sm"
              >
                <Chrome className="w-3.5 h-3.5 text-[#4eafc4]" />
              </motion.div>
            </div>
            {/* popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease }}
              className="m-3 p-4 rounded-lg bg-white border border-slate-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#1c3557] uppercase tracking-wide">VirtualU</span>
                <Bell className="w-3.5 h-3.5 text-[#4eafc4]" />
              </div>
              {[
                { t: "CS302 — Past Paper", s: "Spring 2025 · 1.2 MB" },
                { t: "MGT101 — Handout", s: "Lecture 12 · PDF" },
                { t: "ENG201 — Notes", s: "Updated 2h ago" },
              ].map((r, i) => (
                <motion.div
                  key={r.t}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.12, ease }}
                  className="flex items-center gap-2.5 py-2 border-t border-slate-100 first:border-t-0"
                >
                  <div className="w-7 h-7 rounded-md bg-[#e8f4f7] flex items-center justify-center shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-[#4eafc4]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-[#0f1e35] truncate">{r.t}</div>
                    <div className="text-[10px] text-slate-400 truncate">{r.s}</div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#4eafc4]" />
                </motion.div>
              ))}
              <button className="mt-3 w-full py-2 rounded-md bg-[#1c3557] text-white text-[11px] font-semibold inline-flex items-center justify-center gap-1.5">
                Open full library <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Launch spotlight — VULMS App                                  */
/* ──────────────────────────────────────────────────────────── */
function VulmsSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const features = [
    "Offline access to downloaded handouts & notes",
    "Push notifications for new resources & news",
    "Resume video lectures exactly where you left off",
    "Upload your own notes from your phone",
  ];
  return (
    <section id="vulms-app" className="max-w-5xl mx-auto px-4 py-10 sm:py-14 scroll-mt-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className="relative grid lg:grid-cols-2 gap-8 items-stretch bg-white rounded-3xl border border-[#1c3557]/8 shadow-xl shadow-[#1c3557]/5 overflow-hidden"
      >
        {/* Left — phone mockup */}
        <div className="relative bg-gradient-to-br from-[#e8f4f7] via-[#f8fafc] to-[#eef6f8] p-7 sm:p-10 flex items-center justify-center overflow-hidden order-2 lg:order-1">
          <div className="absolute top-0 left-0 w-56 h-56 bg-[#4eafc4]/18 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-[#1c3557]/10 rounded-full blur-2xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative w-[230px] sm:w-[260px] aspect-[9/19] bg-[#0f1e35] rounded-[2.5rem] p-2.5 shadow-2xl border border-[#1c3557]/20"
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
              {/* app header */}
              <div className="px-4 pt-8 pb-4 bg-gradient-to-br from-[#1c3557] to-[#153050] text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-white/50">VULMS</div>
                    <div className="text-sm font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>VirtualU</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5 text-[#4eafc4]" />
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-white/70">Search resources…</div>
              </div>
              {/* feed */}
              <div className="flex-1 p-3 space-y-2.5 bg-[#f8fafc] overflow-hidden">
                {[
                  { t: "CS302 Past Paper", s: "Spring 2025", c: "from-blue-400 to-blue-500" },
                  { t: "MGT101 Handout", s: "Lec 12", c: "from-emerald-400 to-emerald-500" },
                  { t: "ENG201 Notes", s: "Updated today", c: "from-amber-400 to-amber-500" },
                ].map((r, i) => (
                  <motion.div
                    key={r.t}
                    initial={{ opacity: 0, x: 12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.5 + i * 0.14, ease }}
                    className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100 flex items-center gap-2.5"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${r.c} flex items-center justify-center shrink-0`}>
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-[#0f1e35] truncate">{r.t}</div>
                      <div className="text-[9px] text-slate-400">{r.s}</div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-[#4eafc4]" />
                  </motion.div>
                ))}
              </div>
              {/* bottom nav */}
              <div className="grid grid-cols-4 py-2.5 bg-white border-t border-slate-100">
                {[BookOpen, Library, Newspaper, Smartphone].map((Icon, i) => (
                  <div key={i} className="flex justify-center">
                    <Icon className={`w-4 h-4 ${i === 0 ? "text-[#4eafc4]" : "text-slate-300"}`} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — copy */}
        <div className="p-7 sm:p-10 flex flex-col order-1 lg:order-2">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8f4f7] text-[#1c3557] rounded-full text-[11px] font-semibold tracking-wide uppercase">
              <Rocket className="w-3 h-3 text-[#4eafc4]" /> New Release
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-semibold">
              <Zap className="w-3 h-3" /> Beta
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center shadow-md">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h2
              className="text-[#0f1e35]"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}
            >
              VirtualU VULMS App
            </h2>
          </div>

          <p className="text-[#64788f] leading-relaxed mb-6">
            The VirtualU LMS in your pocket. Carry every past paper, handout, and
            note you&apos;ve downloaded — even when you&apos;re offline. Built for
            students on the move, between classes, and during exam season.
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease }}
                className="flex items-start gap-3 text-sm text-[#0f1e35]"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#4eafc4]/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#4eafc4]" />
                </span>
                {f}
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f1e35] text-white rounded-full text-sm font-semibold hover:bg-[#1c3557] transition-colors duration-300"
            >
              <Smartphone className="w-4 h-4" />
              Download for Android
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#1c3557]/12 text-[#1c3557] rounded-full text-sm font-semibold hover:border-[#4eafc4] hover:text-[#4eafc4] transition-colors duration-300"
            >
              <Monitor className="w-4 h-4" />
              iOS — coming soon
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Stats strip                                                   */
/* ──────────────────────────────────────────────────────────── */
function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stats = [
    { icon: Puzzle,  label: "Extension installs", value: 1200, suffix: "+", bg: "bg-blue-50",     color: "text-blue-600",     gradient: "bg-blue-400/20" },
    { icon: Smartphone, label: "App downloads",    value: 3400, suffix: "+", bg: "bg-emerald-50",  color: "text-emerald-600",  gradient: "bg-emerald-400/20" },
    { icon: Library, label: "Resources",           value: 850,  suffix: "+", bg: "bg-violet-50",   color: "text-violet-600",   gradient: "bg-violet-400/20" },
    { icon: BookOpen, label: "Students helped",     value: 6000, suffix: "+", bg: "bg-amber-50",    color: "text-amber-600",    gradient: "bg-amber-400/20" },
  ];
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative bg-white rounded-2xl p-5 border border-[#1c3557]/6 shadow-sm overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${s.gradient}`} />
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-[#0f1e35] font-extrabold text-2xl sm:text-3xl" style={{ lineHeight: 1 }}>
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-[#64788f] text-[11px] sm:text-xs mt-1.5 font-medium">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Feed — Blogs / News / Resources with tabs                     */
/* ──────────────────────────────────────────────────────────── */
const TABS = [
  { key: "blogs",     label: "Latest Blogs",    icon: BookOpen,   empty: "No blog posts yet." },
  { key: "news",      label: "News & Updates",  icon: Newspaper,  empty: "No news posts yet." },
  { key: "resources", label: "New Resources",   icon: Library,    empty: "No new resources yet." },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function Feed({ feed }: { feed: Feed }) {
  const [tab, setTab] = useState<TabKey>("blogs");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const blogs = feed.blogs;
  const news = feed.news;
  const resources = feed.resources;
  const isEmpty = blogs.length === 0 && news.length === 0 && resources.length === 0;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mb-8"
      >
        <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f4f7] text-[#1c3557] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
          <Clock className="w-3.5 h-3.5 text-[#4eafc4]" /> The Feed
        </motion.span>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[#0f1e35] mb-2"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.3rem)", lineHeight: 1.15 }}
        >
          Latest from VirtualU
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="text-[#64788f] text-base">
          Fresh blogs, announcements, and study resources — all in one place.
        </motion.p>
      </motion.div>

      {isEmpty ? (
        <div className="text-center py-20">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-[#e8f4f7] items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-[#4eafc4]" />
          </div>
          <p className="text-[#64788f] text-lg">No new content yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((t) => {
              const count = t.key === "blogs" ? blogs.length : t.key === "news" ? news.length : resources.length;
              if (count === 0) return null;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    active ? "text-white" : "text-[#1c3557] bg-white border border-[#1c3557]/10 hover:border-[#4eafc4]/40"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="feed-tab"
                      className="absolute inset-0 rounded-full bg-[#1c3557]"
                      transition={{ duration: 0.3, ease }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/15" : "bg-[#1c3557]/5"}`}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {tab === "blogs" && blogs.length > 0 && (
              <FeedGrid key="blogs" >
                {blogs.map((b, i) => (
                  <BlogCard key={b._id} post={b} href={`/blog/${b.slug}`} i={i} />
                ))}
              </FeedGrid>
            )}
            {tab === "news" && news.length > 0 && (
              <FeedGrid key="news">
                {news.map((n, i) => (
                  <BlogCard key={n._id} post={n} href={`/news/${n.slug}`} i={i} news />
                ))}
              </FeedGrid>
            )}
            {tab === "resources" && resources.length > 0 && (
              <FeedGrid key="resources">
                {resources.map((r, i) => (
                  <ResourceCard key={r._id} resource={r} i={i} />
                ))}
              </FeedGrid>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

function FeedGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </motion.div>
  );
}

function BlogCard({ post, href, i, news }: { post: BlogItem; href: string; i: number; news?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i % 3}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl border border-[#1c3557]/6 hover:shadow-xl hover:shadow-[#1c3557]/6 transition-all duration-300 overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
      <Link href={href} className="block p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${news ? "bg-blue-50 text-blue-700" : "bg-[#e8f4f7] text-[#1c3557]"}`}>
            {news ? <Newspaper className="w-3 h-3" /> : <BookOpen className="w-3 h-3 text-[#4eafc4]" />}
            {post.category || (news ? "News" : "Blog")}
          </span>
          <span className="text-[11px] text-[#64788f] inline-flex items-center gap-1 ml-auto">
            <Calendar className="w-3 h-3" />
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h3
          className="text-[#0f1e35] mb-2 group-hover:text-[#4eafc4] transition-colors duration-200 line-clamp-2 leading-snug"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "1.05rem" }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-[#64788f] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-1.5 text-[#4eafc4] text-xs font-semibold">
          Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}

function ResourceCard({ resource, i }: { resource: ResourceItem; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const meta = resourceMeta(resource.type);
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i % 3}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl border border-[#1c3557]/6 hover:shadow-xl hover:shadow-[#1c3557]/6 transition-all duration-300 overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
      <Link href="/resources" className="block p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${meta.bg} ${meta.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          <span className="text-[11px] text-[#64788f] inline-flex items-center gap-1 ml-auto">
            <Calendar className="w-3 h-3" />
            {formatDate(resource.createdAt)}
          </span>
        </div>
        <h3
          className="text-[#0f1e35] mb-2 group-hover:text-[#4eafc4] transition-colors duration-200 line-clamp-2 leading-snug"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "1.05rem" }}
        >
          {resource.title}
        </h3>
        {resource.course && (
          <p className="text-[#64788f] text-sm">{resource.course}</p>
        )}
        <div className="mt-4 flex items-center gap-1.5 text-[#4eafc4] text-xs font-semibold">
          Browse resources <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Changelog timeline                                            */
/* ──────────────────────────────────────────────────────────── */
function Changelog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const entries = [
    {
      tag: "Launch",
      tagBg: "bg-emerald-50 text-emerald-700",
      date: "Jul 2026",
      title: "Virtual University Chrome Extension v1.0",
      body: "Instant in-browser access to every past paper and handout. Auto-fills course codes on the VU LMS portal.",
      icon: Chrome,
    },
    {
      tag: "Beta",
      tagBg: "bg-amber-50 text-amber-700",
      date: "Jul 2026",
      title: "VULMS Mobile App — Android beta",
      body: "Offline downloads, push notifications for new resources, and resume-where-you-left-off for video lectures.",
      icon: Smartphone,
    },
    {
      tag: "Update",
      tagBg: "bg-blue-50 text-blue-700",
      date: "Jun 2026",
      title: "AI-generated study guides",
      body: "Blogs are now generated and structured from uploaded resources, with FAQ sections and key points.",
      icon: Sparkles,
    },
    {
      tag: "Update",
      tagBg: "bg-violet-50 text-violet-700",
      date: "Jun 2026",
      title: "Cloudflare R2 storage",
      body: "All uploads moved to R2 for faster, more reliable downloads across Pakistan.",
      icon: Zap,
    },
  ];
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mb-10 text-center"
      >
        <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f4f7] text-[#1c3557] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#4eafc4]" /> Changelog
        </motion.span>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[#0f1e35]"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.3rem)", lineHeight: 1.15 }}
        >
          Shipped, recently
        </motion.h2>
      </motion.div>

      <div className="relative pl-8 sm:pl-10">
        {/* vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[#4eafc4] via-[#4eafc4]/40 to-transparent origin-top"
        />
        <div className="space-y-6">
          {entries.map((e, i) => (
            <motion.div
              key={e.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative"
            >
              <span className="absolute -left-[1.55rem] sm:-left-[1.95rem] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#4eafc4] shadow" />
              <div className="bg-white rounded-2xl border border-[#1c3557]/6 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${e.tagBg}`}>
                    {e.tag}
                  </span>
                  <span className="text-[11px] text-[#64788f] inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {e.date}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#e8f4f7] flex items-center justify-center shrink-0">
                    <e.icon className="w-4 h-4 text-[#4eafc4]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[#0f1e35] font-semibold mb-1" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {e.title}
                    </h3>
                    <p className="text-[#64788f] text-sm leading-relaxed">{e.body}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Final CTA                                                     */
/* ──────────────────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className="relative overflow-hidden bg-gradient-to-br from-[#0c1b2e] via-[#102844] to-[#1a3a5c] rounded-3xl p-8 sm:p-12 text-center shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#4eafc4]/18 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#2dd4bf]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative">
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.15 }}
          >
            Study smarter, everywhere you study
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-8">
            Install the extension, grab the app, and never lose a handout again.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 bg-[#4eafc4] text-[#0f1e35] rounded-full text-sm font-semibold hover:bg-[#3a95aa] hover:text-white transition-colors duration-300"
            >
              <Chrome className="w-4 h-4" />
              Add extension
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/8 border border-white/15 text-white rounded-full text-sm font-semibold hover:bg-white/15 transition-colors duration-300"
            >
              <Library className="w-4 h-4" />
              Browse resources
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function WhatsNewClient({ feed }: { feed: Feed }) {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <ExtensionSpotlight />
      <VulmsSpotlight />
      <StatsStrip />
      <Feed feed={feed} />
      <Changelog />
      <FinalCTA />
    </main>
  );
}
