import Link from "next/link";
import { Map, ArrowLeft, FileText, Newspaper, GraduationCap, LayoutGrid, ChevronRight } from "lucide-react";
import { allPrograms } from "@/lib/programs";
import { SitemapBrowser, type SitemapGroup } from "@/components/SitemapBrowser";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

type ListPost = { slug: string; title: string; category?: string; updatedAt?: string; createdAt?: string };

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function SitemapPage() {
  // Fetch blog + news lists in parallel. Use the public list endpoints
  // (same source as sitemap.xml) so this page always matches the index.
  let blogPosts: ListPost[] = [];
  let newsPosts: ListPost[] = [];

  try {
    const [blogRes, newsRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=500`, { cache: "no-store" }),
      fetch(`${BACKEND_URL}/api/news?limit=500`, { cache: "no-store" }),
    ]);
    const [blogData, newsData] = await Promise.all([blogRes.json(), newsRes.json()]);
    blogPosts = blogData?.data?.blogs || [];
    newsPosts = newsData?.data?.blogs || [];
  } catch {
    // Fall back to static pages + programs only.
  }

  const staticPages: SitemapGroup["entries"] = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog", meta: "Study articles & guides" },
    { title: "News", href: "/news", meta: "University announcements" },
    { title: "Programs", href: "/programs", meta: "Degree programs" },
    { title: "Fee Structure", href: "/fee-structure", meta: "Tuition & charges" },
    { title: "Grading", href: "/grading", meta: "GPA & CGPA tools" },
    { title: "Study Resources", href: "/resources", meta: "Past papers, handouts & notes" },
    { title: "Upload", href: "/upload", meta: "Share a resource" },
    { title: "About", href: "/about", meta: "About VirtualU" },
  ];

  const articleEntries: SitemapGroup["entries"] = blogPosts.map((b) => ({
    title: b.title,
    href: `/blog/${b.slug}`,
    meta: [b.category, formatDate(b.updatedAt || b.createdAt)].filter(Boolean).join(" · "),
  }));

  const newsEntries: SitemapGroup["entries"] = newsPosts.map((n) => ({
    title: n.title,
    href: `/news/${n.slug}`,
    meta: [n.category, formatDate(n.updatedAt || n.createdAt)].filter(Boolean).join(" · "),
  }));

  const programEntries: SitemapGroup["entries"] = allPrograms.map((p) => ({
    title: p.title,
    href: `/programs/${p.slug}`,
    meta: `${p.degree} · ${p.category}`,
  }));

  const groups: SitemapGroup[] = [
    { label: "Pages", entries: staticPages },
    { label: "Articles", entries: articleEntries },
    { label: "News", entries: newsEntries },
    { label: "Programs", entries: programEntries },
  ];

  const totalCount = groups.reduce((sum, g) => sum + g.entries.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VirtualU",
    url: BASE_URL,
    description: "Complete index of every page on VirtualU.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/resources?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative pt-16 lg:pt-[72px] pb-14 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4eafc4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2dd4bf]/5 rounded-full blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-[#4eafc4] transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-white/60">Sitemap</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-[#4eafc4]/15 border border-[#4eafc4]/30 flex items-center justify-center">
              <Map className="w-6 h-6 text-[#4eafc4]" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-full text-xs font-semibold tracking-wider">
              {totalCount} pages indexed
            </span>
          </div>

          <h1
            className="text-white mb-4 max-w-3xl"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 6vw, 3.25rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Sitemap
          </h1>
          <p className="text-white/55 max-w-2xl text-sm sm:text-base leading-relaxed px-1">
            A complete, searchable index of every page on VirtualU — study articles, university news, degree programs, and study resources for Virtual University of Pakistan students.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full h-auto">
            <path d="M0 48L60 42C120 36 240 24 360 20C480 16 600 20 720 26C840 32 960 40 1080 42C1200 44 1320 40 1380 38L1440 36V48H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-16 sm:pb-24">
        {/* Quick category cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {[
            { icon: LayoutGrid, label: "Pages", count: staticPages.length, href: "#pages" },
            { icon: FileText, label: "Articles", count: articleEntries.length, href: "#articles" },
            { icon: Newspaper, label: "News", count: newsEntries.length, href: "#news" },
            { icon: GraduationCap, label: "Programs", count: programEntries.length, href: "#programs" },
          ].map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:border-[#4eafc4]/40 hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#e8f4f7] flex items-center justify-center mb-3 group-hover:bg-[#4eafc4] transition-colors">
                <card.icon className="w-4.5 h-4.5 text-[#4eafc4] group-hover:text-white transition-colors" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#0f172a]">{card.count}</div>
              <div className="text-xs text-[#64788b]">{card.label}</div>
            </a>
          ))}
        </div>

        <div id="pages" />
        <div id="articles" />
        <div id="news" />
        <div id="programs" />

        <SitemapBrowser groups={groups} />

        {/* Back link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#64788b] rounded-xl text-sm font-medium hover:border-[#4eafc4] hover:text-[#4eafc4] hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
