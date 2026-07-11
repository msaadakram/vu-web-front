import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// On-demand revalidation endpoint.
//
// The backend calls this right after publishing a new blog or news post so
// the sitemap, the listing pages, and the affected detail page refresh
// immediately (instead of waiting up to `revalidate` seconds).
//
// Auth: a shared secret passed as ?secret= or x-revalidate-secret header,
// matching the REVALIDATE_SECRET env var. Keep this secret server-side.

export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const fromQuery = req.nextUrl.searchParams.get("secret");
  const fromHeader = req.headers.get("x-revalidate-secret");
  return fromQuery === expected || fromHeader === expected;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  const listingPaths = ["/blog", "/news", "/blog/[slug]", "/news/[slug]"];
  const tag = req.nextUrl.searchParams.get("tag");

  try {
    // Revalidate all listing + detail pages
    for (const p of listingPaths) revalidatePath(p);
    if (tag) revalidateTag(tag);

    // Re-render the sitemap.xml and robots.txt.
    // Using "layout" re-executes the route-level default export (the sitemap
    // function), which is what Next.js App Router needs for file-based routes
    // like sitemap.ts and robots.ts.
    revalidatePath("/sitemap.xml", "layout");
    revalidatePath("/robots.txt", "layout");

    // Also revalidate the root layout so any layout-level cached data clears
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      paths: [...listingPaths, "/sitemap.xml", "/robots.txt"],
      tag: tag || null,
      at: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, message: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
