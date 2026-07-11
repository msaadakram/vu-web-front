import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Study Resources — Past Papers, Handouts & Notes",
  description:
    "Download free study resources for Virtual University of Pakistan: past papers, handouts, assignments, and notes across all courses and semesters.",
  keywords: [
    "VU past papers",
    "VU handouts",
    "VU assignments",
    "VU notes",
    "Virtual University resources",
    "VU study material",
  ],
  alternates: { canonical: `${BASE_URL}/resources` },
  openGraph: {
    title: "Study Resources — Past Papers, Handouts & Notes | VirtualU",
    description:
      "Download free past papers, handouts, assignments, and notes for Virtual University of Pakistan.",
    url: `${BASE_URL}/resources`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU Resources — Past Papers & Handouts",
    description:
      "Download free study resources for Virtual University of Pakistan.",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
