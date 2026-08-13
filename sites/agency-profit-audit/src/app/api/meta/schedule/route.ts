import type { NextRequest } from "next/server";

// Server-side half of the /call-confirmed "Schedule" event. Receives the
// event_id the browser pixel used so Meta deduplicates the pair.
// Requires META_PIXEL_ID (or NEXT_PUBLIC_META_PIXEL_ID) and
// META_CAPI_ACCESS_TOKEN. Optional META_TEST_EVENT_CODE routes events to the
// Events Manager "Test events" tab.

const GRAPH_API_VERSION = "v23.0";

export async function POST(request: NextRequest) {
  const pixelId =
    process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    return Response.json(
      { error: "Meta CAPI is not configured" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const eventId = typeof body?.eventId === "string" ? body.eventId : null;
  if (!eventId) {
    return Response.json({ error: "eventId is required" }, { status: 400 });
  }

  const clientIp = (request.headers.get("x-forwarded-for") ?? "")
    .split(",")[0]
    .trim();

  const payload = {
    data: [
      {
        event_name: "Schedule",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url:
          typeof body?.sourceUrl === "string" ? body.sourceUrl : undefined,
        user_data: {
          client_user_agent: request.headers.get("user-agent") ?? undefined,
          client_ip_address: clientIp || undefined,
          fbp: typeof body?.fbp === "string" ? body.fbp : undefined,
          fbc: typeof body?.fbc === "string" ? body.fbc : undefined,
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
    access_token: accessToken,
  };

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Meta CAPI Schedule event failed:", res.status, detail);
    return Response.json({ error: "Meta CAPI request failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
