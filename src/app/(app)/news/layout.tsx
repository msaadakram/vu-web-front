import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "News — University Announcements & Updates",
  description:
    "Latest news, announcements, events, and academic updates from Virtual University of Pakistan. Stay informed about admissions, results, scholarships, and campus events.",
  keywords: [
    "Virtual University news",
    "VU announcements",
    "VU admissions news",
    "VU results",
    "VU events",
  ],
  // The news listing is currently empty (no posts yet). Keep it out of the
  // index until posts are published. REMOVE this robots block once news posts
  // exist so the listing can rank again.
  robots: { index: false, follow: true },
  alternates: { canonical: `${BASE_URL}/news` },
  openGraph: {
    title: "News — University Announcements & Updates | Virtual University",
    description:
      "Latest news and announcements from Virtual University of Pakistan.",
    url: `${BASE_URL}/news`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual University News — VU Announcements & Updates",
    description: "Latest news and announcements from Virtual University of Pakistan.",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
