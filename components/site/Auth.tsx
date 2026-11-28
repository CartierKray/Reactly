"use client";

/**
 * components/site/Auth.tsx
 *
 * Inloggen en registreren voor het klantportaal. Er is nog geen backend: na
 * versturen krijgt de bezoeker een eerlijke melding met de weg naar contact.
 * (De vorige pagina's toonden het BeterLease-logo en een video die niet
 * bestond.)
 */

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { Wordmark } from "./Brand";
import { RubikCube } from "./RubikCube";
import Smoke from "./Smoke";
import { TrustpilotStars } from "./Trust";
import { toast } from "@/components/ui/use-toast";

const field =
  "w-full rounded-xl border border-line bg-surface py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-subtle/80 hover:border-line-strong focus:border-brand/60 focus:shadow-[0_0_0_4px_hsl(var(--brand)/0.15)]";

export default function AuthPanel({ mode }: { mode: "signin" | "signup" }) {
  const signup = mode === "signup";
  const [show, setShow] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Het klantportaal komt eraan",
      description: "Inloggen is binnenkort beschikbaar. Heb je nu een vraag? Neem gerust contact met ons op.",
    });
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1280px] items-center gap-10 px-5 pb-16 pt-[96px] sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Merkpaneel */}
        <div className="noise deep relative hidden h-full min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-page p-10 text-white lg:flex lg:flex-col">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-24 h-96 w-96 bg-[radial-gradient(closest-side,rgba(255,255,255,0.1),transparent)]" />
            <Smoke intensity={0.4} />
            <div className="bg-grid mask-radial absolute inset-0 opacity-40" />
          </div>
          <Wordmark />
          <div className="my-auto grid place-items-center py-10">
            <RubikCube size={150} className="animate-float" />
          </div>
          <figure>
            <TrustpilotStars className="h-[18px] w-[96px]" />
            <blockquote className="mt-4 text-[1.35rem] font-medium leading-snug tracking-[-0.01em]">
              &ldquo;Binnen vijf dagen had Reactly onze site live. Alles zat erin: copy, SEO, analytics. Supersnel en
              strak werk.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[12.5px] text-white/55">Yara Visser · @launchfast</figcaption>
          </figure>
        </div>

        {/* Formulier */}
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="enter inline-flex items-center gap-2 text-[12px] font-medium text-ink-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Terug naar home
          </Link>
          <h1 className="enter mt-8 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink" style={{ ["--d" as string]: "80ms" }}>
            {signup ? (
              <>
                Maak je <span className="text-gradient">account</span> aan
              </>
            ) : (
              <>
                Welkom <span className="text-gradient">terug</span>
              </>
            )}
          </h1>
          <p className="enter mt-3 text-[14px] text-ink-muted" style={{ ["--d" as string]: "140ms" }}>
            {signup ? "Volg je project, bekijk rapportages en deel feedback op één plek." : "Log in op het Reactly-klantportaal."}
          </p>

          <form onSubmit={onSubmit} className="enter mt-9 space-y-4" style={{ ["--d" as string]: "200ms" }}>
            {signup && (
              <div className="relative">
                <label htmlFor="auth-name" className="sr-only">
                  Naam
                </label>
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
                <input id="auth-name" name="name" required autoComplete="name" placeholder="Volledige naam" className={field} />
              </div>
            )}
            <div className="relative">
              <label htmlFor="auth-email" className="sr-only">
                E-mailadres
              </label>
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
              <input id="auth-email" name="email" type="email" required autoComplete="email" placeholder="E-mailadres" className={field} />
            </div>
            <div className="relative">
              <label htmlFor="auth-password" className="sr-only">
                Wachtwoord
              </label>
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
              <input
                id="auth-password"
                name="password"
                type={show ? "text" : "password"}
                required
                minLength={signup ? 8 : undefined}
                autoComplete={signup ? "new-password" : "current-password"}
                placeholder="Wachtwoord"
                className={`${field} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-ink-subtle hover:bg-surface-sunken hover:text-ink"
              >
                {show ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-2 w-full">
              {signup ? "Account aanmaken" : "Inloggen"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </button>
          </form>

          <p className="enter mt-8 text-center text-[13px] text-ink-muted" style={{ ["--d" as string]: "260ms" }}>
            {signup ? "Heb je al een account? " : "Nog geen account? "}
            <Link href={signup ? "/signin" : "/signup"} className="font-semibold text-ink underline-offset-4 hover:text-brand-fg hover:underline">
              {signup ? "Log in" : "Meld je aan"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
