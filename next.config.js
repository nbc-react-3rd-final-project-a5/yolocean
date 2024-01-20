/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hntpomvsqgbdpwrjnsun.supabase.co",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

module.exports = nextConfig;
