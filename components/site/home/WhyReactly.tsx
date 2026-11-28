/**
 * components/site/home/WhyReactly.tsx  (Server Component)
 *
 * "Websites die converteren" als filmisch podium: een diep vlak (nachtblauw
 * in licht, bijna zwart in donker, zoals mojo.nl) met afgeronde hoeken,
 * waarin de doorlopende beeldstrook over de volle breedte loopt.
 *
 *  - De strook blijft zoals hij was: bij hover wisselt elk beeld van het
 *    resultaat naar "achter de schermen". Nu met glazen bijschriften, een
 *    licht gekanteld podium en een lichtvloer eronder.
 *  - Bovenaan kop en lede naast elkaar, daaronder vier pijlers als glazen
 *    tegels; onderaan de kerncijfers.
 */

import Image from "next/image";
import { BarChart3, Code2, Eye, Gauge, UserRound } from "lucide-react";

import { ButtonLink } from "../Button";
import { Container, Eyebrow } from "../Layout";
import Reveal from "../Reveal";
import Smoke from "../Smoke";
import { TrustpilotStars } from "../Trust";
import { order } from "@/lib/motion";
import { SHOWCASE, STATS } from "@/lib/content";

const PILLARS = [
  { icon: Code2, title: "Maatwerk", text: "Next.js & Tailwind, geen templates" },
  { icon: Gauge, title: "Bliksemsnel", text: "SEO-proof en razendsnel geladen" },
  { icon: UserRound, title: "Eén aanspreekpunt", text: "Van idee tot livegang" },
  { icon: BarChart3, title: "Meetbaar", text: "Heldere rapportages, elke maand" },
];

/** Bijschrift per beeld in de strook (zelfde volgorde als SHOWCASE). */
const CAPTIONS = [
  { tag: "Development", title: "Van code tot live" },
  { tag: "Workshop", title: "Strategie & UX-sessies" },
  { tag: "Sprint", title: "Bouwen, testen, opleveren" },
  { tag: "Team", title: "Eén vast team" },
];

export default function WhyReactly() {
  const items = SHOWCASE.map((s, i) => ({ ...s, ...CAPTIONS[i % CAPTIONS.length] }));

  return (
    <section aria-labelledby="why-title" className="px-2 py-6 sm:px-3 md:py-10">
      <div className="deep noise relative isolate overflow-hidden rounded-[2rem] bg-page py-20 md:rounded-[2.75rem] md:py-28">
        {/* Licht en rook */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[640px] w-[640px] bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
          <div className="absolute -right-40 top-[10%] h-[560px] w-[560px] bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
          <Smoke intensity={0.25} />
          <div className="bg-grid mask-radial absolute inset-0 opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <Container>
          <Reveal group className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <div className="reveal-item">
                <Eyebrow center={false}>Waarom Reactly</Eyebrow>
              </div>
              <h2
                id="why-title"
                className="reveal-item mt-5 text-[2.3rem] font-semibold leading-[1] tracking-[-0.03em] text-ink sm:text-[3rem] md:text-[4.2rem]"
                style={order(1)}
              >
                Websites die
                <br />
                <span className="text-gradient">converteren</span>
              </h2>
            </div>
            <div>
              <p className="reveal-item max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[15.5px]" style={order(2)}>
                We helpen merken en mkb&apos;ers groeien met conversiegericht webdesign en slimme marketingcampagnes.
                Met ruim 17 jaar ervaring ontwerpen, bouwen en optimaliseren we, snel en zonder gedoe.
              </p>
              <div className="reveal-item mt-7 flex flex-col gap-3 sm:flex-row" style={order(3)}>
                <ButtonLink href="/offerte" arrow="right">
                  Start je aanvraag
                </ButtonLink>
                <ButtonLink href="/prijzen" variant="glass">
                  Bekijk pakketten
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal as="ul" group className="mt-12 grid grid-cols-2 gap-3 md:mt-14 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="reveal-item group rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-500 hover:border-brand/40 hover:bg-white/[0.07] md:p-5"
                style={order(i)}
              >
                <span className="accent-ink grid h-9 w-9 place-items-center rounded-xl transition-transform duration-500 ease-premium group-hover:-rotate-6">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <p className="mt-4 text-[14px] font-semibold text-white">{title}</p>
                <p className="mt-1 text-[12px] leading-snug text-white/60">{text}</p>
              </li>
            ))}
          </Reveal>
        </Container>

        {/* Podium: de strook over de volle breedte. */}
        <Reveal className="relative mt-16 md:mt-20" style={{ ["--in-y" as string]: "40px" }}>
          <div aria-hidden className="absolute inset-x-0 -bottom-24 h-64 bg-[radial-gradient(50%_60%_at_50%_0%,var(--deep-glow-b),transparent)]" />
          <div className="[perspective:1800px]">
            <div className="mask-fade-x group/rail [transform:rotateX(7deg)] [transform-origin:50%_100%]">
              <ul
                className="animate-marquee-x flex w-max gap-4 group-hover/rail:[animation-play-state:paused] md:gap-5"
                style={{ ["--marquee-duration" as string]: "46s" }}
              >
                {[...items, ...items, ...items].map((item, i) => {
                  const copy = i >= items.length;
                  return (
                    <li
                      key={i}
                      aria-hidden={copy || undefined}
                      className="group/item relative h-[230px] w-[300px] shrink-0 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:h-[280px] sm:w-[380px] lg:h-[320px] lg:w-[460px]"
                    >
                      <Image
                        src={item.front}
                        alt={copy ? "" : `${item.title}: een kijkje bij Reactly`}
                        fill
                        sizes="(min-width: 1024px) 460px, 380px"
                        className="object-cover transition-[opacity,transform] duration-700 ease-premium group-hover/item:scale-105 group-hover/item:opacity-0"
                      />
                      <Image
                        src={item.back}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 460px, 380px"
                        className="scale-105 object-cover opacity-0 transition-[opacity,transform] duration-700 ease-premium group-hover/item:scale-100 group-hover/item:opacity-100"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
                        <Eye className="h-3 w-3" aria-hidden />
                        <span className="group-hover/item:hidden">Resultaat</span>
                        <span className="hidden group-hover/item:inline">Achter de schermen</span>
                      </span>
                      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                        <div>
                          <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
                            {item.tag}
                          </span>
                          <p className="mt-2 font-display text-[1.15rem] font-semibold leading-tight text-white md:text-[1.3rem]">{item.title}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>

        <Container>
          <Reveal as="dl" group className="mt-16 grid grid-cols-2 gap-3 md:mt-20 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="reveal-item relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-7 text-center md:py-9"
                style={order(i)}
              >
                <dd className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.03em] md:text-[3.3rem]">
                  <span className="text-gradient">{s.value}</span>
                </dd>
                <dt className="mx-auto mt-3 max-w-[14rem] text-[12px] leading-snug text-white/60 md:text-[13px]">{s.label}</dt>
                {s.value === "4,8" && <TrustpilotStars className="mx-auto mt-3 h-4 w-[84px]" />}
              </div>
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
