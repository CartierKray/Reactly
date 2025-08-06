import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeaderDienstenTwo() {
  return (
    <>
      <div className="w-full grid -z-0 lg:grid-cols-2">
        <div className="flex justify-center items-center bg-cover overflow-hidden relative">
          <Image
            src="/images/app-development-header-bg.jpg"
            alt="Interieur Design Op Maat"
            width={1000}
            height={1000}
            className="md:h-[90vh] object-cover hover:scale-150"
          />
          <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>

        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-[#e3e0d8] to-transparent pt-28 p-4 lg:pt-0 lg:pb-0 text-center">
          <h1 className="text-5xl md:text-6xl leading-16 max-w-xl uppercase">
            ALLE DIENSTEN
          </h1>
          <div className="mt-10 max-w-lg mb-12">
            Capital Code X is een creative agency dat vanuit het mooie Amsterdam
            klanten in heel Nederland en daarbuiten voorziet op het gebied van{" "}
            <a className="font-semibold">
              strategie, creatie, productie en marketing.{" "}
            </a>
          </div>
          <Link href="/contact#contactgegevens">
            <button className="px-6 py-2 text-black bg-[#F3BD3E] font-medium hover:font-semibold hover:tracking-wider hover:bg-amber-500 hover:shadow-sm transition-all duration-300 ease-in hover:opacity-100">
              CONTACT
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderDienstenTwo;
