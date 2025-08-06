"use client";

import Image from "next/image";
import Link from "next/link";

export default function OntdekCollectieFour() {
  return (
    <section className="bg-gradient-to- from-[#f0f0f0] to-[#fff] ">
      <div className="max-w-[1230px] mx-auto lg:gap-2 flex flex-col md:flex-row overflow-hidden">
        {/* Tekstblok eerst op mobiel */}
        <div className="order-2 md:order-1 bg-[#ebebeb] dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] w-full md:w-2/3 text-black flex flex-col justify-center p-6 md:p-10">
          <h4 className="uppercase text-sm dark:text-red-600 text-[#c2b293] tracking-wide mb-3">
            Dé Lease Specialist van Nederland
          </h4>
          <h2 className="text-4xl pt-1 md:text-5xl font-medium dark:text-white mb-6 leading-tight">
            Ontdek de{" "}
            <span className="text-black dark:text-white"> mogelijkheden</span>
          </h2>
          <p className="leading-relaxed dark:text-white/50 text-[15px] text-black">
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

        {/* Afbeelding onder op mobiel */}
        <div className="order-1 md:order-2 relative w-full md:w-1/3 min-h-[400px] overflow-hidden mt-6 md:mt-0">
          <Image
            src="/images/Ontdek-collectie-1-1-scaled.jpg"
            alt="Audi collectie"
            fill
            className="object-cover md:p-0 hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}
