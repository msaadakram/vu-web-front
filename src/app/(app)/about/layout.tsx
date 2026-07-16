import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "About VirtualU — Independent VU Study Hub",
  description:
    "VirtualU is an independent, community-driven study hub for Virtual University of Pakistan students. Not affiliated with vu.edu.pk. Access BSCS subjects list, opencourseware resources, VU LMS guides, uni admission info, BS Computer Science, BS Software Engineering, MBA, BBA and MS programs.",
  keywords: [
    "about virtual university of pakistan",
    "virtualupk",
    "vu pak",
    "pakistan virtual university",
    "virtual university lahore",
    "virtual university bs programs",
    "virtual university masters programs",
    "virtual university bachelor programs",
    "virtual university distance learning programs",
    "opencourseware",
    "opencourseware universities",
    "vu learning management system",
    "university lms",
    "uni admission",
    "admission virtual university",
    "vu online admission",
    "bscs subjects",
    "bs computer sciences",
    "bs software engineering",
    "bs accounting and finance",
    "vu mba",
    "bba virtual university",
    "ms computer science subjects",
    "ms in mass communication",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About VirtualU — Independent VU Study Hub",
    description:
      "An independent, community-driven study hub for Virtual University of Pakistan students. Explore BSCS subjects, opencourseware, VU LMS, uni admission, MBA, BBA, BS programs. Not affiliated with vu.edu.pk.",
    url: `${BASE_URL}/about`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About VirtualU" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About VirtualU — Independent VU Study Hub",
    description: "A community study hub for VU Pakistan students — BSCS subjects, opencourseware, uni admission, MBA, BBA, MS programs. Not affiliated with vu.edu.pk.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
