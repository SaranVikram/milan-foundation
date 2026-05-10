const config = require("./src/config/config.json");
const UnpluginTailwindcssMangle = require('unplugin-tailwindcss-mangle/webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  images: {
    domains: [
      "images.unsplash.com",
    ],
  },
  webpack(config, { isServer, dev }) {
    // Only apply Tailwind class mangling in production client build
    if (!isServer && !dev) {
      config.plugins.push(
        UnpluginTailwindcssMangle({
          classNameRegExp: /^tw-/,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
