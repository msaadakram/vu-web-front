import { ImageResponse } from "next/og";
import { api } from "@/lib/api";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VirtualU news";

type NewsPost = { title: string; category?: string };

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "Virtual University News";
  let category = "News";
  try {
    const res = await api<{ data: { blog: NewsPost } }>(`/news/${encodeURIComponent(slug)}`);
    if (res?.data?.blog) {
      title = res.data.blog.title;
      category = res.data.blog.category || "News";
    }
  } catch {
    // fall back to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f1e35 0%, #1c3557 50%, #0e2a44 100%)",
          padding: "70px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4eafc4, #2a4a73)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
            }}
          >
            VU
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "white", fontSize: "30px", fontWeight: 700 }}>VirtualU</div>
            <div style={{ color: "#4eafc4", fontSize: "16px", letterSpacing: "2px", textTransform: "uppercase" }}>
              University
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "22px",
              fontWeight: 600,
              color: "#4eafc4",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#4eafc4" }} />
            {category}
          </div>
          <div
            style={{
              color: "white",
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "1000px",
            }}
          >
            {title.length > 90 ? title.slice(0, 90) + "…" : title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(255,255,255,0.5)", fontSize: "22px" }}>
          <span>Virtual University of Pakistan</span>
          <span>virtualu.edu.pk</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
