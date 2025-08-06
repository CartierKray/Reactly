"use client";

import React, { useState } from "react";
import TextBetweenFour from "../TextBetween/TextBetweenFour";
import RolexIntro from "../RolexSection/RolexIntro";

// Gebruik de Feature interface in CleaningCardProps
interface CleaningCardProps {
  feature: Feature;
  number: number;
}

interface Feature {
  title: string;
  description: string;
}

const CleaningInfo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const features = [
    {
      title: "Efficiënte Leaseprocessen",
      description:
        "Bij BeterLease.nl draait alles om snelheid en gemak. Dankzij ons innovatieve online calculatie- en offerteplatform weet je direct wat je maandlasten zijn. Geen verborgen kosten, wél maximale transparantie. Zo regel je jouw zakelijke leaseauto snel en zonder gedoe, volledig afgestemd op jouw behoeften.",
    },
    {
      title: "Maatwerk en Flexibiliteit",
      description:
        "Of je nu kiest voor Financial Lease, Operational Lease of Short Lease, wij bieden leasecontracten op maat. Ons brede aanbod aan personenauto’s, bedrijfswagens en elektrische voertuigen zorgt ervoor dat je altijd een mobiliteitsoplossing vindt die perfect aansluit bij jouw zakelijke wensen.",
    },
    {
      title: "Snelle Levering en Betrouwbaarheid",
      description:
        "Wij begrijpen dat jouw tijd kostbaar is. Daarom zorgen we voor een snelle acceptatie en levering, vaak al binnen enkele dagen. Met flexibele voorwaarden, transparante communicatie en betrouwbare service garanderen we een zorgeloze lease-ervaring, zodat jij je volledig kunt richten op jouw onderneming.",
    },
  ];

  return (
    <div className="">
      <div className=" mb-0 md:mb-10 flex xl:pb-5 p-6 md:pl-6 xl:px-24 2xl:pl-48 lg:pl-10 2xl:pr-36">
        {/* <TextBetweenFour /> */}
        {/* <RolexIntro /> */}
      </div>
      <div className="h-1 w-32 rounded-3xl"></div>
      <div className="max-w-[1600px] p-6 mx-auto flex bg-transparent justify-center items-center pt-0">
        <div className="w-full pb-12">
          <div className="w-full">
            {/* Mobile View */}
            <div className="hidden lg:flex gap-10 relative">
              <section className=" w-full">
                <ol className="w-full flex xl:p-10">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className={`mt-28 mx-2.5 ${
                        currentSlide === index ? "active" : ""
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <CleaningCard feature={feature} number={index + 1} />
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Desktop and larger views */}
            <div className="lg:hidden mx-auto w-full max-w-container justify-around items-center gap-x-[1.125rem] gap-y-8 flex-wrap flex-row">
              {features.map((feature, index) => (
                <CleaningCard
                  key={index}
                  feature={feature}
                  number={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CleaningCard: React.FC<CleaningCardProps> = ({ feature, number }) => {
  return (
    <div className="w-full mt-32 lg:mt-0 h-full flex mx-auto">
      <div className="w-full h-full bg-white backdrop-blur-md border  border-gray-200 relative flex flex-col gap-y-4 justify-start shadow rounded-[1.563rem] p-6">
        <div className="w-full flex gap-10 items-end relative pt-20 ">
          <div
            className="h-14 md:h-[4.75rem] mb-10 w-14 md:w-[4.75rem] opacity-30 absolute -left-3 -top-6 md:-top-16 text-[20rem] md:text-[25rem] text-[rgb(148,148,148)] font-semibold text-center leading-[3.5rem] md:leading-[4.75rem]"
            style={{ fontFamily: "sans-serif" }}
          >
            {number}
          </div>
          <div className="text-lg pt-12 text-[#123728] uppercase font-semibold">
            {feature.title}
          </div>
        </div>
        <div className="w-full text-[15px] pb-4 text-black/50 pt-2.5">
          {feature.description}
        </div>
      </div>
    </div>
  );
};

export default CleaningInfo;
