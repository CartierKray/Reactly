/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // Disabled for Vercel - Vercel handles builds differently
    // distDir: 'dist', // Use 'dist' as build output directory
    ...(process.env.VERCEL ? {} : { distDir: 'dist' }),
    images: {
        unoptimized: true,
        // Gebruik remotePatterns i.p.v. domains: preciezer en toekomstbestendiger
        remotePatterns: [
            { protocol: "https", hostname: "cdn.autotelex.nl", pathname: "/**" },
            { protocol: "https", hostname: "do-not-embed.dv.nl", pathname: "/**" },
            { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
            { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
            { protocol: "https", hostname: "andere-domeinen.nl", pathname: "/**" },
            { protocol: "https", hostname: "media-eigenwebsiteincrementeel.export.dv.nl", pathname: "/**" },
            { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
            // Voeg hier evt. extra CDNs / asset hosts aan toe
            // { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/**" },
        ],

    },

    // reactStrictMode: true,
};

export default nextConfig;
