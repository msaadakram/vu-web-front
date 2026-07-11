/**
 * /sitemap/whats-new.xml  —  What's New page sub-sitemap
 * A dedicated sitemap entry for the /whats-new page.
 */

import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const revalidate = 3600;

export async function GET() {
  const now = new Date();

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url>`,
    `    <loc>${BASE_URL}/whats-new</loc>`,
    `    <lastmod>${now.toISOString()}</lastmod>`,
    `    <changefreq>daily</changefreq>`,
    `    <priority>0.9</priority>`,
    `  </url>`,
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
