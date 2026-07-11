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

  const pathsToRevalidate = [
    "/blog",
    "/news",
    "/blog/[slug]",
    "/news/[slug]",
  ];
  const tag = req.nextUrl.searchParams.get("tag");

  try {
    for (const p of pathsToRevalidate) revalidatePath(p);
    if (tag) revalidateTag(tag);

    // Re-render the sitemap.xml + robots.txt routes.
    revalidatePath("/sitemap.xml", "page");
    revalidatePath("/robots.txt", "page");

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
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
