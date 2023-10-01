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
    NODE_ENV: process.env.NODE_ENV,
  },
};
