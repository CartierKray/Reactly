"use client";

/**
 * components/site/home/RotatingWord.tsx
 *
 * Het grote, wisselende woord in de hero, wit met een zilveren verloop: het oude
 * schuift met een zachte blur omhoog weg, daarna komt het nieuwe van onderen.
 * Lettergrootte schaalt met de kolombreedte (container queries), zodat ook
 * "Schaalbaarheid" op elk scherm op één regel past. Bij reduced motion blijft
 * het eerste woord staan. Schermlezers lezen de vaste kop, niet dit woord.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export default function RotatingWord({ words, interval = 2600 }: { words: readonly string[]; interval?: number }) {
  const [s, setS] = React.useState<{ now: number; prev: number | null }>({ now: 0, prev: null });

  React.useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setS((v) => ({ now: (v.now + 1) % words.length, prev: v.now })), interval);
    return () => window.clearInterval(t);
  }, [words.length, interval]);

  const word = (t: string) => (
    <span className="inline-block bg-gradient-to-b from-white from-30% to-white/55 bg-clip-text pb-[0.08em] font-semibold uppercase leading-none tracking-[-0.01em] text-transparent drop-shadow-[0_8px_30px_rgba(255,255,255,0.12)]">
      {t}
    </span>
  );
  const align = "absolute inset-0 flex items-center justify-center lg:dark:justify-start";

  return (
    <span aria-hidden className="@container block w-full">
      <span className="relative block h-[1.16em] w-full overflow-hidden text-[clamp(2.3rem,10.4cqi,5.9rem)]">
        {s.prev !== null && (
          <span key={`o${s.now}`} className={cn(align, "word-out")}>
            {word(words[s.prev])}
          </span>
        )}
        <span key={`i${s.now}`} className={cn(align, s.prev !== null && "word-in")}>
          {word(words[s.now])}
        </span>
      </span>
    </span>
  );
}
