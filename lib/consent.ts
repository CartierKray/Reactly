/**
 * lib/consent.ts
 *
 * Opslag van de cookiekeuze, los van het venster zelf (components/site/Consent),
 * zodat formulieren, metingen en de chat hem kunnen lezen zonder de hele
 * bannercode mee te laden.
 *
 * Sleutels: `cookieConsent` (accepted | rejected | custom, zelfde als de vorige
 * site) en `cookiePreferences` ({ functional, analytics, marketing }).
 */

export type ConsentPrefs = { functional: boolean; analytics: boolean; marketing: boolean };

const KEY = "cookieConsent";
const PREFS = "cookiePreferences";
export const CONSENT_NONE: ConsentPrefs = { functional: false, analytics: false, marketing: false };
export const CONSENT_ALL: ConsentPrefs = { functional: true, analytics: true, marketing: true };

export function readConsent(): ConsentPrefs | null {
  try {
    const v = localStorage.getItem(KEY);
    if (!v) return null;
    if (v === "accepted") return CONSENT_ALL;
    if (v === "rejected") return CONSENT_NONE;
    const p = JSON.parse(localStorage.getItem(PREFS) ?? "{}");
    return { functional: !!p.functional, analytics: !!p.analytics, marketing: !!p.marketing };
  } catch {
    return null;
  }
}

export function saveConsent(value: "accepted" | "rejected" | "custom", prefs: ConsentPrefs) {
  try {
    localStorage.setItem(KEY, value);
    localStorage.setItem(PREFS, JSON.stringify(prefs));
  } catch {
    /* privémodus: de keuze geldt dan alleen voor dit bezoek */
  }
  window.dispatchEvent(new CustomEvent("consent:change", { detail: prefs }));
}
