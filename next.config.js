/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN_URL: "vercel url",
    DOMAIN_API: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : process.env.DOMAIN_URL,
    NEXTAUTH_URL: process.env.DOMAIN_API,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig
