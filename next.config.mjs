/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ph-files.imgix.net" },
      { protocol: "https", hostname: "bookface-images.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
