/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_CONFIG_HOST_NAME,
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
