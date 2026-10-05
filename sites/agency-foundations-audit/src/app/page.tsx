"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { preconnect } from "react-dom";
import { createPopup, createWidget, type Popup } from "@typeform/embed";
import { armTypeformWarmup, markTypeformOpened } from "@/lib/typeform-warmup";

// "Book A Call" Typeform (same form as live embed 01M45MZAE7SZ2S05J6Z2SMTSX6).
// Desktop: inline widget in #book, auto-resized so it never scrolls internally.
// Phones: every Book CTA opens it as a fullscreen popup instead. Typeform's mobile
// layout grows with whatever height its frame is given (measured 2026-10-05: a
// 666px frame held 904px of content, 950px held 1046px), so an inline frame on a
// phone always scrolls inside the page; a fullscreen popup is one scroll context.
const TYPEFORM_FORM_ID = "NdUCXFPA";
const TYPEFORM_IFRAME_PROPS = { title: "Book A Call" };
// Below Tailwind's `sm` breakpoint, matching the max-sm:/sm: classes below.
const MOBILE_QUERY = "(max-width: 639px)";

// One popup for the whole page, created on first use. Each createPopup call
// registers its own message listeners, so buttons share it rather than each
// making one; the button that opened it is told when the form is ready/closed.
let bookingPopup: Popup | null = null;
let settleOpeningButton: (() => void) | null = null;
function settleBookingPopup() {
  settleOpeningButton?.();
  settleOpeningButton = null;
}
function openBookingPopup(onSettled: () => void) {
  settleBookingPopup();
  settleOpeningButton = onSettled;
  markTypeformOpened();
  bookingPopup ??= createPopup(TYPEFORM_FORM_ID, {
    transitiveSearchParams: true,
    iframeProps: TYPEFORM_IFRAME_PROPS,
    onReady: settleBookingPopup,
    onClose: settleBookingPopup,
  });
  bookingPopup.open();
}

// If the form never reports ready (Typeform outage, dropped connection), give
// the button back so the visitor can retry rather than leaving it stuck.
const OPENING_TIMEOUT_MS = 20_000;

// Featured client wins - traditional testimonial quotes (verbatim from
// sidekickaccounting.co.uk/client-wins + the VSL script). First item is featured.
type Win = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  result?: string;
};
const wins: Win[] = [
  {
    quote:
      "We've always got the information we need to make decisions quickly. We've saved £10k in taxes since working with Sidekick. They're not your usual accountant.",
    name: "Oliver L",
    role: "CEO, Authority Agency",
    photo: "/clients/OLIVER.png",
  },
  {
    quote:
      "Sidekick is brilliant. Highly responsive and up for tackling complex challenges. I feel confident in our numbers with their expertise at hand.",
    name: "Oren G",
    role: "Managing Director, Kurve",
    photo: "/clients/Oren.jpeg",
  },
  {
    quote:
      "They take the stress out of taxes, and deal with it all in a professional and timely manner.",
    name: "Lauren H",
    role: "Founder, LBHPT",
  },
  {
    quote:
      "Everybody wants clarity. My stress levels have decreased and I'm able to operate at a higher level, the biz is performing much better as a result.",
    name: "Phaibion R",
    role: "CEO, Royal Energy",
    photo: "/clients/Phaibion.jpg",
  },
];

const testimonials = [
  {
    quote:
      "The support received has been invaluable for the business. Sidekick has helped us build a robust financial plan which has unlocked new revenue sources.",
    name: "Lewis Baxter",
    role: "COO, Kurogo",
    photo: "/clients/Lewis.jpg",
  },
  {
    quote:
      "Before working with them I never knew how much I was actually making or what my margins were. If you really want to scale your agency you need to make decisions based on data, and the team make that easy whilst guiding us on the best path forward.",
    name: "Sam Winsbury",
    role: "Founder, Kurogo",
    photo: "/clients/SAM.jpeg",
  },
  {
    quote:
      "Thoroughly enjoy working with Sidekick. They've been a game-changer for my business.",
    name: "Sam Saifi",
    role: "Founder, Revenue Labz",
    photo: "/clients/sam-saif.webp",
  },
  {
    quote:
      "I cannot recommend Sidekick enough. They have helped me understand my numbers and save taxes.",
    name: "Anonymous",
    role: "CEO, SMMA",
  },
];

// `aspect` is each PNG's width/height, used on mobile to size logos by equal
// visual area rather than equal height (the marks run from 1.35:1 to 4.5:1).
const logos = [
  { src: "/logos/1.png", alt: "Literal Humans", aspect: 1.95 },
  { src: "/logos/2.png", alt: "Kurve", aspect: 3.67 },
  { src: "/logos/3.png", alt: "be Broadcast", aspect: 1.48 },
  { src: "/logos/4.png", alt: "Creative Content Agency", aspect: 1.71 },
  { src: "/logos/5.png", alt: "Breakout Media", aspect: 2.8 },
  { src: "/logos/6.png", alt: "Influence Engine", aspect: 1.82 },
  { src: "/logos/7.png", alt: "Kurogo", aspect: 4.51 },
  { src: "/logos/8.png", alt: "Client Logo", aspect: 1.35 },
  { src: "/logos/9.png", alt: "Lock & Quay Collective", aspect: 3.4 },
  { src: "/logos/10.png", alt: "AuthorityAgency", aspect: 4.42 },
];

// Mobile logo area in px² (a 1.5:1 mark lands at ~40px tall, a 4.5:1 at ~23px).
const MOBILE_LOGO_AREA = 2400;

// The three things the Agency Foundations Review measures against (from the VSL).
const pillars = [
  {
    title: "Clean foundations",
    body: "Up-to-date books, VAT, payroll and compliance, with nothing ever late.",
  },
  {
    title: "An agency-specific setup",
    body: "Your books built the way an agency actually works, so retainers, project margin, pass-through media and freelancers all sit where they should.",
  },
  {
    title: "Proactive tax planning",
    body: "Knowing your tax bill before year end, taking money out tax-efficiently, and claiming what you're owed so you're never caught out.",
  },
];

// Growth proof - what follows once the foundations are solid (VSL close).
const results = [
  {
    name: "Usman",
    company: "Guided Growth",
    photo: "/clients/USMAN.webp",
    stat: "+$200K monthly revenue at a 77.25% net margin, around $154K a month in extra cash in the bank.",
  },
  {
    name: "Andreas",
    company: "Be Creative",
    photo: "/clients/ANDREAS.png",
    stat: "£250K+ of new bottom-line profit this year, with +21% revenue and +12% margin growth.",
  },
];

const stats = [
  { value: "100+", label: "Agencies helped" },
  { value: "6 yrs", label: "Specialising in agencies" },
];

/* ── Brand primitives (ported from the Sidekick 2026 design system) ───────── */

/**
 * The faint "ledger" texture behind dark sections: a 58px grid of hairlines plus
 * scattered coral dots at low opacity. Decorative only.
 */
function LedgerBackground({ className = "" }: { className?: string }) {
  const grid = `<svg xmlns='http://www.w3.org/2000/svg' width='58' height='58'><path d='M58 0H0V58' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/></svg>`;
  const dots = `<svg xmlns='http://www.w3.org/2000/svg' width='348' height='348'><circle cx='0' cy='58' r='3' fill='#fd605b' opacity='0.85'/><circle cx='174' cy='232' r='2.5' fill='#fd605b' opacity='0.45'/><circle cx='290' cy='116' r='2.5' fill='#fd605b' opacity='0.6'/><circle cx='116' cy='290' r='2' fill='#fd605b' opacity='0.3'/></svg>`;
  const enc = (s: string) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
  const style: CSSProperties = {
    backgroundImage: `${enc(grid)}, ${enc(dots)}`,
    backgroundRepeat: "repeat, repeat",
    backgroundSize: "58px 58px, 348px 348px",
    backgroundPosition: "center top, center top",
  };
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={style}
    />
  );
}

/** Pill CTA. Phones: opens the booking form fullscreen. Desktop: scrolls to the inline form. */
function BookButton({
  children,
  variant = "primary",
  size = "lg",
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "subtle";
  size?: "sm" | "lg";
  onDark?: boolean;
  className?: string;
}) {
  const [opening, setOpening] = useState(false);
  const timerRef = useRef<number | null>(null);
  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const settle = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setOpening(false);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.matchMedia(MOBILE_QUERY).matches) {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (opening) return;
    setOpening(true);
    timerRef.current = window.setTimeout(settle, OPENING_TIMEOUT_MS);
    openBookingPopup(settle);
  };

  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full text-center font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 aria-busy:cursor-progress";
  const sizes = { sm: "min-h-11 px-5 py-2 text-sm", lg: "min-h-[52px] px-7 py-3 text-[15px]" };
  const variants = {
    primary: "bg-coral text-white hover:bg-coral-press",
    subtle: onDark
      ? "bg-white text-navy hover:bg-white/90"
      : "border border-border-input text-navy hover:border-pink hover:bg-[#fff4f3]",
  };
  return (
    <a
      href="#book"
      onClick={onClick}
      aria-busy={opening || undefined}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {opening ? (
        <>
          <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Opening the form…
        </>
      ) : (
        children
      )}
    </a>
  );
}

/**
 * The signature stat treatment: the figure is navy (or white on dark); only a
 * trailing % (smaller) or + is coral. Symbol-less values render plain.
 */
function Stat({
  value,
  label,
  dark = false,
  size = 56,
}: {
  value: string;
  label: string;
  dark?: boolean;
  size?: number;
}) {
  const figure = dark ? "text-white" : "text-navy";
  const labelTone = dark ? "text-white/55" : "text-ink-meta";

  let lead = value;
  let trail: ReactNode = null;
  if (value.endsWith("%")) {
    lead = value.slice(0, -1);
    trail = (
      <span className="text-coral" style={{ fontSize: "0.625em" }}>
        %
      </span>
    );
  } else if (value.endsWith("+")) {
    lead = value.slice(0, -1);
    trail = <span className="text-coral">+</span>;
  }

  return (
    <div className="text-center">
      <div
        className={`inline-flex items-end justify-center font-bold leading-[0.9] tracking-headline tabular ${figure}`}
        style={{ fontSize: size }}
      >
        <span>{lead}</span>
        {trail}
      </div>
      <div className={`mt-3 text-[14px] font-medium ${labelTone}`}>{label}</div>
    </div>
  );
}

/* ── Cards ────────────────────────────────────────────────────────────────── */

function WinCard({
  win,
  featured = false,
}: {
  win: (typeof wins)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card ${
        featured ? "px-10 py-9 max-sm:px-6 max-sm:py-7" : "px-7 py-7"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute font-bold leading-none text-coral/10 ${
          featured ? "left-5 top-3 text-[150px] max-sm:text-[100px]" : "left-3 top-1 text-[90px] max-sm:text-[72px]"
        }`}
      >
        &quot;
      </span>

      <div className="relative flex flex-1 flex-col">
        {win.result && (
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-tile bg-grey-soft px-3.5 py-1.5 text-[13px] font-semibold text-navy">
            <span className="h-2 w-2 rounded-full bg-mint" />
            {win.result}
          </span>
        )}

        <p
          className={`mb-6 flex-1 leading-relaxed text-navy ${
            featured ? "text-[24px] font-medium max-sm:text-lg" : "text-[17px] text-ink-body max-sm:text-[15px]"
          }`}
        >
          {win.quote}
        </p>

        <div className="mt-auto flex items-center gap-3">
          {win.photo ? (
            <Image
              src={win.photo}
              alt={win.name}
              width={56}
              height={56}
              className={`shrink-0 rounded-full border border-border object-cover ${featured ? "h-14 w-14" : "h-11 w-11"}`}
            />
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-coral font-bold text-white ${featured ? "h-14 w-14 text-xl" : "h-11 w-11 text-base"}`}
            >
              {win.name.charAt(0)}
            </div>
          )}
          <div>
            <div className={`font-bold text-navy ${featured ? "text-[17px]" : "text-[15px]"}`}>
              {win.name}
            </div>
            <div className="text-[13px] text-ink-meta">{win.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-card border border-border bg-white px-7 py-7 shadow-card">
      <span
        aria-hidden="true"
        className="absolute left-3 top-0 font-bold leading-none text-coral/10 text-[100px] max-sm:text-[72px]"
      >
        &quot;
      </span>

      <div className="relative flex flex-1 flex-col">
        <p className="mb-6 flex-1 text-[17px] leading-relaxed text-ink-body max-sm:text-[15px]">
          {testimonial.quote}
        </p>

        <div className="mt-auto flex items-center gap-3">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={56}
              height={56}
              className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral text-base font-bold text-white">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-[15px] font-bold text-navy">{testimonial.name}</div>
            <div className="text-[13px] text-ink-meta">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable client-logo strip. Desktop: one wrapping row at equal height.
   Mobile: an even 2-col grid (5 x 2), each logo sized to equal visual area. */
function LogoStrip() {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-10 gap-y-6 max-sm:grid max-sm:max-w-[340px] max-sm:grid-cols-2 max-sm:gap-x-6 max-sm:gap-y-7">
      {logos.map((logo) => (
        <div key={logo.alt} className="contents max-sm:flex max-sm:h-11 max-sm:items-center max-sm:justify-center">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={40}
            className="h-9 w-auto object-contain opacity-50 mix-blend-multiply max-sm:h-[var(--logo-h)] max-sm:opacity-70"
            style={{
              "--logo-h": `${Math.round(Math.sqrt(MOBILE_LOGO_AREA / logo.aspect))}px`,
              filter: "brightness(0) saturate(100%) invert(14%) sepia(30%) saturate(1000%) hue-rotate(175deg) brightness(95%)",
            } as CSSProperties}
          />
        </div>
      ))}
    </div>
  );
}

/* Desktop: the form inline, auto-resized to each question. Phones: a button that
   opens it fullscreen (see TYPEFORM_FORM_ID). The widget is only created on
   desktop-width screens, so phones never load a hidden frame or log a view. */
function BookingForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    // Phones open the form as a popup, so preload it (see typeform-warmup.ts).
    if (mobile.matches) armTypeformWarmup(TYPEFORM_FORM_ID);
    let widget: { unmount: () => void } | null = null;
    const sync = () => {
      if (mobile.matches) {
        widget?.unmount();
        widget = null;
      } else if (!widget && containerRef.current) {
        widget = createWidget(TYPEFORM_FORM_ID, {
          container: containerRef.current,
          autoResize: true,
          disableScroll: true,
          transitiveSearchParams: true,
          opacity: 100,
          iframeProps: TYPEFORM_IFRAME_PROPS,
        });
      }
    };
    sync();
    mobile.addEventListener("change", sync);
    return () => {
      mobile.removeEventListener("change", sync);
      widget?.unmount();
    };
  }, []);

  return (
    <>
      <div className="mx-auto overflow-hidden rounded-card border border-border bg-white shadow-card max-sm:hidden">
        <div ref={containerRef} style={{ width: "100%", height: "500px" }} />
      </div>
      <div className="sm:hidden">
        <BookButton className="w-full">Start your booking</BookButton>
      </div>
    </>
  );
}

/* Mobile-only sticky CTA: appears once the hero's CTA has scrolled away and
   hides again when the booking form (#book) comes into view. */
function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("top");
      const book = document.getElementById("book");
      if (!hero || !book) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const atBook = book.getBoundingClientRect().top < window.innerHeight;
      setVisible(pastHero && !atBook);
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-deep/95 px-4 pt-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Full label wraps to two lines below ~380px, so small phones get the short one. */}
      <BookButton className="w-full whitespace-nowrap">
        <span className="max-[379px]:hidden">Book your Agency Foundations Review</span>
        <span className="min-[380px]:hidden">Book your review</span>
      </BookButton>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Home() {
  // DNS + TLS for the form's origins, emitted into <head> by the server, so the
  // popup/widget doesn't start cold. Fonts are fetched in CORS mode.
  preconnect("https://form.typeform.com");
  preconnect("https://renderer-assets.typeform.com");
  preconnect("https://font.typeform.com", { crossOrigin: "anonymous" });

  return (
    <>

      {/* 1. Hero */}
      <section id="top" className="relative overflow-hidden bg-navy-deep px-6 pb-20 pt-12 text-center md:px-12 md:pb-24 md:pt-14">
        <LedgerBackground />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-10 flex justify-center">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={1921}
              height={422}
              className="h-7 w-auto"
              priority
            />
          </div>

          <h1 className="mx-auto mb-5 max-w-[860px] text-[clamp(28px,5vw,46px)] font-bold leading-[1.1] tracking-headline text-white">
            Your agency is profitable, but the corporation tax bill always lands
            bigger than you expected
          </h1>
          <p className="mx-auto mb-4 max-w-[680px] text-[18px] leading-[1.7] text-white/60 max-sm:text-[15px]">
            And the cash to cover it never seems ready.
          </p>
          <p className="mx-auto mb-4 max-w-[680px] text-[18px] font-semibold leading-[1.6] text-white max-sm:text-[15px]">
            Watch this 2 minute 40 second video to fix it.
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mx-auto mb-7 h-7 w-7 animate-bounce text-coral"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>

          <div className="mx-auto mb-9 max-w-[800px] overflow-hidden rounded-card border border-white/10 bg-black/20 p-2.5">
            {/* Agency Foundations Review VSL */}
            <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
            <Script src="https://fast.wistia.com/embed/9teqqcn04w.js" strategy="lazyOnload" />
            <div
              className="w-full overflow-hidden rounded-[14px]"
              dangerouslySetInnerHTML={{
                __html: `
                  <style>wistia-player[media-id='9teqqcn04w']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/9teqqcn04w/swatch');display:block;filter:blur(5px);padding-top:56.25%}</style>
                  <wistia-player media-id="9teqqcn04w" aspect="1.7777777777777777"></wistia-player>
                `,
              }}
            />
          </div>

          <BookButton>Book your Agency Foundations Review</BookButton>
        </div>
      </section>

      {/* 2. Social proof - client logos directly under the hero */}
      <section className="border-b border-border bg-paper px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-8 text-center text-sm font-medium text-ink-meta">
            Trusted by founder-led agencies across the UK
          </p>
          <LogoStrip />
          <p className="mx-auto mt-8 max-w-[560px] text-center text-sm font-medium text-ink-meta">
            Run by <span className="text-navy">ICAEW chartered accountants</span>{" "}
            who work only with agencies.
          </p>
        </div>
      </section>

      {/* 3. Problem - why a generalist accountant leaves tax on the table */}
      <section className="bg-paper-warm px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[920px]">
          <h2 className="mx-auto mb-6 max-w-[760px] text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            Your accountant keeps you compliant. Lowering your tax was never their
            job
          </h2>
          <p className="mx-auto mb-14 max-w-[760px] text-center text-[17px] leading-[1.7] text-ink-soft max-sm:text-[15px]">
            You&apos;ve got an accountant, you&apos;re on Xero or QuickBooks, your
            VAT is filed on time and your year-end accounts go in. And yet you
            still don&apos;t fully trust your numbers, you&apos;re still chasing
            for answers, and you still feel like you&apos;re overpaying tax. There
            is a structural reason for that.
          </p>
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            <div className="rounded-card border border-border bg-white px-7 py-8 shadow-card">
              <h3 className="mb-3 text-[19px] font-bold text-navy">
                You feel like just another number
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Your agency sits on their books between a builder, a cafe and a
                salon. Retainers, project margin and freelancers are a mystery to
                them. So your accounts come back accurate and useless at the same
                time.
              </p>
            </div>
            <div className="rounded-card border border-border bg-white px-7 py-8 shadow-card">
              <h3 className="mb-3 text-[19px] font-bold text-navy">
                The tax bill always catches you out
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                They record what already happened so you can file, and nothing
                more. Nobody plans your tax before year end or fixes your salary
                and dividend mix. So every year the bill lands bigger than you
                expected, and the cash is never ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Solution - the three things the review covers */}
      <section className="bg-paper px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-4 text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            Every agency needs three things right
          </h2>
          <p className="mx-auto mb-14 max-w-[680px] text-center text-[16px] leading-[1.7] text-ink-soft">
            The Agency Foundations Review is a structured look at your accounting
            and tax against these three. Most agencies are strong on the first and
            have never had the other two on the table.
          </p>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="flex h-full flex-col rounded-card border border-border bg-white px-8 py-9 shadow-card"
              >
                <div className="mb-5 text-[40px] font-bold leading-none tracking-headline tabular text-pink">
                  0{i + 1}
                </div>
                <h3 className="mb-3 text-[20px] font-bold text-navy">
                  {pillar.title}
                </h3>
                <p className="flex-1 text-[15px] leading-[1.7] text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-[760px] text-center text-[17px] font-medium leading-[1.6] text-navy max-sm:text-[15px]">
            When these are missing, tax becomes an event you react to instead of a
            decision you make, and the bill creeps up every year as you grow. Done
            right, tax stops being stressful.
          </p>
        </div>
      </section>

      {/* 5. Proof - headline stats */}
      <section className="bg-paper-warm px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-14 text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            Built only for agencies
          </h2>

          <div className="mx-auto grid max-w-[760px] grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-card border border-border bg-white px-8 py-10 shadow-card max-sm:px-6 max-sm:py-8"
              >
                <Stat value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Proof - client wins */}
      <section className="bg-paper px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-4 text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            Straight from the founders
          </h2>
          <p className="mx-auto mb-12 max-w-[620px] text-center text-[16px] leading-[1.7] text-ink-soft">
            What changes once an agency has books it can trust, and someone
            planning the tax ahead.
          </p>

          {/* Featured win */}
          <div className="mb-6">
            <WinCard win={wins[0]} featured />
          </div>

          {/* Supporting wins */}
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {wins.slice(1).map((w) => (
              <WinCard key={w.name} win={w} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Proof - growth once foundations are solid */}
      <section className="bg-paper-warm px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-4 text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            The bigger results follow
          </h2>
          <p className="mx-auto mb-12 max-w-[640px] text-center text-[16px] leading-[1.7] text-ink-soft">
            Clean books and forward planning are not the finish line. They are what
            makes real growth possible. None of it starts with clever tax tricks.
            It starts with clean foundations and looking forwards.
          </p>

          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {results.map((r) => (
              <div
                key={r.name}
                className="flex items-start gap-5 rounded-card border border-border bg-white px-8 py-8 shadow-card max-sm:flex-col"
              >
                <Image
                  src={r.photo}
                  alt={r.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
                />
                <div>
                  <p className="mb-3 text-[18px] font-semibold leading-snug text-navy max-sm:text-[16px]">
                    {r.stat}
                  </p>
                  <div className="text-[14px] font-medium text-ink-meta">
                    {r.name}, {r.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Proof - testimonials */}
      <section className="bg-paper-warm px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-12 text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            In their words
          </h2>

          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Close - final CTA */}
      <section className="relative overflow-hidden bg-navy-deep px-6 py-24 text-center md:px-12 max-sm:py-16">
        <LedgerBackground />
        <div className="relative mx-auto max-w-[680px]">
          <h2 className="mb-7 text-[clamp(24px,3.5vw,34px)] font-bold leading-[1.18] tracking-heading text-white max-sm:text-[22px]">
            These are just a few of the agency founders we&apos;ve worked with.
            Want to know exactly where your accounts and tax setup is costing you?
          </h2>
          <BookButton onDark>Book your Agency Foundations Review</BookButton>
        </div>
      </section>

      {/* 11. Booking - "Book A Call" Typeform (inline on desktop, popup button on phones) */}
      <section id="book" className="scroll-mt-8 bg-paper px-6 py-24 md:px-12 max-sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-3 text-center text-[clamp(26px,4vw,38px)] font-bold leading-[1.12] tracking-heading text-navy">
            Book your Agency Foundations Review
          </h2>
          <p className="mx-auto mb-10 max-w-[620px] text-center text-[16px] leading-[1.7] text-ink-soft">
            Answer a few quick questions to book your call.
          </p>
          <BookingForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-navy-deep px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[920px] text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={1921}
              height={422}
              className="h-[22px] w-auto opacity-90"
            />
          </div>
          <p className="mx-auto max-w-[800px] text-xs leading-[1.9] text-white/35">
            Sidekick Accounting Ltd. This website and its content are for
            informational purposes only and do not constitute regulated financial
            or legal advice. All content, frameworks, and diagnostic tools
            presented on this website, including the Agency Foundations
            Review&trade;, are the intellectual property of Sidekick Accounting Ltd
            and may not be copied, reproduced, or distributed without written
            permission. The information provided is for general informational
            purposes only and does not constitute legal, financial, or regulated
            business advice. No guarantees of specific outcomes or results are
            made. Any reference to potential improvements, performance, or return
            is illustrative only and will vary by business.
          </p>
        </div>
      </footer>

      <MobileStickyCta />
    </>
  );
}
