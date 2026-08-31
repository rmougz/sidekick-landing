"use client";

import { useEffect, useRef } from "react";
import { PIXEL_ID, ensurePixel, getFbc, readCookie } from "@/lib/meta-pixel";

// Fires the Meta "Schedule" event once per booking on /call-confirmed: browser
// pixel + server-side Conversions API, sharing one event_id so Meta
// deduplicates the pair. This is the only route that emits a conversion.
//
// Deduplication is two layers, because either alone leaves a hole:
//
//  1. event_id. The Typeform carries a per-submission sk_id through to the
//     redirect, so every fire for one submission sends the SAME event_id and
//     Meta collapses them server-side — across tabs, devices and cleared
//     storage. invitee_uuid is still accepted in case the booking ever comes
//     straight from Calendly. Without any of them we fall back to a random id,
//     which only dedupes the pixel/CAPI pair.
//
//  2. Local guard. localStorage, not sessionStorage: sessionStorage is
//     per-tab, so opening the confirmation link in a second tab produced a
//     second Schedule event with a fresh event_id. Keyed on the submission
//     when we have one (permanent, and a genuinely different submission has a
//     different id so it still counts). Without one the generic guard expires
//     after GUARD_TTL_MS.

const STORAGE_KEY = "sk-schedule-fired";
const GUARD_TTL_MS = 30 * 60 * 1000;

// Identifier for this specific submission. sk_id is minted on the landing page
// and round-tripped through the Typeform's hidden fields.
function getSubmissionId(): string | null {
  const p = new URLSearchParams(window.location.search);
  const id = p.get("sk_id") ?? p.get("invitee_uuid") ?? p.get("event_uuid");
  if (!id) return null;
  const trimmed = id.trim();
  if (!trimmed) return null;
  // Guard against an unresolved piping token, e.g. if the redirect references
  // {{hidden:sk_id}} before that hidden field exists on the form. Treating the
  // literal token as an id would give every booking the same event_id and
  // collapse the lot into a single conversion — far worse than no id at all.
  if (trimmed.includes("{{") || trimmed.includes("}}")) return null;
  return trimmed;
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

    const submissionId = getSubmissionId();
    const store = getStore();
    const key = submissionId ? `${STORAGE_KEY}:${submissionId}` : STORAGE_KEY;

    if (store) {
      const raw = store.getItem(key);
      if (raw) {
        // A submission-keyed guard never expires: it is already counted.
        if (submissionId) return;
        // The generic guard only suppresses repeats close in time.
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts < GUARD_TTL_MS) return;
      }
    }

    // Same submission => same event_id on every fire, so Meta collapses repeats.
    const eventId = submissionId
      ? `schedule-${submissionId}`
      : crypto.randomUUID();

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
