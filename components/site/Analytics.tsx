"use client";

/**
 * components/site/Analytics.tsx
 *
 * Alle meet- en advertentietags, klaar voor Google Ads en Meta. Ze laden
 * alleen met een echt ID (omgevingsvariabelen hieronder) én pas na
 * toestemming via het cookievenster:
 *
 *   analytisch  NEXT_PUBLIC_GTM_ID            bv. GTM-ABC1234
 *               NEXT_PUBLIC_GA_ID             bv. G-ABC123XYZ
 *   marketing   NEXT_PUBLIC_GOOGLE_ADS_ID     bv. AW-123456789
 *               NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL  conversielabel voor aanvragen
 *               NEXT_PUBLIC_META_PIXEL_ID     bv. 1234567890123456
 *
 * - Google Consent Mode v2 (verplicht voor Google Ads in de EER): standaard
 *   alles "denied", daarna per categorie bijgewerkt naar de keuze van de
 *   bezoeker. Trekt iemand later toestemming in, dan gaat er "denied" achteraan
 *   en zet de Meta Pixel zichzelf op "revoke".
 * - Meta Pixel: PageView bij elke paginawissel (de site is een SPA).
 * - Google Ads: enhanced conversions aan; aanvragen worden als conversie
 *   gemeld vanuit lib/analytics.ts (trackLead), met dezelfde event-ID als de
 *   Meta Conversions API op de server.
 */

import * as React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import { readConsent, type ConsentPrefs } from "@/lib/consent";

const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const GA = process.env.NEXT_PUBLIC_GA_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const g = (v: boolean) => (v ? "granted" : "denied");

export default function Analytics() {
  const pathname = usePathname();
  const [prefs, setPrefs] = React.useState<ConsentPrefs | null>(null);
  const eerstePagina = React.useRef(true);

  React.useEffect(() => {
    setPrefs(readConsent());
    const onChange = (e: Event) => setPrefs((e as CustomEvent<ConsentPrefs>).detail);
    window.addEventListener("consent:change", onChange);
    return () => window.removeEventListener("consent:change", onChange);
  }, []);

  // Keuze gewijzigd terwijl de tags al geladen zijn: direct doorgeven.
  React.useEffect(() => {
    if (!prefs) return;
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: g(prefs.analytics),
        ad_storage: g(prefs.marketing),
        ad_user_data: g(prefs.marketing),
        ad_personalization: g(prefs.marketing),
        functionality_storage: g(prefs.functional),
      });
    }
    if (typeof window.fbq === "function") window.fbq("consent", prefs.marketing ? "grant" : "revoke");
  }, [prefs]);

  // Meta: PageView bij een paginawissel (de eerste telt de init al).
  React.useEffect(() => {
    if (eerstePagina.current) {
      eerstePagina.current = false;
      return;
    }
    if (prefs?.marketing && typeof window.fbq === "function") window.fbq("track", "PageView");
  }, [pathname, prefs?.marketing]);

  if (!prefs) return null;
  const analytics = prefs.analytics;
  const marketing = prefs.marketing;
  const gtagId = (analytics && GA) || (marketing && ADS) || null;
  const google = Boolean(gtagId || (analytics && GTM));

  return (
    <>
      {google && (
        <Script id="consent-mode" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});
gtag('consent','update',{analytics_storage:'${g(analytics)}',ad_storage:'${g(marketing)}',ad_user_data:'${g(marketing)}',ad_personalization:'${g(marketing)}',functionality_storage:'${g(prefs.functional)}'});
gtag('set','url_passthrough',true);gtag('set','ads_data_redaction',${marketing ? "false" : "true"});`}
        </Script>
      )}
      {analytics && GTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      )}
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`gtag('js',new Date());${analytics && GA ? `gtag('config','${GA}',{anonymize_ip:true});` : ""}${
              marketing && ADS ? `gtag('config','${ADS}',{allow_enhanced_conversions:true});` : ""
            }`}
          </Script>
        </>
      )}
      {marketing && PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('consent','grant');fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
