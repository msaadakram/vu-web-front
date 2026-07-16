import { NextResponse } from "next/server";
import { allPrograms } from "@/lib/programs";
import {
  getBaseUrl,
  urlEntry,
  sitemapXml,
  sitemapHeaders,
} from "@/lib/sitemap";

const BASE_URL = getBaseUrl();

export const revalidate = 86400;

export async function GET() {
  const urls = allPrograms
    .map((prog) =>
      urlEntry(`${BASE_URL}/programs/${prog.slug}`)
    )
    .join("\n");

  return new NextResponse(sitemapXml(urls), {
    status: 200,
    headers: sitemapHeaders(86400),
  });
}
