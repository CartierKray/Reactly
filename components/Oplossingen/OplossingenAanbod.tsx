"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InfiniteMovingCardsFour } from "../InfinitiveMovingCards/InfinitiveMovingCardsFour";

interface LeaseCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const leaseCards: LeaseCard[] = [
  {
    title: "Financial lease",
    subtitle: "Zelf in Controle",
    image: "/images/KR_Lease_001-1536x1024.webp",
    href: "/voor-wie#financial-lease",
  },
  {
    title: "Operational lease",
    subtitle: "Flexibele mogelijkheden",
    image: "/images/KR_Lease_007-1536x1018.webp",
    href: "/voor-wie#operational-lease",
  },
  {
    title: "Equipment lease",
    subtitle: "Maximaliseer Uw Zakelijke Impact",
    image: "/images/KR_Lease_003-1536x1024.webp",
    href: "/voor-wie#equipment-lease",
  },
  {
    title: "Short lease",
    subtitle: "Zorgeloos Mobiel",
    image: "/images/KR_Lease_008-1.webp",
    href: "/voor-wie#short-lease",
  },
];

export default function LeaseAanbod() {
  const [active, setActive] = useState(0);

  return (
    <div className="-mb-10 md:m-0 md:pb-20 lg:py-10 ">
      <div className="xl:px-20 2xl:px-400 xl:gap-20 md:gap-14 pt-20 mx-auto flex flex-col lg:flex-row px-6 items-center">
        {/* Tekstblok */}
        <div className="flex-1 lg:-mt-20 lg:max-w-[450px]">
          <div className="text-4xl md:text-5xl font-medium text-black">
            Zakelijk leasen bij{" "}
            <span className="text-black">BeterLease.nl</span>
          </div>
          <p className="text-black tracking-wide text-[15px]">
            Lease uw zakelijke financial lease auto bij BeterLease.nl Met onze
            jaren ervaring als financial lease expert zijn wij dé leasepartner
            voor ondernemers en maken wij zakelijk leasen betaalbaar en
            eenvoudig. Kies uit <span>financial lease</span>
            ,&nbsp;
            <span>operational lease</span>,&nbsp;<span>equipment lease</span> of{" "}
            <span>private lease</span>. Onze leaseadviseurs helpen u graag bij
            het vinden van de beste leasevorm en leaseauto die past bij uw
            wensen en ambities.
          </p>

          <Link href="/voor-wie">
            <div className="mb-10 md:mb-4 flex">
              <button className="mt-8 w-[75%] px-6 hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out mb-2  py-2.5 bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] rounded-3xl text-white text-sm backdrop-blur-sm">
                Ontdek de leasevormen
              </button>
            </div>
          </Link>
        </div>

        {/* Lease Cards */}
        <div className="flex-1 hidden lg:flex w-1/3">
          {/* <div className="hidden md:flex overflow-hidden rounded-xl shadow-lg h-[420px]">
            {leaseCards.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => setActive(index)}
                className={`relative transition-all duration-500 ease-in-out cursor-pointer flex ${
                  active === index
                    ? "flex-[30] md:flex-[38] lg:flex-[30]"
                    : "flex-[6]"
                }`}
              >
                <Link href={card.href} className="absolute inset-0 z-10" />
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out"
                />

                <div
                  className={`absolute inset-0 ${
                    active === index ? "bg-black/20" : "bg-black/60"
                  } transition-all`}
                ></div>

                <div
                  className={`absolute text-white custom-shadow-small whitespace-nowrap break-keep ${
                    active === index
                      ? "bottom-6 left-6 tracking-wide text-left text-2xl md:text-4xl"
                      : " left-[40px] md:left-[58px] lg:left-[50px] xl:left-[60px] 2xl:left-[80px] tracking-wide bottom-6 origin-bottom-left rotate-[-90deg] text-2xl md:text-4xl"
                  } transition-all duration-500 ease-in-out`}
                >
                  <div className="font-semibold">{card.title}</div>
                  {active === index && (
                    <p className="text-sm">{card.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div> */}
          <InfiniteMovingCardsFour />

          {/* Grid weergave op mobiel */}
          {/* <div className="grid-cols-1 gap-6 hidden">
            {leaseCards.map((card, index) => (
              <Link href={card.href} key={index}>
                <div className="relative h-[300px] rounded-xl overflow-hidden group">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute bottom-9 left-4 text-black text-2xl tracking-wide font-semibold">
                    {card.title}
                  </div>
                  <div className="absolute bottom-4 left-4 text-black font-light text-sm">
                    {" "}
                    {card.subtitle}
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
