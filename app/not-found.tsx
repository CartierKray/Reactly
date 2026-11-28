import type { Metadata } from "next";

import { ButtonLink } from "@/components/site/Button";
import { RubikCube } from "@/components/site/RubikCube";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[720px] -translate-x-1/2 bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.06),transparent)]" />
      </div>
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-[104px] text-center sm:px-6 lg:px-8">
        <div className="enter flex justify-center">
          <RubikCube size={84} className="animate-float" />
        </div>
        <p className="enter mt-6 font-display text-[6rem] font-semibold leading-none tracking-[-0.05em] text-ink sm:text-[8rem]" style={{ ["--d" as string]: "80ms" }}>
          4<span className="text-gradient">0</span>4
        </p>
        <h1 className="enter mt-4 text-[1.8rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2.2rem]" style={{ ["--d" as string]: "160ms" }}>
          Deze pagina bestaat niet (meer)
        </h1>
        <p className="enter mx-auto mt-4 max-w-md text-[14.5px] text-ink-muted" style={{ ["--d" as string]: "220ms" }}>
          Misschien is hij verhuisd of klopt de link niet helemaal. Geen zorgen, we helpen je graag verder.
        </p>
        <div className="enter mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ ["--d" as string]: "300ms" }}>
          <ButtonLink href="/" size="lg" arrow="right">
            Naar de homepage
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Neem contact op
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
