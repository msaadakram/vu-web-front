import { type MetadataRoute } from "next";
import { allPrograms } from "@/lib/programs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// Re-generate the sitemap at most once per hour, so newly published
// blog/news posts appear without a full redeploy. On-demand revalidation
// (via /api/revalidate) refreshes it immediately after a new post is published.
export const revalidate = 3600;
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/news`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/programs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/sitemap`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
  ];

  // Program detail pages — statically generated
  const programPages: MetadataRoute.Sitemap = allPrograms.map((prog) => ({
    url: `${BASE_URL}/programs/${prog.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  try {
    const [blogRes, newsRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=500`, { cache: "no-store" }),
      fetch(`${BACKEND_URL}/api/news?limit=500`, { cache: "no-store" }),
    ]);
    const [blogData, newsData] = await Promise.all([blogRes.json(), newsRes.json()]);

    const blogPages: MetadataRoute.Sitemap = (blogData?.data?.blogs || []).map(
      (blog: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );

    const newsPages: MetadataRoute.Sitemap = (newsData?.data?.blogs || []).map(
      (news: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${BASE_URL}/news/${news.slug}`,
        lastModified: new Date(news.updatedAt || news.createdAt || now),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })
    );

    return [...staticPages, ...programPages, ...blogPages, ...newsPages];
  } catch {
    return [...staticPages, ...programPages];
  }
}
