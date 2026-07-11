/**
 * /sitemap_index.xml  —  Google-compliant Sitemap Index
 *
 * Serves a <sitemapindex> that points Google to all sub-sitemaps:
 *   /sitemap.xml          – main (static + programs)
 *   /sitemap/blog.xml     – blog posts  (dynamic)
 *   /sitemap/news.xml     – news posts  (dynamic)
 *
 * Google fetches this URL when you submit it in Search Console.
 * ISR: refreshes once per hour; on-demand via /api/revalidate.
 */

import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// Re-validate every hour (ISR)
export const revalidate = 3600;

// Allow Google to cache this response for 1 hour
export const dynamic = "force-dynamic"; // ensures env vars are read at runtime

function xmlEscape(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sitemapEntry(loc: string, lastmod: Date) {
  return `  <sitemap>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod.toISOString()}</lastmod>\n  </sitemap>`;
}

export async function GET() {
  const now = new Date();

  // ── Determine dynamic sitemap lastmod dates ───────────────────────────────
  let blogLastmod = now;
  let newsLastmod = now;

  try {
    const [blogRes, newsRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=1&sort=-updatedAt`, { next: { revalidate: 3600 } }),
    ]);

    if (blogRes.ok) {
      const d = await blogRes.json();
      const latest = d?.data?.blogs?.[0];
      if (latest?.updatedAt ?? latest?.createdAt) {
        blogLastmod = new Date(latest.updatedAt ?? latest.createdAt);
      }
    }
    if (newsRes.ok) {
      const d = await newsRes.json();
      const latest = d?.data?.blogs?.[0];
      if (latest?.updatedAt ?? latest?.createdAt) {
        newsLastmod = new Date(latest.updatedAt ?? latest.createdAt);
      }
    }
  } catch (err) {
    console.warn("[SitemapIndex] Could not fetch lastmod dates:", (err as Error).message);
  }

  // ── Build XML ─────────────────────────────────────────────────────────────
  const entries = [
    sitemapEntry(`${BASE_URL}/sitemap.xml`,        now),           // main sitemap (Next.js built-in)
    sitemapEntry(`${BASE_URL}/sitemap/blog.xml`,   blogLastmod),   // blog sub-sitemap
    sitemapEntry(`${BASE_URL}/sitemap/news.xml`,   newsLastmod),   // news sub-sitemap
    sitemapEntry(`${BASE_URL}/sitemap/programs.xml`, now),         // programs sub-sitemap
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
      "X-Robots-Tag": "noindex", // index file itself shouldn't be indexed
    },
  });
}
