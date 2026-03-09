import { ImageResponse } from "next/og";

interface BrandImageOptions {
  width: number;
  height: number;
  locale?: "en" | "ar";
  compact?: boolean;
}

export function createBrandImage({
  width,
  height,
  locale = "en",
  compact = false,
}: BrandImageOptions) {
  if (compact) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: width <= 48 ? 10 : 36,
            background:
              "radial-gradient(circle at 30% 20%, rgba(183,157,103,0.28), transparent 44%), linear-gradient(145deg, #050505 0%, #0d0d0d 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#f6f2e8",
            fontFamily: "Arial",
            fontWeight: 700,
            fontSize: width <= 48 ? 18 : 84,
            letterSpacing: "0.08em",
          }}
        >
          K
        </div>
      ),
      {
        width,
        height,
      },
    );
  }

  const subtitle =
    locale === "ar"
      ? "Luxury modest wear with Arabic and Islamic inspiration"
      : "Luxury modest wear presented like centerpieces";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 20% 20%, rgba(183,157,103,0.22), transparent 35%), radial-gradient(circle at 85% 18%, rgba(255,255,255,0.12), transparent 24%), linear-gradient(145deg, #030303 0%, #0a0a0a 52%, #020202 100%)",
          color: "#f6f2e8",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 44,
            border: "1px solid rgba(255,255,255,0.10)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(246,242,232,0.70)",
            }}
          >
            Luxury modest wear
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                fontSize: 132,
                letterSpacing: "0.22em",
                fontWeight: 700,
              }}
            >
              KRAVEXO
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "64%",
                fontSize: 42,
                lineHeight: 1.25,
                color: "rgba(246,242,232,0.80)",
              }}
            >
              {subtitle}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(246,242,232,0.55)",
            }}
          >
            <div style={{ display: "flex" }}>Dark showroom storefront</div>
            <div style={{ display: "flex" }}>English / Arabic</div>
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    },
  );
}
