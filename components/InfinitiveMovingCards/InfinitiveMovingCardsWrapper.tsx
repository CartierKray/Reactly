// InfiniteMovingCardsWrapper.tsx
"use client";

import Image from "next/image";
import { useEffect } from "react";
import { InfiniteMovingCardsThreeDemo } from "./InfinitiveMovingCardsThree";
import { InfiniteMovingCardsFour } from "./InfinitiveMovingCardsFour";
import { Link } from "lucide-react";
import TextBetweenFive from "../TextBetween/TextBetweenFive";
import TextBetweenSeven from "../TextBetween/TextBetweenSeven";

export default function InfiniteMovingCardsWrapper() {
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
    <section className="relative bg-black w-full overflow-hidden">
      {/* Smoke Layers */}
      {/* <div className="absolute inset-0 z-10 pointer-events-none">
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
      </div> */}

      {/* Carousel Content */}
      <div className="relative z-20 px-5 xl:px-8 2xl:px-28">
        {/* <TextBetweenSeven /> */}
        <div className="pt-20">
          <section className="max-w-5xl mx-auto px-4 pb-16 md:pt-12 text-center">
            <div className="flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
              <div className="flex-grow border-t border-white/50" />
              <h1 className="text-5xl sm:text-6xl 2xl:text-7xl text-white font-light whitespace-nowrap">
                Ons Aanbod
              </h1>
              <div className="flex-grow border-t border-white" />
            </div>
            {/* <p className="text-white text-[10px] leading-relaxed max-w-3xl mx-auto italic font-serif">
              <span className="font-extralight">Belangrijk:</span> Wij
              verwelkomen u graag op ons bezoekadres. Omdat onze horloges niet
              op locatie aanwezig zijn, vragen wij u vriendelijk om vooraf een
              afspraak te maken. Bij aankopen accepteren wij contante betalingen
              tot een maximum van €2000,-. We vragen u om de betaling
              persoonlijk te doen en dit te bevestigen met een geldig
              legitimatiebewijs.
            </p> */}
            <div className="pt-10 flex justify-center items-center text-sm font-medium group-hover:text-white">
              <div className="flex items-center cursor-pointer text-[10px] gap-1">
                <span className="font-semibold hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  <Image
                    src="/svg/stars-trustpilot.svg"
                    alt="Google"
                    width={10}
                    height={10}
                    className="w-full h-3"
                  />
                </span>
                <span className="text-white hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  218 reviews op
                </span>
                <Image
                  src={"/svg/trustpilota.svg"}
                  alt="Google"
                  width={10}
                  height={10}
                  className="w-auto h-4"
                />
              </div>
            </div>
          </section>
        </div>
        <div className="xl:scale-90 pb-10 md:pb-20">
          <InfiniteMovingCardsFour />
        </div>
      </div>
    </section>
  );
}
