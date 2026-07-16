/**
 * POST /api/revalidate
 *
 * Called by the backend after a new blog/news/resource is published.
 * Triggers on-demand ISR revalidation for:
 *   - /sitemap.xml
 *   - /sitemap_index.xml
 *   - /whats-new
 *   - /blog, /news, /resources  (listing pages)
 *
 * Requires header: x-revalidate-token matching REVALIDATE_TOKEN env var.
 *
 * Backend usage:
 *   POST https://your-frontend.vercel.app/api/revalidate
 *   Headers: { "x-revalidate-token": "<REVALIDATE_TOKEN>" }
 *   Body: { "paths": ["/blog/my-new-slug"] }  // optional extra paths
 */

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");

  if (!REVALIDATE_TOKEN || token !== REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let extraPaths: string[] = [];
  try {
    const body = await req.json();
    extraPaths = Array.isArray(body?.paths) ? body.paths : [];
  } catch {
    // body is optional
  }

  // Core paths always revalidated on any publish event
  const corePaths = [
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap/blog.xml",
    "/sitemap/news.xml",
    "/sitemap/programs.xml",
    "/sitemap/resources.xml",
    "/sitemap/whats-new.xml",
    "/whats-new",
    "/blog",
    "/news",
    "/resources",
  ];

  const allPaths = [...new Set([...corePaths, ...extraPaths])];

  for (const p of allPaths) {
    try {
      revalidatePath(p);
    } catch (e) {
      console.warn(`[Revalidate] Failed to revalidate ${p}:`, e);
    }
  }

  return NextResponse.json({
    revalidated: true,
    paths: allPaths,
    timestamp: new Date().toISOString(),
  });
}
