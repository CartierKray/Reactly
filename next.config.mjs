/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lokaal bouwen naar `dist` (of NEXT_DIST_DIR, bv. voor een testbuild naast
  // de dev server); Vercel regelt zijn eigen uitvoermap.
  ...(process.env.NEXT_DIST_DIR
    ? { distDir: process.env.NEXT_DIST_DIR }
    : process.env.VERCEL
      ? {}
      : { distDir: "dist" }),
  poweredByHeader: false,
  images: {
    // Beeldoptimalisatie staat weer aan (stond uit): afbeeldingen worden in
    // AVIF/WebP en op de juiste maat geserveerd in plaats van als ruwe PNG/JPG.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        // Video, 3D-scène en lettertypes veranderen zelden: lang cachen.
        source: "/:dir(video|spline|fonts)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
