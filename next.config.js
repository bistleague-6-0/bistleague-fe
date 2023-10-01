/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/bist6-stg/**",
      },
    ],
  },
  env: {
    STAGE: process.env.NEXT_PUBLIC_STAGE,
  },
};
