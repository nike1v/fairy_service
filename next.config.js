/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = nextTranslate({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "ua",
    localeDetection: false
  }
});

module.exports = nextConfig;
