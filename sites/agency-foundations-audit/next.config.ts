import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served under audit.sidekickaccounting.co.uk/foundations via a rewrite from
  // the sidekick-landing (profit audit) zone. basePath makes every route and
  // next/image asset resolve under /foundations.
  basePath: "/foundations",
};

export default nextConfig;
