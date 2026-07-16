"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion, useInView, useMotionValue, useSpring,
  useScroll, useTransform, AnimatePresence,
} from "motion/react";
import {
  BookOpen, FileText, Users, Award, ArrowRight,
  Clock, GraduationCap, Download, Sparkles, Newspaper, Library,
  Star, Zap, Shield, TrendingUp, ChevronRight,
} from "lucide-react";
import { fetchStats, type LatestPost } from "@/lib/stats";
import { Skeleton } from "@/components/ui/skeleton";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.11, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 14 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);
  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Computer Science": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  Mathematics: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  Business: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Physics: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  Chemistry: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  Economics: { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" },
  English: { bg: "bg-pink-50", text: "text-pink-700", dot: "bg-pink-500" },
};
function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
}
function formatDate(iso: string) {
  try {
    const d = new Date(iso), now = new Date();
    const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch { return ""; }
}

function StatCard({ stat, i }: { stat: { icon: typeof Users; label: string; bg: string; color: string; value: number; gradient: string }; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { icon: Icon, label, bg, color, value, gradient } = stat;
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#1c3557]/5 hover:shadow-xl hover:shadow-[#1c3557]/6 transition-shadow duration-300 overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${bg} flex items-center justify-center mb-4 sm:mb-5`}>
        <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${color}`} />
      </div>
      <div className="text-[#0f1e35] font-extrabold" style={{ fontSize: "clamp(1.3rem, 5vw, 2rem)", lineHeight: 1 }}>
        <AnimatedCounter target={value} suffix="+" />
      </div>
      <div className="text-[#64788f] text-[11px] sm:text-sm mt-1.5 font-medium leading-tight">{label}</div>
    </motion.div>
  );
}

function FeaturedPost({ post }: { post: LatestPost }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const href = post.type === "news" ? `/news/${post.slug}` : `/blog/${post.slug}`;
  return (
    <motion.article
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="lg:row-span-2 group bg-gradient-to-br from-[#0f1e35] via-[#153050] to-[#1c3557] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xl shadow-[#0f1e35]/20"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#4eafc4]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2dd4bf]/8 rounded-full blur-2xl pointer-events-none" />
      {post.coverImage && (
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-5 border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e35]/60 to-transparent" />
        </div>
      )}
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4eafc4]/20 text-[#7dd4e8] rounded-full text-[11px] font-semibold mb-4 border border-[#4eafc4]/20">
          {post.type === "news" ? <Newspaper className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
          {post.category}
        </span>
        <h3
          className="text-white mb-3 group-hover:text-[#7dd4e8] transition-colors duration-300"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)", lineHeight: 1.3 }}
        >
          {post.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
      </div>
      <div className="relative flex items-center gap-3 mt-8 pt-5 border-t border-white/8">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-xs font-bold shrink-0">
          {(post.uploadedBy?.name || "VU").charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="text-white text-sm font-medium truncate">{post.uploadedBy?.name || "VirtualU"}</div>
          <div className="text-white/35 text-xs">{formatDate(post.createdAt)} · {post.readTime}</div>
        </div>
        <motion.div
          whileHover={{ x: 4 }}
          className="ml-auto w-9 h-9 rounded-full bg-white/8 group-hover:bg-[#4eafc4] flex items-center justify-center transition-colors duration-300 shrink-0"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.div>
      </div>
      <Link href={href} className="absolute inset-0" aria-label={post.title} />
    </motion.article>
  );
}

function SmallPost({ post, i }: { post: LatestPost; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const href = post.type === "news" ? `/news/${post.slug}` : `/blog/${post.slug}`;
  const catStyle = getCategoryStyle(post.category);
  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-[#1c3557]/6 hover:shadow-xl hover:shadow-[#1c3557]/6 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold mb-4 ${catStyle.bg} ${catStyle.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
        {post.category}
      </span>
      <h3
        className="text-[#0f1e35] mb-2.5 group-hover:text-[#4eafc4] transition-colors duration-200 line-clamp-2 leading-snug"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "1rem" }}
      >
        {post.title}
      </h3>
      <p className="text-[#64788f] text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center gap-2 pt-3.5 border-t border-[#1c3557]/5">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
          {(post.uploadedBy?.name || "VU").charAt(0)}
        </div>
        <div className="text-[#64788f] text-xs truncate flex-1">{post.uploadedBy?.name || "VirtualU"}</div>
        <div className="flex items-center gap-1 text-[#64788f] text-xs shrink-0">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </div>
      </div>
      <Link href={href} className="absolute inset-0" aria-label={post.title} />
    </motion.article>
  );
}

function SectionHeading({ tag, title, subtitle, light = false }: { tag: string; title: string; subtitle?: string; light?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-10 sm:mb-16">
      <motion.span
        variants={fadeUp} custom={0}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${
          light ? "bg-[#4eafc4]/15 text-[#7dd4e8] border border-[#4eafc4]/20" : "bg-[#e8f4f7] text-[#4eafc4]"
        }`}
      >
        <Sparkles className="w-3 h-3" />{tag}
      </motion.span>
      <motion.h2
        variants={fadeUp} custom={1}
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 800,
          fontSize: "clamp(1.35rem, 5vw, 2.6rem)",
          color: light ? "white" : "#0f1e35",
          lineHeight: 1.25,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp} custom={2}
          className={`mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2 ${
            light ? "text-white/55" : "text-[#64788f]"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

const features = [
  { icon: Zap, title: "Instant Access", desc: "Download any resource immediately — no waiting, no limits.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Shield, title: "Verified Content", desc: "All materials reviewed and verified for accuracy by educators.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: TrendingUp, title: "Stay Ahead", desc: "Always up-to-date with the latest syllabus and course changes.", color: "text-[#4eafc4]", bg: "bg-[#e8f4f7]" },
  { icon: Star, title: "Expert Writers", desc: "Blog articles crafted by experienced VU educators and alumni.", color: "text-purple-500", bg: "bg-purple-50" },
];

const programs = [
  {
    tag: "Undergraduate", icon: GraduationCap,
    title: "Undergraduate Programs",
    desc: "BS programs, B.Ed, Associate Degrees, and BS-Lateral entry — 4-year and 2-year options with HEC recognition.",
    href: "/programs#undergraduate",
    gradient: "from-[#4eafc4]/10 via-[#e8f4f7] to-white",
    border: "border-[#4eafc4]/20",
    iconGrad: "from-[#4eafc4] to-[#3a95aa]",
    accentColor: "text-[#4eafc4]",
    hoverShadow: "hover:shadow-[#4eafc4]/15",
    badge: "bg-[#e8f4f7] text-[#4eafc4]",
  },
  {
    tag: "Graduate", icon: Award,
    title: "Graduate Programs",
    desc: "MS programs and MS-equivalent MBA — advance your expertise with HEC-recognized graduate degrees and specializations.",
    href: "/programs#graduate",
    gradient: "from-purple-50 via-purple-50/60 to-white",
    border: "border-purple-200/60",
    iconGrad: "from-purple-500 to-purple-600",
    accentColor: "text-purple-500",
    hoverShadow: "hover:shadow-purple-200/40",
    badge: "bg-purple-50 text-purple-600",
  },
  {
    tag: "Diplomas", icon: BookOpen,
    title: "Diplomas & Short Courses",
    desc: "Flexible certificates, short courses, specializations, and Zero Semester for students at every stage.",
    href: "/programs#diplomas",
    gradient: "from-orange-50 via-orange-50/50 to-white",
    border: "border-orange-200/60",
    iconGrad: "from-orange-400 to-orange-500",
    accentColor: "text-orange-500",
    hoverShadow: "hover:shadow-orange-200/40",
    badge: "bg-orange-50 text-orange-600",
  },
];

function Particle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#4eafc4]/20 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: ["-10px", "10px", "-10px"], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function HomePage() {
  const [stats, setStats] = useState<{ resources: number; blogs: number; news: number; students: number } | null>(null);
  const [latest, setLatest] = useState<LatestPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    fetchStats()
      .then((data) => { setStats(data.counts); setLatest(data.latest || []); })
      .catch(() => setStats({ resources: 0, blogs: 0, news: 0, students: 0 }))
      .finally(() => setLoaded(true));
  }, []);

  const statCards = [
    { icon: FileText, label: "Study Resources", bg: "bg-[#e8f4f7]", color: "text-[#4eafc4]", value: stats?.resources ?? 0, gradient: "bg-[#4eafc4]/20" },
    { icon: BookOpen, label: "Blog Articles", bg: "bg-emerald-50", color: "text-emerald-600", value: stats?.blogs ?? 0, gradient: "bg-emerald-200/30" },
    { icon: Newspaper, label: "News Updates", bg: "bg-orange-50", color: "text-orange-500", value: stats?.news ?? 0, gradient: "bg-orange-200/30" },
    { icon: Users, label: "Registered Students", bg: "bg-purple-50", color: "text-purple-500", value: stats?.students ?? 0, gradient: "bg-purple-200/30" },
  ];

  const featured = latest[0];
  const rest = latest.slice(1, 4);

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] sm:min-h-[95vh] flex items-center bg-gradient-to-br from-[#060f1c] via-[#0f1e35] to-[#132843] overflow-hidden"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12], x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-5%] right-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#4eafc4] blur-[100px] sm:blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full bg-[#2dd4bf] blur-[90px] sm:blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute top-[40%] left-[40%] w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full bg-[#a855f7] blur-[80px] sm:blur-[100px]"
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(78,175,196,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(78,175,196,0.6) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <Particle delay={0} x="15%" y="20%" size={8} />
          <Particle delay={1.5} x="80%" y="30%" size={5} />
          <Particle delay={0.8} x="60%" y="70%" size={10} />
          <Particle delay={2.2} x="30%" y="60%" size={6} />
          <Particle delay={3} x="88%" y="65%" size={7} />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 sm:pb-32"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── Left content ── */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#4eafc4]/12 border border-[#4eafc4]/25 rounded-full mb-5 sm:mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4eafc4] shrink-0" />
                <span className="text-[#7dd4e8] text-[10px] sm:text-xs font-semibold tracking-wide">
                  Pakistan&apos;s #1 Virtual University Platform
                </span>
              </motion.div>

              {/* H1 — mobile-first font scale */}
              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="text-white"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 800,
                  lineHeight: 1.12,
                  fontSize: "clamp(1.75rem, 8vw, 3.8rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Learn Smarter,{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4eafc4] via-[#7dd4e8] to-[#2dd4bf]">
                    Achieve More
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
                {" "}with VirtualU
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-4 sm:mt-6 text-white/60 leading-relaxed max-w-sm sm:max-w-lg text-sm sm:text-base"
              >
                Free BSCS subjects list semester-wise, opencourseware, VU LMS &amp; admission guides, MBA, BBA, MS programs and fee structure — everything for Virtual University of Pakistan students.
              </motion.p>

              {/* Intent router — surfaces the three highest-volume head terms
                  (BSCS subjects, uni admission, VU LMS) directly above the fold
                  instead of generic marketing copy. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full"
              >
                {[
                  { label: "BSCS Subjects List", href: "/programs/bs-computer-science", icon: BookOpen },
                  { label: "Uni Admission Guide", href: "/about", icon: GraduationCap },
                  { label: "VU LMS Login Help", href: "/resources", icon: Library },
                ].map((c, i) => (
                  <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.07 }}>
                    <Link
                      href={c.href}
                      className="group flex items-center gap-2.5 w-full px-4 py-3 bg-white/8 hover:bg-white/14 border border-white/12 hover:border-[#4eafc4]/40 rounded-2xl text-left transition-all duration-200"
                    >
                      <c.icon className="w-4 h-4 text-[#4eafc4] shrink-0" />
                      <span className="text-white/80 text-xs sm:text-sm font-medium leading-tight flex-1">{c.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#4eafc4] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA buttons — full-width stack on mobile, row on sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              >
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Link
                    href="/resources"
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-full font-bold shadow-2xl shadow-[#4eafc4]/35 hover:shadow-[#4eafc4]/55 transition-shadow duration-300 text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    Browse Resources
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Link
                    href="/blog"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 bg-white/8 backdrop-blur-sm border border-white/15 text-white rounded-full font-semibold hover:bg-white/15 hover:border-white/25 transition-all duration-300 text-sm sm:text-base"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    Read Blog
                  </Link>
                </motion.div>
              </motion.div>

              {/* Inline mini-stats */}
              {loaded && (stats?.resources || 0) > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 sm:mt-12 flex justify-center lg:justify-start gap-6 sm:gap-8 w-full"
                >
                  {[
                    { val: `${stats!.resources}+`, label: "Resources" },
                    { val: `${stats!.blogs + stats!.news}+`, label: "Articles" },
                    { val: `${stats!.students}+`, label: "Students" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 + i * 0.08 }}
                      className="flex flex-col items-center lg:items-start"
                    >
                      <span className="text-white font-extrabold text-xl sm:text-2xl">{s.val}</span>
                      <span className="text-white/45 text-xs mt-0.5">{s.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* ── Right: resource card (desktop only) ── */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-4 bg-[#4eafc4]/15 rounded-3xl blur-2xl" />
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white/8 backdrop-blur-xl border border-white/12 rounded-3xl p-7 shadow-2xl"
              >
                <Link href="/resources" className="block">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4eafc4] to-[#2a4a73] flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-base">Resource Library</div>
                      <div className="text-white/45 text-xs">Browse all study materials</div>
                    </div>
                    <span className="shrink-0 px-3 py-1.5 bg-green-500/15 text-green-400 border border-green-500/20 rounded-full text-xs font-semibold">
                      {stats ? `${stats.resources} files` : "Available"}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {["Assignments", "Past Papers", "Handouts", "Lecture Notes"].map((resource, i) => (
                      <motion.div
                        key={resource}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#4eafc4]/15 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-[#4eafc4]" />
                        </div>
                        <span className="text-white/70 text-sm flex-1 font-medium">{resource}</span>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#4eafc4] transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mt-5 w-full py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] rounded-2xl text-white text-sm font-bold hover:shadow-lg hover:shadow-[#4eafc4]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Library className="w-4 h-4" />
                    View All Resources
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L1440 100L1440 30C1300 90 1100 10 900 50C700 90 500 10 300 50C150 80 60 20 0 30L0 100Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="py-12 sm:py-20 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {statCards.map((stat, i) =>
              loaded ? (
                <StatCard key={stat.label} stat={stat} i={i} />
              ) : (
                <Skeleton key={stat.label} className="h-[140px] sm:h-[190px] rounded-3xl" />
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <section className="py-12 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Why VirtualU"
            title="Everything You Need to Excel"
            subtitle="We bring the best study resources, expert content, and modern tools together in one place."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white border border-[#1c3557]/6 rounded-3xl p-5 sm:p-6 hover:shadow-xl hover:shadow-[#1c3557]/6 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-4 sm:mb-5`}>
                    <f.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${f.color}`} />
                  </div>
                  <h3 className="text-[#0f1e35] font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">{f.title}</h3>
                  <p className="text-[#64788f] text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ LATEST ARTICLES ═══════════════════ */}
      <section className="py-12 sm:py-24 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Latest Articles"
            title="Expert Knowledge, Student Success"
            subtitle="Fresh articles and news curated for Virtual University students by educators and experts."
          />
          {loaded ? (
            latest.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {featured && <FeaturedPost post={featured} />}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {rest.map((post, i) => <SmallPost key={post._id} post={post} i={i + 1} />)}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#e8f4f7] flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#4eafc4]" />
                </div>
                <h3 className="text-[#0f1e35] font-bold mb-2 text-base sm:text-lg" style={{ fontFamily: "var(--font-playfair), serif" }}>No articles yet</h3>
                <p className="text-[#64788f] text-sm max-w-sm mx-auto">Articles appear once generated by admins. Check back soon!</p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <Skeleton className="lg:row-span-2 h-[300px] sm:h-[440px] rounded-3xl" />
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[180px] sm:h-[210px] rounded-2xl" />)}
            </div>
          )}
          {latest.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-12"
            >
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-[#1c3557] text-[#1c3557] rounded-full font-bold hover:bg-[#1c3557] hover:text-white transition-all duration-300 group text-sm sm:text-base"
                >
                  View All Articles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════ PROGRAMS ═══════════════════ */}
      <section className="py-12 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Academic Programs"
            title="Programs at Virtual University"
            subtitle="Explore undergraduate, graduate, diploma, and short course programs designed for all academic interests."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {programs.map((p, i) => (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link
                  href={p.href}
                  className={`group flex flex-col bg-gradient-to-br ${p.gradient} border ${p.border} rounded-3xl p-5 sm:p-8 hover:shadow-2xl ${p.hoverShadow} transition-all duration-300 h-full`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${p.iconGrad} flex items-center justify-center mb-4 sm:mb-5 shadow-lg`}>
                    <p.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-2.5 w-fit ${p.badge}`}>{p.tag}</span>
                  <h3
                    className={`text-[#0f1e35] font-bold mb-2.5 text-base sm:text-lg leading-snug`}
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[#64788f] text-xs sm:text-sm leading-relaxed flex-1">{p.desc}</p>
                  <span className={`mt-4 text-xs sm:text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all ${p.accentColor}`}>
                    Browse Programs <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#1c3557] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base"
              >
                View All Programs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="relative py-16 sm:py-28 bg-gradient-to-br from-[#060f1c] via-[#0f1e35] to-[#132843] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-[#4eafc4]/20 rounded-full blur-[80px]"
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(78,175,196,0.8) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#4eafc4]/12 border border-[#4eafc4]/25 text-[#7dd4e8] rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5 sm:mb-6">
              <Sparkles className="w-3 h-3" /> Join VirtualU Today
            </span>
            <h2
              className="text-white mb-4 sm:mb-5"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 6vw, 3.2rem)",
                lineHeight: 1.2,
              }}
            >
              Ready to Ace Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4eafc4] via-[#7dd4e8] to-[#2dd4bf]">
                Exams?
              </span>
            </h2>
            <p className="text-white/55 mb-7 sm:mb-10 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
              Get unlimited access to study guides, resources, and expert articles. Start your learning journey today — completely free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-full font-bold shadow-2xl shadow-[#4eafc4]/35 hover:shadow-[#4eafc4]/55 transition-shadow duration-300 text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" /> Get Started Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/8 border border-white/15 text-white rounded-full font-semibold hover:bg-white/15 hover:border-white/25 transition-all duration-300 text-sm sm:text-base"
                >
                  <BookOpen className="w-4 h-4" /> Explore Blogs
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
