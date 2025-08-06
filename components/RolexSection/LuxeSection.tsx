"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

export default function LuxeSection() {
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
          className="absolute opacity-50 animate-[wave_10s_linear_infinite] left-[-50%] top-[-20%] w-[2200px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_14s_linear_infinite] left-[-10%] top-[-60%] w-[2200px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_18s_linear_infinite] right-[-25%] top-[-30%] w-[2200px] max-w-none mix-blend-screen"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 sm:px-16 xl:px-20 2xl:px-72 py-24 lg:py-0">
        {/* Text */}
        <div className="text-white max-w-2xl">
          <h2 className="text-[44px] sm:text-[52px] md:text-[60px] leading-tight font-light mb-6">
            Uw Luxe <br />
            Horloge Plug
          </h2>
          <p className="text-sm sm:text-base font-extralight leading-relaxed mb-8">
            Luxueus, stijlvol en tijdloos. Dát omschrijft de essentie van onze
            collectie aan premium horloges het best. Als erkend
            horlogeleverancier streven wij naar een ongeëvenaarde klantenservice
            en expertise om u meer te kunnen vertellen over de kenmerken,
            geschiedenis en unieke eigenschappen van ieder horloge in onze
            collectie. Van Rolex tot Audemars Piguet en van Patek Philippe tot
            Richard Mille.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/collectie">
              <button className="relative px-8 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                  Neem contact op
                </span>
                <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
              </button>
            </Link>
            <Link href="/collectie">
              <button className="relative px-8 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                  Bekijk onze collectie
                </span>
                <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
              </button>
            </Link>
          </div>
        </div>

        {/* Watch image */}
        <div className="hidden lg:flex justify-end">
          <Image
            src="/images/wq.png.webp" // update dit pad indien nodig
            alt="Rolex Zwarte Submariner"
            width={1000}
            height={1000}
            className="w-full p-10 max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
}
