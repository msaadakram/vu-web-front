import { NextResponse } from "next/server";
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
  let urls = "";

  try {
    const res = await fetch(`${BACKEND_URL}/api/news?limit=500`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      urls = (data?.data?.blogs ?? [])
        .map((news: { slug: string; updatedAt?: string; createdAt?: string }) =>
          urlEntry(
            `${BASE_URL}/news/${news.slug}`,
            new Date(news.updatedAt ?? news.createdAt ?? now),
            "daily",
            0.8
          )
        )
        .join("\n");
    }
  } catch (err) {
    console.warn("[News Sitemap] Fetch error:", (err as Error).message);
  }

  return new NextResponse(sitemapXml(urls), {
    status: 200,
    headers: sitemapHeaders(),
  });
}
