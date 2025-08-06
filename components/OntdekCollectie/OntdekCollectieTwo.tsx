"use client";

import Image from "next/image";
import Link from "next/link";

export default function OntdekCollectieTwo() {
  return (
    <section className="bg-gradient-to-b from-[#fff] to-[#fff] pt-14 md:pt-0 pb-14 md:pb-32">
      <div className="max-w-[1230px] mx-auto lg:gap-2 flex flex-col md:flex-row overflow-hidden">
        {/* Tekstblok eerst op mobiel */}
        <div className="order-1 md:order-2 bg-[#ebebeb] w-full md:w-2/3 text-black flex flex-col justify-center p-6 md:p-10">
          <h4 className="uppercase text-sm  text-[#c2b293] tracking-wide mb-3">
            Dé Lease Specialist van Nederland
          </h4>
          <h2 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
            Ontdek de <span className="text-black">mogelijkheden</span>
          </h2>
          <p className="leading-relaxed text-[15px] text-black">
            BeterLease.nl is al sinds 2004 dé Lease Specialist van Nederland.
            Wat ons onderscheidt, is de kwaliteit van ons aanbod. We zoeken
            alleen naar uitzonderlijke exemplaren die iets speciaals hebben.
            Auto’s met een sterke voorkeur voor hoge specificaties, lage
            kilometerstanden die gewoonweg ‘sexy’ te noemen zijn. Wij besteden
            veel tijd en moeite om de markt bij te houden en ervoor te zorgen
            dat de prijs van onze auto’s reëel is op basis van de specificatie,
            kilometerstand en staat.
          </p>

          <Link href="/offerte">
            <div className="mb-10 md:mb-4 flex">
              <button className="mt-10 w-[75%] px-6 hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out mb-2 py-2.5 bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] rounded-3xl text-white text-sm backdrop-blur-sm whitespace-nowrap">
                Bereken je leasebedrag!
              </button>
            </div>
          </Link>
        </div>

        {/* Afbeelding onder op mobiel */}
        <div className="order-2 md:order-1 relative w-full md:w-1/3 min-h-[400px] overflow-hidden md:mt-0">
          <Image
            src="/images/Q8_e_tron_1920x1920_2.avif"
            alt="Audi collectie"
            fill
            className="object-cover md:p-0 hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}
