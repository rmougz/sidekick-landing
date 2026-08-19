import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalHeading, LegalLink } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use | Sidekick Accounting Ltd",
  description:
    "Terms of use for the audit.sidekickaccounting.co.uk application and booking pages, operated by Sidekick Accounting Ltd.",
  robots: { index: false, follow: false },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        This website is operated by Sidekick Accounting Ltd (company number
        12250170). We observe and act in accordance with the bye-laws,
        regulations and code of ethics of the Institute of Chartered
        Accountants in England and Wales. Those requirements are available at{" "}
        <LegalLink href="https://www.icaew.com/regulation">
          icaew.com/regulation
        </LegalLink>
        .
      </p>

      <LegalHeading>Information only</LegalHeading>
      <p>
        The content of this website, including any videos, tools, figures and
        case studies, is provided for general information. It does not
        constitute accountancy, tax, financial, investment or legal advice, and
        it does not create a professional relationship between you and Sidekick
        Accounting Ltd. Advice is only given under a signed engagement letter.
      </p>

      <LegalHeading>Results and examples</LegalHeading>
      <p>
        Case studies and figures shown describe results achieved by specific
        clients in their own circumstances. They are illustrative and are not a
        guarantee or promise that you will achieve the same or similar results.
        Results vary by business.
      </p>

      <LegalHeading>Intellectual property</LegalHeading>
      <p>
        All content, frameworks and diagnostic tools on this website, including
        the Agency Profit Audit&trade;, are the intellectual property of
        Sidekick Accounting Ltd and may not be copied, reproduced or distributed
        without written permission.
      </p>

      <LegalHeading>Booking a call</LegalHeading>
      <p>
        Booking a call is a request for a conversation. It does not commit
        either party to an engagement. We may decline to work with any business.
      </p>

      <LegalHeading>Privacy</LegalHeading>
      <p>
        Our use of personal information is described in our{" "}
        <Link
          href="/privacy"
          className="inline-block -my-[13px] py-[13px] underline hover:text-white"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <LegalHeading>Not affiliated with Meta</LegalHeading>
      <p>
        This site is not part of the Facebook&trade; website or Meta Platforms,
        Inc, and is not endorsed by Facebook&trade; in any way. FACEBOOK&trade;
        is a trademark of Meta Platforms, Inc.
      </p>

      <LegalHeading>Governing law</LegalHeading>
      <p>
        These terms are governed by the laws of England and Wales.
      </p>

      <p className="pt-6 text-sm text-sk-muted">
        Last updated: 19 August 2026
      </p>
    </LegalPage>
  );
}
