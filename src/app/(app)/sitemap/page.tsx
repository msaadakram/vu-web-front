import Link from "next/link";
import { Map, ArrowLeft, FileText, Newspaper, GraduationCap, LayoutGrid, ChevronRight, Code2 } from "lucide-react";
import { allPrograms } from "@/lib/programs";
import { SitemapBrowser, type SitemapGroup } from "@/components/SitemapBrowser";
import { SitemapXmlViewer } from "@/components/SitemapXmlViewer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;

type ListPost = { slug: string; title: string; category?: string; updatedAt?: string; createdAt?: string };
type ResourceItem = { _id: string; title: string; type?: string; updatedAt?: string; createdAt?: string };

function formatDate(iso?: string) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return ""; }
}

function toYMD(iso?: string) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  try { return new Date(iso).toISOString().slice(0, 10); }
  catch { return new Date().toISOString().slice(0, 10); }
}

export default async function SitemapPage() {
  let blogPosts: ListPost[] = [];
  let newsPosts: ListPost[] = [];
  let resources: ResourceItem[] = [];

  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=500`,      { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=500`,      { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/resources?limit=500`, { next: { revalidate: 3600 } }),
    ]);
    const [blogData, newsData, resourceData] = await Promise.all([
      blogRes.ok      ? blogRes.json()      : {},
      newsRes.ok      ? newsRes.json()      : {},
      resourceRes.ok  ? resourceRes.json()  : {},
    ]);
    blogPosts  = blogData?.data?.blogs      ?? [];
    newsPosts  = newsData?.data?.blogs      ?? [];
    resources  = resourceData?.data?.resources ?? [];
  } catch { /* fallback to static only */ }

  // ── Build XML string ─────────────────────────────────────────────
  const now = new Date().toISOString().slice(0, 10);

  const staticEntries = [
    { url: `${BASE_URL}/`,              lastmod: now, changefreq: "monthly", priority: "1.0" },
    { url: `${BASE_URL}/whats-new`,     lastmod: now, changefreq: "daily",   priority: "0.95" },
    { url: `${BASE_URL}/blog`,          lastmod: now, changefreq: "weekly",  priority: "0.9" },
    { url: `${BASE_URL}/news`,          lastmod: now, changefreq: "daily",   priority: "0.9" },
    { url: `${BASE_URL}/programs`,      lastmod: now, changefreq: "weekly",  priority: "0.9" },
    { url: `${BASE_URL}/resources`,     lastmod: now, changefreq: "weekly",  priority: "0.9" },
    { url: `${BASE_URL}/about`,         lastmod: now, changefreq: "monthly", priority: "0.7" },
    { url: `${BASE_URL}/fee-structure`, lastmod: now, changefreq: "monthly", priority: "0.7" },
    { url: `${BASE_URL}/grading`,       lastmod: now, changefreq: "monthly", priority: "0.6" },
    { url: `${BASE_URL}/sitemap`,       lastmod: now, changefreq: "weekly",  priority: "0.4" },
  ];

  const programEntries = allPrograms.map((p) => ({
    url: `${BASE_URL}/programs/${p.slug}`,
    lastmod: now,
    changefreq: "monthly",
    priority: "0.7",
  }));

  const blogEntries = blogPosts.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastmod: toYMD(b.updatedAt ?? b.createdAt),
    changefreq: "monthly",
    priority: "0.7",
  }));

  const newsEntries = newsPosts.map((n) => ({
    url: `${BASE_URL}/news/${n.slug}`,
    lastmod: toYMD(n.updatedAt ?? n.createdAt),
    changefreq: "daily",
    priority: "0.8",
  }));

  const resourceEntries = resources.map((r) => ({
    url: `${BASE_URL}/resources/${r._id}`,
    lastmod: toYMD(r.updatedAt ?? r.createdAt),
    changefreq: "monthly",
    priority: "0.6",
  }));

  const allEntries = [...staticEntries, ...programEntries, ...blogEntries, ...newsEntries, ...resourceEntries];

  const xmlString = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...allEntries.map((e) =>
      [
        `  <url>`,
        `    <loc>${e.url}</loc>`,
        `    <lastmod>${e.lastmod}</lastmod>`,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        `  </url>`,
      ].join("\n")
    ),
    `</urlset>`,
  ].join("\n");

  // ── Human-readable groups ──────────────────────────────────────────────
  const staticPages: SitemapGroup["entries"] = [
    { title: "Home", href: "/" },
    { title: "What's New", href: "/whats-new", meta: "Latest updates" },
    { title: "Blog", href: "/blog", meta: "Study articles & guides" },
    { title: "News", href: "/news", meta: "University announcements" },
    { title: "Programs", href: "/programs", meta: "Degree programs" },
    { title: "Fee Structure", href: "/fee-structure", meta: "Tuition & charges" },
    { title: "Grading", href: "/grading", meta: "GPA & CGPA tools" },
    { title: "Study Resources", href: "/resources", meta: "Past papers, handouts & notes" },
    { title: "Upload", href: "/upload", meta: "Share a resource" },
    { title: "About", href: "/about", meta: "About VirtualU" },
  ];

  const articleGroupEntries: SitemapGroup["entries"] = blogPosts.map((b) => ({
    title: b.title,
    href: `/blog/${b.slug}`,
    meta: [b.category, formatDate(b.updatedAt || b.createdAt)].filter(Boolean).join(" · "),
  }));

  const newsGroupEntries: SitemapGroup["entries"] = newsPosts.map((n) => ({
    title: n.title,
    href: `/news/${n.slug}`,
    meta: [n.category, formatDate(n.updatedAt || n.createdAt)].filter(Boolean).join(" · "),
  }));

  const programGroupEntries: SitemapGroup["entries"] = allPrograms.map((p) => ({
    title: p.title,
    href: `/programs/${p.slug}`,
    meta: `${p.degree} · ${p.category}`,
  }));

  const groups: SitemapGroup[] = [
    { label: "Pages",    entries: staticPages },
    { label: "Articles", entries: articleGroupEntries },
    { label: "News",     entries: newsGroupEntries },
    { label: "Programs", entries: programGroupEntries },
  ];

  const totalCount = allEntries.length;

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
              {totalCount} URLs indexed
            </span>
          </div>

          <h1
            className="text-white mb-4 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.9rem, 6vw, 3.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Sitemap
          </h1>
          <p className="text-white/55 max-w-2xl text-sm sm:text-base leading-relaxed px-1">
            A complete index of every page on VirtualU — study articles, university news, degree programs, and study resources for Virtual University of Pakistan students.
          </p>

          {/* XML sitemap links */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#4eafc4]/20 border border-[#4eafc4]/40 text-[#4eafc4] rounded-lg text-xs font-semibold hover:bg-[#4eafc4]/30 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              sitemap.xml
            </a>
            <a
              href="/sitemap_index.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/15 text-white/60 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              sitemap_index.xml
            </a>
          </div>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            { icon: LayoutGrid,   label: "Pages",    count: staticPages.length,        href: "#pages" },
            { icon: FileText,     label: "Articles", count: articleGroupEntries.length, href: "#articles" },
            { icon: Newspaper,    label: "News",     count: newsGroupEntries.length,    href: "#news" },
            { icon: GraduationCap,label: "Programs", count: programGroupEntries.length, href: "#programs" },
          ].map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:border-[#4eafc4]/40 hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#e8f4f7] flex items-center justify-center mb-3 group-hover:bg-[#4eafc4] transition-colors">
                <card.icon className="w-4 h-4 text-[#4eafc4] group-hover:text-white transition-colors" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#0f172a]">{card.count}</div>
              <div className="text-xs text-[#64788b]">{card.label}</div>
            </a>
          ))}
        </div>

        {/* XML Viewer — shown by default on load */}
        <SitemapXmlViewer xml={xmlString} totalCount={totalCount} />

        <div className="mt-12" id="pages" />
        <div id="articles" />
        <div id="news" />
        <div id="programs" />

        <SitemapBrowser groups={groups} />

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
