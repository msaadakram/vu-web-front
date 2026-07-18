import { NextResponse } from "next/server";
import {
  getBaseUrl,
  urlEntry,
  sitemapXml,
  sitemapHeaders,
} from "@/lib/sitemap";
import { serverFetch } from "@/lib/server-fetch";

const BASE_URL = getBaseUrl();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  let urls = "";

  try {
    const res = await serverFetch(`${BACKEND_URL}/api/blog?limit=500`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      urls = (data?.data?.blogs ?? [])
        .map((blog: { slug: string; updatedAt?: string; createdAt?: string }) =>
          urlEntry(
            `${BASE_URL}/blog/${blog.slug}`,
            new Date(blog.updatedAt ?? blog.createdAt ?? now),
            "monthly",
            0.7
          )
        )
        .join("\n");
    }
  } catch (err) {
    console.warn("[Blog Sitemap] Fetch error:", (err as Error).message);
  }

  return new NextResponse(sitemapXml(urls), {
    status: 200,
    headers: sitemapHeaders(),
  });
}
