import { type Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://www.virtualupk.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "VU Programs — BS, MBA, BBA, MS & ADP | Virtual University of Pakistan",
    template: "%s Program | VirtualU",
  },
  description:
    "Explore all Virtual University of Pakistan programs: BS Computer Sciences (BSCS), BS Software Engineering, BS Accounting & Finance, MBA, BBA, MS Computer Science, MPA, and more. Fee structure, eligibility, admission requirements, and semester-wise subjects.",
  keywords: [
    "virtual university bs programs",
    "bs computer sciences",
    "bs software engineering",
    "bs accounting and finance",
    "mba virtual university",
    "bba virtual university",
    "ms computer science subjects",
    "mpa admission",
    "virtual university masters programs",
    "virtual university bachelor programs",
    "virtual university distance learning programs",
    "online mba in pakistan",
    "virtual university mba fee structure",
    "bba admission in virtual university",
    "bs in biotechnology",
    "bs maths",
    "virtual university phd programs",
    "virtual university mphil programs",
    "pakistan virtual university",
  ],
  alternates: { canonical: `${BASE_URL}/programs` },
  openGraph: {
    title: "VU Programs — BS, MBA, BBA, MS, MPA & PhD | Virtual University Pakistan",
    description: "Complete list of Virtual University of Pakistan programs with fee structure, eligibility criteria, and admission dates. BS, MBA, BBA, MS, MPA, and ADP programs.",
    type: "website",
    url: `${BASE_URL}/programs`,
    siteName: "VirtualU",
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
