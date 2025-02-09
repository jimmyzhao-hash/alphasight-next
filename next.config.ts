import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_PRIVY_APP_ID: 'test', // Replace with your actual Privy App ID
  },
  // Other config options
};

export default nextConfig;
