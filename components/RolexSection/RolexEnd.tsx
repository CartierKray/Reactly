// InfiniteMovingCardsWrapper.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function RolexEnd() {
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
    <section className="relative bg-[#1E2F2C] w-full overflow-hidden">
      {/* Smoke Layers */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/images/smoke1.png"
          alt="smoke1"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_8s_linear_infinite] left-[-50%] top-[-5%] w-[2200px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_12s_linear_infinite] left-[-10%] top-[-40%] w-[2200px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_16s_linear_infinite] right-[-25%] top-[-20%] w-[2200px] max-w-none mix-blend-screen"
        />
      </div>

      {/* Carousel Content */}
      <div className="relative z-20 px-5 xl:px-8 py-28">
        {/* <TextBetweenSeven /> */}
        <div className="">
          <section className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
              <div className="flex-grow border-t border-white/50" />
              <h1 className="text-5xl sm:text-6xl 2xl:text-7xl text-white font-light whitespace-nowrap">
                Rolex Horloges
              </h1>
              <div className="flex-grow border-t border-white" />
            </div>

            <p className="text-white text-[15px] font-light leading-relaxed max-w-3xl mx-auto mb-8">
              Opgericht in 1905, heeft Rolex zich gevestigd als een voorloper in
              de wereld van luxe horloges. Met kenmerkende ontwerpen en
              vooruitstrevende technologie in uurwerken, maken het bezit van een
              Rolex-horloge iets om naar te verlangen. Ontdek ons uitgebreide
              assortiment van Rolex-horloges.
            </p>
            <p className="text-white text-[10px] leading-relaxed max-w-3xl mx-auto italic font-serif">
              <span className="font-semibold">Belangrijk:</span> Wij verwelkomen
              u graag op ons bezoekadres. Omdat onze horloges niet op locatie
              aanwezig zijn, vragen wij u vriendelijk om vooraf een afspraak te
              maken. Bij aankopen accepteren wij contante betalingen tot een
              maximum van €2000,-. We vragen u om de betaling persoonlijk te
              doen en dit te bevestigen met een geldig legitimatiebewijs.
            </p>
            <Link href="/contact#contactgegevens">
              <button className="relative px-10 mt-10 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                  Contact
                </span>
                <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
              </button>
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
