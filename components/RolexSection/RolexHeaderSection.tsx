"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function RolexHeaderSection() {
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
    <section className="relative bg-[#1E2F2C] w-full overflow-hidden py-24 px-6 sm:px-12 text-white text-center">
      {/* Smoke Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/images/smoke1.png"
          alt="smoke1"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_8s_linear_infinite] left-[-50%] top-[-40%] w-[2200px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_12s_linear_infinite] left-[10%] top-[-60%] w-[2200px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_18s_linear_infinite] right-[-30%] top-[-25%] w-[2200px] max-w-none mix-blend-screen"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-start md:text-center max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-light mb-6">Rolex Daytona</h2>
        <p className="text-base sm:text-lg font-extralight leading-relaxed mb-8 sm:px-0">
          De Rolex Daytona onderscheidt zich van andere Rolex modellen door zijn
          sportieve uitstraling, geavanceerde chronograaffuncties en nauwe
          banden met de wereld van de autosport. De Daytona heeft een herkenbaar
          ontwerp met de tachymeter schaal op de lunette en de bekende Oyster
          kast.
        </p>

        <Link href="/contact">
          <button className="relative px-10 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
            <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
              Contact
            </span>
            <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
          </button>
        </Link>
      </div>
    </section>
  );
}
