import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["flagcdn.com","upload.wikimedia.org"], // ✅ Add the domain here
  },
};

export default nextConfig;
