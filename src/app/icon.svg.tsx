import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #4eafc4, #2a4a73)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 56,
          fontWeight: 700,
          borderRadius: 8,
        }}
      >
        VU
      </div>
    ),
    { ...size }
  );
}
