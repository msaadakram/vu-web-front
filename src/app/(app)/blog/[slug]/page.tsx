import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar, Clock, ArrowLeft, FileText, Sparkles, BookOpen,
  ChevronRight, Tag, CheckCircle2, Lightbulb, Network, Share2,
  ArrowUpRight, Hash,
} from "lucide-react";
import { getBlogBySlug } from "@/lib/blog";
import { ReadingProgress } from "@/components/ReadingProgress";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ShareButton } from "@/components/ShareButton";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { DownloadButton } from "@/components/DownloadButton";

type Props = { params: Promise<{ slug: string }> };

async function fetchPost(slug: string) {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/blog/${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.blog || null;
  } catch { return null; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchPost(slug);
  if (!blog) return { title: "Not Found | VirtualU" };
  const baseUrl = process.env.BLOG_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://virtualupk.vercel.app";
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.keywords?.join(", ") || "",
    authors: blog.uploadedBy ? [{ name: blog.uploadedBy.name }] : [],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      url: `${baseUrl}/blog/${blog.slug}`,
      siteName: "VirtualU",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: blog.metaTitle || blog.title, description: blog.metaDescription || blog.excerpt },
    alternates: { canonical: `${baseUrl}/blog/${blog.slug}` },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchPost(slug);
  if (!blog) notFound();

  const baseUrl = process.env.BLOG_PUBLIC_BASE_URL || "https://virtualupk.vercel.app";
  const resource = blog.resource;

  const tocItems: TocItem[] = (blog.sections || []).map(
    (s: { heading: string }, idx: number) => ({ id: `section-${idx + 1}`, heading: s.heading, level: 2 })
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        keywords: blog.keywords?.join(", ") || "",
        image: `${baseUrl}/og-default.png`,
        author: { "@type": "Organization", name: "Virtual University of Pakistan", url: baseUrl },
        publisher: { "@type": "Organization", name: "Virtual University of Pakistan", logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/blog/${blog.slug}` },
        educationalLevel: "University",
        educationalUse: "Study Guide",
        inLanguage: "en-US",
        audience: { "@type": "EducationalAudience", educationalRole: "student" },
      },
      ...(blog.faq?.length > 0 ? [{ "@type": "FAQPage", mainEntity: blog.faq.map((f: { question: string; answer: string }) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }] : []),
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
        { "@type": "ListItem", position: 3, name: blog.title, item: `${baseUrl}/blog/${blog.slug}` },
      ]},
    ],
  };

  function formatDate(iso: string) {
    try { return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); } catch { return ""; }
  }

  const readingMinutes = parseInt((blog.readTime || "5 min").replace(/\D/g, "")) || 5;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="min-h-screen bg-[#f4f7fa]">
        <ReadingProgress />

        {/* ── Hero ── */}
        <section className="relative pt-16 lg:pt-[4.5rem] pb-20 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#05101e] via-[#0e1e35] to-[#061525]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:`linear-gradient(rgba(78,175,196,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(78,175,196,0.7) 1px,transparent 1px)`, backgroundSize:"52px 52px" }} />
          <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[#4eafc4]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#2dd4bf]/6 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/35 mb-8 flex-wrap">
              <Link href="/" className="hover:text-[#4eafc4] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <Link href="/blog" className="hover:text-[#4eafc4] transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="text-white/55 truncate max-w-[200px] sm:max-w-none">{blog.title}</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              {/* Badges */}
              <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
                {blog.category && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/25 text-[#7dd4e8] rounded-full text-[11px] font-semibold backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4]" />{blog.category}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/6 border border-white/10 text-white/55 rounded-full text-[11px] backdrop-blur-sm">
                  <Clock className="w-3 h-3" />{blog.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/6 border border-white/10 text-white/55 rounded-full text-[11px] backdrop-blur-sm">
                  <Hash className="w-3 h-3" />{tocItems.length} sections
                </span>
              </div>

              {/* H1 */}
              <h1
                className="text-white mb-5"
                style={{ fontFamily:"var(--font-playfair), serif", fontWeight:800, fontSize:"clamp(1.6rem,6vw,3rem)", lineHeight:1.15, letterSpacing:"-0.025em" }}
              >
                {blog.title}
              </h1>

              <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-7 px-2">
                {blog.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/40 text-xs flex-wrap">
                {blog.uploadedBy && (
                  <span className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {blog.uploadedBy.name.charAt(0)}
                    </span>
                    <span className="text-white/60 font-medium">{blog.uploadedBy.name}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />{formatDate(blog.createdAt)}
                </span>
                {blog.updatedAt !== blog.createdAt && (
                  <span className="flex items-center gap-1.5 text-[#4eafc4]/70">
                    Updated {formatDate(blog.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 56" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 56L80 48C160 40 320 24 480 20C640 16 800 24 960 32C1120 40 1280 48 1360 50L1440 52V56H0Z" fill="#f4f7fa"/>
            </svg>
          </div>
        </section>

        {/* ── Reading progress + body ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">

          {/* Mobile ToC */}
          <div className="lg:hidden mb-6">
            <TableOfContents items={tocItems} />
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_280px] lg:gap-10 xl:gap-14">

            {/* ── Main content ── */}
            <div className="min-w-0">

              {/* Resource card */}
              {resource && (
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e8f4f7] to-[#d1edf2] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#4eafc4]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#94a3b8] text-[10px] font-semibold uppercase tracking-wider mb-0.5">Related Resource</p>
                        <p className="text-[#0f172a] font-semibold text-sm truncate">{resource.title}</p>
                        {resource.course && <p className="text-[#4eafc4] text-xs font-medium">{resource.course}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <ShareButton title={blog.title} />
                      <DownloadButton resourceId={resource._id} fileName={resource.file?.originalName || resource.title} className="px-4 py-2.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Intro */}
              {blog.intro && (
                <p className="text-[#334155] leading-[1.85] mb-8 text-base sm:text-lg font-light">{blog.intro}</p>
              )}

              {/* Key takeaways */}
              {(blog.keyTakeaways?.length ?? 0) > 0 && (
                <div className="mb-10 relative bg-gradient-to-br from-[#e8f4f7] via-[#eef8fb] to-white rounded-2xl border border-[#4eafc4]/18 p-5 sm:p-7 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#4eafc4]/8 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-[#4eafc4]/15 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-[#4eafc4]" />
                    </div>
                    <h2 className="text-[#0f1e35] font-bold text-sm uppercase tracking-widest">Key Takeaways</h2>
                  </div>
                  <ul className="relative space-y-3">
                    {blog.keyTakeaways.map((t: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-[#1c3557] text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#4eafc4] shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article sections */}
              <div className="space-y-10 sm:space-y-12">
                {(blog.sections || []).map(
                  (section: { number?: string; heading: string; body: string; keyPoints?: string[] }, idx: number) => (
                    <section key={idx} id={`section-${idx + 1}`} className="scroll-mt-24">
                      {/* Section heading */}
                      <div className="flex items-start gap-3 mb-5 pb-3 border-b border-gray-100">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#4eafc4] to-[#2a8aa3] text-white text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                          {section.number || idx + 1}
                        </span>
                        <h2
                          className="text-[#0f172a] flex-1"
                          style={{ fontFamily:"var(--font-playfair), serif", fontWeight:700, fontSize:"clamp(1.2rem,3vw,1.5rem)", lineHeight:1.3 }}
                        >
                          {section.heading}
                        </h2>
                      </div>

                      {/* Body paragraphs */}
                      <div className="space-y-4">
                        {section.body.split("\n\n").filter(Boolean).map((para, pi) => (
                          <p key={pi} className="text-[#334155] leading-[1.82]" style={{ fontSize:"clamp(0.95rem,2vw,1.05rem)" }}>
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Key points */}
                      {(section.keyPoints?.length ?? 0) > 0 && (
                        <div className="mt-5 bg-[#f8fafc] rounded-xl border border-gray-100 p-4 sm:p-5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4eafc4] mb-3">Section Summary</p>
                          <ul className="space-y-2">
                            {(section.keyPoints ?? []).map((kp: string, kpi: number) => (
                              <li key={kpi} className="flex items-start gap-2.5 text-[#334155] text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4] shrink-0 mt-[6px]" />
                                <span>{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </section>
                  )
                )}
              </div>

              {/* Related concepts */}
              {(blog.relatedConcepts?.length ?? 0) > 0 && (
                <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f4f7] flex items-center justify-center">
                      <Network className="w-4 h-4 text-[#4eafc4]" />
                    </div>
                    <h2 className="text-[#0f172a] font-bold text-sm uppercase tracking-widest">Related Topics</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.relatedConcepts.map((c: string, i: number) => (
                      <span key={i} className="px-3.5 py-1.5 bg-[#e8f4f7] text-[#3a95aa] rounded-full text-xs font-semibold border border-[#4eafc4]/15 hover:bg-[#4eafc4]/15 transition-colors cursor-default">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {blog.faq?.length > 0 && (
                <div className="mt-12 sm:mt-14 bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 lg:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8f4f7] to-[#d1edf2] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#4eafc4]" />
                    </div>
                    <div>
                      <h2 style={{ fontFamily:"var(--font-playfair), serif", fontWeight:700, fontSize:"1.25rem" }} className="text-[#0f172a]">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-[#94a3b8] text-xs mt-0.5">Common questions about this topic</p>
                    </div>
                  </div>
                  <FaqAccordion items={blog.faq.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer }))} />
                </div>
              )}

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3.5 h-3.5 text-[#94a3b8]" />
                    <span className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 bg-white border border-gray-100 text-[#64788b] rounded-full text-xs font-medium hover:border-[#4eafc4]/40 hover:text-[#4eafc4] transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI disclosure */}
              <div className="mt-10 flex items-start gap-3 text-xs text-[#94a3b8] bg-gradient-to-r from-[#f8fafc] to-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#4eafc4] shrink-0 mt-0.5" />
                <span>
                  This article was AI-generated for{" "}
                  <strong className="text-[#64788b]">Virtual University of Pakistan (VU)</strong> students based on the uploaded resource
                  {blog.aiModel ? ` using ${blog.aiModel}` : ""}. Designed to support your learning. For official materials, visit the{" "}
                  <a href={baseUrl} className="text-[#4eafc4] hover:underline font-semibold">VirtualU platform</a>.
                </span>
              </div>

              {/* CTA row */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
                <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-[#64788b] rounded-full text-sm font-semibold hover:border-[#4eafc4] hover:text-[#4eafc4] transition-all w-full sm:w-auto justify-center">
                  <ArrowLeft className="w-4 h-4" /> All Articles
                </Link>
                <ShareButton />
              </div>
            </div>

            {/* ── Desktop sidebar ToC ── */}
            <aside className="hidden lg:block">
              <TableOfContents items={tocItems} />
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
