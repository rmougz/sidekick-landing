import type { Metadata } from "next";
import LegalPage, { LegalHeading, LegalLink } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Sidekick Accounting Ltd",
  description:
    "How Sidekick Accounting Ltd collects, uses and shares information on the audit.sidekickaccounting.co.uk application and booking pages.",
  robots: { index: false, follow: false },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy covers audit.sidekickaccounting.co.uk, the application and
        booking pages operated by Sidekick Accounting Ltd (company number
        12250170). Our main website at sidekickaccounting.co.uk is covered by a
        separate policy.
      </p>
      <p>
        We take privacy seriously and aim to be transparent about what we
        collect, why we collect it, and who it is shared with. We may update
        this policy from time to time.
      </p>

      <LegalHeading>Collection, use and storage of information</LegalHeading>
      <p>
        We identify the purpose for which information is collected before or at
        the time of collection. We hold personal data only as long as necessary
        to fulfil those purposes. Data is kept relevant, accurate and current,
        and protected by reasonable safeguards against unauthorised access,
        disclosure or misuse.
      </p>

      <LegalHeading>What you give us when you apply</LegalHeading>
      <p>
        If you complete our application form we collect your name, email
        address, phone number, your role in the business, a description of what
        your agency does, your annual revenue band, and what you tell us about
        where you are stuck on your numbers. We use this to assess whether we
        can help, to prepare for the call, and to contact you about it.
      </p>
      <p>
        If you book a call, we also process the appointment details you provide.
      </p>

      <LegalHeading>Email and text messages</LegalHeading>
      <p>
        We send booking confirmations and reminders about calls you have booked,
        and follow-up emails about our services to people who have applied. You
        can unsubscribe from marketing emails at any time using the link in any
        email, or by emailing{" "}
        <LegalLink href="mailto:hello@sidekickaccounting.co.uk">
          hello@sidekickaccounting.co.uk
        </LegalLink>
        .
      </p>
      <p>
        Where you give us a phone number on the application form, we may send
        text messages relating to your booked call. Message frequency varies and
        message and data rates may apply. Reply STOP to opt out of text messages
        or HELP for help.
      </p>

      <LegalHeading>Cookies, analytics and advertising</LegalHeading>
      <p>
        This site uses cookies and similar technologies for two purposes.
      </p>
      <p>
        Analytics: to understand how many people visit the pages and where they
        came from.
      </p>
      <p>
        Advertising: we use the Meta (Facebook) pixel and Meta&apos;s
        Conversions API to measure the performance of our advertising and to
        improve which people see our ads. When you complete a booking, a hashed
        version of information such as your email address may be shared with
        Meta so that the booking can be matched to the advertising that brought
        you here. Hashing means the information is converted into a string of
        characters and is not shared in a readable form.
      </p>
      <p>
        You can control cookies through your browser settings, and through our
        cookie preferences where shown.
      </p>

      <LegalHeading>Who we share information with</LegalHeading>
      <p>
        We use third-party service providers to run this funnel. They process
        information on our behalf and are not permitted to use it for their own
        purposes:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li>Typeform &mdash; the application form</li>
        <li>Calendly &mdash; call scheduling</li>
        <li>
          GoHighLevel (LeadConnector) &mdash; our CRM, email and text messaging
        </li>
        <li>Zapier &mdash; moving information between those systems</li>
        <li>Twilio &mdash; delivery of text messages and calls</li>
        <li>
          Meta Platforms &mdash; advertising measurement, as described above
        </li>
      </ul>
      <p>We do not sell your information to third parties.</p>

      <LegalHeading>Call recording</LegalHeading>
      <p>
        Calls may be recorded and transcribed so that we have an accurate record
        of what was discussed and to improve how we work. We will tell you at
        the start of a call if it is being recorded, and you can ask us not to
        record.
      </p>

      <LegalHeading>International transfers</LegalHeading>
      <p>
        Some of the providers above are based in the United States. Where
        information is transferred outside the UK or the European Economic Area,
        we take steps to ensure it has an adequate level of protection.
      </p>

      <LegalHeading>Your rights and how to reach us</LegalHeading>
      <p>
        You can ask us for a copy of the personal data we hold about you, ask us
        to correct it, or ask us to delete it. Write to us at{" "}
        <LegalLink href="mailto:hello@sidekickaccounting.co.uk">
          hello@sidekickaccounting.co.uk
        </LegalLink>{" "}
        or at 167-169 Great Portland Street, London, W1W 5PF. We will respond
        within the period required under UK GDPR.
      </p>
      <p>
        If you are unhappy with how we have handled your information you can
        complain to the Information Commissioner&apos;s Office at{" "}
        <LegalLink href="https://ico.org.uk">ico.org.uk</LegalLink>.
      </p>

      <p className="pt-6 text-sm text-sk-muted">
        Last updated: 19 August 2026
      </p>
    </LegalPage>
  );
}
