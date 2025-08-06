"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FiMail, FiPhone } from "react-icons/fi";

const texts = [
  {
    text: "Ontvang een offerte op maat binnen 24 uur",
  },
  {
    text: "Meer dan 17 jaar gecombineerde expertise!",
  },
  {
    text: "Alle merken en modellen beschikbaar",
  },
  {
    text: "Rijden in jouw droomauto binnen 48 uur!",
  },
];

export default function BannerSeven() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full bg-[#0f1e4f]">
      <div className="h-10 max-w-7xl px-4 mx-auto md:px-10 flex items-center justify-center group text-white transition-colors duration-500">
        <div className="w-full flex items-center justify-between">
          {/* Links: TrustPilot rating */}
          <div className="hidden lg:flex justify-between items-center text-sm font-medium">
            <div className="flex items-center cursor-pointer text-[10px] gap-1">
              <span className="font-semibold">
                <Image
                  src="/svg/stars-trustpilot.svg"
                  alt="Trustpilot Stars"
                  width={10}
                  height={10}
                  className="w-full h-3"
                />
              </span>
              <span>218 reviews op</span>
              <Image
                src={"/svg/trustpilota.svg"}
                alt="Trustpilot"
                width={10}
                height={10}
                className="w-auto h-4"
              />
            </div>
          </div>

          {/* Midden: draaiende tekst met animatie */}
          <div className="lg:hidden relative flex-1 flex justify-center items-center h-full">
            {texts.map((item, index) => {
              let className =
                "absolute px-4 text-[12px] text-white transition-all duration-500 ease-in-out transform";

              if (index === currentIndex) {
                className += " translate-y-0 opacity-100";
              } else if (index === prevIndex) {
                className += " -translate-y-full opacity-0";
              } else {
                className += " translate-y-full opacity-0";
              }

              return (
                <div key={index} className={className}>
                  <div className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rechts: contactgegevens */}
          <div className="hidden lg:flex items-center gap-4 text-[10px] whitespace-nowrap">
            <div className="flex items-center gap-1">
              <FiMail size={14} />
              <Link
                href="mailto:info@beterlease.nl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  Info@beterlease.nl
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <FiPhone size={14} />
              <Link
                href="tel:+31618891346"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  +31 (0)6 18 89 13 46
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <BsWhatsapp size={14} />
              <Link
                href="https://wa.me/+31618891346?text=Hallo%20BeterLease.nl,%20ik%20heb%20een%20vraag%20over%20het%20zakelijk%20financieren%20van%20een%20auto."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  WhatsApp ons
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
