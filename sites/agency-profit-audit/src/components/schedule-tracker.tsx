"use client";

import { useEffect, useRef } from "react";

// Fires the Meta "Schedule" event once per booking on /call-confirmed: browser
// pixel + server-side Conversions API, sharing one event_id so Meta
// deduplicates the pair. The pixel is only ever loaded here — no other route
// emits Meta events.
//
// Deduplication is two layers, because either alone leaves a hole:
//
//  1. event_id. When Calendly passes the booking through on the redirect
//     ("Pass event details to your redirect page"), the id is derived from
//     invitee_uuid, so every fire for one booking sends the SAME event_id and
//     Meta collapses them server-side — across tabs, devices and cleared
//     storage. Without that param we fall back to a random id, which only
//     dedupes the pixel/CAPI pair.
//
//  2. Local guard. localStorage, not sessionStorage: sessionStorage is
//     per-tab, so opening the confirmation link in a second tab produced a
//     second Schedule event with a fresh event_id. Keyed on the booking when
//     we have one (permanent, and a genuine second booking has a different
//     uuid so it still counts). Without a booking id the generic guard expires
//     after GUARD_TTL_MS, so tab-hopping around one booking is suppressed but
//     a real booking weeks later is not.

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const STORAGE_KEY = "sk-schedule-fired";
const GUARD_TTL_MS = 30 * 60 * 1000;

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
}

type FbqWindow = Window & { fbq?: Fbq; _fbq?: Fbq };

// The standard Meta pixel bootstrap: install a queueing stub, then load
// fbevents.js, which drains the queue.
function ensurePixel(pixelId: string): Fbq {
  const w = window as FbqWindow;
  if (!w.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    }) as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    if (!w._fbq) w._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  w.fbq("init", pixelId);
  return w.fbq;
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// _fbc cookie if Meta set one, else derive from a click id in the URL.
function getFbc(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

// Calendly's opaque booking identifier, when it is passed on the redirect.
// Deliberately only the uuid params — never invitee_email, which would put
// personal data in an event id and in localStorage.
function getBookingId(): string | null {
  const p = new URLSearchParams(window.location.search);
  const id = p.get("invitee_uuid") ?? p.get("event_uuid");
  return id && id.trim() ? id.trim() : null;
}

// Best-effort persistent store. Falls back to sessionStorage, then to nothing
// (in which case the ref still prevents a double fire within one page load).
function getStore(): Storage | null {
  for (const get of [() => localStorage, () => sessionStorage]) {
    try {
      const s = get();
      const probe = "__sk_probe__";
      s.setItem(probe, "1");
      s.removeItem(probe);
      return s;
    } catch {
      // unavailable or blocked — try the next one
    }
  }
  return null;
}

export default function ScheduleTracker() {
  const fired = useRef(false);

  useEffect(() => {
    // Ref guards React re-renders and StrictMode's double-invoke.
    if (fired.current || !PIXEL_ID) return;
    fired.current = true;

    const bookingId = getBookingId();
    const store = getStore();
    const key = bookingId ? `${STORAGE_KEY}:${bookingId}` : STORAGE_KEY;

    if (store) {
      const raw = store.getItem(key);
      if (raw) {
        // A booking-keyed guard never expires: that booking is already counted.
        if (bookingId) return;
        // The generic guard only suppresses repeats close in time.
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts < GUARD_TTL_MS) return;
      }
    }

    // Same booking => same event_id on every fire, so Meta collapses repeats.
    const eventId = bookingId ? `schedule-${bookingId}` : crypto.randomUUID();

    try {
      store?.setItem(key, String(Date.now()));
    } catch {
      // storage full or blocked — the event still fires, just unguarded
    }

    const fbq = ensurePixel(PIXEL_ID);
    fbq("track", "Schedule", {}, { eventID: eventId });

    fetch("/api/meta/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventId,
        sourceUrl: window.location.href,
        fbp: readCookie("_fbp"),
        fbc: getFbc(),
      }),
    }).catch(() => {});
  }, []);

  return null;
}
