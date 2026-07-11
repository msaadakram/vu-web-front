"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  BookOpen, FileText, Users, Award, ArrowRight,
  Clock, GraduationCap, Download, Sparkles, Newspaper, Library,
} from "lucide-react";
import { fetchStats, type LatestPost } from "@/lib/stats";
import { Skeleton } from "@/components/ui/skeleton";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 15 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

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
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function StatCard({ stat, i }: { stat: { icon: typeof Users; label: string; bg: string; color: string; value: number }; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { icon: Icon, label, bg, color, value } = stat;
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#1c3557]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
      </div>
      <div className="text-[#0f1e35] font-bold" style={{ fontSize: "clamp(1.4rem, 4vw, 1.75rem)", lineHeight: 1 }}>
        <AnimatedCounter target={value} suffix="+" />
      </div>
      <div className="text-[#64788f] text-xs sm:text-sm mt-1">{label}</div>
    </motion.div>
  );
}

function FeaturedPost({ post }: { post: LatestPost }) {
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
      className="lg:row-span-2 group bg-gradient-to-br from-[#0f1e35] to-[#1c3557] rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-[#1c3557]/30 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4eafc4]/10 rounded-full blur-2xl pointer-events-none" />
      {post.coverImage && (
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-5 border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e35]/50 to-transparent" />
        </div>
      )}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4eafc4]/20 text-[#4eafc4] rounded-full text-xs font-semibold mb-4">
          {post.type === "news" ? <Newspaper className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
          {post.category}
        </span>
        <h3
          className="text-white mb-4 group-hover:text-[#7dd4e8] transition-colors"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "clamp(1.2rem, 2.5vw, 1.4rem)", lineHeight: 1.3 }}
        >
          {post.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
      </div>
      <div>
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-xs font-bold">
            {(post.uploadedBy?.name || "VU").charAt(0)}
          </div>
          <div>
            <div className="text-white text-sm font-medium">{post.uploadedBy?.name || "VirtualU"}</div>
            <div className="text-white/40 text-xs">{formatDate(post.createdAt)} · {post.readTime}</div>
          </div>
          <div className="ml-auto w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#4eafc4] flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
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
      className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-[#1c3557]/8 hover:shadow-xl hover:shadow-[#1c3557]/8 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold mb-4 ${catStyle.bg} ${catStyle.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
        {post.category}
      </span>
      <h3
        className="text-[#0f1e35] mb-3 group-hover:text-[#4eafc4] transition-colors line-clamp-2"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.4 }}
      >
        {post.title}
      </h3>
      <p className="text-[#64788f] text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center gap-2 pt-4 border-t border-[#1c3557]/5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[10px] font-bold">
          {(post.uploadedBy?.name || "VU").charAt(0)}
        </div>
        <div className="text-[#64788f] text-xs">{post.uploadedBy?.name || "VirtualU"}</div>
        <div className="ml-auto flex items-center gap-1 text-[#64788f] text-xs">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </div>
      </div>
      <Link href={href} className="absolute inset-0" aria-label={post.title} />
    </motion.article>
  );
}

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-10 sm:mb-16">
      <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
        {tag}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#0f1e35", lineHeight: 1.25 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} custom={2} className="mt-4 text-[#64788f] max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

const programs = [
  {
    tag: "Undergraduate", icon: GraduationCap, accent: "#4eafc4",
    title: "Undergraduate",
    desc: "BS programs, B.Ed, Associate Degrees, and BS-Lateral entry — 4-year and 2-year options.",
    href: "/programs#undergraduate",
    grad: "from-[#f0f7fa] to-white",
    border: "border-[#4eafc4]/20",
    iconBg: "from-[#4eafc4] to-[#3a95aa]",
    hoverText: "group-hover:text-[#4eafc4]",
  },
  {
    tag: "Graduate", icon: Award, accent: "#a855f7",
    title: "Graduate",
    desc: "MS programs and MS-equivalent MBA — advance your expertise with HEC-recognized graduate degrees.",
    href: "/programs#graduate",
    grad: "from-[#f5f0ff] to-white",
    border: "border-purple-200",
    iconBg: "from-purple-500 to-purple-600",
    hoverText: "group-hover:text-purple-500",
  },
  {
    tag: "Diplomas", icon: BookOpen, accent: "#fb923c",
    title: "Diplomas & Short Courses",
    desc: "Diplomas, short courses, specialization certificates, and Zero Semester — flexible learning options.",
    href: "/programs#diplomas",
    grad: "from-[#fff8f0] to-white",
    border: "border-orange-200",
    iconBg: "from-orange-400 to-orange-500",
    hoverText: "group-hover:text-orange-500",
  },
];

export default function HomePage() {
  const [stats, setStats] = useState<{ resources: number; blogs: number; news: number; students: number } | null>(null);
  const [latest, setLatest] = useState<LatestPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchStats()
      .then((data) => {
        setStats(data.counts);
        setLatest(data.latest || []);
      })
      .catch(() => {
        setStats({ resources: 0, blogs: 0, news: 0, students: 0 });
      })
      .finally(() => setLoaded(true));
  }, []);

  const statCards = [
    { icon: FileText, label: "Study Resources", bg: "bg-[#e8f4f7]", color: "text-[#4eafc4]", value: stats?.resources ?? 0 },
    { icon: BookOpen, label: "Blog Articles", bg: "bg-emerald-50", color: "text-emerald-600", value: stats?.blogs ?? 0 },
    { icon: Newspaper, label: "News & Updates", bg: "bg-orange-50", color: "text-orange-500", value: stats?.news ?? 0 },
    { icon: Users, label: "Registered Students", bg: "bg-purple-50", color: "text-purple-500", value: stats?.students ?? 0 },
  ];

  const featured = latest[0];
  const rest = latest.slice(1, 4);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-20 min-h-[90vh] flex items-center bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#4eafc4] blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2a4a73] blur-[100px]"
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(78,175,196,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(78,175,196,0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#4eafc4]/15 border border-[#4eafc4]/30 rounded-full mb-6 sm:mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4eafc4] shrink-0" />
                <span className="text-[#4eafc4] text-[11px] sm:text-xs font-medium tracking-wider">Pakistan&apos;s Leading Virtual University Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "white", lineHeight: 1.1, fontSize: "clamp(2.1rem, 7vw, 3.75rem)" }}
              >
                Learn Smarter,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4eafc4] to-[#7dd4e8]">
                  Achieve More
                </span>{" "}
                with VirtualU
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-5 sm:mt-6 text-white/65 leading-relaxed max-w-lg"
                style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)" }}
              >
                Access thousands of study resources, expert-written blogs, and comprehensive study materials. Your academic success starts here.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
              >
                <Link
                  href="/resources"
                  className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-full font-semibold shadow-2xl shadow-[#4eafc4]/30 hover:shadow-[#4eafc4]/50 transition-all duration-300 text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" />
                  Browse Resources
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Blog
                </Link>
              </motion.div>

              {loaded && (stats?.resources || 0) > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mt-10 sm:mt-12 flex flex-wrap gap-6 sm:gap-8"
                >
                  {[
                    { val: `${stats!.resources}+`, label: "Resources" },
                    { val: `${stats!.blogs + stats!.news}+`, label: "Articles" },
                    { val: `${stats!.students}+`, label: "Students" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-white font-bold text-lg sm:text-xl">{s.val}</div>
                      <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4eafc4]/20 to-transparent rounded-3xl blur-xl" />
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8">
                  <Link href="/resources" className="block">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4eafc4] to-[#2a4a73] flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Resource Library</div>
                        <div className="text-white/50 text-xs">Browse study materials</div>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        {stats ? `${stats.resources} files` : "Available"}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {["Assignments", "Past Papers", "Handouts", "Lecture Notes"].map((resource, i) => (
                        <motion.div
                          key={resource}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <FileText className="w-4 h-4 text-[#4eafc4]" />
                          <span className="text-white/70 text-sm flex-1">{resource}</span>
                          <Download className="w-3.5 h-3.5 text-white/30 group-hover:text-[#4eafc4] transition-colors" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-5 w-full py-3 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Library className="w-4 h-4" />
                      View All Resources
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 40C480 80 240 0 0 20L0 80Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statCards.map((stat, i) =>
              loaded ? (
                <StatCard key={stat.label} stat={stat} i={i} />
              ) : (
                <Skeleton key={stat.label} className="h-[160px] sm:h-[180px] rounded-2xl" />
              )
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Latest Articles"
            title="Expert Knowledge, Student Success"
            subtitle="Fresh articles and news generated and curated for Virtual University students."
          />
          {loaded ? (
            latest.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                {featured && <FeaturedPost post={featured} />}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {rest.map((post, i) => (
                    <SmallPost key={post._id} post={post} i={i + 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-[#e8f4f7] flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-[#4eafc4]" />
                </div>
                <h3 className="text-[#0f1e35] font-semibold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  No articles yet
                </h3>
                <p className="text-[#64788f] text-sm max-w-md mx-auto">
                  Articles appear here once they are generated. Admins can create news or upload resources to generate blog posts.
                </p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:row-span-2 h-[420px] rounded-3xl" />
              <Skeleton className="h-[200px] rounded-2xl" />
              <Skeleton className="h-[200px] rounded-2xl" />
              <Skeleton className="h-[200px] rounded-2xl" />
              <Skeleton className="h-[200px] rounded-2xl" />
            </div>
          )}
          {latest.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 border-2 border-[#1c3557] text-[#1c3557] rounded-full font-semibold hover:bg-[#1c3557] hover:text-white transition-all duration-300 group text-sm sm:text-base"
              >
                View All Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Academic Programs"
            title="Programs Offered at Virtual University"
            subtitle="Explore undergraduate, graduate, diploma, and short course programs designed for diverse academic interests."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {programs.map((p, i) => (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={p.href}
                  className={`group block bg-gradient-to-br ${p.grad} border ${p.border} rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-[#4eafc4]/10 hover:-translate-y-1 transition-all duration-300 h-full`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.iconBg} flex items-center justify-center mb-5`}>
                    <p.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-[#0f1e35] font-bold mb-2 text-lg ${p.hoverText} transition-colors`}
                    style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-[#64788f] text-sm leading-relaxed mb-4">{p.desc}</p>
                  <span className={`text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all ${p.hoverText}`} style={{ color: p.accent }}>
                    Browse Programs <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#1c3557] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base"
            >
              View All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4eafc4]/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
              Join VirtualU
            </span>
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.2 }}
            >
              Ready to Ace Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4eafc4] to-[#7dd4e8]">
                Exams?
              </span>
            </h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
              Get unlimited access to study guides, resources, and expert articles. Start your learning journey today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/resources"
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-full font-semibold shadow-2xl shadow-[#4eafc4]/30 hover:shadow-[#4eafc4]/50 transition-all duration-300 text-sm sm:text-base"
              >
                Get Started Free
              </Link>
              <Link
                href="/blog"
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
              >
                Explore Blogs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
