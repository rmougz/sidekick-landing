import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Agency Profit Audit | Sidekick Accounting Ltd",
  description:
    "Find where your agency's profit is leaking — without changing your accountant or overhauling your ops — in a single 45-minute audit.",
  // Funnel page for ads/direct traffic only — keep the whole zone out of
  // search results (do NOT block it in robots.txt: Google must crawl the
  // page to see this tag).
  robots: { index: false, follow: false },
  // Meta Business Manager domain verification. Emitted by Next into <head> as
  // a static server-rendered tag: Meta's crawler will not see it if it is
  // injected by client JS or placed outside <head>.
  verification: {
    other: {
      "facebook-domain-verification": "w1lcwy12412di9izhwxlnusu3qig4w",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} antialiased`}>
      <body className="font-sans">
        <main>{children}</main>
      </body>
      <GoogleAnalytics gaId="G-CD60YKH4S1" />
    </html>
  );
}
