"use client";

import Image from "next/image";
import React from "react";
import RolexIntro from "../RolexSection/RolexIntro";

const steps = [
  {
    title: "1. Contact",
    description:
      "Laat je gegevens achter. Wij nemen binnen 24 uur contact met je op.",
    icon: "/svg/contact.svg",
  },
  {
    title: "2. Afspraak",
    description: "Bespreek je wensen met een expert voor jouw ideale auto.",
    icon: "/svg/calendar.svg",
  },
  {
    title: "3. Advies",
    description:
      "Onze specialist adviseert op maat, afgestemd op jouw situatie.",
    icon: "/svg/handshake.svg",
  },
  {
    title: "4. Voorstel",
    description:
      "Je ontvangt een helder voorstel dat perfect aansluit bij jouw wensen.",
    icon: "/svg/contract.svg",
  },
  {
    title: "5. Start",
    description:
      "Wij starten direct, zodat jij snel kunt genieten van je droomauto.",
    icon: "/svg/checkmark.svg",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-b dark:bg-gradient-to-b dark:from-transparent dark:to-transparent from-[#f0f0f0] to-white text-black w-full pb-20 md:p-0">
      {/* Header section */}
      <div className="max-w-7xl mx-auto text-center px-4">
        <section className="max-w-5xl mx-auto px-4 -mb-5 md:mb-0 py-10 text-center">
          <div className="flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
            <div className="flex-grow border-t border-gray-300" />
            <div className="text-4xl sm:text-5xl dark:text-white font-medium whitespace-nowrap">
              Ons Stappenplan
            </div>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        </section>
        {/* <div className="flex py-3 flex-col sm:flex-row justify-center items-center gap-6">
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
            Meer over ons →
          </button>
          <button className="border border-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
            Veelgestelde vragen →
          </button>
        </div> */}
      </div>

      {/* Auto image */}
      {/* <div className="relative w-full flex justify-center">
        <Image
          src="/images/bmwtransparent.png"
          alt="BMW Transparent"
          width={1000}
          height={600}
          className="object-contain w-auto max-w-full h-auto"
          priority
        />
      </div> */}

      {/* StepsOverview Section */}
      <div className=" mx-auto px-6 md:pb-20">
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {steps.map((step, index) => (
            <div key={index} className="w-full sm:w-[300px] lg:w-[290px] h-fit">
              <div className="relative bg-white dark:bg-[#282828] dark:shadow-[#444444] dark:border-none border border-gray-200 rounded-3xl p-6 shadow-md dark:shadow-inner hover:shadow-lg transition">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#c2b293] shadow-inner shadow-[#e3d1ac] dark:bg-red-600 dark:shadow-red-400 rounded-2xl flex items-center justify-center p-4">
                  <Image
                    src={step.icon}
                    alt={`${step.title} icon`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold dark:text-white text-[#1e3a2e] mt-6">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-white/50 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
