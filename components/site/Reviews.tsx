/**
 * components/site/Reviews.tsx  (Server Component)
 *
 * Ervaringen in drie doorlopende kolommen (één op telefoon, twee op tablet),
 * elk op een eigen tempo, met zachte vervaging boven en onder. Pure CSS: de
 * vorige versie mat elke kolom met een ResizeObserver en renderde opnieuw.
 * Pauzeert bij hover.
 */

import Image from "next/image";

import { Container, Section, SectionHeading } from "./Layout";
import Reveal from "./Reveal";
import { TrustpilotStars } from "./Trust";
import { REVIEWS, type Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

function split<T>(list: T[], n: number) {
  const out: T[][] = Array.from({ length: n }, () => []);
  list.forEach((item, i) => out[i % n].push(item));
  return out;
}

export default function Reviews({
  eyebrow = "Ervaringen",
  title,
  lede = "Wat ondernemers zeggen over hun samenwerking met Reactly.",
  className,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
  className?: string;
}) {
  const columns = split(REVIEWS, 3);
  const speeds = ["90s", "110s", "95s"];

  return (
    <Section id="reviews" aria-labelledby="reviews-title" className={cn("overflow-hidden", className)}>
      <Container>
        <Reveal>
          <SectionHeading
            id="reviews-title"
            eyebrow={eyebrow}
            title={
              title ?? (
                <>
                  Geliefd door <span className="text-gradient">ondernemers</span>
                </>
              )
            }
            lede={lede}
          />
        </Reveal>

        <Reveal
          className="mask-fade-y relative mt-14 grid h-[680px] grid-cols-1 gap-5 overflow-hidden md:mt-16 md:grid-cols-2 lg:h-[760px] lg:grid-cols-3"
          style={{ ["--d" as string]: "120ms" }}
        >
          {columns.map((col, c) => (
            <div key={c} className={cn("group", c === 1 && "hidden md:block", c === 2 && "hidden lg:block")}>
              <ul
                className="animate-marquee-y space-y-5 pb-5 group-hover:[animation-play-state:paused]"
                style={{ ["--marquee-duration" as string]: speeds[c], animationDirection: c === 1 ? "reverse" : "normal" }}
              >
                {[...col, ...col].map((r, i) => (
                  <ReviewCard key={i} review={r} hidden={i >= col.length} />
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

function ReviewCard({ review: r, hidden }: { review: Review; hidden: boolean }) {
  return (
    <li aria-hidden={hidden || undefined}>
      <figure className="card glow-hover p-6">
        <TrustpilotStars className="h-4 w-[86px]" />
        <blockquote className="mt-4 text-[13.5px] leading-relaxed text-ink">&ldquo;{r.body}&rdquo;</blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <Image
            src={r.image}
            alt=""
            width={40}
            height={40}
            sizes="40px"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-surface"
          />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-ink">{r.author.trim()}</span>
            <span className="block truncate text-[11.5px] text-ink-subtle">{r.handle}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}
