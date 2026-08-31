"use client";

import { useEffect, useRef } from "react";
import { PIXEL_ID, ensurePixel } from "@/lib/meta-pixel";

// Base pixel + PageView. Mounted on the landing page only: it is the ad
// destination, so it is where the click arrives and where Meta needs to set
// its _fbc cookie. The Schedule conversion still lives solely on
// /call-confirmed.
export default function MetaPixel() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || !PIXEL_ID) return;
    fired.current = true;
    ensurePixel(PIXEL_ID)("track", "PageView");
  }, []);

  return null;
}
