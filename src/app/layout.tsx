import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "VirtualU — University Blog & Resources | Virtual University of Pakistan",
    template: "%s | VirtualU",
  },
  description:
    "Access thousands of study resources, expert-written blogs, and comprehensive study materials for Virtual University of Pakistan. Ace your exams with VirtualU.",
  keywords: [
    "Virtual University of Pakistan",
    "university blog",
    "study resources",
    "VU assignments",
    "Pakistan online education",
  ],
  authors: [{ name: "Virtual University of Pakistan" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "VirtualU — University Blog & Resources",
    description:
      "Access thousands of study resources, expert-written blogs, and comprehensive study materials for Virtual University of Pakistan.",
    type: "website",
    locale: "en_US",
    siteName: "VirtualU",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualU — University Blog & Resources",
    description:
      "Access thousands of study resources, expert-written blogs, and comprehensive study materials for Virtual University of Pakistan.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#f8fafc] min-h-screen flex flex-col">
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

