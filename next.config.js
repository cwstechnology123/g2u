/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "g2u.cwsdev1.com"],
    minimumCacheTTL: 1000 * 60 * 60 * 24 * 30,
  },
  compress: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }));
    return config;
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/the-g2u-difference',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/your-party-could-be-free',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/franchise-information',
        destination: '/become-an-affiliate',
        permanent: true,
        statusCode: 301,
      },
    ]
  },
}

module.exports = nextConfig
