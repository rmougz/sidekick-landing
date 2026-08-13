"use client";

import { useEffect, useRef } from "react";

// Fires the Meta "Schedule" event exactly once per browser session on
// /call-confirmed: browser pixel + server-side Conversions API, sharing one
// event_id so Meta deduplicates the pair. The pixel is only ever loaded here —
// no other route emits Meta events.

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const SESSION_KEY = "sk-schedule-fired";

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

export default function ScheduleTracker() {
  const fired = useRef(false);

  useEffect(() => {
    // Ref guards React re-renders/StrictMode; sessionStorage guards refreshes
    // and revisits within the session.
    if (fired.current || !PIXEL_ID) return;
    fired.current = true;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage unavailable (e.g. blocked) — still fire once per load
    }

    const eventId = crypto.randomUUID();
    try {
      sessionStorage.setItem(SESSION_KEY, eventId);
    } catch {}

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
