/**
 * components/site/home/TechShowcase.tsx  (Server Component)
 *
 * "Gebouwd met de nieuwste technieken": eerst direct zichtbaar premium
 * webdesign (een schuin weglopende wand met echte ontwerpen, met zwevende
 * glazen labels), daarna het interactieve techniekraster (filters, dark
 * mode, 3D, easing, verlopen). De kaarten van dat raster zijn diepe vlakken:
 * nachtblauw in licht, bijna zwart in donker, dus ze passen in elk thema.
 * Het raster zelf laadt pas vlak voordat het in beeld komt (LazyShowcase).
 */

import Image from "next/image";
import { Accessibility, Gauge, Layers, PenTool, Sparkles } from "lucide-react";

import { Container, Section, SectionHeading } from "../Layout";
import Reveal from "../Reveal";
import { RubikCube } from "../RubikCube";
import LazyShowcase from "./LazyShowcase";

const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS v4", "Headless CMS", "Vercel Edge", "Core Web Vitals", "AI-integraties"];

const CHIPS = [
  { icon: PenTool, text: "Pixel-perfect design", pos: "left-[4%] top-[18%] sm:left-[8%]", delay: "0s" },
  { icon: Gauge, text: "PageSpeed 95+", pos: "right-[4%] top-[10%] sm:right-[10%]", delay: "-2.2s" },
  { icon: Accessibility, text: "Toegankelijk (WCAG)", pos: "left-[6%] bottom-[14%] hidden sm:flex sm:left-[14%]", delay: "-4.4s" },
  { icon: Layers, text: "Eigen design system", pos: "right-[5%] bottom-[20%] sm:right-[12%]", delay: "-1.1s" },
];

export default function TechShowcase() {
  return (
    <Section aria-labelledby="tech-title" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-x-0 top-0 h-[1100px] opacity-50 dark:opacity-35" />
        <div className="absolute left-1/2 top-[14%] h-[700px] w-[min(1300px,160vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(var(--glow-rgb)/0.10),transparent)]" />
      </div>

      <Container>
        <Reveal>
          <SectionHeading
            id="tech-title"
            eyebrow="Webdesign op maat"
            title={
              <>
                Gebouwd met de <span className="text-gradient">nieuwste technieken</span>
              </>
            }
            lede="Van filters en 3D-transforms tot vloeiende animaties en dark mode: wij beheersen elk detail, zodat jouw website niet alleen mooi is, maar ook razendsnel."
          />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {STACK.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[11.5px] font-medium text-ink-muted backdrop-blur transition-colors duration-300 hover:border-brand/40 hover:text-ink"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      {/* Ontwerpwand: echte ontwerpen, schuin weglopend in de diepte. */}
      <Reveal className="relative mt-12 h-[340px] sm:h-[440px] md:mt-16 lg:h-[540px]" style={{ ["--in-y" as string]: "50px" }}>
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden [perspective:2200px] [mask-image:radial-gradient(64%_70%_at_50%_50%,#000_45%,transparent_100%)]"
        >
          <div className="absolute left-1/2 top-1/2 w-[1100px] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(46deg)_rotateZ(-16deg)] sm:w-[1400px] lg:w-[1700px]">
            <Image
              src="/images/cta-1.png"
              alt=""
              width={3838}
              height={4042}
              sizes="(min-width: 1024px) 1700px, (min-width: 640px) 1400px, 1100px"
              className="h-auto w-full rounded-[2rem] shadow-[0_60px_120px_-40px_rgba(15,20,60,0.55)] dark:shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>
        {/* Lichtval en zachte overgang naar de pagina. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_45%,rgb(var(--glow-rgb)/0.16),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-t from-transparent to-[hsl(var(--page))]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[hsl(var(--page))]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-l from-transparent to-[hsl(var(--page))]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[14%] bg-gradient-to-r from-transparent to-[hsl(var(--page))]" />

        {CHIPS.map(({ icon: Icon, text, pos, delay }) => (
          <span
            key={text}
            className={`animate-float absolute z-10 flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/80 px-3.5 py-2.5 text-[11.5px] font-semibold text-neutral-900 shadow-[0_18px_40px_-16px_rgba(15,20,60,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70 dark:text-white ${pos}`}
            style={{ animationDelay: delay }}
          >
            <span className="accent-ink grid h-7 w-7 place-items-center rounded-lg">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            {text}
          </span>
        ))}

        {/* Middenstuk: een donkere glazen plaquette met een lichtrand die rondloopt,
            zilveren kop, kerncijfers en de kubus uit de hero. */}
        <div className="group/plaque absolute left-1/2 top-1/2 z-10 w-[min(92vw,470px)] -translate-x-1/2 -translate-y-1/2">
          <div className="border-aurora rounded-[1.75rem] p-px shadow-[0_40px_100px_-30px_rgba(5,8,20,0.75)]">
            <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-[#07080c]/85 px-6 pb-6 pt-7 text-center text-white backdrop-blur-2xl sm:px-8">
              <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.14),transparent)]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-[1200ms] ease-premium group-hover/plaque:translate-x-full" />
              <RubikCube size={46} pose="front" shadow={false} className="absolute -right-3 -top-4 animate-float" />
              <p className="relative inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <Sparkles className="h-3 w-3" aria-hidden />
                Premium webdesign
              </p>
              <p className="relative mt-4 bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-[1.45rem] font-medium leading-[1.15] tracking-[-0.025em] text-transparent sm:text-[1.75rem]">
                Elk scherm ontworpen,
                <br />
                elk detail gebouwd
              </p>
              <dl className="relative mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-3">
                {[
                  ["95+", "PageSpeed"],
                  ["100%", "Maatwerk"],
                  ["WCAG", "Toegankelijk"],
                ].map(([v, l]) => (
                  <div key={l} className="px-2">
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-[1.05rem] font-medium tracking-[-0.01em] tabular-nums">{v}</dd>
                    <dd className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/50">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 md:mt-12">
        <LazyShowcase />
      </div>
    </Section>
  );
}
