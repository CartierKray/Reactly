"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarNewFour from "../Navbar/NavbarNewFour";
import BannerFive from "../Banner/BannerFive";
import { InfiniteMovingCardsThreeDemo } from "../InfinitiveMovingCards/InfinitiveMovingCardsThree";
import { InfiniteMovingCardsFour } from "../InfinitiveMovingCards/InfinitiveMovingCardsFour";
import { Meteors } from "../ui/meteors";

export default function Header() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBanner(window.scrollY < 20); // sneller reageren bij swipen
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <section className="w-full">
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out">
        {/* BannerFive met height + opacity animatie */}
        {/* <div
          className={`overflow-hidden hidden lg:flex transition-all duration-300 ease-in-out
            ${
              showBanner
                ? "max-h-10 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }
          `}
        >
          <BannerFive />
        </div> */}

        {/* NavbarNewFour met height + opacity animatie */}
        {/* <div
          className={`transition-transform duration-300 ease-in-out ${
            showBanner ? "translate-y-0" : " -translate-y-0"
          }`}
        >
          <div className="hidden lg:block">
            <BannerFive />
          </div>
          <NavbarNewFour />
        </div> */}
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-[rgb(0,9,20)] w-full overflow-hidden">
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

        <div className="relative z-20 items-center justify-center text-center flex px-6 sm:px-16 md:py-0 h-full">
          <div className="mx-auto max-w-7xl grid grid-cols-1 items-center md:grid-cols-2 gap-10 2xl:gap-20">
            <div className="hidden md:flex justify-start">
              <Image
                src="/images/r4.png.webp"
                alt="Rolex Watch"
                width={1000}
                height={1000}
                className="w-full h-full object-cover overflow-visible min-h-[625px] max-w-[475px]"
              />
            </div>

            <div className="text-white text-center md:text-start max-w-xl">
              <h1 className="text-[50px] whitespace-nowrap lg:text-[60px] 2xl:text-[72px] leading-[1.2] font-light mb-4">
                <span className="text-6xl 2xl:text-7xl">Welkom</span>
                <br />
                Bij <strong className="font-medium">Chrono24</strong>
              </h1>
              <p className="text-base lg:max-w-md font-extralight hover:font-light transform transition-all duration-500 ease-in-out leading-relaxed pb-8">
                Ervaar de tijdloze charme van onze horloges bij Watchrr. We
                kijken ernaar uit om u te verwelkomen en helpen tijdens de
                zoektocht naar het horloge dat u zoekt.
              </p>

              <Link href="/contact">
                <button className="relative px-20 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                  <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                    Bekijk onze collectie
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* <Meteors number={20} /> */}
      </section>

      {/* Footer */}
      <footer className="bg-[#000926] w-full text-white py-6 px-5 text-sm justify-between">
        <div className="w-full justify-center items-center grid grid-cols-3 gap-y-12 gap-x-14 xl:gap-x-32 xl:-ml-1 text-center lg:flex">
          <div className="text-center">
            <Image
              src={"/svg/snel.svg"}
              alt=""
              width={1000}
              height={1000}
              className="w-auto object-cover mx-auto mb-3 h-8"
            />
            <p className="font-base text-[13px] font-medium md:text-base pb-1">
              #1 in prijs en kwaliteit
            </p>
            <p className="hidden md:block text-xs font-extralight hover:font-light transform transition-all duration-500 ease-in-out">
              Bij ons vind je gegarandeerd de beste prijzen
            </p>
          </div>
          <div className="text-center">
            <Image
              src={"/svg/soepel.svg"}
              alt=""
              width={1000}
              height={1000}
              className="w-auto object-cover mx-auto mb-3 h-8"
            />
            <p className="font-base text-[13px] font-medium md:text-base pb-1">
              De service die je nodig hebt
            </p>
            <p className="hidden md:block text-xs font-extralight hover:font-light transform transition-all duration-500 ease-in-out">
              Persoonlijke benadering en morgen al in huis
            </p>
          </div>
          <div className="text-center">
            <Image
              src={"/svg/bestedeal.svg"}
              alt=""
              width={1000}
              height={1000}
              className="w-auto object-cover mx-auto mb-3 h-8"
            />
            <p className="font-base text-[13px] font-medium md:text-base pb-1">
              100% origineel gekeurd
            </p>
            <p className="hidden md:block text-xs font-extralight hover:font-light transform transition-all duration-500 ease-in-out">
              100% originele en echte horloges
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
