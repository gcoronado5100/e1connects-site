import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
};

/**
 * Turns on the entrances and exits of the home page before the first paint, so its moving parts
 * start hidden instead of showing and then disappearing. Without JavaScript it never runs and
 * nothing is hidden (see home-hero.css and HomeMotion).
 */
const MOTION_SCRIPT = `document.documentElement.setAttribute("data-motion","")`;

/**
 * The frame every page shares: the header, the page and the footer. `suppressHydrationWarning`
 * lets React accept the `data-motion` attribute the head script adds to `<html>`.
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
