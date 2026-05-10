/** @type {import('next-sitemap').IConfig} */
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL || "https://milanfoundation.ngo",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
};
