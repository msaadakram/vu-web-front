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
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
        purpose: "maskable",
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
