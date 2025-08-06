import Link from "next/link";
import React from "react";
import { SheetTwo } from "../Sheet/SheetTwo";

const VideoBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[90vh] object-cover"
      >
        <source src="/video/New-Video-NORTVI-summer.mp4" type="video/mp4" />
        Jouw browser ondersteunt geen video tag.
      </video>

      {/* Overlay met donkere tint */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>

      <div className="absolute top-0 w-full left-0 right-0 bottom-0 flex flex-col justify-center items-center p-10 text-start">
        <div className="w-full xl:pl-10 xl:pr-10 flex justify-center">
          <div className="grid text-center w-full justify-center">
            {/* <div className="relative mb-5">
              <SheetTwo />
            </div> */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-semibold custom-shadow leading-16">
              Capital Code X
            </h1>
            <div className="max-w-2xl text-lg pt-5 custom-shadow relative text-white">
              Capital Code X is een creative agency dat vanuit het mooie
              Amsterdam klanten in heel Nederland en daarbuiten voorziet op het
              gebied van{" "}
              <a className="font-semibold">
                strategie, creatie, productie en marketing.{" "}
              </a>
            </div>
            <Link href="/contact#contactgegevens">
              <div className="mt-2 mb-5 md:mb-2 p-2 flex justify-start w-full mx-auto">
                <button className="relative font-light text-[14px] outline-1 outline-white outline mt-8 w-[80%] md:w-1/2 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-3 pb-3 bg-transparent rounded-full overflow-hidden group">
                  <span className="relative z-10 text-white group-hover:text-black hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                    Neem vandaag nog contact op
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
              </div>
            </Link>
          </div>
          {/* <div className="grid gap-10 justify-center items-center">
            <div>
              <Image
                src="/images/Trustpilot-OCHOME.png"
                alt=""
                width={1000}
                height={1000}
                className="h-fit w-28 object-cover cursor-pointer"
              />
            </div>
            <div className="flex justify-end">
              <Image
                src="/images/award-winner-2022-2023.png"
                alt=""
                width={1000}
                height={1000}
                className="h-fit w-20 object-cover cursor-pointer"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
