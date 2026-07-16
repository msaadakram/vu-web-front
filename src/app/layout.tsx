import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "https://www.virtualupk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BSCS Subjects List, BS Computer Sciences & VU Admission | VirtualU",
    template: "%s | VirtualU",
  },
  description:
    "Free BSCS subjects list semester-wise, BS Computer Sciences courses, opencourseware, VU LMS & admission guides, MBA, BBA, MS programs and fee structure for Virtual University of Pakistan students.",
  keywords: [
    // 50000+ monthly searches — top priority (from Keyword Stats 2026-07-11)
    "bs computer sciences",
    // 5000+ monthly searches
    "bscs subjects",
    "bscs subjects list",
    "opencourseware",
    "uni admission",
    "ocw website",
    // 500+ monthly searches
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
    "vu pak",
    "vu university lahore",
    "virtual university pk",
    "virtual university book shop",
    "virtual universities in pakistan",
    "virtual uni of pakistan",
    "students lms",
    "vu degree verification",
    "msc mass communication",
    "bed secondary",
    // Admission keywords
    "admission in vu",
    "admission virtual university",
    "vu online admission",
    "online admission university",
    "virtual university online courses",
    "vuadmission",
    "vu uni admission",
    "university online apply",
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
    "virtual university bachelor programs",
    "virtual university diploma courses",
    "virtual university phd programs",
    "virtual university mphil programs",
    "zero semester virtual university",
    "vu software engineering",
    "software engineering virtual university",
    // LMS & courses
    "university lms",
    "vu online courses",
    "virtual university free online courses",
    "vu free courses",
    "vu short courses",
    "opencourseware universities",
    "websites like mit opencourseware",
    "learning management system for university",
    "virtual university of pakistan online courses",
    "virtual university online courses free",
    // Study scheme keywords
    "bscs 1st semester subjects",
    "bscs semester wise subjects",
    "bs computer science subjects semester wise",
    "bs software engineering subjects",
    "bs accounting and finance subjects",
    "vu subjects",
    "ms computer science subjects",
    // MBA / MS keywords
    "mba virtual university",
    "vu mba executive",
    "mba executive virtual university",
    "virtual university mba fee structure",
    "online mba programs in pakistan",
    "mba in pakistan",
    "mba executive in pakistan",
    "mba subjects in pakistan",
    "ms business administration",
    "vu ms computer science",
    "vu ms programs",
    "vu mscs",
    "vu mphil",
    // Fee structure
    "virtual university bba fee structure",
    "vu overseas fee structure",
    "vu overseas fee",
    // LMS login keywords
    "vu lms portal",
    "vu login lms",
    "vu lms pk",
    "vu lms id",
    "vu lms sign out",
    "vu login admission",
    // General brand
    "Virtual University of Pakistan",
    "VU",
    "VirtualU",
    "vu apply",
    "vu course",
    "vutes",
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
    title: "VirtualU — BSCS Subjects, Uni Admission, VU Programs & Opencourseware",
    description:
      "Browse BSCS subjects list semester-wise, BS Computer Sciences, opencourseware resources, VU LMS, uni admission guides, MBA, BBA, MS programs — everything for Virtual University of Pakistan students.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "VirtualU",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VirtualU — VU Study Resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU — BSCS Subjects, Uni Admission & VU Programs",
    description: "Explore BSCS subjects list, BS Computer Sciences courses, opencourseware, VU admission guides, MBA, BBA & more for Virtual University of Pakistan.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/facon.png", type: "image/png" }], apple: [{ url: "/facon.png" }] },
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
  alternateName: ["VirtualU", "VU", "VU Pakistan", "VU Pak"],
  url: BASE,
  description:
    "Virtual University of Pakistan — Pakistan's first online university offering BS, MS, MBA, MPA, BBA and PhD programs via distance learning. VirtualU provides opencourseware resources, BSCS subjects list, study schemes, VU LMS guides, uni admission info, and exam preparation materials.",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
  sameAs: ["https://www.vu.edu.pk/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "VU Academic Programs",
    itemListElement: [
      { "@type": "Course", name: "BS Computer Sciences (BSCS)", description: "4-year BS program covering BSCS subjects semester-wise: data structures, algorithms, OOP, databases, and software engineering.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs/bs-computer-science` },
      { "@type": "Course", name: "BS Software Engineering (BSSE)", description: "4-year online BS software engineering degree at Virtual University of Pakistan with industry-relevant subjects.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs/bs-software-engineering` },
      { "@type": "Course", name: "MBA Virtual University", description: "1.5 to 2.5 year MBA and MBA Executive programs. Virtual University MBA fee structure and subjects available.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs#graduate` },
      { "@type": "Course", name: "BS Accounting & Finance", description: "4-year undergraduate degree in BS Accounting and Finance from Virtual University of Pakistan.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs/bs-accounting-finance` },
      { "@type": "Course", name: "MS Computer Science", description: "2-year MS Computer Science program with advanced subjects in AI, networking, and software engineering.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs/ms-computer-science` },
      { "@type": "Course", name: "BBA Virtual University", description: "Bachelor of Business Administration offered online by Virtual University of Pakistan with full fee structure.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs#undergraduate` },
      { "@type": "Course", name: "MS in Mass Communication", description: "MS Mass Communication program at Virtual University — one of the fastest-growing programs with 900% YoY search growth.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs#graduate` },
      { "@type": "Course", name: "BS in Biotechnology", description: "BS Biotechnology offered by Virtual University of Pakistan as part of its natural sciences programs.", provider: { "@type": "Organization", name: "Virtual University of Pakistan" }, url: `${BASE}/programs#undergraduate` },
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
        <meta name="google-adsense-account" content="ca-pub-5487423854561897" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationLd, websiteLd]) }} />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] min-h-screen flex flex-col overflow-x-hidden">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
