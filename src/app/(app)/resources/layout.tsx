import { type Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "VU Study Resources — Handouts, Past Papers & Course Notes | VirtualU",
    template: "%s | VirtualU Resources",
  },
  description:
    "Download VU study resources including BSCS handouts, past papers, CS101 lectures, CS301 data structures notes, and study schemes for all Virtual University of Pakistan programs. Free opencourseware resources.",
  keywords: [
    "bscs subjects",
    "vu handouts",
    "vu past papers",
    "cs101 lectures",
    "cs101 book",
    "cs101 introduction to computing",
    "bs computer science books",
    "bscs courses",
    "virtual university free online courses",
    "vu free courses",
    "opencourseware",
    "vu learning management system",
    "bs software engineering subjects",
    "bs accounting and finance subjects",
    "virtual university study resources",
  ],
  alternates: { canonical: `${BASE_URL}/resources` },
  openGraph: {
    title: "VU Resources — Handouts, Past Papers & Free Study Material",
    description: "Free VU study resources: BSCS handouts, past papers, CS101 lectures, and subject notes for all Virtual University of Pakistan courses.",
    type: "website",
    url: `${BASE_URL}/resources`,
    siteName: "VirtualU",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
