"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Clock, ArrowRight, BookOpen, FileText, Eye, Sparkles, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { listBlogs, type ApiBlogSummary } from "@/lib/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

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
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function BlogCard({ post, i }: { post: ApiBlogSummary; i: number }) {
  const catStyle = getCategoryStyle(post.category);

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={i % 3}
        className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6 pb-5 flex flex-col flex-1">
          {/* Category & date row */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
              {post.category}
            </span>
            <span className="text-[#94a3b8] text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-[#0f172a] mb-2.5 group-hover:text-[#4eafc4] transition-colors leading-snug"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#64788b] text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {(post.uploadedBy?.name || "VU").charAt(0)}
              </div>
              <span className="text-[#64788b] text-xs font-medium truncate">
                {post.uploadedBy?.name || "VirtualU"}
              </span>
            </div>
            <span className="text-[#94a3b8] text-xs flex items-center gap-1 shrink-0">
              <Eye className="w-3 h-3" />
              Read
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function BlogContent() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<ApiBlogSummary[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listBlogs({
        category: activeCategory,
        q: search || undefined,
        page,
        limit: 12,
      });
      setBlogs(res.data.blogs);
      setCategories(res.data.categories);
      setTotalPages(res.pages || 1);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-[72px] pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />

        {/* Orbs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#4eafc4]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#2dd4bf]/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4eafc4]" />
              Knowledge Hub
            </motion.span>

            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Explore{" "}
              <span className="bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] bg-clip-text text-transparent">
                Articles
              </span>
              {" "}& Insights
            </h1>

            <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
              AI-generated study guides and articles crafted for Virtual University students — designed to make learning easier.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full h-auto">
            <path d="M0 48L60 42C120 36 240 24 360 20C480 16 600 20 720 26C840 32 960 40 1080 42C1200 44 1320 40 1380 38L1440 36V48H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative max-w-xl mx-auto mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4eafc4]/20 to-[#2dd4bf]/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm shadow-gray-200/50 focus-within:border-[#4eafc4] focus-within:shadow-[#4eafc4]/10 focus-within:shadow-lg transition-all duration-300">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics..."
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#0f172a] placeholder:text-[#94a3b8] outline-none text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mr-3 p-1 rounded-lg hover:bg-gray-100 text-[#94a3b8] hover:text-[#64788b] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex gap-2 flex-wrap justify-center mb-12"
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#0f172a] text-white shadow-lg shadow-gray-900/20 scale-105"
                  : "bg-white text-[#64788b] border border-gray-200 hover:border-[#4eafc4] hover:text-[#4eafc4] hover:shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-5 w-16 rounded-lg" />
                    <Skeleton className="h-5 w-12 rounded-lg" />
                  </div>
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <motion.div
              key={activeCategory + search + page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {blogs.map((post, i) => (
                <BlogCard key={post._id} post={post} i={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-7 h-7 text-[#94a3b8]" />
              </div>
              <h3 className="text-[#0f172a] font-semibold text-lg mb-1">
                No articles found
              </h3>
              <p className="text-[#64788b] text-sm max-w-xs mx-auto">
                {search
                  ? `Nothing matches "${search}". Try a different search term.`
                  : "Upload a resource with the \"Generate SEO Article\" toggle to create one."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mt-14"
          >
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#64788b] hover:border-[#4eafc4] hover:text-[#4eafc4] disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
            >
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      page === pageNum
                        ? "bg-[#0f172a] text-white shadow-md"
                        : "text-[#64788b] hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <span className="text-[#94a3b8] px-1">...</span>
              )}
            </div>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#64788b] hover:border-[#4eafc4] hover:text-[#4eafc4] disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogContent />
    </Suspense>
  );
}
