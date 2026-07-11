import { type MetadataRoute } from "next";
import { allPrograms } from "@/lib/programs";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static / evergreen pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                           lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/whats-new`,            lastModified: now, changeFrequency: "daily",   priority: 0.95 },
    { url: `${BASE_URL}/blog`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/news`,                 lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/programs`,             lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/resources`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/about`,                lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/fee-structure`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/grading`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/sitemap`,              lastModified: now, changeFrequency: "weekly",  priority: 0.4 },
  ];

  // ── Program detail pages ─────────────────────────────────────────────────
  const programPages: MetadataRoute.Sitemap = allPrograms.map((prog) => ({
    url: `${BASE_URL}/programs/${prog.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Dynamic pages from backend ───────────────────────────────────────────
  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=500`,      { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=500`,      { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/resources?limit=500`, { next: { revalidate: 3600 } }),
    ]);

    if (!blogRes.ok || !newsRes.ok) {
      console.warn(`[Sitemap] API error — blog: ${blogRes.status}, news: ${newsRes.status}`);
      return [...staticPages, ...programPages];
    }

    const [blogData, newsData, resourceData] = await Promise.all([
      blogRes.json(),
      newsRes.json(),
      resourceRes.ok ? resourceRes.json() : { data: { resources: [] } },
    ]);

    const blogPages: MetadataRoute.Sitemap = (blogData?.data?.blogs ?? []).map(
      (blog: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt ?? blog.createdAt ?? now),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );

    const newsPages: MetadataRoute.Sitemap = (newsData?.data?.blogs ?? []).map(
      (news: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${BASE_URL}/news/${news.slug}`,
        lastModified: new Date(news.updatedAt ?? news.createdAt ?? now),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })
    );

    const resourcePages: MetadataRoute.Sitemap = (resourceData?.data?.resources ?? []).map(
      (r: { _id: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${BASE_URL}/resources/${r._id}`,
        lastModified: new Date(r.updatedAt ?? r.createdAt ?? now),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...programPages, ...blogPages, ...newsPages, ...resourcePages];
  } catch (err) {
    console.warn("[Sitemap] Failed to fetch dynamic pages:", (err as Error).message);
    return [...staticPages, ...programPages];
  }
}
