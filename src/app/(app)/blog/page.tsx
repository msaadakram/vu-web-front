"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search, Clock, ArrowRight, BookOpen, Sparkles, Eye,
  TrendingUp, Filter, X, ChevronRight, Calendar, Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { listBlogs, type ApiBlogSummary } from "@/lib/blog";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string; border: string; activeBg: string }> = {
  "Computer Science": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200", activeBg: "bg-blue-600" },
  Mathematics:        { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500", border: "border-violet-200", activeBg: "bg-violet-600" },
  Business:           { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200", activeBg: "bg-emerald-600" },
  Physics:            { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500", border: "border-orange-200", activeBg: "bg-orange-600" },
  Chemistry:          { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200", activeBg: "bg-red-600" },
  Economics:          { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500", border: "border-teal-200", activeBg: "bg-teal-600" },
  English:            { bg: "bg-pink-50", text: "text-pink-700", dot: "bg-pink-500", border: "border-pink-200", activeBg: "bg-pink-600" },
};
function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500", border: "border-gray-200", activeBg: "bg-gray-700" };
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
function pageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let p = start; p <= end; p++) out.push(p);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

/* ─── Featured hero card (first post) ─── */
function FeaturedCard({ post }: { post: ApiBlogSummary }) {
  const catStyle = getCategoryStyle(post.category);
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="relative bg-gradient-to-br from-[#0c1b2e] via-[#0f2540] to-[#1a3a5c] rounded-3xl overflow-hidden shadow-2xl min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8"
      >
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#4eafc4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#2dd4bf]/8 rounded-full blur-2xl pointer-events-none" />
        {/* Cover image if present */}
        {(post as any).coverImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={(post as any).coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b2e]/95 via-[#0c1b2e]/60 to-transparent" />
          </>
        )}
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 text-white/80 border border-white/15`}>
              <TrendingUp className="w-3 h-3 text-[#4eafc4]" /> Featured
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${catStyle.bg} ${catStyle.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />{post.category}
            </span>
          </div>
          <h2
            className="text-white mb-3 group-hover:text-[#7dd4e8] transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", lineHeight: 1.25 }}
          >
            {post.title}
          </h2>
          <p className="text-white/55 text-sm leading-relaxed line-clamp-2 mb-5 max-w-2xl">{post.excerpt}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {(post.uploadedBy?.name || "V").charAt(0)}
              </span>
              <span className="text-white/60 text-xs font-medium">{post.uploadedBy?.name || "VirtualU"}</span>
            </div>
            <span className="text-white/35 text-xs flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />{formatDate((post as any).createdAt || "")}
            </span>
            <span className="text-white/35 text-xs flex items-center gap-1.5">
              <Clock className="w-3 h-3" />{post.readTime}
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 bg-[#4eafc4] text-white rounded-full text-xs font-bold group-hover:bg-[#3a95aa] transition-colors shrink-0">
              Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── Regular blog card ─── */
function BlogCard({ post, i }: { post: ApiBlogSummary; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const catStyle = getCategoryStyle(post.category);
  return (
    <Link href={`/blog/${post.slug}`} ref={ref}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}
        className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
      >
        {/* animated top bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4eafc4] via-[#7dd4e8] to-[#2dd4bf] origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35 }}
        />
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          {/* top row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${catStyle.bg} ${catStyle.text} shrink-0`}>
              <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />{post.category}
            </span>
            <span className="text-[#94a3b8] text-xs flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />{post.readTime}
            </span>
          </div>
          {/* title */}
          <h3
            className="text-[#0f172a] mb-2.5 group-hover:text-[#4eafc4] transition-colors leading-snug line-clamp-2"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}
          >
            {post.title}
          </h3>
          {/* excerpt */}
          <p className="text-[#64788b] text-sm leading-relaxed mb-5 line-clamp-3 flex-1">{post.excerpt}</p>
          {/* footer */}
          <div className="flex items-center justify-between pt-3.5 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                {(post.uploadedBy?.name || "V").charAt(0)}
              </div>
              <span className="text-[#94a3b8] text-xs truncate">{post.uploadedBy?.name || "VirtualU"}</span>
            </div>
            <span className="text-[#4eafc4] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
              Read <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── Skeleton card ─── */
function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4"><Skeleton className="h-5 w-20 rounded-lg" /><Skeleton className="h-5 w-12 rounded-lg ml-auto" /></div>
      <Skeleton className="h-5 w-full mb-2" /><Skeleton className="h-5 w-4/5 mb-1" /><Skeleton className="h-5 w-3/5 mb-5" />
      <Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-2/3 mb-6" />
      <div className="flex items-center gap-2 pt-3 border-t border-gray-50"><Skeleton className="h-6 w-6 rounded-full" /><Skeleton className="h-3 w-20" /></div>
    </div>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const abortRef = useRef<AbortController | null>(null);

  const [blogs, setBlogs] = useState<ApiBlogSummary[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync filter state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [search, activeCategory, page, router, pathname]);

  const fetchBlogs = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await listBlogs({ category: activeCategory, q: search || undefined, page, limit: 12, signal: controller.signal });
      setBlogs(res.data.blogs);
      setCategories(res.data.categories);
      setTotalPages(res.pages || 1);
      setTotalCount(res.total || res.data.blogs.length);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search, page]);

  useEffect(() => { fetchBlogs(); return () => abortRef.current?.abort(); }, [fetchBlogs]);
  useEffect(() => { setPage(1); }, [activeCategory, search]);

  const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); setSearch(searchInput.trim()); };
  const clearSearch = () => { setSearch(""); setSearchInput(""); searchRef.current?.focus(); };

  const featured = page === 1 && !search && activeCategory === "All" ? blogs[0] : null;
  const grid = featured ? blogs.slice(1) : blogs;

  return (
    <div className="min-h-screen bg-[#f4f7fa]">

      {/* ── Hero ── */}
      <section className="relative pt-16 lg:pt-[4.5rem] pb-20 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06101e] via-[#0e1e35] to-[#071426]" />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `linear-gradient(rgba(78,175,196,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(78,175,196,0.7) 1px,transparent 1px)`, backgroundSize: "52px 52px" }} />
        {/* blobs */}
        <motion.div animate={{ scale:[1,1.2,1], opacity:[0.1,0.18,0.1] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
          className="absolute top-[-10%] right-[5%] w-[480px] h-[480px] bg-[#4eafc4] rounded-full blur-[130px] pointer-events-none" />
        <motion.div animate={{ scale:[1.1,1,1.1], opacity:[0.06,0.13,0.06] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:3 }}
          className="absolute bottom-[5%] left-[3%] w-[400px] h-[400px] bg-[#2dd4bf] rounded-full blur-[110px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, ease }}>
            <motion.span initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/8 border border-white/15 text-white/80 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#4eafc4]" /> Knowledge Hub
            </motion.span>
            <h1 className="text-white mb-4" style={{ fontFamily:"var(--font-playfair), serif", fontWeight:800, fontSize:"clamp(2rem,7vw,3.8rem)", lineHeight:1.1, letterSpacing:"-0.025em" }}>
              Explore{" "}
              <span className="bg-gradient-to-r from-[#4eafc4] via-[#7dd4e8] to-[#2dd4bf] bg-clip-text text-transparent">Articles</span>
              {" "}&amp; Study Guides
            </h1>
            <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2 mb-8">
              AI-powered study guides, course breakdowns, and expert tips crafted exclusively for Virtual University of Pakistan students.
            </p>
            {/* inline search */}
            <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto">
              <div className="relative flex items-center bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl focus-within:border-[#4eafc4]/60 focus-within:bg-white/12 transition-all duration-300 shadow-xl shadow-black/20">
                <Search className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search articles, topics, courses…"
                  className="w-full bg-transparent pl-11 pr-28 py-4 text-white placeholder:text-white/35 outline-none text-sm"
                />
                {searchInput && (
                  <button type="button" onClick={clearSearch} className="absolute right-20 p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button type="submit" className="absolute right-3 px-4 py-2 bg-[#4eafc4] hover:bg-[#3a95aa] text-white rounded-xl text-xs font-bold transition-colors">
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 56" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 56L80 48C160 40 320 24 480 20C640 16 800 24 960 32C1120 40 1280 48 1360 50L1440 52V56H0Z" fill="#f4f7fa"/>
          </svg>
        </div>
      </section>

      {/* ── Content area ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">

        {/* Category filter strip */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.45 }}
          className="flex gap-2 flex-wrap justify-center mb-8 sm:mb-10">
          {["All", ...categories].map(cat => {
            const style = getCategoryStyle(cat);
            const active = activeCategory === cat;
            return (
              <motion.button key={cat} onClick={() => setActiveCategory(cat)}
                whileTap={{ scale:0.95 }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#0f1e35] text-white shadow-lg shadow-[#0f1e35]/20 scale-105"
                    : "bg-white text-[#64788b] border border-gray-200 hover:border-[#4eafc4]/50 hover:text-[#4eafc4] hover:shadow-sm shadow-sm"
                }`}
              >
                {active && cat !== "All" && <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`} />}
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Result count */}
        {!loading && (search || activeCategory !== "All") && (
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center text-[#94a3b8] text-xs mb-6">
            {totalCount} article{totalCount !== 1 ? "s" : ""}{search ? ` for "${search}"` : ""}{activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </motion.p>
        )}

        {/* Featured card (page 1, no filter) */}
        {featured && !loading && (
          <div className="mb-7 sm:mb-8">
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)}
            </motion.div>
          ) : grid.length > 0 ? (
            <motion.div key={activeCategory + search + page} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {grid.map((post, i) => <BlogCard key={post._id} post={post} i={i} />)}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center py-24">
              <div className="w-16 h-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <BookOpen className="w-7 h-7 text-[#94a3b8]" />
              </div>
              <h3 className="text-[#0f172a] font-bold text-lg mb-2" style={{ fontFamily:"var(--font-playfair), serif" }}>No articles found</h3>
              <p className="text-[#64788b] text-sm max-w-xs mx-auto mb-6">
                {search ? `Nothing matches "${search}". Try a different term.` : "No articles in this category yet. Check back soon!"}
              </p>
              {(search || activeCategory !== "All") && (
                <button onClick={() => { clearSearch(); setActiveCategory("All"); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f1e35] text-white rounded-full text-sm font-semibold hover:bg-[#1c3557] transition-colors">
                  <X className="w-4 h-4" /> Clear filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex flex-wrap items-center justify-center gap-2 mt-12 sm:mt-16">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 sm:px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-[#64788b] bg-white shadow-sm hover:border-[#4eafc4] hover:text-[#4eafc4] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              ← Previous
            </button>
            <div className="flex items-center gap-1.5">
              {pageRange(page, totalPages).map((p, idx) =>
                p === "…" ? <span key={`e${idx}`} className="text-[#94a3b8] px-1 text-sm">…</span> : (
                  <button key={p} onClick={() => setPage(p as number)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                      page === p ? "bg-[#0f1e35] text-white shadow-md" : "text-[#64788b] hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 bg-transparent"
                    }`}>{p}</button>
                )
              )}
            </div>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
              className="px-4 sm:px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-[#64788b] bg-white shadow-sm hover:border-[#4eafc4] hover:text-[#4eafc4] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              Next →
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
