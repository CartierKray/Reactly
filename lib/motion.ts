import type { CSSProperties } from "react";

/**
 * Stijl voor een `.reveal-item` / `.enter` met volgnummer (`--i`) en
 * eventueel extra CSS-variabelen. Los van Reveal.tsx: dat is een
 * clientcomponent, en servercomponenten mogen daar geen functies uit aanroepen.
 */
export const order = (i: number, extra?: Record<string, string>): CSSProperties =>
  ({ ["--i" as string]: i, ...extra }) as CSSProperties;
