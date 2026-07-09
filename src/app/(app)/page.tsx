"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  BookOpen, FileText, Users, Award, ArrowRight,
  Clock, ChevronRight, TrendingUp, GraduationCap, Download, Sparkles
} from "lucide-react";

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

const statsData = [
  { icon: Users, value: 250000, suffix: "+", label: "Registered Students", bg: "bg-[#e8f4f7]", color: "text-[#4eafc4]" },
  { icon: FileText, value: 15000, suffix: "+", label: "Study Resources", bg: "bg-purple-100", color: "text-purple-500" },
  { icon: BookOpen, value: 450, suffix: "+", label: "Blog Articles", bg: "bg-green-100", color: "text-green-500" },
  { icon: Award, value: 50, suffix: "+", label: "Programs Offered", bg: "bg-orange-100", color: "text-orange-500" },
];

function StatCard({ stat, i }: { stat: typeof statsData[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { icon: Icon, value, suffix, label, bg, color } = stat;
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      className="bg-white rounded-2xl p-7 shadow-sm border border-[#1c3557]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="text-[#0f1e35] font-bold" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <div className="text-[#64788f] text-sm mt-1">{label}</div>
    </motion.div>
  );
}

const featuredBlogs = [
  {
    id: 1, tag: "Computer Science", tagColor: "bg-blue-100 text-blue-700",
    title: "Understanding Data Structures: A Complete Guide for CS Students",
    excerpt: "Master the fundamentals of arrays, linked lists, trees, and graphs with practical examples and real-world applications.",
    author: "Dr. Ahmed Raza", avatar: "AR", avatarColor: "bg-[#4eafc4]",
    date: "Dec 15, 2024", readTime: "8 min read",
  },
  {
    id: 2, tag: "Mathematics", tagColor: "bg-purple-100 text-purple-700",
    title: "Calculus Made Simple: Derivatives and Integrals Explained",
    excerpt: "Breaking down complex calculus concepts into digestible pieces with step-by-step solutions.",
    author: "Prof. Sadia Khan", avatar: "SK", avatarColor: "bg-purple-500",
    date: "Dec 12, 2024", readTime: "6 min read",
  },
  {
    id: 3, tag: "Business", tagColor: "bg-green-100 text-green-700",
    title: "Strategic Management in the Digital Age: Case Studies",
    excerpt: "Exploring how modern businesses leverage digital strategies to gain competitive advantage.",
    author: "Dr. Imran Malik", avatar: "IM", avatarColor: "bg-green-600",
    date: "Dec 10, 2024", readTime: "10 min read",
  },
  {
    id: 4, tag: "Physics", tagColor: "bg-orange-100 text-orange-700",
    title: "Quantum Mechanics: From Theory to Application",
    excerpt: "An accessible introduction to quantum phenomena and their surprising real-world applications.",
    author: "Prof. Zara Ahmed", avatar: "ZA", avatarColor: "bg-orange-500",
    date: "Dec 8, 2024", readTime: "12 min read",
  },
];

function FeaturedBlogCard({ blog }: { blog: typeof featuredBlogs[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="lg:row-span-2 group bg-gradient-to-br from-[#0f1e35] to-[#1c3557] rounded-3xl p-8 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-[#1c3557]/30 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4eafc4]/10 rounded-full blur-2xl pointer-events-none" />
      <div>
        <span className="inline-block px-3 py-1 bg-[#4eafc4]/20 text-[#4eafc4] rounded-full text-xs font-semibold mb-4">
          {blog.tag}
        </span>
        <h3
          className="text-white mb-4 group-hover:text-[#7dd4e8] transition-colors"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "1.4rem", lineHeight: 1.3 }}
        >
          {blog.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">{blog.excerpt}</p>
      </div>
      <div>
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
          <div className={`w-9 h-9 rounded-full ${blog.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
            {blog.avatar}
          </div>
          <div>
            <div className="text-white text-sm font-medium">{blog.author}</div>
            <div className="text-white/40 text-xs">{blog.date} · {blog.readTime}</div>
          </div>
          <div className="ml-auto w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#4eafc4] flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SmallBlogCard({ blog, i }: { blog: typeof featuredBlogs[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      className="group bg-white rounded-2xl p-6 border border-[#1c3557]/8 hover:shadow-xl hover:shadow-[#1c3557]/8 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${blog.tagColor}`}>{blog.tag}</span>
      <h3
        className="text-[#0f1e35] mb-3 group-hover:text-[#4eafc4] transition-colors"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "1rem", lineHeight: 1.4 }}
      >
        {blog.title}
      </h3>
      <p className="text-[#64788f] text-xs leading-relaxed mb-4">{blog.excerpt.slice(0, 80)}...</p>
      <div className="flex items-center gap-2 pt-4 border-t border-[#1c3557]/5">
        <div className={`w-7 h-7 rounded-full ${blog.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>{blog.avatar}</div>
        <div className="text-[#64788f] text-xs">{blog.author}</div>
        <div className="ml-auto flex items-center gap-1 text-[#64788f] text-xs">
          <Clock className="w-3 h-3" />
          {blog.readTime}
        </div>
      </div>
    </motion.article>
  );
}

const subjects = [
  { name: "Computer Science", resources: 320, icon: "💻", color: "from-blue-500/10 to-blue-500/5 border-blue-200" },
  { name: "Mathematics", resources: 280, icon: "📐", color: "from-purple-500/10 to-purple-500/5 border-purple-200" },
  { name: "Business Admin", resources: 240, icon: "📊", color: "from-green-500/10 to-green-500/5 border-green-200" },
  { name: "Physics", resources: 195, icon: "⚛️", color: "from-orange-500/10 to-orange-500/5 border-orange-200" },
  { name: "Chemistry", resources: 170, icon: "🔬", color: "from-red-500/10 to-red-500/5 border-red-200" },
  { name: "Economics", resources: 155, icon: "📈", color: "from-teal-500/10 to-teal-500/5 border-teal-200" },
];

function SubjectCard({ subject, i }: { subject: typeof subjects[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      className={`group bg-gradient-to-br ${subject.color} border rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
    >
      <div className="text-3xl mb-3">{subject.icon}</div>
      <h3 className="text-[#0f1e35] font-semibold mb-1">{subject.name}</h3>
      <p className="text-[#64788f] text-sm">{subject.resources} resources available</p>
      <div className="mt-4 flex items-center gap-1 text-[#4eafc4] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Browse <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
      <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
        {tag}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#0f1e35", lineHeight: 1.25 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} custom={2} className="mt-4 text-[#64788f] max-w-xl mx-auto text-base leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#4eafc4]/15 border border-[#4eafc4]/30 rounded-full mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4eafc4]" />
                <span className="text-[#4eafc4] text-xs font-medium tracking-wider">Pakistan&apos;s Leading Virtual University Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "white", lineHeight: 1.1, fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
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
                className="mt-6 text-white/65 leading-relaxed max-w-lg"
                style={{ fontSize: "1.05rem" }}
              >
                Access thousands of study resources, expert-written blogs, and comprehensive study materials. Your academic success starts here.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  href="/resources"
                  className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-full font-semibold shadow-2xl shadow-[#4eafc4]/30 hover:shadow-[#4eafc4]/50 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Browse Resources
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Blog
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-12 flex gap-8"
              >
                {[
                  { val: "250K+", label: "Students" },
                  { val: "15K+", label: "Resources" },
                  { val: "4.9★", label: "Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-white font-bold text-xl">{s.val}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4eafc4] to-[#2a4a73] flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <div className="text-white font-semibold">Resource Library</div>
                    <div className="text-white/50 text-xs">CS301 - Data Structures</div>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Available</span>
                  </div>
                  <div className="space-y-3">
                    {["Assignment 1 - Spring 2024", "Final Term Solved - Fall 2023", "Handout - Chapter 5", "Lecture Notes - Spring 2023"].map((resource, i) => (
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
                  <button className="mt-5 w-full py-3 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                    View All Resources
                  </button>
                </div>

                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-[#0f1e35] font-bold text-sm">98% Pass Rate</div>
                    <div className="text-[#64788f] text-xs">With our resources</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e8f4f7] flex items-center justify-center">
                    <Download className="w-5 h-5 text-[#4eafc4]" />
                  </div>
                  <div>
                    <div className="text-[#0f1e35] font-bold text-sm">2.4M Downloads</div>
                    <div className="text-[#64788f] text-xs">Resources this year</div>
                  </div>
                </motion.div>
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

      {/* ── Stats ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, i) => <StatCard key={stat.label} stat={stat} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Featured Blogs ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            tag="Latest Articles"
            title="Expert Knowledge, Student Success"
            subtitle="Dive into our curated blog posts written by faculty and subject matter experts."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FeaturedBlogCard blog={featuredBlogs[0]} />
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredBlogs.slice(1).map((blog, i) => (
                <SmallBlogCard key={blog.id} blog={blog} i={i + 1} />
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#1c3557] text-[#1c3557] rounded-full font-semibold hover:bg-[#1c3557] hover:text-white transition-all duration-300 group"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            tag="Study Resources"
            title="Browse by Subject"
            subtitle="Find study resources organized by subject and semester for easy access."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((subject, i) => <SubjectCard key={subject.name} subject={subject} i={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#1c3557] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              View All Resources
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Programs Section ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            tag="Academic Programs"
            title="Programs Offered at Virtual University"
            subtitle="Explore undergraduate, graduate, diploma, and short course programs designed for diverse academic interests."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/programs#undergraduate"
              className="group bg-gradient-to-br from-[#f0f7fa] to-white border border-[#4eafc4]/20 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#4eafc4]/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4eafc4] to-[#3a95aa] flex items-center justify-center mb-5">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[#0f1e35] font-bold mb-2 text-lg group-hover:text-[#4eafc4] transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}>
                Undergraduate
              </h3>
              <p className="text-[#64788f] text-sm leading-relaxed mb-4">
                BS programs, B.Ed, Associate Degrees, and BS-Lateral entry programs — 4-year and 2-year options.
              </p>
              <span className="text-[#4eafc4] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse Programs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/programs#graduate"
              className="group bg-gradient-to-br from-[#f5f0ff] to-white border border-purple-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-5">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[#0f1e35] font-bold mb-2 text-lg group-hover:text-purple-500 transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}>
                Graduate
              </h3>
              <p className="text-[#64788f] text-sm leading-relaxed mb-4">
                MS programs and MS-equivalent MBA — advance your expertise with HEC-recognized graduate degrees.
              </p>
              <span className="text-purple-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse Programs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/programs#diplomas"
              className="group bg-gradient-to-br from-[#fff8f0] to-white border border-orange-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-5">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[#0f1e35] font-bold mb-2 text-lg group-hover:text-orange-500 transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}>
                Diplomas & Short Courses
              </h3>
              <p className="text-[#64788f] text-sm leading-relaxed mb-4">
                Diplomas, short courses, specialization certificates, and Zero Semester — flexible learning options.
              </p>
              <span className="text-orange-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse Programs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#1c3557] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              View All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4eafc4]/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
              Join 250,000+ Students
            </span>
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
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
                className="px-8 py-4 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-full font-semibold shadow-2xl shadow-[#4eafc4]/30 hover:shadow-[#4eafc4]/50 transition-all duration-300"
              >
                Get Started Free
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
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
