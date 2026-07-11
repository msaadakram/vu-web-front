import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Blog — Study Articles & Guides for VU Students",
  description:
    "Browse AI-guided study articles, course guides, and exam tips for Virtual University of Pakistan students. Covers CS, Mathematics, Business, Physics, Chemistry, Economics, and English.",
  keywords: [
    "VU blog",
    "Virtual University articles",
    "VU study guides",
    "VU exam tips",
    "VU course help",
  ],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Blog — Study Articles & Guides for VU Students | VirtualU",
    description:
      "AI-guided study articles and course guides for Virtual University of Pakistan students.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU Blog — Study Articles for VU Students",
    description:
      "AI-guided study articles and course guides for Virtual University of Pakistan students.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
