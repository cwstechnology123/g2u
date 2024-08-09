const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
module.exports = {
    siteUrl,
    exclude: ['/404', '/server-sitemap.xml'],
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    sitemapSize: 5000,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/404"],
            },
            { userAgent: "*", allow: "/" },
        ],
        additionalSitemaps: [
            `${siteUrl}sitemap.xml`,
            // `${siteUrl}server-sitemap.xml`,
        ],
    },
};