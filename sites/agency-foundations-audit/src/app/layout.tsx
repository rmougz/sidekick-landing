import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const title = "Agency Foundations Review | Sidekick Accounting Ltd";
const description =
  "See where your agency's accounting and tax setup is costing you - surprise tax bills, generic books, no forward planning - in a single free 30-minute review call.";

// Icons and the social preview image are file conventions in this folder,
// generated from the Sidekick icon in the brand pack:
// - icon.ico (16/32/48 on a white tile) for Safari, which ignores SVG favicons.
//   Named icon.ico, not favicon.ico: under basePath Next emits no <link> for
//   favicon.ico, so browsers would fall back to the domain root's icon.
// - icon1.svg for everything else; its navy turns white in dark mode.
// - apple-icon.png for iOS home screens; opengraph-image.png for link previews.
// metadataBase makes the preview image URL absolute on the public domain (this
// zone is served there via a rewrite).
export const metadata: Metadata = {
  metadataBase: new URL("https://audit.sidekickaccounting.co.uk"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Sidekick Accounting",
    type: "website",
    url: "/foundations",
  },
  twitter: { card: "summary_large_image", title, description },
  // Funnel page for ads/direct traffic only — keep the whole zone out of
  // search results (do NOT block it in robots.txt: Google must crawl the
  // page to see this tag).
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} antialiased`}>
      <body className="font-sans">{children}</body>
      <GoogleAnalytics gaId="G-CD60YKH4S1" />
    </html>
  );
}
