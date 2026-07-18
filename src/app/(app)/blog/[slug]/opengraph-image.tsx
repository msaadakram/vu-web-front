import { ImageResponse } from "next/og";
import { serverFetch } from "@/lib/server-fetch";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VirtualU article";

type Props = { params: Promise<{ slug: string }> };

async function fetchBlog(slug: string) {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const res = await serverFetch(`${backendUrl}/api/blog/${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.blog || null;
  } catch { return null; }
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  const title = blog?.metaTitle || blog?.title || "Virtual University";
  const category = blog?.category || "Article";
  const excerpt = (blog?.excerpt || "Study guides for Virtual University of Pakistan students.");
  const shortExcerpt = excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt;
  const readTime = blog?.readTime || "5 min read";
  const author = blog?.uploadedBy?.name || "VirtualU Team";

  const CATEGORY_COLORS: Record<string, string> = {
    "Computer Science": "#3b82f6",
    Mathematics: "#8b5cf6",
    Business: "#10b981",
    Physics: "#f97316",
    Chemistry: "#ef4444",
    Economics: "#14b8a6",
    English: "#ec4899",
  };
  const catColor = CATEGORY_COLORS[category] || "#4eafc4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #06101e 0%, #0f2540 55%, #071b34 100%)",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(78,175,196,0.12)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-40px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(45,212,191,0.07)", filter: "blur(70px)" }} />
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(78,175,196,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(78,175,196,0.7) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />

        {/* Header row: logo + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, #4eafc4, #2a8aa3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 800, color: "white", letterSpacing: "-1px" }}>
              VU
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "white", fontSize: "26px", fontWeight: 700, lineHeight: 1.1 }}>VirtualU</span>
              <span style={{ color: "rgba(78,175,196,0.85)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase" }}>Knowledge Hub</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ backgroundColor: `${catColor}22`, border: `1.5px solid ${catColor}55`, borderRadius: "50px", padding: "8px 18px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: catColor }} />
              <span style={{ color: catColor, fontSize: "14px", fontWeight: 700 }}>{category}</span>
            </div>
          </div>
        </div>

        {/* Main title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", flex: 1, justifyContent: "center", padding: "40px 0 24px" }}>
          <div style={{ color: "white", fontSize: title.length > 72 ? "42px" : "52px", fontWeight: 800, lineHeight: 1.18, letterSpacing: "-1.5px", maxWidth: "1000px" }}>
            {title.length > 90 ? title.slice(0, 90) + "…" : title}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px", lineHeight: 1.6, maxWidth: "900px" }}>
            {shortExcerpt}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #4eafc4, #2dd4bf)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "white" }}>
              {author.charAt(0)}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", fontWeight: 600 }}>{author}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>Virtual University of Pakistan</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
              <span>⏱</span><span>{readTime}</span>
            </div>
            <div style={{ backgroundColor: "rgba(78,175,196,0.15)", border: "1px solid rgba(78,175,196,0.3)", borderRadius: "10px", padding: "8px 18px", color: "#7dd4e8", fontSize: "14px", fontWeight: 600 }}>
              Read on VirtualU →
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
