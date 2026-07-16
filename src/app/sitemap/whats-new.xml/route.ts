import { NextResponse } from "next/server";
import {
  getBaseUrl,
  urlEntry,
  sitemapXml,
  sitemapHeaders,
} from "@/lib/sitemap";

const BASE_URL = getBaseUrl();

export const revalidate = 3600;

export async function GET() {
  const now = new Date();

  const urls = urlEntry(`${BASE_URL}/whats-new`, now, "daily", 0.9);

  return new NextResponse(sitemapXml(urls), {
    status: 200,
    headers: sitemapHeaders(),
  });
}
