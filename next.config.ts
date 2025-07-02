import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/", // 根路径
        destination: "/analysis/2330/monthly-revenue", // 目标路径
        permanent: false, // 是否永久重定向 (false 表示临时重定向)
      },
    ];
  },
};

export default nextConfig;
