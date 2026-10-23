import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const title = "Sidekick Accounting | Tax and accounting for UK founders";
const description =
  "Chartered accountants helping UK founders pay less tax, build wealth and plan their exit. Book a free review.";

// Icons and the social preview image are file conventions in this folder,
// copied from the Foundations zone (the Sidekick icon from the brand pack):
// - icon.ico for Safari, which ignores SVG favicons. Named icon.ico, not
//   favicon.ico: under basePath Next emits no <link> for favicon.ico.
// - icon1.svg for everything else; apple-icon.png for iOS home screens;
//   opengraph-image.png for link previews.
// metadataBase makes the preview image URL absolute on the public domain (this
// zone is served there via a rewrite from the profit audit app).
export const metadata: Metadata = {
  metadataBase: new URL("https://audit.sidekickaccounting.co.uk"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Sidekick Accounting",
    type: "website",
    url: "/founders",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description },
  // Instagram funnel page: keep it out of search results, like /foundations.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${plusJakarta.variable} antialiased`}>
      <body className="font-sans">{children}</body>
      <GoogleAnalytics gaId="G-CD60YKH4S1" />
    </html>
  );
}
