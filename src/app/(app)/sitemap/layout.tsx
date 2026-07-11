import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Sitemap — All Pages on VirtualU",
  description:
    "Browse every page on VirtualU: study articles, university news, degree programs, study resources, and more. A complete index of the Virtual University of Pakistan student portal.",
  keywords: ["VirtualU sitemap", "site index", "all pages"],
  alternates: { canonical: `${BASE_URL}/sitemap` },
  openGraph: {
    title: "Sitemap — All Pages on VirtualU",
    description:
      "A complete index of every page on the Virtual University of Pakistan student portal.",
    url: `${BASE_URL}/sitemap`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function SitemapSectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
