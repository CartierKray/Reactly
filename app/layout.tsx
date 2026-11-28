/**
 * app/layout.tsx
 *
 * - `lang="nl"` (was "en" op een volledig Nederlandse site: verkeerd voor
 *   schermlezers, zoekmachines en automatische vertaling).
 * - Eén navigatie, footer, chat en cookiemelding voor alle pagina's; elke
 *   pagina importeerde eerder zijn eigen navbar en footer.
 * - Metadata met een template, zodat elke pagina een eigen titel krijgt.
 * - Lettertypes via next/font (geen onzichtbare tekst tijdens het laden).
 * - Trackingtags alleen met een echt ID en na toestemming (Analytics).
 */

import "./globals.css";
import type { Metadata, Viewport } from "next";

import Analytics from "@/components/site/Analytics";
import Chat from "@/components/site/Chat";
import ConsentBanner from "@/components/site/Consent";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import OfferteProvider from "@/components/site/offerte/OfferteProvider";
import RouteProgress from "@/components/site/RouteProgress";
import SiteOnly from "@/components/site/SiteOnly";
import Spotlight from "@/components/site/Spotlight";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { poppins } from "@/lib/fonts";
import { SITE, organizationJsonLd, websiteJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Reactly | Webdesign & online marketing bureau voor websites die converteren",
    template: "%s | Reactly",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE.url,
    siteName: SITE.name,
    title: "Reactly | Webdesign & online marketing bureau",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // Statische, door onszelf opgestelde JSON: geen invoer van bezoekers.
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["light", "dark"]}
          // Nieuwe sleutel: de oude kon "system" bevatten, waardoor de pagina
          // zonder licht of donker thema bleef hangen.
          storageKey="reactly-theme"
          disableTransitionOnChange
        >
          <OfferteProvider>
            <SiteOnly>
              <RouteProgress />
              <Spotlight />
              <Navbar />
            </SiteOnly>
            <main id="main">{children}</main>
            <SiteOnly>
              <Footer />
              <Chat />
              <ConsentBanner />
              <Analytics />
            </SiteOnly>
          </OfferteProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
