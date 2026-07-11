import { type Metadata } from "next";
import Link from "next/link";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What's New | VirtualUPK",
  description:
    "Latest blog posts, news updates, and newly added resources from VirtualUPK — all in one place.",
  alternates: { canonical: `${BASE_URL}/whats-new` },
  openGraph: {
    title: "What's New | VirtualUPK",
    description: "Latest blog posts, news updates, and newly added resources from VirtualUPK.",
    url: `${BASE_URL}/whats-new`,
    type: "website",
  },
};

type BlogItem = { _id: string; slug: string; title: string; createdAt: string; updatedAt?: string };
type ResourceItem = { _id: string; title: string; type: string; createdAt: string };

async function fetchNew() {
  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=6&sort=-createdAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=6&sort=-createdAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/resources?limit=6&sort=-createdAt`, { next: { revalidate: 3600 } }),
    ]);

    const [blogData, newsData, resourceData] = await Promise.all([
      blogRes.ok ? blogRes.json() : { data: { blogs: [] } },
      newsRes.ok ? newsRes.json() : { data: { blogs: [] } },
      resourceRes.ok ? resourceRes.json() : { data: { resources: [] } },
    ]);

    return {
      blogs: (blogData?.data?.blogs ?? []) as BlogItem[],
      news: (newsData?.data?.blogs ?? []) as BlogItem[],
      resources: (resourceData?.data?.resources ?? []) as ResourceItem[],
    };
  } catch {
    return { blogs: [], news: [], resources: [] };
  }
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return new Date(date).toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" });
}

export default async function WhatsNewPage() {
  const { blogs, news, resources } = await fetchNew();
  const isEmpty = blogs.length === 0 && news.length === 0 && resources.length === 0;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
          Latest Updates
        </span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          What&apos;s New
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
          Stay up-to-date with the latest blog posts, news, and resources from VirtualUPK.
        </p>
      </div>

      {isEmpty && (
        <p className="text-center text-gray-400 py-24 text-lg">No new content yet. Check back soon!</p>
      )}

      {/* Latest Blogs */}
      {blogs.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">📝 Latest Blogs</h2>
            <Link href="/blog" className="text-sm text-blue-600 hover:underline">View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {blogs.map((b) => (
              <Link
                key={b._id}
                href={`/blog/${b.slug}`}
                className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-gray-400 mb-1">{timeAgo(b.createdAt)}</p>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                  {b.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest News */}
      {news.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">📰 Latest News</h2>
            <Link href="/news" className="text-sm text-blue-600 hover:underline">View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {news.map((n) => (
              <Link
                key={n._id}
                href={`/news/${n.slug}`}
                className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-gray-400 mb-1">{timeAgo(n.createdAt)}</p>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                  {n.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Resources */}
      {resources.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">📚 New Resources</h2>
            <Link href="/resources" className="text-sm text-blue-600 hover:underline">View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map((r) => (
              <div
                key={r._id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"
              >
                <p className="text-xs text-gray-400 mb-1">{timeAgo(r.createdAt)}</p>
                <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-2 uppercase">
                  {r.type}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{r.title}</h3>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
