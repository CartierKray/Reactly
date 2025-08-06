// RolexSection.tsx
"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

export default function RolexSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes wave {
        0% {
          transform: rotateZ(0deg) translate3d(0, 10%, 15px) rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg) translate3d(0, 10%, 15px) rotateZ(-360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section className="relative bg-[#1E2F2C] w-full flex justify-center items-center overflow-hidden">
      {/* Smoke Layers */}

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/images/smoke1.png"
          alt="smoke1"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_8s_linear_infinite] left-[-50%] top-[-20%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_15s_linear_infinite] left-[-10%] top-[-60%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_10s_linear_infinite] right-[-25%] top-[-30%] w-[2000px] max-w-none mix-blend-screen"
        />
      </div>

      {/* Rolex Content */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center px-6 sm:px-16 xl:px-40 py-24 lg:py-10">
        {/* Text */}
        <div className="lg:col-span-1 text-white max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-light mb-6">
            Rolex Horloges
          </h2>
          <p className="text-sm sm:text-base font-extralight leading-relaxed mb-6">
            Rolex is nog altijd de iconische belichaming van horlogemakerskunst
            en luxe. En dat is meer dan terecht. Als pionier in de
            horlogebranche heeft Rolex een ongeëvenaarde reputatie opgebouwd
            voor uitmuntend vakmanschap, innovatie en precisie. Niet voor niets
            is het vandaag de dag nog altijd een veel verkochte en gewilde keuze
            onder horlogeliefhebbers wereldwijd.
          </p>
          <p className="text-sm sm:text-base font-extralight leading-relaxed mb-6">
            Bij Watchrr bieden wij een uitgebreid assortiment aan vintage en
            nieuwe horloges en kunnen we, indien gewenst, ook op zoek gaan naar
            specifieke modellen die niet in ons huidige assortiment te vinden
            zijn.
          </p>
          <Link href="/collectie">
            <button className="relative px-8 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
              <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                Bekijk onze collectie
              </span>
              <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="lg:col-span-1 hidden lg:flex justify-center">
          <Image
            src="/images/bbn.png.webp"
            alt="Rolex Watch"
            width={1000}
            height={1000}
            className="w-full md:w-fit lg:w-full"
          />
        </div>

        {/* Features */}
        <div className="lg:col-span-1 pt-10 grid-cols-2 hidden lg:flex flex-col gap-6">
          {[
            "Waterdicht",
            "Chronometer",
            "Zelfopwindend",
            "Anti - Megnetic",
          ].map((feature) => (
            <div
              key={feature}
              className="bg-[#0f1d1b] text-white text-center py-3 px-6 rounded-full w-full lg:w-fit mx-auto lg:mx-0 text-sm shadow-md"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
