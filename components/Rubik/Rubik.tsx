import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import NavbarNewFour from "../Navbar/NavbarNewFour";
import { FlipWordsTwo } from "../FlipWords/FlipWordsTwo";
import Link from "next/link";
import G2BadgeSection from "../G2BadgeSection/G2BadgeSection";

// Dynamically load Spline component client-side only
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function RubikOne() {
  return (
    <div className="relative h-[100vh] bg-black text-white overflow-hidden">
      {/* Navbar */}
      <NavbarNewFour />

      {/* Background Images (z-0) */}
      <Image
        src="/images/bg-hero-1.webp"
        alt="Floor background"
        fill
        className="pointer-events-none absolute top-0 left-0 right-0 mx-auto hidden h-screen w-full select-none md:block opacity-80 transition-opacity duration-500 z-0"
        style={{
          maskImage: "linear-gradient(to top, transparent 15%, black 25%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 15%, black 25%)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
        }}
      />
      <Image
        src="/images/bg-light.webp"
        alt="Light ray background"
        fill
        className="pointer-events-none absolute -top-20 left-0 right-0 mx-auto hidden h-screen w-full select-none md:block transition-all duration-500 z-0"
        style={{
          maskImage: "linear-gradient(to top, transparent 15%, black 25%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 15%, black 25%)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
        }}
      />

      {/* Smoke Layer (z-10) */}
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

      {/* Content (z-20) */}
      <div className="relative z-20 h-[100vh] lg:pt-3">
        <section className="mx-auto px-6 pb-8 h-[100vh] md:max-w-[1375px]">
          <div className="flex h-[100vh] items-center justify-center lg:justify-between text-center lg:flex-row md:pb-12">
            {/* Text Section */}
            <div className="text-center lg:text-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-16">
              <div className="uppercase tracking-wide text-4xl md:text-5xl lg:text-7xl font-semibold text-white">
                <FlipWordsTwo />
              </div>
              <p className="text-sm lg:text-[16px] md:leading-[1.5] text-white font-normal mb-8 mt-5 max-w-[32rem] text-center leading-7 md:text-left hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Reactly helpt bedrijven groeien met strategie, branding en
                digitale innovatie. Van converterend webdesign tot marketing die
                schaalbaar, slim en creatief is.
              </p>
              <div className="mt-6 flex flex-row gap-4 text-sm items-center md:items-start justify-center md:justify-start">
                <Link href={"/diensten"}>
                  <button className="relative border-t border-b dark:border-[#c2b293] border-[#c2b293] px-6 py-2 text-white overflow-hidden group transform-gpu">
                    <span className="relative z-10 text-xs sm:text-sm uppercase group-hover:tracking-wide group-hover:font-medium group-hover:text-white transition-all duration-500 ease-in-out">
                      Ontdek de mogelijkheden
                    </span>
                    <span className="absolute inset-0 bg-[#c2b293] dark:bg-[#c2b293] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 transform-gpu will-change-transform"></span>
                  </button>
                </Link>
                <Link href={"/contact"}>
                  <button className="relative border-t border-b border-white px-4 py-2 text-white overflow-hidden group transform-gpu">
                    <span className="relative z-10 text-xs sm:text-sm uppercase group-hover:tracking-wide group-hover:font-medium group-hover:text-black transition-all duration-500 ease-in-out">
                      Neem contact op
                    </span>
                    <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 transform-gpu will-change-transform"></span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Spline (3D Cube) */}
            <div className="lg:flex hidden relative hover:cursor-pointer lg:scale-105 xl:scale-110 order-1 md:order-2 w-full max-w-[700px] h-[550px] ml-0 md:ml-10 items-center justify-center animate-[open-scale-up-fade_1.5s_ease-in-out]">
              <Spline scene="/spline/cube.splinecode" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
