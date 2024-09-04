/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "firebasestorage.googleapis.com", // Already added domain for Firebase storage
        "img.clerk.com" // New domain to allow loading images from img.clerk.com
      ],
    },
  };
  
  export default nextConfig;
  