"use client";

/**
 * app/dashboard/login/page.tsx
 *
 * Inloggen op het interne dashboard: één wachtwoord, premium en rustig. Na
 * inloggen terug naar waar je heen wilde (?next=…).
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";

import { Wordmark } from "@/components/site/Brand";
import { RubikCube } from "@/components/site/RubikCube";

export default function LoginPage() {
  const router = useRouter();
  const [bezig, setBezig] = React.useState(false);
  const [fout, setFout] = React.useState<string | null>(null);

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/dashboard/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Inloggen mislukt");
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next && next.startsWith("/dashboard") ? next : "/dashboard");
      router.refresh();
    } catch (err) {
      setFout(err instanceof Error ? err.message : "Inloggen mislukt");
      setBezig(false);
    }
  }

  return (
    <div className="deep noise relative grid min-h-[100dvh] place-items-center overflow-hidden bg-page px-4 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.09),transparent)]" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-20" />
      </div>
      <div className="relative w-full max-w-[380px]">
        <div className="mb-6 flex justify-center">
          <RubikCube size={70} pose="front" className="animate-float" priority />
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Wordmark className="text-[1.4rem]" />
            <span className="rounded-md border border-white/12 bg-white/[0.06] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/60">Dashboard</span>
          </div>
          <h1 className="mt-5 text-[1.3rem] font-medium tracking-[-0.01em]">Welkom terug</h1>
          <p className="mt-1 text-[12.5px] text-white/60">Alleen voor het team van Reactly.</p>
          <form onSubmit={verstuur} className="mt-6 grid gap-3">
            <label className="relative block">
              <span className="sr-only">Wachtwoord</span>
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" aria-hidden />
              <input
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Wachtwoord"
                className="w-full rounded-xl border border-white/12 bg-white/[0.06] py-3 pl-10 pr-3 text-[13.5px] text-white outline-none placeholder:text-white/40 focus:border-white/40"
              />
            </label>
            {fout && <p className="rounded-xl bg-red-500/10 px-3.5 py-2.5 text-[12px] text-red-300">{fout}</p>}
            <button type="submit" disabled={bezig} className="btn btn-primary w-full disabled:opacity-60">
              {bezig ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Inloggen
              {!bezig && <ArrowRight className="h-4 w-4" aria-hidden />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
