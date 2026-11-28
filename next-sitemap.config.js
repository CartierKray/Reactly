/** @type {import('next-sitemap').IConfig} */

// Zelfde regel als SITE.url in lib/site.ts: het vercel.app-adres zolang
// reactly.nl nog niet aan het Vercel-project hangt, daarna www.reactly.nl.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '') ||
    (vercel && vercel.endsWith('.vercel.app') ? `https://${vercel}` : 'https://www.reactly.nl');

module.exports = {
    siteUrl,
    generateRobotsTxt: true, // Genereert automatisch een robots.txt
    sitemapSize: 5000, // Aantal links per sitemapbestand (standaard is 5000)
    exclude: ['/404', '/admin', '/dashboard', '/dashboard/*'], // Intern dashboard nooit in de sitemap
    robotsTxtOptions: {
        policies: [{ userAgent: '*', allow: '/', disallow: ['/dashboard', '/api/'] }],
    },
};
