"use client";

/**
 * app/error.tsx
 *
 * Vangnet als een pagina onverwacht een fout geeft: rustig, in de huisstijl,
 * met opnieuw proberen en een weg terug.
 */

import * as React from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
      </div>
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-[104px] text-center">
        <p className="eyebrow justify-center">Er ging iets mis</p>
        <h1 className="mt-5 text-[2rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          Deze pagina kon niet worden geladen
        </h1>
        <p className="mt-4 text-[14.5px] text-ink-muted">Probeer het opnieuw. Blijft het misgaan? Laat het ons weten via info@reactly.nl.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary btn-lg">
            <RotateCcw className="h-4 w-4" aria-hidden />
            Opnieuw proberen
          </button>
          <Link href="/" className="btn btn-outline btn-lg">
            Naar de homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
