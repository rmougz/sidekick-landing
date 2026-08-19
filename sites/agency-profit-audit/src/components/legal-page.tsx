import Image from "next/image";
import SiteFooter from "./site-footer";

// Shell for /privacy and /terms: the zone's logo header, a readable measure of
// body text on the standard dark background, and the shared footer.

// Inline link styling shared by the legal pages. The padding is cancelled by an
// equal negative margin, so the tap target reaches ~44px without disturbing the
// paragraph's line spacing.
export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-block -my-[13px] py-[13px] underline hover:text-white"
    >
      {children}
    </a>
  );
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-3 text-[20px] font-extrabold leading-snug text-white max-sm:text-[18px]">
      {children}
    </h2>
  );
}

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="px-5 pb-16 pt-12">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-12 flex justify-center">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={180}
              height={43}
              priority
            />
          </div>

          <h1 className="mb-8 text-[36px] font-extrabold leading-[1.15] text-white max-sm:text-[28px]">
            {title}
          </h1>

          <div className="space-y-4 text-[16px] leading-relaxed text-sk-text max-sm:text-[15px]">
            {children}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
