/**
 * serverFetch — minimal wrapper around fetch() for server-side calls to our
 * own backend (BACKEND_URL).
 *
 * Why this exists: the backend is fronted by Cloudflare, which serves a
 * JS challenge (HTTP 403, `cf-mitigated: challenge`) to requests that lack
 * a browser-like User-Agent. Node/undici's default UA (`node` / `undici`) is
 * challenged, so every server component / route handler / OG-image generator
 * that fetched the backend directly got a 403, treated it as "not found",
 * and rendered notFound() → 404 on the article pages and empty sitemaps.
 *
 * Passing a browser-like UA makes Cloudflare pass the request through. This
 * is a band-aid; the durable fix is a Cloudflare WAF skip rule for the
 * frontend's egress IP / a shared secret header, but that's a config change
 * on the Cloudflare side, not code. Until that's in place, this keeps the
 * site rendering.
 */

const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

export async function serverFetch(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has("User-Agent")) headers.set("User-Agent", BROWSER_UA);
  return fetch(url, { ...init, headers });
}
