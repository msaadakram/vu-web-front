import { type Metadata } from "next";

import WhatsNewClient from "./WhatsNewClient";
import type { Feed } from "./WhatsNewClient";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://www.virtualupk.vercel.app";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What's New — Chrome Extension & VULMS App | Virtual University",
  description:
    "VirtualU's Chrome Extension and VULMS mobile app bring modern, animated access to past papers, handouts, and notes. Plus the latest blogs, news, and resources.",
  keywords: [
    "VirtualU chrome extension",
    "VULMS app",
    "virtual university app",
    "vu study resources",
    "vu past papers app",
    "virtual university lms",
  ],
  alternates: { canonical: `${BASE_URL}/whats-new` },
  openGraph: {
    title: "What's New — Chrome Extension & VULMS App | Virtual University",
    description:
      "A fresh way to experience VirtualU — the Chrome Extension and VULMS mobile app, plus the latest blogs, news, and resources.",
    url: `${BASE_URL}/whats-new`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's New — Chrome Extension & VULMS App | Virtual University",
    description:
      "VirtualU's Chrome Extension and VULMS app bring modern, animated access to past papers, handouts, and notes.",
  },
};

type BlogItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  createdAt: string;
  coverImage?: string;
};
type ResourceItem = {
  _id: string;
  title: string;
  type: string;
  course?: string;
  createdAt: string;
};

async function fetchNew(): Promise<Feed> {
  try {
    const [blogRes, newsRes, resourceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/blog?limit=6&sort=-createdAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/news?limit=6&sort=-createdAt`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/resources?limit=6&sort=-createdAt`, { next: { revalidate: 3600 } }),
    ]);

    const [blogData, newsData, resourceData] = await Promise.all([
      blogRes.ok ? blogRes.json() : { data: { blogs: [] } },
      newsRes.ok ? newsRes.json() : { data: { blogs: [] } },
      resourceRes.ok ? resourceRes.json() : { data: { resources: [] } },
    ]);

    return {
      blogs: (blogData?.data?.blogs ?? []) as BlogItem[],
      news: (newsData?.data?.blogs ?? []) as BlogItem[],
      resources: (resourceData?.data?.resources ?? []) as ResourceItem[],
    };
  } catch {
    return { blogs: [], news: [], resources: [] };
  }
}

export default async function WhatsNewPage() {
  const feed = await fetchNew();
  return <WhatsNewClient feed={feed} />;
}
