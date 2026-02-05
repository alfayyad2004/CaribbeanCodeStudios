/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://rollon-rolloff.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
}
