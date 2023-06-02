const env = require("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
