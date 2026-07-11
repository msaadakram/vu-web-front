import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://virtualupk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VirtualU — BS Computer Science, BSCS Subjects, VU Programs & Study Resources",
    template: "%s | VirtualU",
  },
  description:
    "VirtualU is Pakistan's #1 study hub for Virtual University students. Browse BSCS subjects list, BS Computer Sciences semester-wise courses, BS Software Engineering, BS Accounting & Finance, MBA, BBA, and all VU programs with fee structures and admission guides.",
  keywords: [
    // Top-volume keywords (50k+)
    "bs computer sciences",
    "bscs subjects",
    "bscs subjects list",
    "uni admission",
    "opencourseware",
    // High-volume (500+)
    "bs software engineering",
    "bs accounting and finance",
    "ms computer science subjects",
    "ms in mass communication",
    "pakistan virtual university",
    "vu learning management system",
    "bs in biotechnology",
    "bs maths",
    "bscs subjects list in pakistan",
    "bscs courses",
    // Admission keywords
    "admission in vu",
    "admission virtual university",
    "vu online admission",
    "online admission university",
    "virtual university online courses",
    // Program keywords
    "bba virtual university",
    "vu mba",
    "online mba in pakistan",
    "virtual university lahore",
    "mpa admission",
    "bs computer science subjects",
    "virtual university bs programs",
    "virtual university masters programs",
    "virtual university distance learning programs",
    // LMS & courses
    "university lms",
    "vu online courses",
    "virtual university free online courses",
    "vu free courses",
    "vu short courses",
    // Study scheme keywords
    "bscs 1st semester subjects",
    "bscs semester wise subjects",
    "bs computer science subjects semester wise",
    "bs software engineering subjects",
    // General brand
    "Virtual University of Pakistan",
    "VU",
    "VirtualU",
    "virtual university online courses free",
    "virtual university of pakistan online courses",
  ],
  authors: [{ name: "Virtual University of Pakistan", url: BASE_URL }],
  creator: "VirtualU",
  publisher: "Virtual University of Pakistan",
  applicationName: "VirtualU",
  category: "Education",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "VirtualU — BSCS Subjects, VU Programs, Admission & Study Resources",
    description:
      "Explore BSCS subjects list semester-wise, BS Computer Sciences courses, VU admission guide, MBA, BBA, MS programs — everything for Virtual University of Pakistan students.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "VirtualU",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VirtualU — VU Study Resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU — BSCS Subjects, VU Programs & Study Resources",
    description: "Explore BSCS subjects list semester-wise, BS Computer Sciences courses, VU admission guides, MBA, BBA & more.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: [{ url: "/icon.svg" }] },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const BASE = BASE_URL;

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Virtual University of Pakistan",
  alternateName: ["VirtualU", "VU", "VU Pakistan"],
  url: BASE,
  description:
    "Virtual University of Pakistan — Pakistan's first online university offering BS, MS, MBA, MPA, BBA and PhD programs via distance learning. VirtualU provides AI-generated study guides, BSCS subjects list, study schemes, and exam resources.",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  sameAs: ["https://www.vu.edu.pk/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "VU Academic Programs",
    itemListElement: [
      { "@type": "Course", name: "BS Computer Sciences (BSCS)", description: "4-year BS program covering data structures, algorithms, OOP, databases, and software engineering. Includes semester-wise BSCS subjects list." },
      { "@type": "Course", name: "BS Software Engineering (BSSE)", description: "4-year online software engineering degree at Virtual University of Pakistan with industry-relevant subjects." },
      { "@type": "Course", name: "MBA Virtual University", description: "1.5 to 2.5 year MBA program including MBA Executive. Virtual University MBA fee structure available." },
      { "@type": "Course", name: "BS Accounting & Finance", description: "4-year undergraduate degree in accounting and finance from Virtual University of Pakistan." },
      { "@type": "Course", name: "MS Computer Science", description: "2-year MS Computer Science program with advanced subjects in AI, networking, and software engineering." },
      { "@type": "Course", name: "BBA Virtual University", description: "Bachelor of Business Administration offered online by Virtual University of Pakistan." },
    ],
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VirtualU",
  url: BASE,
  inLanguage: "en-US",
  publisher: { "@type": "EducationalOrganization", name: "Virtual University of Pakistan" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/resources?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationLd, websiteLd]) }} />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] min-h-screen flex flex-col overflow-x-hidden">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
