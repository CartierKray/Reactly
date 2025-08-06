"use client";

import Image from "next/image";
import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section className="w-full max-w-screen-xl pb-32 pt-32 flex flex-col-reverse lg:flex-row md:justify-center items-center mx-auto">
      {/* Left image */}
      <div className="w-full lg:w-1/ 2 p-8 md:p-4 lg:p-0 md:max-h-fit">
        <Image
          src="/svg/nederland.svg"
          alt="contact-2"
          width={800}
          height={800}
          className="w-full h-auto"
        />
      </div>

      {/* Right content */}
      <div className="w-full lg:w-1/2 flex flex-col md:pl-[8rem] p-5 pt-0 md:mt-8 gap-2">
        <div className="w-full text-3xl md:text-[2.375rem] md:leading-[3.563rem] text-black font-semibold">
          BeterLease.nl is écht overal.
          <div className="h-1 w-32 my-4 bg-[#c2b293]" />
        </div>
        <div className="w-full text-sm text-gray-600"></div>
      </div>
    </section>
  );
};

export default ContactSection;
