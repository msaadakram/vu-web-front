import { NextResponse } from "next/server";
import {
  getBaseUrl,
  urlEntry,
  sitemapXml,
  sitemapHeaders,
} from "@/lib/sitemap";

const BASE_URL = getBaseUrl();

export const revalidate = 3600;
export const dynamic = "force-dynamic";

// Flat sitemap contains only top-level hub routes. Program, blog, news and
// resource detail URLs live in their own child sitemaps (programs.xml,
// blog.xml, news.xml, resources.xml) referenced from sitemap_index.xml — so
// they are not duplicated here.
export async function GET() {
  const staticPages = [
    urlEntry(BASE_URL),
    urlEntry(`${BASE_URL}/whats-new`),
    urlEntry(`${BASE_URL}/blog`),
    urlEntry(`${BASE_URL}/news`),
    urlEntry(`${BASE_URL}/programs`),
    urlEntry(`${BASE_URL}/resources`),
    urlEntry(`${BASE_URL}/about`),
    urlEntry(`${BASE_URL}/fee-structure`),
    urlEntry(`${BASE_URL}/grading`),
    urlEntry(`${BASE_URL}/sitemap`),
    urlEntry(`${BASE_URL}/ai-chat`),
    // Trust pages required for E-E-A-T
    urlEntry(`${BASE_URL}/privacy`),
    urlEntry(`${BASE_URL}/terms`),
    urlEntry(`${BASE_URL}/contact`),
  ];

  return new NextResponse(sitemapXml(staticPages.join("\n")), {
    status: 200,
    headers: sitemapHeaders(),
  });
}
