"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
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

export default function BannerFive() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#1f465b]">
      <div className=" h-10 max-w-7xl px-4 mx-auto md:px-10 flex items-center justify-center group text-white hover:text-white transition-colors duration-500">
        <div className="w-full flex items-center justify-between">
          {/* Links: TrustPilot rating */}
          <div className="hidden lg:flex justify-between items-center text-sm font-medium group-hover:text-white">
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
              <span className="">218 reviews op</span>
              {/* <div className="flex text-yellow-500">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <AiFillStar key={i} size={14} />
                ))}
              </div> */}
              <Image
                src={"/svg/trustpilota.svg"}
                alt="Google"
                width={10}
                height={10}
                className="w-auto h-4"
              />
            </div>
          </div>

          {/* Midden: draaiende tekst */}
          <div className="lg:hidden relative flex-1 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out flex justify-center items-center h-full">
            {texts.map((item, index) => (
              <div
                key={index}
                className={`absolute px-4 text-[12px] transition-opacity duration-500 ease-in-out ${
                  currentIndex === index ? "opacity-100" : "opacity-0"
                } group-hover:text-white`}
              >
                <div className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Rechts: contactgegevens */}
          <div className="hidden lg:flex items-center gap-4 text-[10px] whitespace-nowrap group-hover:text-white">
            <div className="flex items-center gap-1">
              <FiMail size={14} />
              <Link
                href="mailto:info@beterlease.nl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="xl-nav-link hover:xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
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
                <span className="xl-nav-link hover:xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
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
                <span className="xl-nav-link hover:xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
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
