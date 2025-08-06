/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.reactly.nl', // Verander naar jouw eigen domein
    generateRobotsTxt: true, // Genereert automatisch een robots.txt
    sitemapSize: 5000, // Aantal links per sitemapbestand (standaard is 5000)
    exclude: ['/404', '/admin'], // Optioneel: pagina's om uit te sluiten
};
