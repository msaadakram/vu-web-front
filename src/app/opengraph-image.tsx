import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VirtualU — University Blog & Resources";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0f1e35 0%, #1c3557 50%, #0e2a44 100%)",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
          <div
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #4eafc4, #2a4a73)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "white",
            }}
          >
            VU
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "white", fontSize: "40px", fontWeight: 700 }}>VirtualU</div>
            <div style={{ color: "#4eafc4", fontSize: "20px", letterSpacing: "2px", textTransform: "uppercase" }}>
              University
            </div>
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: "66px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "950px",
          }}
        >
          Learn Smarter, Achieve More
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "28px", marginTop: "24px" }}>
          Study resources, AI-guided articles, and exam prep for Virtual University students.
        </div>
      </div>
    ),
    { ...size }
  );
}
