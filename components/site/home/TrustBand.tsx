/**
 * components/site/home/TrustBand.tsx  (Server Component)
 *
 * Direct onder de hero: de beoordelingen (Trustpilot, G2 en de lauwerkrans
 * van de vorige homepage) en een rustige, doorlopende band met klantlogo's.
 * De logo's zijn monochroom gemaakt (zwart in licht, wit in donker), zodat
 * ze samen één rustig geheel vormen in plaats van een bonte strook.
 */

import Image from "next/image";

import { Container } from "../Layout";
import Reveal from "../Reveal";
import { order } from "@/lib/motion";
import { G2Badges, Laurel, TrustpilotLogo, TrustpilotStars } from "../Trust";
import { CLIENT_LOGOS } from "@/lib/content";

export default function TrustBand() {
  return (
    <section id="start" aria-labelledby="trust-title" className="relative overflow-hidden pb-16 pt-20 md:pb-20 md:pt-28">
      <Container>
        <Reveal group className="flex flex-col items-center text-center">
          <div className="reveal-item flex items-center justify-center gap-3 sm:gap-6">
            <Laurel className="h-[86px] rotate-[7deg] sm:h-[110px]" />
            <div className="flex flex-col items-center gap-3">
              <div className="logo-glow-group flex items-center gap-3 text-ink">
                <TrustpilotStars className="h-[22px] w-[120px]" />
                <TrustpilotLogo className="h-[22px]" />
              </div>
              <p className="text-[12px] text-ink-muted">
                <strong className="font-semibold text-ink">Uitstekend</strong> · 4,8 uit 5
              </p>
              <G2Badges className="mt-1 max-w-[280px] sm:max-w-none" />
            </div>
            <Laurel flip className="h-[86px] -rotate-[7deg] sm:h-[110px]" />
          </div>

          <h2
            id="trust-title"
            className="reveal-item mt-10 max-w-3xl text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl md:text-[2.75rem]"
            style={order(1)}
          >
            Klanten beoordelen ons als <span className="text-gradient">#1</span> in webdesign & marketing
          </h2>
        </Reveal>
      </Container>

      {/* Klantlogo's */}
      <Reveal className="mt-14 md:mt-16" style={{ ["--d" as string]: "150ms" }}>
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-subtle">
          Ambitieuze merken die met ons groeien
        </p>
        <div className="mask-fade-x group relative overflow-hidden">
          <ul
            className="animate-marquee-x flex w-max items-center group-hover:[animation-play-state:paused]"
            style={{ ["--marquee-duration" as string]: "55s" }}
          >
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <li key={`${logo.alt}-${i}`} aria-hidden={i >= CLIENT_LOGOS.length} className="flex h-16 w-[170px] shrink-0 items-center justify-center px-6 md:w-[210px]">
                <Image
                  src={logo.src}
                  alt={i >= CLIENT_LOGOS.length ? "" : logo.alt}
                  width={140}
                  height={48}
                  className="logo-glow max-h-9 w-auto max-w-[130px] object-contain opacity-55 brightness-0 dark:invert md:max-h-10"
                />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
