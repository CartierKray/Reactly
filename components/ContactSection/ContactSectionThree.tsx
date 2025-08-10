"use client";

import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function ContactSectionThree() {
  return (
    <div className="w-full rounded-3xl bg-white dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] bg-transparent backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid-cols-1 gap-6 shadow-sm">
        <div className="col-span-1 border-[1px] dark:border-none p-6">
          <div className="text-sm space-y-6 pb-10 text-gray-800">
            {/* Logo */}
            <div className="">
              <div className="">
                {/* Light mode logo */}
                <Image
                  src="/svg/BeterLeaseSVGBlack.svg"
                  alt="BeterLease Logo Light"
                  width={200}
                  height={200}
                  className="block dark:hidden h-14 lg:h-16 w-auto"
                />

                {/* Dark mode logo */}
                <Image
                  src="/svg/BeterLeaseSVG.svg"
                  alt="BeterLease Logo Dark"
                  width={200}
                  height={200}
                  className="hidden dark:block h-14 lg:h-16 w-auto"
                />
              </div>
            </div>

            {/* Bedrijfsgegevens */}
            <h2 className="font-semibold tracking-wider text-[#c2b293] dark:text-red-600 mb-4 pt-2 text-sm">
              BEDRIJFSGEGEVENS
            </h2>
            <div className="space-y-1 dark:text-white  leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="w-20">Straat</span>
                <span className="text-[13.5px] font-normal text-black dark:text-white hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  Nijenburg 98
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-20">Postcode</span>
                <span className="text-[13.5px] font-normal text-black dark:text-white  hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  1081GG Amsterdam
                </span>
              </div>
              {/* <div className="flex items-start gap-2">
                <span className="w-20">KvK</span>
                <span className="text-[13.5px] font-normal text-black hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  91349349
                </span>
              </div> */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-20">Telefoon</span>
                  <Link href="tel:+310102952" className="xl-nav-link-amberr">
                    <span className="text-black dark:text-white  hover:tracking-wider  hover:font-semibold transition-all duration-300 ease-in-out text-[13.5px] font-normal whitespace-nowrap">
                      +31 6 10 10 29 52
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-20 dark:text-white  text-[13.5px]">
                  E-mail
                </span>
                <Link
                  href="mailto:info@beterlease.nl"
                  className="xl-nav-link-amberr"
                >
                  <span className="text-[13.5px] dark:text-white  font-normal hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                    info@reactly.nl
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Openingstijden */}
          <h2 className="font-semibold tracking-wider dark:text-red-600 text-[#c2b293] mb-4 pt-2 text-sm">
            OPENINGSTIJDEN
          </h2>
          <div className="space-y-2 dark:text-white  text-sm">
            {[
              "Maandag",
              "Dinsdag",
              "Woensdag",
              "Donderdag",
              "Vrijdag",
              "Zaterdag",
              "Zondag",
            ].map((day) => (
              <div
                key={day}
                className="flex justify-between items-center border-b dark:border-b dark:border-white/25 pb-1 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center gap-2 ">
                  <FiClock className="text-xs" />
                  <span>{day}:</span>
                </div>
                <span>
                  {day === "Zaterdag"
                    ? "08:00 - 16:00"
                    : day === "Zondag"
                    ? "Gesloten"
                    : "08:00 - 19:00"}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[12px] dark:text-white/50  pt-6 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
            Wij zijn dagelijks geopend! Plan vooraf een afspraak om zeker te
            zijn van toegang en onnodig wachten te voorkomen.
          </p>

          <div className="pl-2 mt-8 pb-5">
            <h3 className="font-semibold dark:dark:text-red-600  text-black text-lg mb-4 tracking-wider">
              Follow us
            </h3>
            <div className="flex space-x-6 pt-4">
              <a
                href="#"
                className="text-black dark:text-white  hover:text-[#2eb2ff] relative"
              >
                <FiTwitter className="w-5 h-5 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out" />
              </a>
              <a
                href="#"
                className="text-black dark:text-white  hover:text-[#323cf9] relative"
              >
                <FiFacebook className="w-5 h-5 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out" />
              </a>
              <a
                href="https://www.instagram.com/beterlease/"
                className="text-black dark:text-white  hover:text-[#ea2eff] relative"
              >
                <FiInstagram className="w-5 h-5 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out" />
              </a>
              <a
                href="#"
                className="text-black dark:text-white  hover:text-[#ff2e2e] relative"
              >
                <FiYoutube className="w-5 h-5 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
