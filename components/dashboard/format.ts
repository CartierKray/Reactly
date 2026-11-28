/** Getallen, bedragen en datums voor het dashboard, in het Nederlands. */

const euro0 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const euro2 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const getal0 = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });
const getal1 = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const kort = new Intl.NumberFormat("nl-NL", { notation: "compact", maximumFractionDigits: 1 });

export const fmtEuro = (n: number) => (Math.abs(n) >= 100 ? euro0.format(n) : euro2.format(n));
export const fmtEuroKort = (n: number) => (Math.abs(n) >= 10_000 ? `€ ${kort.format(n)}` : euro0.format(n));
export const fmtGetal = (n: number) => getal0.format(n);
export const fmtKort = (n: number) => kort.format(n);
export const fmtPct = (n: number) => `${getal1.format(n)}%`;
export const fmtRoas = (n: number | null) => (n === null ? "–" : `${getal1.format(n)}×`);
export const fmtDag = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
export const fmtDatumTijd = (iso: string) =>
  new Date(iso).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/** Verandering in procenten tussen twee periodes (null als er niets te vergelijken valt). */
export function delta(nu: number, vorige: number): number | null {
  if (!Number.isFinite(nu) || !Number.isFinite(vorige) || vorige === 0) return null;
  return ((nu - vorige) / Math.abs(vorige)) * 100;
}
