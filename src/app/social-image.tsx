import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 78px",
          color: "#161817",
          background: "#f2efe8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "64px", height: "8px", background: "#b63c27" }} />
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Public incident case study
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              maxWidth: "980px",
              fontSize: 94,
              fontWeight: 700,
              letterSpacing: "-0.055em",
              lineHeight: 0.96,
            }}
          >
            Anatomy of a hosting breach
          </div>
          <div
            style={{
              maxWidth: "920px",
              color: "#545954",
              fontFamily: "Arial, sans-serif",
              fontSize: 34,
              lineHeight: 1.3,
            }}
          >
            17 hosted domains. 11 production sites rebuilt with isolation.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "2px solid #cbc7bc",
            color: "#545954",
            fontFamily: "Arial, sans-serif",
            fontSize: 24,
          }}
        >
          <span>Anonymized. Evidence-led. Decisions documented.</span>
          <span>sudotsu</span>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
