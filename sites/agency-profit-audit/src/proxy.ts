import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Captures the Meta click id server-side on the ad landing page.
//
// Why this exists: the browser pixel writes _fbc itself, but it is the single
// most blocked script on the web. When it is blocked the click id is lost and
// the Conversions API call goes out with no fbc, which is exactly the traffic
// CAPI is supposed to recover. Writing our own first-party cookie here happens
// before any client JS and cannot be blocked.
//
// getFbc() prefers Meta's own _fbc and only falls back to this, so when the
// pixel does run its value wins.
//
// Scoped to "/" deliberately: that is the ad destination, and a broad matcher
// would put a proxy hop in front of the /foundations multi-zone rewrite.

const FBC_COOKIE = "sk_fbc";
const NINETY_DAYS = 60 * 60 * 24 * 90;

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const fbclid = request.nextUrl.searchParams.get("fbclid");
  if (!fbclid) return response;

  // Never overwrite: the first click's timestamp is the one Meta wants, and a
  // later page view should not reset it.
  if (request.cookies.get(FBC_COOKIE)) return response;

  response.cookies.set({
    name: FBC_COOKIE,
    value: `fb.1.${Date.now()}.${fbclid}`,
    path: "/",
    maxAge: NINETY_DAYS,
    sameSite: "lax",
    secure: true,
    // Read by the browser when it builds the CAPI payload, so not httpOnly.
    httpOnly: false,
  });

  return response;
}

export const config = {
  matcher: "/",
};
