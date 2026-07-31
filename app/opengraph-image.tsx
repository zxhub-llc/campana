import { ImageResponse } from "next/og";
import { getSiteInfo } from "@/lib/wordpress";

export const alt = "Grupo Campana — Sitio Web Oficial";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const siteInfo = await getSiteInfo();

  const title = siteInfo?.title || "GRUPO CAMPANA";
  const description =
    siteInfo?.description ||
    "Desarrollos inmobiliarios de vanguardia, activos estratégicos e inversiones en Ecuador.";
  const logoUrl = siteInfo?.logo?.url;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
        />

        {/* Decorative Grid Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "80px",
            right: "80px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Top Section: Header & Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {logoUrl ? (
              // eslint-disable-next-ui/next/no-img-element
              <img
                src={logoUrl}
                alt="Logo Grupo Campana"
                style={{ height: "55px", objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  letterSpacing: "4px",
                  color: "#ffffff",
                }}
              >
                GRUPO CAMPANA
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "9999px",
              padding: "8px 20px",
              fontSize: "16px",
              color: "#a1a1aa",
              letterSpacing: "0.05em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            Sitio Web Oficial
          </div>
        </div>

        {/* Middle Section: Main Titles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "960px",
            zIndex: 10,
            marginTop: "30px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "26px",
              color: "#d4d4d8",
              lineHeight: 1.45,
              fontWeight: 400,
              maxWidth: "850px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom Section: Footer metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#3b82f6",
                letterSpacing: "0.02em",
              }}
            >
              grupocampana.ec
            </span>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#71717a",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Desarrollado por{" "}
            <span style={{ color: "#ffffff", fontWeight: 600 }}>Stuvvion</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
