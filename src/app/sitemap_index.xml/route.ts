import { NextResponse } from "next/server";
import {
  getBaseUrl,
  sitemapIndexXml,
  sitemapEntry,
  sitemapHeaders,
} from "@/lib/sitemap";
import { serverFetch } from "@/lib/server-fetch";

const BASE_URL = getBaseUrl();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();

  let blogLastmod: Date | null = null;
  let newsLastmod: Date | null = null;
  let resourceLastmod: Date | null = null;

  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      serverFetch(`${BACKEND_URL}/api/blog?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
      serverFetch(`${BACKEND_URL}/api/news?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
      serverFetch(`${BACKEND_URL}/api/resources?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
    ]);

    if (blogRes.ok) {
      const d = await blogRes.json();
      const latest = d?.data?.blogs?.[0];
      if (latest?.updatedAt || latest?.createdAt)
        blogLastmod = new Date(latest.updatedAt ?? latest.createdAt);
    }
    if (newsRes.ok) {
      const d = await newsRes.json();
      const latest = d?.data?.blogs?.[0];
      if (latest?.updatedAt || latest?.createdAt)
        newsLastmod = new Date(latest.updatedAt ?? latest.createdAt);
    }
    if (resourceRes.ok) {
      const d = await resourceRes.json();
      const latest = d?.data?.resources?.[0];
      if (latest?.updatedAt || latest?.createdAt)
        resourceLastmod = new Date(latest.updatedAt ?? latest.createdAt);
    }
  } catch (err) {
    console.warn("[SitemapIndex] Could not fetch lastmod dates:", (err as Error).message);
  }

  // The flat sitemap.xml is the child that holds hub routes; programs.xml,
  // blog.xml, news.xml, resources.xml and whats-new.xml hold the deep URLs.
  // robots.txt declares only this index as the entry point (no circular ref).
  const entries = [
    sitemapEntry(`${BASE_URL}/sitemap.xml`, now),
    sitemapEntry(`${BASE_URL}/sitemap/blog.xml`, blogLastmod),
    sitemapEntry(`${BASE_URL}/sitemap/news.xml`, newsLastmod),
    sitemapEntry(`${BASE_URL}/sitemap/programs.xml`, now),
    sitemapEntry(`${BASE_URL}/sitemap/resources.xml`, resourceLastmod),
    sitemapEntry(`${BASE_URL}/sitemap/whats-new.xml`, now),
  ].join("\n");

  return new NextResponse(sitemapIndexXml(entries), {
    status: 200,
    headers: sitemapHeaders(),
  });
}
