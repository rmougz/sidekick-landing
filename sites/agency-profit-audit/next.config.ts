import type { NextConfig } from "next";

// Multi-zones: this app (the Agency Profit Audit) owns audit.sidekickaccounting.co.uk
// and serves "/". The Agency Foundations lead magnet is a separate Next.js app
// ("zone") that serves the "/foundations" path prefix. We rewrite /foundations and
// everything under it (pages, /_next assets, image optimizer) to that zone's
// production deployment.
// Ref: node_modules/next/dist/docs/01-app/02-guides/multi-zones.md
const FOUNDATIONS_ZONE =
  process.env.FOUNDATIONS_ZONE_URL ?? "https://agency-foundations-audit.vercel.app";
// The UK founders page (sites/uk-founders, basePath "/founders") is a third zone,
// proxied the same way. Distinct prefix: "/founders" never matches "/foundations".
const FOUNDERS_ZONE =
  process.env.FOUNDERS_ZONE_URL ?? "https://sidekick-uk-founders.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/foundations",
        destination: `${FOUNDATIONS_ZONE}/foundations`,
      },
      {
        source: "/foundations/:path*",
        destination: `${FOUNDATIONS_ZONE}/foundations/:path*`,
      },
      {
        source: "/founders",
        destination: `${FOUNDERS_ZONE}/founders`,
      },
      {
        source: "/founders/:path*",
        destination: `${FOUNDERS_ZONE}/founders/:path*`,
      },
    ];
  },
};

export default nextConfig;
