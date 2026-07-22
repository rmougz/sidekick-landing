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
  title: "Agency Foundations Review | Sidekick Accounting Ltd",
  description:
    "See where your agency's accounting and tax setup is costing you - surprise tax bills, generic books, no forward planning - in a single free 45-minute review.",
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
