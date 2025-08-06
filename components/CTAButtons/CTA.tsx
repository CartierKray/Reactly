"use client";

import Image from "next/image";

export function CTA() {
  return (
    <section className="relative max-w-7xl py-20 max-h-[450px] mx-auto mb-20 isolate overflow-hidden bg-gradient-to-br from-slate-900 to-slate-500 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24 lg:pt-0">
      {/* Text block */}
      <div className="mx-auto max-w-md py-10 text-center lg:mx-0 lg:flex-auto lg:py-10 lg:text-left">
        <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-4xl">
          Let&apos;s talk and make it happen
        </h2>
        <p className="mt-6 text-sm leading-8 text-neutral-200 sm:text-lg">
          Reach out to us, and we&apos;ll respond as soon as possible.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button className="group relative mt-6 mb-4 block w-full cursor-pointer rounded-full bg-slate-900 p-px text-base leading-6 font-semibold text-white no-underline shadow-2xl shadow-zinc-900 sm:w-fit">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative z-10 flex items-center justify-center space-x-2 rounded-full bg-zinc-950 px-8 py-4 ring-1 ring-white/10">
              <span>Talk to us</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </div>
      </div>

      {/* Right-side screenshot image */}
      <div className="relative hidden lg:flex w-full overflow-hidden max-w-xl lg:max-w-[42rem]">
        <Image
          alt="screenshot"
          src="/images/cta-1.png"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain relative z-10"
          priority
        />
      </div>
    </section>
  );
}
