"use client";

import Image from "next/image";
import React from "react";

const leaseOptions = [
  {
    id: "1",
    title: "Gabriel - VW T-ROC",
    subtitle: "Zonder Eigen Inleg",
    description:
      "Rijd in een gloednieuwe auto zonder grote investering. Met de short lease van Beterlease.nl geniet je van zorgeloos autorijden voor een vast maandbedrag, inclusief onderhoud, verzekering en wegenbelasting. Jij kiest de auto, wij doen de rest.",
    points: [
      "Vast maandbedrag zonder verrassingen",
      "Inclusief verzekering, onderhoud & pechhulp",
      "Geen aanbetaling nodig",
      "Altijd in een nieuwe of jong gebruikte auto rijden",
      "Flexibele looptijden en kilometrages",
    ],
    image: "/images/gabriel.webp",
  },
  {
    id: "2",
    title: "Financial Lease",
    subtitle: "Zakelijk investeren",
    description:
      "Financial lease is dé oplossing voor ondernemers die slim willen investeren in een bedrijfsauto zonder hun werkkapitaal aan te spreken. Bij BeterLease.nl geniet je van flexibele leaseopties die zijn afgestemd op jouw zakelijke behoeften.",
    points: [
      "Direct eigenaar van de bedrijfsauto",
      "BTW van de auto direct terugvorderen",
      "Vaste, voorspelbare leasebedragen",
      "Fiscale voordelen, zoals investeringsaftrek",
    ],
    image: "/images/Mayra.webp",
  },
  {
    id: "3",
    title: "Short Lease",
    subtitle: "Zonder Eigen Inleg",
    description:
      "Rijd in een gloednieuwe auto zonder grote investering. Met de short lease van Beterlease.nl geniet je van zorgeloos autorijden voor een vast maandbedrag, inclusief onderhoud, verzekering en wegenbelasting. Jij kiest de auto, wij doen de rest.",
    points: [
      "Vast maandbedrag zonder verrassingen",
      "Inclusief verzekering, onderhoud & pechhulp",
      "Geen aanbetaling nodig",
      "Altijd in een nieuwe of jong gebruikte auto rijden",
      "Flexibele looptijden en kilometrages",
    ],
    image: "/images/Sabrina.webp",
  },
  {
    id: "4",
    title: "Financial Lease",
    subtitle: "Zakelijk investeren",
    description:
      "Financial lease is dé oplossing voor ondernemers die slim willen investeren in een bedrijfsauto zonder hun werkkapitaal aan te spreken. Bij BeterLease.nl geniet je van flexibele leaseopties die zijn afgestemd op jouw zakelijke behoeften.",
    points: [
      "Direct eigenaar van de bedrijfsauto",
      "BTW van de auto direct terugvorderen",
      "Vaste, voorspelbare leasebedragen",
      "Fiscale voordelen, zoals investeringsaftrek",
    ],
    image: "/images/Jozef.webp",
  },
];

const LeaseOptionsGridTwo: React.FC = () => {
  return (
    <section className="max-w-[1300px] space-y-5 md:space-y-0 mx-auto px-5 md:px-6 lg:px-8 pt-12 md:pt-4 pb-20 lg:pb-40">
      {leaseOptions.map((option, index) => (
        <div
          id={option.id} // <- hier voeg je het id toe
          key={option.title}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse order" : ""
          } bg-[#f8f8f8] backdrop-blur-sm  overflow-hidden shadow`}
        >
          <div className="md:w-1/2 flex flex-col justify-center px-8 py-10 order-2 md:order-1">
            <h4 className="text-sm uppercase tracking-wide text-[#c2b293] font-normal mb-2">
              {option.subtitle}
            </h4>
            <h2 className="text-4xl font-semibold mb-4 text-[#111827]">
              {option.title}
            </h2>
            <p className="mb-4 text-[#444] text-[15px] leading-relaxed">
              {option.description}
            </p>
            <ul className="mb-6 text-[#444] text-[15.5px] list-disc list-inside space-y-1">
              {option.points.map((point) => (
                <li
                  className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                  key={point}
                >
                  {point}
                </li>
              ))}
            </ul>
            <button className="mt-4  whitespace-nowrap px-6 hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out mb-2  py-2.5 bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] rounded-3xl text-white text-sm backdrop-blur-sm">
              Meer informatie
            </button>
          </div>

          <div className="md:w-1/2 relative order-1 md:order-2">
            <Image
              src={option.image}
              alt={option.title}
              width={1000}
              height={1000}
              className="w-full object-cover h-full"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default LeaseOptionsGridTwo;
