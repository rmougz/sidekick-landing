"use client";

import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";

/**
 * Phones only: a "Book a free review" bar pinned to the bottom of the screen
 * once the hero has scrolled away. It steps aside while the closing call to
 * action is on screen, so two identical buttons never show at once.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("hero");
      const closing = document.getElementById("closing");
      if (!hero || !closing) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const atClosing = closing.getBoundingClientRect().top < window.innerHeight;
      setVisible(pastHero && !atClosing);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      inert={!visible}
      aria-hidden={!visible || undefined}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-paper/95 px-4 pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <BookButton className="w-full" />
    </div>
  );
}
