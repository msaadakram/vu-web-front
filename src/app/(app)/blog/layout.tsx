import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Blog — Study Articles & Guides | VirtualU",
    template: "%s | VirtualU Blog",
  },
  description:
    "Browse AI-guided study articles, course summaries, past-paper breakdowns, and exam tips for Virtual University of Pakistan (VU) students. Covering CS, Mathematics, Business, Physics, Chemistry, Economics, English and more.",
  keywords: [
    "VU blog",
    "Virtual University articles",
    "VU study guides",
    "VU exam tips",
    "VU course help",
    "Virtual University of Pakistan",
    "VU handouts",
    "VU past papers",
    "VU CS",
    "VU MBA",
  ],
  authors: [{ name: "VirtualU", url: BASE_URL }],
  creator: "VirtualU",
  publisher: "Virtual University of Pakistan",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Blog — Study Articles & Guides for VU Students | VirtualU",
    description:
      "AI-guided study articles and course guides for Virtual University of Pakistan students.",
    url: `${BASE_URL}/blog`,
    siteName: "VirtualU",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU Blog — Study Articles for VU Students",
    description:
      "AI-guided study articles and course guides for Virtual University of Pakistan students.",
    creator: "@virtualupk",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
