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

export function urlEntry(
  loc: string,
  lastmod: Date,
  changefreq: string,
  priority: number
): string {
  return [
    "  <url>",
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <lastmod>${isoDate(lastmod)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
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

export function sitemapEntry(loc: string, lastmod: Date): string {
  return [
    "  <sitemap>",
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <lastmod>${isoDate(lastmod)}</lastmod>`,
    "  </sitemap>",
  ].join("\n");
}

export function sitemapHeaders(cacheMaxAge = 3600) {
  return {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": `public, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge * 24}`,
    "X-Robots-Tag": "noindex",
    "X-Content-Type-Options": "nosniff",
  };
}
