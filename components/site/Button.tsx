import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "glass";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = { sm: "btn-sm", md: "", lg: "btn-lg" };

/**
 * Knop als link. Intern via next/link (prefetch), extern als gewone <a>.
 * `arrow` zet een pijl achter de tekst die bij hover een stapje opschuift.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  external,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: "right" | "up";
  external?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn("btn group", `btn-${variant}`, sizes[size], className);
  const icon =
    arrow === "right" ? (
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    ) : arrow === "up" ? (
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    ) : null;

  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = /^https?:/.test(href);
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {icon}
    </Link>
  );
}

/** Icoontegel in de stijl van de featurekaarten: zacht blauw vlak met gloed bij hover. */
export function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        // Licht: neutraal grafiet; donker: het zachte beige accent.
        "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink/10 bg-gradient-to-br from-ink/[0.07] to-ink/[0.02] text-ink dark:border-brand/15 dark:from-brand/[0.14] dark:to-brand/[0.04] dark:text-brand-fg",
        "transition-all duration-500 ease-premium group-hover:rotate-3 group-hover:scale-110 group-hover:border-ink/20 group-hover:shadow-[0_10px_30px_-12px_rgb(var(--glow-rgb)/0.55)] dark:group-hover:border-brand/30",
        className,
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </span>
  );
}
