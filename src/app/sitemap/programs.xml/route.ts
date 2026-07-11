/**
 * /sitemap/programs.xml  —  Programs sub-sitemap
 * Statically generated from the allPrograms list.
 * Included in the sitemap index at /sitemap_index.xml.
 */

import { NextResponse } from "next/server";
import { allPrograms } from "@/lib/programs";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const revalidate = 86400; // daily is enough for programs

function xmlEscape(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const now = new Date();

  const urls = allPrograms.map((prog) =>
    `  <url>\n    <loc>${xmlEscape(`${BASE_URL}/programs/${prog.slug}`)}</loc>\n    <lastmod>${now.toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  ).join("\n");

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
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
