/**
 * components/site/PageHero.tsx  (Server Component)
 *
 * Eén kop voor elke subpagina (zoals de PageHero van BeterLease): compact,
 * met kruimelpad, bovenschrift, een eigen <h1> per pagina, lede en
 * optionele knoppen. Sfeer met raster, zacht licht, rook (donker) en de
 * zwarte Rubik's cube rechts.
 *
 * Met `image` wordt het een filmische kop: een diep vlak met afgeronde
 * hoeken (nachtblauw in licht, bijna zwart in donker) met de foto erachter,
 * verlopen voor de leesbaarheid, gloed en rook. De tekst gebruikt dezelfde
 * tokens, dus binnen `.deep` wordt hij vanzelf licht.
 * Elk element schuift kort na elkaar binnen.
 */

import Image from "next/image";
import Link from "next/link";

import { RubikCube } from "./RubikCube";
import Smoke from "./Smoke";
import { Container } from "./Layout";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

const step = (i: number) => ({ ["--i" as string]: i, ["--stagger" as string]: "90ms" }) as React.CSSProperties;

export default function PageHero({
  eyebrow,
  title,
  lede,
  crumbs = [],
  actions,
  children,
  cube = true,
  image,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  cube?: boolean;
  /** Foto achter de kop (filmische variant). */
  image?: { src: string; position?: string };
  className?: string;
}) {
  const content = (
      <Container
        className={cn(
          "grid items-center gap-8 lg:grid-cols-[1fr_auto]",
          image ? "pb-14 pt-16 md:pb-20 md:pt-24" : "pb-16 pt-[128px] md:pb-24 md:pt-[148px]",
        )}
      >
        <div>
          {crumbs.length > 0 && (
            <nav aria-label="Kruimelpad" className="enter mb-6" style={step(0)}>
              <ol className="flex flex-wrap items-center gap-2 text-[12px] text-ink-subtle">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden className="text-ink-subtle/60">/</span>}
                    {c.href ? (
                      <Link href={c.href} className="transition-colors hover:text-brand-fg">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {eyebrow && (
            <p className="eyebrow enter" style={step(1)}>
              <span aria-hidden className="h-px w-7 bg-gradient-to-r from-transparent to-ink/35" />
              {eyebrow}
            </p>
          )}

          <h1
            className="enter mt-5 max-w-4xl text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[3.2rem] md:text-[4rem] lg:text-[4.5rem]"
            style={step(2)}
          >
            {title}
          </h1>

          {lede && (
            <p className="enter mt-6 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted md:text-[16.5px]" style={step(3)}>
              {lede}
            </p>
          )}

          {actions && (
            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={step(4)}>
              {actions}
            </div>
          )}

          {children && (
            <div className="enter" style={step(5)}>
              {children}
            </div>
          )}
        </div>

        {cube && (
          <div className="enter hidden lg:block" style={{ ...step(3), ["--in-y" as string]: "30px" }}>
            <RubikCube size={120} className="animate-float" />
          </div>
        )}
      </Container>
  );

  if (image) {
    return (
      <section className={cn("px-2 pt-[calc(var(--nav-h)+0.5rem)] sm:px-3", className)}>
        <div className="deep noise relative isolate overflow-hidden rounded-[2rem] bg-page md:rounded-[2.5rem]">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className={cn("zoom-in-settle object-cover opacity-60 dark:opacity-45", image.position)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--page))] via-[hsl(var(--page)/0.78)] to-[hsl(var(--page)/0.25)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--page)/0.9)] via-transparent to-[hsl(var(--page)/0.35)]" />
            <div className="absolute -left-32 -top-40 h-[520px] w-[520px] bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
            <div className="absolute -bottom-40 right-[10%] h-[460px] w-[560px] bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
            <Smoke intensity={0.3} eager />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("relative isolate overflow-hidden border-b border-line", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-70 dark:opacity-50" />
        <div className="absolute -top-24 left-1/4 h-[460px] w-[680px] bg-[radial-gradient(closest-side,rgba(0,0,0,0.04),transparent)] dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" />
        <div className="hidden dark:block">
          <Smoke intensity={0.35} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-page" />
      </div>
      {content}
    </section>
  );
}
