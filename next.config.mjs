/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: "dist",
  images: {
    domains: ["admissionuploads.s3.amazonaws.com"], // Add your S3 domain here
  },
};

export default nextConfig;
