import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at audit.sidekickaccounting.co.uk/founders via a rewrite from the
  // sidekick-landing (profit audit) zone, the same way /foundations is. basePath
  // makes every route and next/image asset resolve under /founders.
  basePath: "/founders",
};

export default nextConfig;
