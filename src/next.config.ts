import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "3000",
        pathname: "/api/v3/users/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
