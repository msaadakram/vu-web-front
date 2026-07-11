/**
 * /sitemap_index.xml  —  Google-compliant Sitemap Index
 *
 * Points Google to ALL sub-sitemaps:
 *   /sitemap.xml           – main (Next.js built-in: static pages)
 *   /sitemap/blog.xml      – blog posts
 *   /sitemap/news.xml      – news posts
 *   /sitemap/programs.xml  – programs
 *   /sitemap/resources.xml – resources
 *   /sitemap/whats-new.xml – what's new page
 *
 * Submit /sitemap_index.xml in Google Search Console.
 */

import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

function xmlEscape(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sitemapEntry(loc: string, lastmod: Date) {
  return `  <sitemap>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod.toISOString()}</lastmod>\n  </sitemap>`;
}

export async function GET() {
  const now = new Date();

  let blogLastmod = now;
  let newsLastmod = now;
  let resourceLastmod = now;

  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/resources?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
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

  const entries = [
    sitemapEntry(`${BASE_URL}/sitemap.xml`,           now),
    sitemapEntry(`${BASE_URL}/sitemap/blog.xml`,      blogLastmod),
    sitemapEntry(`${BASE_URL}/sitemap/news.xml`,      newsLastmod),
    sitemapEntry(`${BASE_URL}/sitemap/programs.xml`,  now),
    sitemapEntry(`${BASE_URL}/sitemap/resources.xml`, resourceLastmod),
    sitemapEntry(`${BASE_URL}/sitemap/whats-new.xml`, now),
  ].join("\n");

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    entries,
    `</sitemapindex>`,
  ].join("\n");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
