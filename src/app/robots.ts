import { type MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/login", "/register", "/upload"],
      },
      // Allow Google to fetch CSS/JS for accurate rendering
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/"],
        disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
        crawlDelay: 1,
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
        crawlDelay: 2,
      },
    ],
    // Point both sitemap.xml (Next.js built-in) AND sitemap_index.xml (our index)
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap_index.xml`,
    ],
    host: BASE_URL,
  };
}
