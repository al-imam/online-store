/** @type {import('next').NextConfig} */

const env = require("./env");

const nextConfig = {
  env: env,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
