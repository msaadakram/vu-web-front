import { type MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://www.virtualupk.vercel.app";

export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/login", "/register", "/upload"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/"],
        disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
        crawlDelay: 2,
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap_index.xml`,
    ],
    host: BASE_URL,
  };
}
