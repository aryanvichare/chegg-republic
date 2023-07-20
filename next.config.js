/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatar.vercel.sh",
      "res.cloudinary.com",
      "vercel.com",
      "api.dicebear.com",
      "images.unsplash.com",
      "cdn.jsdelivr.net",
      "tailwindui.com",
      "pbs.twimg.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
