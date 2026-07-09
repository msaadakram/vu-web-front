import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Download, FileText, Sparkles, BookOpen, ChevronRight, Share2, Tag } from "lucide-react";
import { getBlogBySlug } from "@/lib/blog";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

async function fetchPost(slug: string) {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/blog/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.blog || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchPost(slug);
  if (!blog) return { title: "Not Found | VirtualU" };

  const baseUrl = process.env.BLOG_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.keywords?.join(", ") || "",
    authors: blog.uploadedBy ? [{ name: blog.uploadedBy.name }] : [],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      url: `${baseUrl}/blog/${blog.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchPost(slug);

  if (!blog) {
    notFound();
  }

  const baseUrl = process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";
  const resource = blog.resource;

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
        about: { "@type": "Course", name: blog.resource?.course || blog.title, provider: { "@type": "Organization", name: "Virtual University of Pakistan" } },
        educationalLevel: "University",
        educationalUse: "Study Guide",
        inLanguage: "en-US",
        audience: { "@type": "EducationalAudience", educationalRole: "student" },
      },
      ...(blog.faq?.length > 0 ? [{
        "@type": "FAQPage",
        mainEntity: blog.faq.map((f: { question: string; answer: string }) => ({
          "@type": "Question", name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Blog", item: `${baseUrl}/blog` },
          { "@type": "ListItem", position: 2, name: blog.title, item: `${baseUrl}/blog/${blog.slug}` },
        ],
      },
    ],
  };

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      });
    } catch { return ""; }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="min-h-screen bg-[#f8fafc]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 lg:pt-[72px] pb-3">
            <nav className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <Link href="/" className="hover:text-[#4eafc4] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-[#4eafc4] transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#64788b] truncate max-w-[200px]">{blog.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative pt-8 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
          <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4eafc4]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2dd4bf]/5 rounded-full blur-[100px]" />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/20 text-white/80 rounded-full text-xs font-semibold tracking-wider backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4]" />
                {blog.category || "Article"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-full text-xs backdrop-blur-sm">
                <Clock className="w-3 h-3" />
                {blog.readTime}
              </span>
            </div>

            <h1
              className="text-white mb-5 max-w-3xl mx-auto leading-tight"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.85rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {blog.title}
            </h1>

            <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed mb-6">
              {blog.excerpt}
            </p>

            <div className="flex items-center justify-center gap-5 text-white/40 text-sm flex-wrap">
              {blog.uploadedBy && (
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#2dd4bf] flex items-center justify-center text-white text-[10px] font-bold">
                    {blog.uploadedBy.name.charAt(0)}
                  </span>
                  {blog.uploadedBy.name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 48" fill="none" className="w-full h-auto">
              <path d="M0 48L60 42C120 36 240 24 360 20C480 16 600 20 720 26C840 32 960 40 1080 42C1200 44 1320 40 1380 38L1440 36V48H0Z" fill="#f8fafc" />
            </svg>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-8 relative z-10 pb-16">
          {/* Resource card */}
          {resource && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e8f4f7] to-[#d1edf2] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4eafc4]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#94a3b8] text-xs font-medium uppercase tracking-wider mb-0.5">
                    Related Resource
                  </p>
                  <p className="text-[#0f172a] font-semibold truncate text-sm">
                    {resource.title}
                  </p>
                  {resource.course && (
                    <p className="text-[#4eafc4] text-xs font-medium">
                      {resource.course}
                    </p>
                  )}
                </div>
                <a
                  href={`/api/resources/${resource._id}/download`}
                  className="group relative inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#4eafc4]/25 transition-all duration-300 shrink-0 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative inline-flex items-center gap-2">
                    <span className="relative">
                      <Download className="w-4 h-4" />
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white/60 rounded-full group-hover:animate-ping" />
                    </span>
                    Download
                  </span>
                </a>
              </div>
            </div>
          )}

          {/* Article body */}
          <div className="space-y-10">
            {blog.sections?.map(
              (section: { heading: string; body: string }, idx: number) => (
                <section key={idx}>
                  <h2
                    className="text-[#0f172a] mb-4 flex items-center gap-3"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "1.45rem",
                      lineHeight: 1.3,
                    }}
                  >
                    <span className="w-1.5 h-6 bg-gradient-to-b from-[#4eafc4] to-[#2dd4bf] rounded-full shrink-0" />
                    {section.heading}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {section.body.split("\n\n").map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="text-[#334155] leading-relaxed mb-4 last:mb-0"
                        style={{ fontSize: "1.05rem", lineHeight: 1.85 }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              )
            )}
          </div>

          {/* FAQ */}
          {blog.faq?.length > 0 && (
            <div className="mt-14 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8f4f7] to-[#d1edf2] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#4eafc4]" />
                </div>
                <div>
                  <h2
                    className="text-[#0f172a]"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                    }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <p className="text-[#94a3b8] text-xs">Common questions about this topic</p>
                </div>
              </div>
              <div className="space-y-3">
                {blog.faq.map(
                  (item: { question: string; answer: string }, idx: number) => (
                    <details key={idx} className="group rounded-xl border border-gray-100 overflow-hidden transition-all open:border-[#4eafc4]/20 open:shadow-sm">
                      <summary className="flex items-start gap-3 cursor-pointer list-none p-4 text-[#0f172a] font-semibold text-sm hover:bg-gray-50 transition-colors">
                        <span className="w-6 h-6 rounded-lg bg-[#e8f4f7] flex items-center justify-center text-[#4eafc4] text-xs font-bold shrink-0 mt-0.5 group-open:bg-[#4eafc4] group-open:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{item.question}</span>
                        <ChevronRight className="w-4 h-4 text-[#94a3b8] mt-0.5 group-open:rotate-90 transition-transform shrink-0" />
                      </summary>
                      <div className="px-4 pb-4 pl-13">
                        <p className="text-[#64788b] text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  )
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-[#94a3b8]" />
                <span className="text-sm text-[#94a3b8] font-medium">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white border border-gray-100 text-[#64788b] rounded-xl text-xs font-medium hover:border-[#4eafc4]/30 hover:text-[#4eafc4] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI disclosure */}
          <div className="mt-10 flex items-start gap-3 text-xs text-[#94a3b8] bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#4eafc4] shrink-0 mt-0.5" />
            <span>
              This article was AI-generated for{" "}
              <strong className="text-[#64788b]">Virtual University of Pakistan (VU)</strong> students
              based on the uploaded resource
              {blog.aiModel ? ` (${blog.aiModel})` : ""}. It is designed to
              support your learning journey. For official course materials, visit the{" "}
              <a href={baseUrl} className="text-[#4eafc4] hover:underline font-medium">
                VirtualU platform
              </a>.
            </span>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#64788b] rounded-xl text-sm font-medium hover:border-[#4eafc4] hover:text-[#4eafc4] hover:shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
