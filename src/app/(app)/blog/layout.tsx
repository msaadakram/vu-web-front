import { type Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Blog — BSCS Subjects, VU Programs & Admission Guides | VirtualU",
    template: "%s | VirtualU Blog",
  },
  description:
    "Read expert VU study guides covering BSCS subjects list semester-wise, BS Computer Sciences courses, VU MBA programs, VU online admission steps, and LMS tutorials. AI-generated, SEO-optimized content for Virtual University of Pakistan students.",
  keywords: [
    "bscs subjects list",
    "bs computer sciences",
    "vu online admission",
    "virtual university programs",
    "bscs semester wise subjects",
    "bs software engineering subjects",
    "mba virtual university",
    "vu learning management system",
    "opencourseware",
    "virtual university blog",
    "vu study resources",
    "admission virtual university",
  ],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "VirtualU Blog — BSCS Subjects, VU Admission & Study Guides",
    description: "Expert guides on BSCS subjects list, BS Computer Sciences semester-wise courses, VU MBA, BBA admission, and LMS tutorials for Virtual University of Pakistan students.",
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "VirtualU",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
