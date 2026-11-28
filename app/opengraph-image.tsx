import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * app/opengraph-image.tsx
 *
 * De deelafbeelding voor social media en chatapps (1200 × 630), in de
 * huisstijl: donker, zacht wit licht, Poppins en de zwarte Rubik's cube uit
 * de hero. Wordt bij het bouwen gegenereerd.
 */

export const runtime = "nodejs";
export const alt = "Reactly, webdesign & online marketing bureau";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "public/fonts");
  const [medium, semibold, cube] = await Promise.all([
    readFile(join(fonts, "Poppins-Medium.ttf")),
    readFile(join(fonts, "Poppins-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/images/cube/reactly-cube-og.png")),
  ]);
  const cubeSrc = `data:image/png;base64,${cube.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          padding: 72,
          background: "#050507",
          backgroundImage:
            "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.13), transparent 42%), radial-gradient(circle at 8% 100%, rgba(255,255,255,0.05), transparent 40%)",
          color: "white",
          fontFamily: "Poppins",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cubeSrc} width={500} height={500} alt="" style={{ position: "absolute", right: 40, top: 70 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: 700 }}>
          <div style={{ display: "flex" }}>
            {/* Het logo is vet cursief: Poppins SemiBold, scheef gezet. */}
            <span style={{ fontSize: 54, fontWeight: 600, letterSpacing: -1, transform: "skewX(-10deg)" }}>Reactly</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, letterSpacing: 7, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", fontWeight: 500 }}>
              Webdesign & online marketing
            </span>
            <span style={{ fontSize: 70, lineHeight: 1.06, letterSpacing: -2.5, marginTop: 18, fontWeight: 500 }}>
              Websites die écht converteren
            </span>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 21, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
            <span>Websites vanaf € 499</span>
            <span style={{ color: "#ffffff" }}>Offerte binnen 24 uur</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
