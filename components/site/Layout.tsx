/**
 * components/site/Layout.tsx
 *
 * Eén opbouw voor alle blokken, zoals de `Sectie` van BeterLease: dezelfde
 * paginabreedte (1280px), dezelfde witruimte en dezelfde kop met een klein
 * bovenschrift tussen twee lijntjes. Geen scheidingslijnen tussen blokken;
 * de witruimte doet dat werk.
 */

import { cn } from "@/lib/utils";

export function Container({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8", className)} {...rest}>
      {children}
    </div>
  );
}

export function Section({ className, children, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("relative py-20 md:py-28", className)} {...rest}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, center = true, className }: { children: React.ReactNode; center?: boolean; className?: string }) {
  return (
    <p className={cn("eyebrow", className)}>
      <span aria-hidden className="h-px w-7 bg-gradient-to-r from-transparent to-ink/35" />
      {children}
      {center && <span aria-hidden className="h-px w-7 bg-gradient-to-l from-transparent to-ink/35" />}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left", className)}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[2.5rem] md:text-[3.25rem]"
      >
        {title}
      </Tag>
      {lede && (
        <p className={cn("mt-5 max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[15.5px]", center && "mx-auto")}>
          {lede}
        </p>
      )}
    </div>
  );
}

/** Zachte, neutrale gloed achter een blok (wit licht in donker, nauwelijks zichtbaar in licht). */
export function Glow({ className }: { className?: string }) {
  return (
    // Radiale verlopen die zelf naar transparant uitlopen: geen blur nodig
    // (goedkoper) en geen harde rand waar de sectie begint.
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute left-1/2 top-[4%] h-[560px] w-[min(1100px,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,hsl(0_0%_0%/0.035),transparent)] dark:bg-[radial-gradient(closest-side,hsl(0_0%_100%/0.06),transparent)]" />
      <div className="absolute -right-[10%] bottom-[2%] h-[480px] w-[640px] bg-[radial-gradient(closest-side,hsl(0_0%_0%/0.025),transparent)] dark:bg-[radial-gradient(closest-side,hsl(0_0%_100%/0.04),transparent)]" />
    </div>
  );
}
