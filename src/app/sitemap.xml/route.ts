import { NextResponse } from "next/server";
import { allPrograms } from "@/lib/programs";
import {
  getBaseUrl,
  urlEntry,
  sitemapXml,
  sitemapHeaders,
} from "@/lib/sitemap";

const BASE_URL = getBaseUrl();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();

  const staticPages = [
    urlEntry(BASE_URL, now, "monthly", 1.0),
    urlEntry(`${BASE_URL}/whats-new`, now, "daily", 0.95),
    urlEntry(`${BASE_URL}/blog`, now, "weekly", 0.9),
    urlEntry(`${BASE_URL}/news`, now, "daily", 0.9),
    urlEntry(`${BASE_URL}/programs`, now, "weekly", 0.9),
    urlEntry(`${BASE_URL}/resources`, now, "weekly", 0.9),
    urlEntry(`${BASE_URL}/about`, now, "monthly", 0.7),
    urlEntry(`${BASE_URL}/fee-structure`, now, "monthly", 0.7),
    urlEntry(`${BASE_URL}/grading`, now, "monthly", 0.6),
    urlEntry(`${BASE_URL}/sitemap`, now, "weekly", 0.4),
    urlEntry(`${BASE_URL}/ai-chat`, now, "weekly", 0.5),
  ];

  const programPages = allPrograms.map((prog) =>
    urlEntry(`${BASE_URL}/programs/${prog.slug}`, now, "monthly", 0.7)
  );

  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=500`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=500`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/resources?limit=500`, { next: { revalidate: 3600 } }),
    ]);

    const blogPages = blogRes.ok
      ? ((await blogRes.json())?.data?.blogs ?? []).map(
          (blog: { slug: string; updatedAt?: string; createdAt?: string }) =>
            urlEntry(
              `${BASE_URL}/blog/${blog.slug}`,
              new Date(blog.updatedAt ?? blog.createdAt ?? now),
              "monthly",
              0.7
            )
        )
      : [];

    const newsPages = newsRes.ok
      ? ((await newsRes.json())?.data?.blogs ?? []).map(
          (news: { slug: string; updatedAt?: string; createdAt?: string }) =>
            urlEntry(
              `${BASE_URL}/news/${news.slug}`,
              new Date(news.updatedAt ?? news.createdAt ?? now),
              "daily",
              0.8
            )
        )
      : [];

    const resourcePages = resourceRes.ok
      ? ((await resourceRes.json())?.data?.resources ?? []).map(
          (r: { _id: string; updatedAt?: string; createdAt?: string }) =>
            urlEntry(
              `${BASE_URL}/resources/${r._id}`,
              new Date(r.updatedAt ?? r.createdAt ?? now),
              "monthly",
              0.6
            )
        )
      : [];

    const all = [
      ...staticPages,
      ...programPages,
      ...blogPages,
      ...newsPages,
      ...resourcePages,
    ];

    return new NextResponse(sitemapXml(all.join("\n")), {
      status: 200,
      headers: sitemapHeaders(),
    });
  } catch (err) {
    console.warn("[Sitemap] Failed to fetch dynamic pages:", (err as Error).message);
    const fallback = [...staticPages, ...programPages];
    return new NextResponse(sitemapXml(fallback.join("\n")), {
      status: 200,
      headers: sitemapHeaders(),
    });
  }
}
