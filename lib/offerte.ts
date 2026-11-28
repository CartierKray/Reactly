/**
 * lib/offerte.ts
 *
 * Gedeeld door server- en clientcomponenten: de link naar de aanvraag met
 * keuzes alvast ingevuld. De OfferteProvider vangt een klik op zo'n link op en
 * opent de aanvraag als venster; zonder JavaScript is het een gewone link.
 */

export type OffertePreset = { services?: string[]; pakket?: string; bron?: string };

export function offerteHref(p?: OffertePreset): string {
  const q = new URLSearchParams();
  if (p?.services?.length) q.set("dienst", p.services.join(","));
  if (p?.pakket) q.set("pakket", p.pakket);
  const s = q.toString();
  return `/offerte${s ? `?${s}` : ""}`;
}
