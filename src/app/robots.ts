import { type MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

// Keep robots.txt fresh alongside the sitemap.
// Do NOT combine with force-static — revalidate needs ISR to work.
export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/login", "/register", "/upload"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
