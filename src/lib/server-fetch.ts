/**
 * serverFetch — minimal wrapper around fetch() for server-side calls to our
 * own backend (BACKEND_URL).
 *
 * Why this exists: the backend is fronted by Cloudflare. Cloudflare's bot
 * protection serves a JS challenge (HTTP 403, `cf-mitigated: challenge`) to
 * non-browser traffic — and even to spoofed-browser traffic from datacenter
 * IPs (Vercel egress), because it keys on ASN/IP reputation, not just
 * User-Agent. When the server component / route handler / OG-image generator
 * got a 403, it treated it as "not found" and rendered notFound() → 404 on
 * article pages, and the sitemaps rendered empty.
 *
 * The durable fix is a Cloudflare WAF Custom Rule with a Skip action that
 * matches this secret header on the /api path. That rule is configured in
 * the Cloudflare dashboard (Security → WAF → Custom rules), NOT in code:
 *
 *   Expression: (http.request.uri.path starts with "/api/") and
 *               (http.request.headers["x-vu-internal"] eq "<BACKEND_INTERNAL_TOKEN>")
 *   Action: Skip (all remaining custom rules + Bot Fight Mode)
 *
 * Set BACKEND_INTERNAL_TOKEN in the Vercel env vars (and identically in the
 * Cloudflare rule). Until the rule is live, the browser UA below is kept as
 * a fallback so partial traffic still gets through.
 */

const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const INTERNAL_TOKEN = process.env.BACKEND_INTERNAL_TOKEN || "";

export async function serverFetch(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has("User-Agent")) headers.set("User-Agent", BROWSER_UA);
  // Shared secret for the Cloudflare WAF skip rule. Only attached when the
  // token is configured; harmless otherwise (the rule just won't match).
  if (INTERNAL_TOKEN && !headers.has("x-vu-internal")) {
    headers.set("x-vu-internal", INTERNAL_TOKEN);
  }
  return fetch(url, { ...init, headers });
}
