import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Programs — Degree Programs at Virtual University of Pakistan",
  description:
    "Explore undergraduate and graduate degree programs offered by Virtual University of Pakistan, including Computer Science, Business, Mathematics, Physics, and more.",
  keywords: [
    "Virtual University programs",
    "VU degree programs",
    "VU BS programs",
    "VU MS programs",
    "VU admissions",
  ],
  alternates: { canonical: `${BASE_URL}/programs` },
  openGraph: {
    title: "Programs — Degree Programs at Virtual University of Pakistan | VirtualU",
    description:
      "Explore degree programs offered by Virtual University of Pakistan.",
    url: `${BASE_URL}/programs`,
    type: "website",
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
