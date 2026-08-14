import type { NextConfig } from "next";

// Multi-zones: this app (the Agency Profit Audit) owns audit.sidekickaccounting.co.uk
// and serves "/". The Agency Foundations lead magnet is a separate Next.js app
// ("zone") that serves the "/foundations" path prefix. We rewrite /foundations and
// everything under it (pages, /_next assets, image optimizer) to that zone's
// production deployment.
// Ref: node_modules/next/dist/docs/01-app/02-guides/multi-zones.md
const FOUNDATIONS_ZONE =
  process.env.FOUNDATIONS_ZONE_URL ?? "https://agency-foundations-audit.vercel.app";

const nextConfig: NextConfig = {
  // /thank-you was the old post-booking page. It is gone, but the URL may still
  // be configured as a redirect target in Calendly, so it is sent to the page
  // that replaced it rather than left to 404. Note this means a hit on the old
  // URL lands on /call-confirmed and fires its Schedule event, which is correct
  // for a real booking.
  async redirects() {
    return [
      {
        source: "/thank-you",
        destination: "/call-confirmed",
        permanent: true,
      },
    ];
  },

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
    ];
  },
};

export default nextConfig;
