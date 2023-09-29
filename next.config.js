/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["myipfs.mypinata.cloud"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.moralis.io",
      },
    ],
  },
};

module.exports = nextConfig;
