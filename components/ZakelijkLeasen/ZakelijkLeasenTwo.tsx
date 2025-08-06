"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

const ZakelijkLeasenTwo: React.FC = () => {
  return (
    <div>
      {/* Content Section */}
      <div className="relative bg-gradient-to-b from-[#171719] to-[#171719] text-white py-10 ">
        {/* Background Image */}
        {/* <div className="absolute inset-0 bottom-0 z-0 pointer-events-none">
          <Image
            src="/svg/bg-accent-two.svg"
            alt="bg-accent"
            width={1000}
            height={1000}
            className="w-full h-full opacity-10"
          />
        </div> */}

        {/* Main Content */}
        <div className="relative z-10 md:max-w-[900px] mx-auto gap-12 xl:space-x-20 p-4 lg:p-6">
          {/* Left Content */}
          <div className="pt-4 lg:text-center items-center md:pt-8">
            <div className="text-4xl lg:text-[44px] font-medium pb-1.5 leading-tight">
              <p>
                Welkom bij <span className="block md:hidden" /> Alpha Lease
                Group
              </p>
            </div>
            {/* <div className="pt-2 w-full md:pt-6">
              <p className="md:text-[12px] text-[#f00] hover:text-[14px] pb-2 uppercase tracking-wider text-[10px] hover:tracking-wider hover:font-medium transition-all duration-300">
                TOT BEST BEKROOND LEASEBEDRIJF VAN 2024
              </p>
            </div> */}
            <div className="mt-2 md:mt-4 text-gray-300  ">
              Lease uw zakelijke financial lease auto bij Alpha Lease Group. Met
              onze jaren ervaring als financial lease expert zijn wij dé
              leasepartner voor ondernemers en maken wij zakelijk leasen
              betaalbaar en eenvoudig. Kies uit{" "}
              <a
                href="/voor-wie#financial-lease"
                className="text-white hover:underline font-semibold leading-relaxed hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out"
              >
                &nbsp;financial lease
              </a>
              ,{" "}
              <a
                href="/voor-wie#operational-lease"
                className="text-white hover:underline font-semibold leading-relaxed hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out"
              >
                &nbsp; operational lease
              </a>
              &nbsp;of{" "}
              <a
                href="/voor-wie#equipment-lease"
                className="text-white hover:underline font-semibold leading-relaxed hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out"
              >
                equipment lease
              </a>
              . &nbsp;Onze leaseadviseurs helpen u graag bij het vinden van de
              beste leasevorm en leaseauto die past bij uw wensen.
            </div>
            <Link
              className="w-full flex items-center lg:justify-center"
              href="/aanbod"
            >
              <div className="flex w-fit mt-5 justify-center px-16 hover:text-green bg-gradient-to-b from-black/45 via-black/30 to-black/15 hover:from-black/75 hover:via-black/50 hover:to-black/25 outline-white/20 outline-1 outline backdrop-blur-sm text-white py-2.5 rounded-3xl text-sm z-10 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Meer over ons
              </div>
            </Link>
          </div>

          {/* <div className="bg-gradient-to-b backdrop-blur-md md:max-w-[475px] from-black via-black/50 to-black/25 rounded-3xl overflow-hidden">
            <Image
              alt=""
              width={1000}
              height={1000}
              priority
              className="rounded-t-3xl"
              src={"/images/Persoonlijk-contactpersoon.webp"}
            />
            <div className="p-8 py-10 mt-2 text-sm md:text-base hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out">
              <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-[#f00]">
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
              <Link className="" href="/aanbod">
                <div className="flex w-fit mt-10 px-20 hover:text-green bg-gradient-to-b from-black/45 via-black/30 to-black/15 hover:from-black/75 hover:via-black/50 hover:to-black/25 outline-white/40 hover:outline-[#f00] outline-1 outline backdrop-blur-sm text-white py-3 rounded-3xl text-sm z-10 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  Meer informatie{" "}
                </div>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ZakelijkLeasenTwo;
