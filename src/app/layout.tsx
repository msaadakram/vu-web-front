import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BLOG_PUBLIC_BASE_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VirtualU — University Blog & Resources | Virtual University of Pakistan",
    template: "%s | VirtualU",
  },
  description:
    "Access thousands of study resources, expert-written blogs, and comprehensive study materials for Virtual University of Pakistan. Ace your exams with VirtualU.",
  keywords: [
    "Virtual University of Pakistan",
    "Virtual University",
    "VU",
    "VirtualU",
    "university blog",
    "study resources",
    "VU assignments",
    "VU past papers",
    "VU handouts",
    "Pakistan online education",
    "VU LMS",
  ],
  authors: [{ name: "Virtual University of Pakistan", url: BASE_URL }],
  creator: "Virtual University of Pakistan",
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
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "VirtualU — University Blog & Resources",
    description:
      "Access thousands of study resources, expert-written blogs, and comprehensive study materials for Virtual University of Pakistan.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "VirtualU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VirtualU — University Blog & Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU — University Blog & Resources",
    description:
      "Access thousands of study resources, expert-written blogs, and comprehensive study materials for Virtual University of Pakistan.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Virtual University of Pakistan",
  alternateName: "VirtualU",
  url: BASE_URL,
  description:
    "Virtual University of Pakistan — study resources, AI-guided articles, and exam preparation for VU students.",
  sameAs: [
    "https://www.vu.edu.pk/",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VirtualU",
  url: BASE_URL,
  inLanguage: "en-US",
  publisher: {
    "@type": "EducationalOrganization",
    name: "Virtual University of Pakistan",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/resources?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd]),
          }}
        />
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
