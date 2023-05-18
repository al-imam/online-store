/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb://localhost:27017/my-app",
  },
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
