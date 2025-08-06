"use client";

import Image from "next/image";
import Link from "next/link";

export default function OntdekCollectieThree() {
  return (
    <section className="bg-gradient-to- from-[#c2b293] to-[#fff] xl:pb-32">
      <div className="max-w-[1475px] mx-auto xl:gap-2 flex flex-col md:flex-row overflow-hidden">
        {/* Tekstblok eerst op mobiel */}
        <div className="order-2 md:order-2 bg-[#ebebeb] w-full md:w-2/3 text-black flex flex-col justify-center p-6 md:p-10">
          <h4 className="uppercase text-sm  text-[#c2b293] tracking-wide mb-3">
            Dé Lease Specialist van Nederland
          </h4>
          <h2 className="text-5xl font-medium mb-6 leading-tight">
            Ontdek de <span className="text-black">mogelijkheden</span>
          </h2>
          <p className="leading-relaxed text-black text-[15px]">
            BeterLease.nl is al sinds 2004 dé Lease Specialist van Nederland.
            Wat ons onderscheidt, is de kwaliteit van ons aanbod. We zoeken
            alleen naar uitzonderlijke exemplaren die iets speciaals hebben.
            Auto’s met een sterke voorkeur voor hoge specificaties, lage
            kilometerstanden die gewoonweg ‘sexy’ te noemen zijn. Wij besteden
            veel tijd en moeite om de markt bij te houden en ervoor te zorgen
            dat de prijs van onze auto’s reëel is op basis van de specificatie,
            kilometerstand en staat.
          </p>

          <Link href="/aanbod">
            <div className="mb-10 md:mb-4 flex">
              <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 outline-[#c2b293] outline mt-8 w-[75%] md:w-1/2 mx-start hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-[#c2b293] rounded-full overflow-hidden group">
                <span className="relative z-10 text-white group-hover:text-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                  Ontdek de mogelijkheden
                </span>
                <span className="absolute inset-0 rounded-full bg-[#c2b293] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </button>
            </div>
          </Link>
        </div>

        {/* Afbeelding onder op mobiel */}
        <div className="order-1 md:order-1 relative w-full md:w-1/3 min-h-[400px] overflow-hidden">
          <Image
            src="/images/Header.jpg"
            alt="Audi collectie"
            fill
            className="object-cover p-0 md:hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}
