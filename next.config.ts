import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pozwala osadzać demo z zewnętrznych domen w iframe (patrz NEXT_PUBLIC_DEMO_URL).
  poweredByHeader: false,
};

export default nextConfig;
