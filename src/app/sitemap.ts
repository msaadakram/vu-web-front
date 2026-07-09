import { type MetadataRoute } from "next";
import { allPrograms } from "@/lib/programs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Program detail pages — statically generated
  const programPages: MetadataRoute.Sitemap = allPrograms.map((prog) => ({
    url: `${BASE_URL}/programs/${prog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  try {
    const res = await fetch(`${BACKEND_URL}/api/blog?limit=500`, {
      cache: "no-store",
    });
    const data = await res.json();
    const blogs = data?.data?.blogs || [];

    const blogPages: MetadataRoute.Sitemap = blogs.map(
      (blog: { slug: string; updatedAt: string }) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );

    return [...staticPages, ...programPages, ...blogPages];
  } catch {
    return [...staticPages, ...programPages];
  }
}
