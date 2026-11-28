import { Poppins } from "next/font/google";

/**
 * lib/fonts.ts
 *
 * Eén lettertype voor de hele site: Poppins, voor lopende tekst én koppen
 * (koppen stonden eerder in ClashDisplay; dat scheelt nu ook een extra
 * fontbestand per bezoek). Bij het bouwen opgehaald en vanaf het eigen domein
 * geserveerd: geen verzoek naar Google tijdens een bezoek.
 *
 * Het woordmerk "Reactly" blijft in zijn eigen vette cursief (Brand.tsx).
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});
