"use client";

import Link from "next/link";
import React from "react";

const ZakelijkLeasenInfo: React.FC = () => {
  return (
    <section className="hidden md:block bg-gradient-to-b from-[#171719] to-[#171719] text-white pt-12 pb-16 md:pb-8 xl:pb-40">
      <div className="max-w-[1500px] mx-auto px-6">
        {/* Eerste Sectie */}
        <div className="mb-16">
          <h2 className="text-4xl xl:text-5xl font-medium text-start mb-10 xl:mb-14 ">
            Wat is zakelijk <span className="text-[#f00]">leasen?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-14 leading-relaxed text-start">
            Zakelijk leasen betekent het huren of financieren van een auto voor
            een vooraf bepaalde periode, afhankelijk van de gekozen leasevorm.
            Bij operational lease blijft de auto eigendom van de
            leasemaatschappij, terwijl u bij financial lease direct eigenaar
            wordt van het voertuig. Zo geniet u van het rijden in een
            representatieve auto zonder onverwachte kosten of een grote
            investering vooraf. Samen met u stellen we de ideale contractperiode
            en het maandelijkse leasebedrag vast. <br />
            <br />
            <span className="">
              De voordelen van zakelijk leasen op een rij:
            </span>
          </p>
          <ul className="mt-6 space-y-6 pb-4 text-start items-center justify-start grid">
            <li className="flex items-center justify-start text-start space-x-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              <span className="text-green-500">✓</span>
              <span className="text-white">
                Rijden voor een vast bedrag per maand
              </span>
            </li>
            <li className="flex items-center justify-start text-start space-x-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              <span className="text-green-500">✓</span>
              <span className="text-white">
                Wegenbelasting, pechhulp en autoverzekering zijn inbegrepen
              </span>
            </li>
            <li className="flex items-center justify-start text-start space-x-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              <span className="text-green-500">✓</span>
              <span className="text-white">
                Geen onverwachte kosten voor reparatie en onderhoud
              </span>
            </li>
            <li className="flex items-center justify-start text-start space-x-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              <span className="text-green-500">✓</span>
              <span className="text-white">Geen grote investering vooraf</span>
            </li>
            <li className="flex items-center justify-start text-start space-x-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              <span className="text-green-500">✓</span>
              <span className="text-white">
                Altijd rijden in een nieuwe of jong gebruikte auto
              </span>
            </li>
          </ul>
        </div>

        {/* Tweede Sectie */}
        {/* <div>
          <h2 className="text-4xl xl:text-5xl pb-4 justify-center items-center font-medium text-start mb-12">
            Welke zakelijke leasevorm{" "}
            <span className="text-[#f00]">past bij u?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center font-medium text-start">
            <div className="bg-gradient-to-b from-black/50 via-black/25 to-black/5 pb-8 p-6 rounded-3xl shadow-md flex flex-col">
              <h3 className="text-3xl font-semibold text-white mb-4">
                Financial Lease
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Zoekt u naar gemak en zekerheid? Met financial lease bent u
                direct eigenaar.
              </p>
              <ul className="text-gray-400 text-sm mb-6 space-y-2">
                <li>+ Vast bedrag per maand</li>
                <li>+ Geen onverwachte kosten</li>
                <li>+ Overzichtelijke administratie</li>
              </ul>
              <Link href={"/contact#contactgegevens"}>
                <button className="mt-auto px-6 py-3 bg-transparent outline outline-1 outline-[#f00] hover:bg-[#f00] hover:shadow-inner hover:shadow-[#f00] hover:outline-none custom-shadow-small rounded-3xl text-white text-sm">
                  Meer over financial lease
                </button>
              </Link>
            </div>

            <div className="bg-gradient-to-b from-black/50 via-black/25 to-black/5 pb-8 p-6 rounded-3xl shadow-md flex flex-col">
              <h3 className="text-3xl font-semibold text-white mb-4">
                Operational Lease
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Wilt u een auto die direct beschikbaar is? Kies dan voor een
                tweedehands auto.
              </p>
              <ul className="text-gray-400 text-sm mb-6 space-y-2">
                <li>+ Zo goed als nieuwe autos</li>
                <li>+ Korte looptijd contract mogelijk</li>
                <li>+ Extra scherp tarief</li>
              </ul>
              <Link href={"/contact#contactgegevens"}>
                <button className="mt-auto px-6 py-3 bg-transparent outline outline-1 outline-[#f00] hover:bg-[#f00] hover:shadow-inner hover:shadow-[#f00] hover:outline-none custom-shadow-small rounded-3xl text-white text-sm">
                  Meer over operational lease
                </button>
              </Link>
            </div>

            <div className="bg-gradient-to-b from-black/50 via-black/25 to-black/5 pb-8 p-6 rounded-3xl shadow-md flex flex-col">
              <h3 className="text-3xl font-semibold text-white mb-4">
                Equipment Lease
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Duurzaam en betaalbaar rijden? Maak dan de overstap naar
                elektrisch rijden.
              </p>
              <ul className="text-gray-400 text-sm mb-6 space-y-2">
                <li>+ Voordelen van electrisch rijden</li>
                <li>+ Geen onverwachte kosten</li>
                <li>+ Gunstige bijtelling</li>
              </ul>
              <Link href={"/contact#contactgegevens"}>
                <button className="mt-auto px-6 py-3 bg-transparent outline outline-1 outline-[#f00] hover:bg-[#f00] hover:shadow-inner hover:shadow-[#f00] hover:outline-none custom-shadow-small rounded-3xl text-white text-sm">
                  Meer over equipment lease
                </button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ZakelijkLeasenInfo;
