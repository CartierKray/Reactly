"use client";

import React, { useState } from "react";
import Waarom from "../Waarom/Waarom";
import { FaPhone } from "react-icons/fa";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { Locate, LocateFixedIcon, LocateIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Correct definiëren van de HoverState type
type HoverState = {
  phone: boolean;
  whatsapp: boolean;
  telegram: boolean;
};

function DirectAdvies() {
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
      <div className="mt-10 p-8 mb-20 ">
        <div className="lg:flex justify-between">
          <div className="w-full ">
            <div className="flex">
              <Image
                src="/svg/BeterLeaseSVGBlack.svg"
                alt=""
                width={1000}
                height={1000}
                className="w-auto h-full object-cover "
              />
            </div>
            {/* <div className="flex gap-2">
              <p className="font-bold text-4xl">DIRECT</p>
              <p className="font-bold text-4xl">ADVIES?</p>
            </div> */}
            <div className="flex mb-2">
              <div className="w-4 h-4 mt-[24px] mr-2.5 rounded-full bg-[#00DA46]" />
              <p className="pt-5 pb-6 text-base">We zijn nu geopend!</p>
            </div>
            <div className="grid space-y-4">
              {/* Telefoon button */}
              <Link href="tel:+31 (0)6 161 225 91">
                <button
                  onMouseEnter={() => toggleHover("phone")}
                  onMouseLeave={() => toggleHover("phone")}
                  className="bg-transparent max-w-md md:max-w-lg text-[#1E2F2C] outline hover:shadow-inner hover:shadow-green-400 hover:outline-none outline-[1.5px] outline-[#1E2F2C] p-1 hover:bg-green-600/85 hover:text-white font-semibold rounded-full w-full"
                >
                  <div className="flex justify-between pl-3 pr-3">
                    <div className="pl-2 pt-0.5">
                      <p className="text-sm">Bel direct: +31 (0)6 161 225 91</p>
                      <p
                        className={`text-[13px] -ml-24 ${
                          hoverState.phone ? "text-white" : "text-black"
                        } font-light`}
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
                  className="bg-transparent max-w-md md:max-w-lg text-[#1E2F2C] outline hover:shadow-inner hover:shadow-green-400 hover:outline-none outline-[1.5px] outline-[#1E2F2C] p-1 hover:bg-green-600/85 hover:text-white font-semibold rounded-full w-full"
                >
                  <div className="flex justify-between pl-3 pr-3">
                    <div className="pl-2 pt-0.5">
                      <p className="text-sm -ml-8">Stuur een Whatsapp</p>
                      <p
                        className={`text-[13px]  ${
                          hoverState.whatsapp ? "text-white" : "text-black"
                        } font-light`}
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
                  className="bg-transparent max-w-md md:max-w-lg text-[#1E2F2C] outline hover:shadow-inner hover:shadow-green-400 hover:outline-none outline-[1.5px] outline-[#1E2F2C] p-1 hover:bg-green-600/85 hover:text-white font-semibold rounded-full w-full"
                >
                  <div className="flex justify-between pl-3 pr-3">
                    <div className=" pt-0.5">
                      <p className="text-sm -ml-[42px]">Stuur een bericht</p>
                      <p
                        className={`text-[13px] ml-2 ${
                          hoverState.telegram ? "text-white" : "text-black"
                        } font-light`}
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
                  <div className="pl-2 grid justify-start text-start items-start pt-0.5">
                    <p className="text-sm text-black">Nijenburg 98</p>
                    <p className="text-[13px] text-black font-light">
                      1081 GG Amsterdam
                    </p>
                  </div>
                  <div className="pt-3 pr-3">
                    <MapPin className="text-[#1E2F2C] hover:text-green-500" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DirectAdvies;
