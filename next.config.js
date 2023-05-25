/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb://localhost:27017/my-app",
    NEXTAUTH_SECRET: "unknown",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
