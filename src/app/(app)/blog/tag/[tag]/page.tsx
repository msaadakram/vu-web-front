import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hash, ArrowLeft, Clock, BookOpen, TrendingUp } from "lucide-react";
import { SEO_HASHTAGS, getTopHashtags } from "@/lib/seo-hashtags";

type Props = { params: Promise<{ tag: string }> };

const BASE_URL = process.env.BLOG_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://www.virtualupk.vercel.app";

async function fetchPostsByTag(tagSlug: string) {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    // Try searching by keyword and by tag
    const hashtagEntry = SEO_HASHTAGS.find((h) => h.slug === tagSlug);
    const keyword = hashtagEntry?.keyword || tagSlug.replace(/-/g, " ");
    const res = await fetch(
      `${backendUrl}/api/blog?tag=${encodeURIComponent(tagSlug)}&keyword=${encodeURIComponent(keyword)}&limit=12`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.blogs || [];
  } catch { return []; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const hashtagEntry = SEO_HASHTAGS.find((h) => h.slug === tag);
  if (!hashtagEntry) return { title: "Tag | VirtualU" };

  const keyword = hashtagEntry.keyword;
  return {
    title: `#${hashtagEntry.tag} — VU Articles & Study Guides | VirtualU`,
    description: `Browse all VirtualU articles tagged with #${hashtagEntry.tag}. Find study guides, subjects lists, admission info, and AI-generated content for Virtual University of Pakistan students searching for "${keyword}".`,
    keywords: [
      keyword,
      hashtagEntry.tag,
      "Virtual University of Pakistan",
      "VU",
      "vu online admission",
      "virtual university programs",
    ],
    alternates: { canonical: `${BASE_URL}/blog/tag/${tag}` },
    openGraph: {
      title: `#${hashtagEntry.tag} — VU Articles | VirtualU`,
      description: `All VirtualU articles about ${hashtagEntry.tag} for Virtual University of Pakistan students.`,
      type: "website",
      url: `${BASE_URL}/blog/tag/${tag}`,
      siteName: "VirtualU",
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const hashtagEntry = SEO_HASHTAGS.find((h) => h.slug === tag);

  const posts = await fetchPostsByTag(tag);
  const topHashtags = getTopHashtags(16);

  const displayName = hashtagEntry?.tag || tag.replace(/-/g, " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayName} — VirtualU Articles`,
    description: `Articles about ${displayName} at Virtual University of Pakistan`,
    url: `${BASE_URL}/blog/tag/${tag}`,
    inLanguage: "en-US",
    publisher: { "@type": "EducationalOrganization", name: "Virtual University of Pakistan", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.slice(0, 5).map((p: { title: string; slug: string }, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-[#f4f7fa]">

        {/* Hero */}
        <section className="relative pt-16 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#05101e] via-[#0e1e35] to-[#061525]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4eafc4]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-[#4eafc4] text-xs mb-6 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#4eafc4]/20 flex items-center justify-center">
                <Hash className="w-5 h-5 text-[#4eafc4]" />
              </div>
              <h1 className="text-white text-3xl sm:text-4xl font-bold">{displayName}</h1>
            </div>
            {hashtagEntry && (
              <p className="text-white/50 text-sm mt-1">
                {hashtagEntry.volume.toLocaleString()} monthly searches · {posts.length} article{posts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M0 40L1440 40L1440 10C1200 30 800 40 400 20C200 10 100 15 0 10Z" fill="#f4f7fa" />
            </svg>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-[1fr_240px] gap-10">

            {/* Posts */}
            <div>
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post: { _id: string; title: string; slug: string; excerpt?: string; category?: string; readTime?: string; tags?: string[] }) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 flex flex-col hover:border-[#4eafc4]/30 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          {post.category && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#e8f4f7] text-[#3a95aa] rounded-full text-[10px] font-bold uppercase tracking-wide mb-2">
                              {post.category}
                            </span>
                          )}
                          <h2 className="text-[#0f172a] font-semibold text-base leading-snug group-hover:text-[#3a95aa] transition-colors">
                            {post.title}
                          </h2>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-[#e8f4f7] flex items-center justify-center shrink-0 group-hover:bg-[#4eafc4] transition-colors">
                          <BookOpen className="w-4 h-4 text-[#4eafc4] group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      {post.excerpt && (
                        <p className="text-[#64788b] text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-3 mt-auto">
                        {post.readTime && (
                          <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                            <Clock className="w-3 h-3" />{post.readTime}
                          </span>
                        )}
                        {(post.tags || []).slice(0, 3).map((t: string) => (
                          <span key={t} className="text-[#4eafc4] text-xs font-medium">#{t}</span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <Hash className="w-12 h-12 text-[#4eafc4]/30 mx-auto mb-4" />
                  <p className="text-[#64788b] font-semibold mb-2">No articles yet for #{displayName}</p>
                  <p className="text-[#94a3b8] text-sm mb-5">New AI-generated content for this keyword is being created.</p>
                  <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4eafc4] text-white rounded-full text-sm font-semibold hover:bg-[#3a95aa] transition-colors">
                    Browse All Articles
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar: trending hashtags */}
            <aside className="hidden lg:block">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-[#4eafc4]" />
                  <p className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Trending Keywords</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topHashtags.map((h) => (
                    <Link
                      key={h.slug}
                      href={`/blog/tag/${h.slug}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                        h.slug === tag
                          ? "bg-[#4eafc4] text-white border-[#4eafc4]"
                          : "bg-[#f8fafc] text-[#64788b] border-gray-100 hover:border-[#4eafc4]/40 hover:text-[#4eafc4]"
                      }`}
                    >
                      <Hash className="w-2.5 h-2.5" />{h.tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
