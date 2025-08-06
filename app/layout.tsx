import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import CookiePopUp from "@/components/CookieModal/CookiePopUp";
import ChatWrapper from "@/components/ChatWrapper/ChatWrapper";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title:
    "Reactly | Webdesign & Online Marketing Bureau voor Maatwerk Websites die Converteren",
  description:
    "Reactly is een strategisch webdesign & online marketing bureau. Wij ontwerpen en coderen conversiegerichte websites, landingspagina’s en funnels voor groei. Bliksemsnel, SEO-geoptimaliseerd, schaalbaar én met een ijzersterk design. Meer leads, meer omzet, betere branding.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
        <title>
          Reactly | Webdesign & Online Marketing Bureau voor Maatwerk Websites
          die Converteren
        </title>
        <meta name="description" content="Website & Marketing Agency" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Reactly is een strategisch webdesign & online marketing bureau. Wij ontwerpen en coderen conversiegerichte websites, landingspagina’s en funnels voor groei. Bliksemsnel, SEO-geoptimaliseerd, schaalbaar én met een ijzersterk design. Meer leads, meer omzet, betere branding."
        />
        <meta
          property="og:description"
          content="Reactly is een strategisch webdesign & online marketing bureau. Wij ontwerpen en coderen conversiegerichte websites, landingspagina’s en funnels voor groei. Bliksemsnel, SEO-geoptimaliseerd, schaalbaar én met een ijzersterk design. Meer leads, meer omzet, betere branding."
        />
        <meta property="og:url" content="https://www.reactly.nl" />
        <meta property="og:type" content="website" />

        {/* Facebook Domain Verification Meta Tag */}
        {/* <meta
          name="facebook-domain-verification"
          content="wil6cmv3ev360l0a2zy45n01mre4z8"
        /> */}

        {/* Google Tag Manager */}
        <Script id="gtm-head">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXX');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXX`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXX');
          `}
        </Script>

        {/* Google Ads Tracking */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"
        />
        <Script id="google-ads">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-CONVERSION_ID');
          `}
        </Script>
        <Script id="google-ads-event">
          {`
            gtag('event', 'conversion_event_contact', {});
          `}
        </Script>

        {/* Meta Pixel Code */}
        {/* <Script id="meta-pixel">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1590837504907777');
            fbq('track', 'PageView');
          `}
        </Script> */}
      </head>

      <body className="font-clashdisplay">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-XXX"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          <noscript>
            {/* ESLint negeren voor tracking-pixel */}
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              // src="https://www.facebook.com/tr?id=1590837504907777&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
          {/* <SpeedInsights /> */}
          {/* <Analytics /> */}
          <CookiePopUp />
          {children}

          <ChatWrapper />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
