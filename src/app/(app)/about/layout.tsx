import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "About — VirtualU for Virtual University of Pakistan",
  description:
    "Learn about VirtualU — a modern learning companion for Virtual University of Pakistan students, offering study resources, AI-guided articles, and exam preparation.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About VirtualU | Virtual University of Pakistan",
    description:
      "A modern learning companion for Virtual University of Pakistan students.",
    url: `${BASE_URL}/about`,
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
