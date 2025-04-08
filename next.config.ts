import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig): WebpackConfig => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
        },
      },
    };
  },
  serverExternalPackages: ["@tailwindcss/oxide"],
};

export default nextConfig;
