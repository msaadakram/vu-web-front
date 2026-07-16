const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://www.virtualupk.vercel.app";

export function getBaseUrl() {
  return BASE_URL;
}

export function xmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(date: Date): string {
  return date.toISOString();
}

// Emits only <loc> and (optionally) <lastmod>. The deprecated <priority> and
// <changefreq> tags are no longer written — Google has ignored both since
// 2014 and they only bloat the file. lastmod is omitted when not provided so
// we never emit a fake uniform timestamp.
export function urlEntry(
  loc: string,
  lastmod?: Date | null,
  _changefreq?: string,
  _priority?: number
): string {
  const lines = ["  <url>", `    <loc>${xmlEscape(loc)}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${isoDate(lastmod)}</lastmod>`);
  lines.push("  </url>");
  return lines.join("\n");
}

export function sitemapXml(urls: string): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join("\n");
}

export function sitemapIndexXml(entries: string): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    entries,
    `</sitemapindex>`,
  ].join("\n");
}

export function sitemapEntry(loc: string, lastmod?: Date | null): string {
  const lines = ["  <sitemap>", `    <loc>${xmlEscape(loc)}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${isoDate(lastmod)}</lastmod>`);
  lines.push("  </sitemap>");
  return lines.join("\n");
}

export function sitemapHeaders(cacheMaxAge = 3600) {
  return {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": `public, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge * 24}`,
    "X-Robots-Tag": "noindex",
    "X-Content-Type-Options": "nosniff",
  };
}
