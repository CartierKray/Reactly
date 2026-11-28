/**
 * components/site/CtaBand.tsx  (Server Component)
 *
 * Filmische afsluiter vóór het contactblok: een diep vlak (nachtblauw in
 * licht, bijna zwart in donker) met zacht licht, drijvende rook, raster,
 * filmkorrel en de zwarte Rubik's cube. Het accent zit alleen in de knop.
 */

import { ButtonLink } from "./Button";
import { RubikCube } from "./RubikCube";
import Smoke from "./Smoke";
import { Container } from "./Layout";
import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

export default function CtaBand({
  title = (
    <>
      Klaar om je merk naar
      <br className="hidden sm:block" /> een <span className="text-gradient">hoger niveau</span> te tillen?
    </>
  ),
  text = "Plan een vrijblijvende kennismaking. Binnen 24 uur heb je een voorstel op maat, met planning en investering.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Reveal className="noise deep relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-page px-6 py-16 text-white sm:px-12 md:py-20 lg:px-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-32 h-[460px] w-[460px] bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
            <div className="absolute -bottom-40 right-0 h-[480px] w-[600px] bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
            <Smoke intensity={0.4} />
            <div className="bg-grid mask-radial absolute inset-0 opacity-30" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="text-center lg:text-left">
              <p className="eyebrow justify-center lg:justify-start">
                <span aria-hidden className="h-px w-7 bg-gradient-to-r from-transparent to-white/40" />
                <span className="text-white/60">Laten we bouwen</span>
              </p>
              <h2 className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[2.6rem] md:text-[3.4rem]">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-white/70 md:text-[15.5px] lg:mx-0">{text}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink href="/offerte" size="lg" arrow="right">
                  Start je aanvraag
                </ButtonLink>
                <ButtonLink href={SITE.phone.href} variant="glass" size="lg">
                  Bel {SITE.phone.display}
                </ButtonLink>
              </div>
            </div>
            <div className="hidden justify-center lg:flex">
              <RubikCube size={130} className="animate-float" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
