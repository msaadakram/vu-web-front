import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VirtualU — University Blog & Resources",
    short_name: "VirtualU",
    description:
      "Study resources, AI-guided articles, and exam preparation for Virtual University of Pakistan students.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#4eafc4",
    orientation: "portrait-primary",
    categories: ["education", "productivity", "books"],
    lang: "en-US",
    dir: "ltr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48 32x32 16x16",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      { name: "Browse Articles", url: "/blog", description: "Read AI-guided study articles" },
      { name: "Latest News", url: "/news", description: "University news and announcements" },
      { name: "Study Resources", url: "/resources", description: "Download past papers, handouts & notes" },
      { name: "Programs", url: "/programs", description: "Explore degree programs" },
    ],
  };
}
