/**
 * /sitemap/resources.xml  —  Resources sub-sitemap
 * Fetches all public resources from the backend and returns a <urlset>.
 * Resources use IDs (not slugs) as identifiers.
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

export async function GET() {
  const now = new Date();
  let urls = "";

  try {
    const res = await fetch(`${BACKEND_URL}/api/resources?limit=500`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      // Resources API: { data: { resources: [...] } }
      urls = (data?.data?.resources ?? []).map(
        (r: { _id: string; updatedAt?: string; createdAt?: string }) =>
          `  <url>\n    <loc>${xmlEscape(`${BASE_URL}/resources/${r._id}`)}</loc>\n    <lastmod>${new Date(r.updatedAt ?? r.createdAt ?? now).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
      ).join("\n");
    }
  } catch (err) {
    console.warn("[Resources Sitemap] Fetch error:", (err as Error).message);
  }

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join("\n");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
