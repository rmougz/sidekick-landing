import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at audit.sidekickaccounting.co.uk/founders via a rewrite from the
  // sidekick-landing (profit audit) zone, the same way /foundations is. basePath
  // makes every route and next/image asset resolve under /founders.
  basePath: "/founders",
  experimental: {
    // Put the (small, Tailwind) stylesheet in the HTML instead of a <link>, so a
    // first-time visitor on a slow phone connection can paint the hero without
    // a second round trip. Nearly all traffic is new visitors from Instagram.
    inlineCss: true,
  },
};

export default nextConfig;
