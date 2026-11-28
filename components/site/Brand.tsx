import { cn } from "@/lib/utils";

/**
 * components/site/Brand.tsx
 *
 * Het Reactly-logo zoals het altijd was (het SVG-bestand "BeterLeaseSVG"):
 * "Reactly" in vet cursief, Segoe UI / Helvetica Neue. Nu als tekst in
 * `currentColor` in plaats van twee losse SVG's (wit en zwart) van 800px
 * breed met een lege rechterhelft: identiek beeld, volgt het thema en kost
 * geen extra verzoek.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      translate="no"
      className={cn("select-none text-[1.6rem] font-bold italic leading-none tracking-[-0.01em]", className)}
      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      Reactly
    </span>
  );
}
