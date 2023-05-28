/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb://localhost:27017/my-app",
    JWT_SECRET: "my-secret",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
