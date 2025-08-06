"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { InfiniteMovingCardsFour } from "../InfinitiveMovingCards/InfinitiveMovingCardsFour";

const leaseOptions = [
  {
    id: "financial-lease",
    title: "Financial Lease",
    subtitle: "Zakelijk investeren",
    description:
      "Financial lease is dé oplossing voor ondernemers die slim willen investeren in een bedrijfsauto zonder hun werkkapitaal aan te spreken. Bij BeterLease.nl geniet je van flexibele leaseopties die zijn afgestemd op jouw zakelijke behoeften.",
    points: [
      "Direct eigenaar van de bedrijfsauto",
      "BTW van de auto direct terugvorderen",
      "Vaste, voorspelbare leasebedragen",
      "Fiscale voordelen, zoals investeringsaftrek",
    ],
  },
];

const LeaseOptionsGridTwo: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 my-10  mt-16 md:pt-10 md:pb-8 space-y-20">
      {leaseOptions.map((option, index) => (
        <div
          id={option.id}
          key={option.title}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } relative bg-[#f0f0f0] backdrop-blur-sm overflow-hidden shadow`}
        >
          {/* LEFT: Carousel */}
          <div className="md:w-1/2 flex items-stretch h-[300px] md:h-auto">
            <InfiniteMovingCardsFour />
          </div>

          {/* RIGHT: Text */}
          <div className="md:w-1/2 dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] flex flex-col justify-center px-8 py-10 md:py-16 z-20 relative">
            <div className="absolute inset-0 bottom-0 z-0 pointer-events-none">
              <Image
                src="/svg/bg-accent-two.svg"
                alt="bg-accent"
                width={1000}
                height={1000}
                className="w-full h-full opacity-10"
              />
            </div>
            <h4 className="uppercase text-sm dark:text-[#c2b293] text-[#c2b293] tracking-wide mb-3">
              Dé Lease Specialist van Nederland
            </h4>
            <h2 className="text-4xl pt-1 md:text-5xl font-medium mb-6 leading-tight">
              Nieuwste{" "}
              <span className="text-black dark:text-white">ocassions</span>
            </h2>
            <p className="leading-relaxed dark:text-white/50 text-[15px] text-black">
              Lease uw zakelijke financial lease auto bij BeterLease.nl Met onze
              jaren ervaring als financial lease expert zijn wij dé leasepartner
              voor ondernemers en maken wij zakelijk leasen betaalbaar en
              eenvoudig. Kies uit <span>financial lease</span>
              ,&nbsp;
              <span>operational lease</span>,&nbsp;<span>equipment lease</span>{" "}
              of <span>private lease</span>. Onze leaseadviseurs helpen u graag
              bij het vinden van de beste leasevorm en leaseauto die past bij uw
              wensen en ambities.
            </p>

            {/* Knop alleen zichtbaar in light mode */}
            <div className="dark:hidden pt-8">
              <Link href={"/offerte"}>
                <button className="flex justify-start px-12 bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] hover:tracking-wider backdrop-blur-sm text-white py-2 rounded-3xl text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out">
                  Bereken je leasebedrag
                </button>
              </Link>
            </div>

            {/* Knop alleen zichtbaar in dark mode */}
            <div className="hidden dark:flex mb-5 md:mb-2 justify-startt items-start">
              <Link href={"/offerte"}>
                <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 outline-white outline mt-8 w-fit px-12 hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-white rounded-full overflow-hidden group">
                  <span className="relative z-10 text-black group-hover:text-black font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                    Bereken je leasebedrag
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default LeaseOptionsGridTwo;
