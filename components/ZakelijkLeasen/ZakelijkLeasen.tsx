"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ZakelijkLeasen: React.FC = () => {
  return (
    <div>
      {/* Content Section */}
      <div className="relative bg-gradient-to-b from-stone-800 to-[#383838] text-white py-10 pt-14 md:pt-28">
        {/* Background Image */}
        <div className="absolute inset-0 bottom-0 z-0 pointer-events-none">
          <Image
            src="/svg/bg-accent-two.svg"
            alt="bg-accent"
            width={1000}
            height={1000}
            className="w-full h-full opacity-10"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 xl:max-w-[1350px] mx-auto grid md:grid-cols-2 gap-12 xl:space-x-20 p-4 lg:p-6">
          {/* Left Content */}
          <div className="pt-4 md:pt-8">
            <div className="text-4xl md:text-5xl xl:text-6xl font-medium pb-1.5 leading-tight">
              <p>
                Zakelijk leasen bij <span className="block md:hidden" /> Alpha
                lease NL
              </p>
            </div>
            <div className="w-fit pt-2 md:pt-6">
              <p className="md:text-[12px] text-amber-500 pb-2 uppercase tracking-wider text-[10px] hover:tracking-wider hover:font-medium transition-all duration-300">
                TOT BEST BEKROOND LEASEBEDRIJF 2023
              </p>
            </div>
            <p className="mt-2 md:mt-3 text-gray-300 leading-loose ">
              Lease uw zakelijke auto bij alpha lease group. Met onze jaren
              ervaring als financial lease expert zijn wij dé leasepartner voor
              ondernemers en maken wij zakelijk leasen betaalbaar en eenvoudig.
              Kies uit{" "}
              <span className="text-amber-500 font-semibold leading-relaxed hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out">
                &nbsp;financial lease
              </span>
              ,{" "}
              <span className="text-amber-500 font-semibold leading-relaxed hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out">
                &nbsp; operational lease
              </span>
              &nbsp;of{" "}
              <span className="text-amber-500 font-semibold leading-relaxed hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out">
                equipment lease
              </span>
              . &nbsp;Onze leaseadviseurs helpen u graag bij het vinden van de
              beste leasevorm en leaseauto die past bij uw wensen.
            </p>
            <Link href={"/aanbod"}>
              <button className="mt-6 md:mt-8 hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out px-6 md:px-8 py-2.5 bg-green-600 hover:bg-green-700 shadow-inner shadow-green-500 hover:shadow-green-600 rounded-3xl text-white text-[15px]">
                Bekijk ons aanbod
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-b md:max-w-[475px] from-black via-black/50 to-black/25 rounded-3xl overflow-hidden">
            <Image
              alt=""
              width={1000}
              height={1000}
              className="rounded-t-3xl"
              src={"/images/Persoonlijk-contactpersoon.webp"}
            />
            <div className="p-8 py-10 mt-2 text-sm md:text-base hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out">
              <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-amber-500">
                Neem vrijblijvend contact op
              </h3>
              <p className="text-gray-400 mt-10 leading-relaxed">
                <span className="text-green-500">✓ &nbsp; </span> Direct
                persoonlijk contact
              </p>
              <p className="text-gray-400 mt-2 leading-relaxed">
                <span className="text-green-500">✓ &nbsp; </span> Vrijblijvend
                advies op maat
              </p>
              <p className="text-gray-400 mt-2 leading-relaxed">
                <span className="text-green-500">✓ &nbsp; </span> Klanten
                beoordelen ons met een{" "}
                <span className="bg-white text-black font-medium p-2 ml-2 tracking-wide text-sm rounded-lg hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  9,8
                </span>
              </p>
              <Link href={"/contact#contactgegevens"}>
                <button className="mt-16 hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out px-6 py-2.5 bg-green-600 hover:bg-green-700 shadow-inner shadow-green-500 hover:shadow-green-600 rounded-3xl text-white text-[15px]">
                  Neem vrijblijvend contact op
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content */}
        </div>
      </div>
    </div>
  );
};

export default ZakelijkLeasen;
