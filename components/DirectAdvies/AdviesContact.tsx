"use client";

import React, { useState } from "react";
import Waarom from "../Waarom/Waarom";
import { FaPhone } from "react-icons/fa";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { Locate } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Correct definiëren van de HoverState type
type HoverState = {
  phone: boolean;
  whatsapp: boolean;
  telegram: boolean;
};

function AdviesContact() {
  // Aparte hover states voor elke button
  const [hoverState, setHoverState] = useState({
    phone: false,
    whatsapp: false,
    telegram: false,
  });
  const toggleHover = (buttonKey: keyof HoverState) => {
    setHoverState((prev) => ({ ...prev, [buttonKey]: !prev[buttonKey] }));
  };

  return (
    <>
      <div className="mt-10 lg:mt-0 w-full">
        <div className="lg:flex w-full p-6 lg:p-10 lg:pl-10 lg:pr-10 xl:pl-32 lg:gap-10 xl:gap-0 xl:pr-32 justify-between">
          <div className="w-full mt-3 md:p-5 lg:p-0">
            <div className="flex gap-2">
              <p className="font-bold text-4xl">DIRECT</p>
              <p className="font-bold text-4xl">ADVIES?</p>
            </div>
            <div className="flex">
              <Image
                src="/images/dot.green.png"
                alt=""
                width={1000}
                height={1000}
                className="w-4 mt-[24px] h-4 mr-2.5 object-cover"
              />
              <p className="pt-5 pb-6 text-lg">We zijn nu geopend!</p>
            </div>
            <div className="grid space-y-4">
              {/* Telefoon button */}
              <Link href="tel:+31 (0)6 161 225 91">
                <button
                  onMouseEnter={() => toggleHover("phone")}
                  onMouseLeave={() => toggleHover("phone")}
                  className="bg-transparent max-w-md md:max-w-lg text-green-500 outline hover:shadow-inner hover:shadow-green-400 hover:outline-none outline-[1.5px] outline-green-500 p-1 hover:bg-green-600/85 hover:text-white font-semibold rounded-full w-full"
                >
                  <div className="flex justify-between pl-3 pr-3">
                    <div className="pl-2 pt-0.5">
                      <p className="text-sm">Bel direct: +31 (0)6 161 225 91</p>
                      <p
                        className={`text-[13px] -ml-20 ${hoverState.phone ? "text-white" : "text-black"} font-light`}
                      >
                        Direct antwoord
                      </p>
                    </div>
                    <div className="pt-3 pr-3">
                      <FaPhone />
                    </div>
                  </div>
                </button>
              </Link>

              {/* WhatsApp button */}
              <Link
                target="_blank"
                href="https://wa.me/31616122591?text=Hallo, ik zou graag wat informatie willen krijgen."
              >
                <button
                  onMouseEnter={() => toggleHover("whatsapp")}
                  onMouseLeave={() => toggleHover("whatsapp")}
                  className="bg-transparent max-w-md md:max-w-lg text-green-500 outline hover:shadow-inner hover:shadow-green-400 hover:outline-none outline-[1.5px] outline-green-500 p-1 hover:bg-green-600/85 hover:text-white font-semibold rounded-full w-full"
                >
                  <div className="flex justify-between pl-3 pr-3">
                    <div className="pl-2 pt-0.5">
                      <p className="text-sm -ml-8">Stuur een Whatsapp</p>
                      <p
                        className={`text-[13px]  ${hoverState.whatsapp ? "text-white" : "text-black"} font-light`}
                      >
                        Binnen 5 minuten antwoord
                      </p>
                    </div>
                    <div className="pt-3 pr-3">
                      <BsWhatsapp />
                    </div>
                  </div>
                </button>
              </Link>

              {/* Telegram button */}
              <Link href="mailto:info@energiesticker.nl">
                <button
                  onMouseEnter={() => toggleHover("telegram")}
                  onMouseLeave={() => toggleHover("telegram")}
                  className="bg-transparent max-w-md md:max-w-lg text-green-500 outline hover:shadow-inner hover:shadow-green-400 hover:outline-none outline-[1.5px] outline-green-500 p-1 hover:bg-green-600/85 hover:text-white font-semibold rounded-full w-full"
                >
                  <div className="flex justify-between pl-3 pr-3">
                    <div className=" pt-0.5">
                      <p className="text-sm -ml-12">Stuur een bericht</p>
                      <p
                        className={`text-[13px] ml-2 ${hoverState.telegram ? "text-white" : "text-black"} font-light`}
                      >
                        Altijd binnen 1 uur antwoord
                      </p>
                    </div>
                    <div className="pt-3 pr-3">
                      <BsTelegram />
                    </div>
                  </div>
                </button>
              </Link>

              {/* Locatie button - Deze heeft geen hover effect voor tekst */}
              <button
                className="bg-transparent max-w-md md:max-w-lg text-green-500 p-1 font-semibold rounded
                full w-full"
              >
                <div className="flex justify-between pl-3 pr-3">
                  <div className="pl-2 pt-0.5">
                    <p className="text-sm text-black">Kwikstaartlaan 42</p>
                    <p className="text-[13px] text-black font-light">
                      3704GS Zeist
                    </p>
                  </div>
                  <div className="pt-3 pr-3">
                    <Locate className="text-green-500" />
                  </div>
                </div>
              </button>
            </div>
            <div>
              <Image
                src="/images/Energiesticker_10_final_19032024.png"
                alt=""
                width={1000}
                height={1000}
                className="mt-10 hidden lg:block xl:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdviesContact;
