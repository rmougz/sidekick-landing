import Link from "next/link";

// Shared footer for every page in the zone. The long results disclaimer and IP
// notice that used to repeat on each page now live on /terms; what stays here
// is the short version plus the Meta non-endorsement notice, which has to
// remain on the ad destination itself.
export default function SiteFooter() {
  return (
    <footer className="bg-sk-navy-dark px-5 py-8 text-center">
      <p className="mx-auto max-w-[800px] text-xs leading-[1.8] text-sk-muted">
        Sidekick Accounting Ltd. Information only &mdash; nothing on this site
        is regulated financial, tax or legal advice. Results vary by business.{" "}
        {/* Vertical padding is cancelled by an equal negative margin: the tap
            target grows to ~44px without changing the paragraph's layout. */}
        <Link
          href="/privacy"
          className="inline-block -my-[14px] py-[14px] underline hover:text-white"
        >
          Privacy Policy
        </Link>{" "}
        &middot;{" "}
        <Link
          href="/terms"
          className="inline-block -my-[14px] py-[14px] underline hover:text-white"
        >
          Terms of Use
        </Link>
      </p>
      <p className="mx-auto mt-4 max-w-[800px] text-xs leading-[1.8] text-sk-muted">
        This site is not part of the Facebook&trade; website or Meta Platforms,
        Inc. Additionally, this site is not endorsed by Facebook&trade; in any
        way. FACEBOOK&trade; is a trademark of Meta Platforms, Inc.
      </p>
    </footer>
  );
}
