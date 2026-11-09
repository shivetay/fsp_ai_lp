import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "Wdrożenia AI i automatyzacja procesów dla małych firm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const dir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
  const [semibold, regular] = await Promise.all([
    readFile(join(dir, "Geist-SemiBold.ttf")),
    readFile(join(dir, "Geist-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0a0a0a", color: "#fafafa", fontFamily: "Geist" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 14, background: "#fafafa", color: "#0a0a0a", fontSize: 26, fontWeight: 600 }}>
            {site.brand}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 600 }}>{site.name}</div>
            <div style={{ fontSize: 24, color: "#a3a3a3" }}>{site.brandTag}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            AI i automatyzacje dla małych, lokalnych firm
          </div>
          <div style={{ fontSize: 32, color: "#a3a3a3" }}>
            Wrocław i Dolny Śląsk · Bezpłatna konsultacja · Kalkulator ROI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
