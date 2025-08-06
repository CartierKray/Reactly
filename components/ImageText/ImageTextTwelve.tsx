"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const leaseOptions = [
  {
    id: "financial-lease",
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
    image: "/images/5_other_image_17355647422135117692.jpg",
  },
  {
    id: "operational-lease",
    title: "Operational Lease",
    subtitle: "Zorgeloos rijden",
    description:
      "Operational lease is de ideale keuze voor ondernemers die zorgeloos willen rijden zonder zich druk te maken over onderhoud of afschrijving. Alles wordt voor je geregeld, zodat jij je volledig kunt richten op je bedrijf.",
    points: [
      "Geen zorgen over onderhoud of reparaties",
      "Inclusief verzekering en wegenbelasting",
      "Eén vast maandbedrag voor alle kosten",
      "Geen risico op waardevermindering",
    ],
    image: "/images/5_content_image_17355622861078194351.jpg",
  },
  {
    id: "equipment-lease",
    title: "Equipment Lease",
    subtitle: "Voor je machines en tools",
    description:
      "Equipment lease is ideaal voor ondernemers die motoren, kleine motoren of andere zakelijke apparatuur willen leasen zonder grote investeringen in één keer. Wij bieden flexibele leaseoplossingen die aansluiten op jouw zakelijke behoeften.",
    points: [
      "Industriële motoren en generatoren",
      "Kleine motoren voor machines en voertuigen",
      "Landbouw- en bouwapparatuur",
      "Elektrische gereedschappen en pompen",
    ],
    image: "/images/6_content_image_1737039412230489923.png",
  },
  {
    id: "private-lease",
    title: "Private Lease",
    subtitle: "Voor je machines en tools",
    description:
      "Equipment lease is ideaal voor ondernemers die motoren, kleine motoren of andere zakelijke apparatuur willen leasen zonder grote investeringen in één keer. Wij bieden flexibele leaseoplossingen die aansluiten op jouw zakelijke behoeften.",
    points: [
      "Industriële motoren en generatoren",
      "Kleine motoren voor machines en voertuigen",
      "Landbouw- en bouwapparatuur",
      "Elektrische gereedschappen en pompen",
    ],
    image: "/images/4_content_image_173555390567059517.jpg",
  },
  {
    id: "short-lease",
    title: "Short Lease",
    subtitle: "Voor je machines en tools",
    description:
      "Equipment lease is ideaal voor ondernemers die motoren, kleine motoren of andere zakelijke apparatuur willen leasen zonder grote investeringen in één keer. Wij bieden flexibele leaseoplossingen die aansluiten op jouw zakelijke behoeften.",
    points: [
      "Industriële motoren en generatoren",
      "Kleine motoren voor machines en voertuigen",
      "Landbouw- en bouwapparatuur",
      "Elektrische gereedschappen en pompen",
    ],
    image: "/images/5_content_image_17364328041473255217.png",
  },
  {
    id: "direct-kopen",
    title: "Direct Kopen",
    subtitle: "Direct eigenaar geen voorwaarden",
    description:
      "Direct kopen is ideaal voor ondernemers die motoren, kleine motoren of andere zakelijke apparatuur willen kopen zonder leasecontracten, in één keer eigenaar. Wij bieden flexibele leaseoplossingen die aansluiten op jouw zakelijke behoeften.",
    points: [
      "Industriële motoren en generatoren",
      "Kleine motoren voor machines en voertuigen",
      "Landbouw- en bouwapparatuur",
      "Elektrische gereedschappen en pompen",
    ],
    image:
      "/images/2021 4 x Audi RS (RS6,RS7,RSQ3,RSQ8) in all black - Warsaw - Poland 01.jpg",
  },
];

const ImageTextTwelve: React.FC = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes wave {
          0% {
            transform: rotateZ(0deg) translate3d(0, 10%, 15px) rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg) translate3d(0, 10%, 15px) rotateZ(-360deg);
          }
        }
      `;
    document.head.appendChild(style);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      {leaseOptions.map((option, index) => (
        <div
          id={option.id} // <- hier voeg je het id toe
          key={option.title}
          className={`flex mb-8 flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } relative bg-[#f0f0f0] dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444]  backdrop-blur-sm overflow-hidden shadow`}
        >
          <div className="absolute inset-0 bottom-0 z-0 pointer-events-none">
            <Image
              src="/svg/bg-accent-two.svg"
              alt="bg-accent"
              width={1000}
              height={1000}
              className="w-full h-full opacity-10"
            />
          </div>
          <div className="md:w-1/2 relative z-20">
            <Image
              src={option.image}
              alt={option.title}
              width={1000}
              height={1000}
              className="w-full object-cover h-full"
            />
          </div>
          {/* Smoke Layers */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/images/smoke1.png"
              alt="smoke1"
              width={10000}
              height={10000}
              className="absolute opacity-50 animate-[wave_8s_linear_infinite] left-[-50%] top-[-20%] w-[2000px] max-w-none mix-blend-screen"
            />
            <Image
              src="/images/smoke2.png"
              alt="smoke2"
              width={10000}
              height={10000}
              className="absolute opacity-50 animate-[wave_15s_linear_infinite] left-[-10%] top-[-60%] w-[2000px] max-w-none mix-blend-screen"
            />
            <Image
              src="/images/smoke3.png"
              alt="smoke3"
              width={10000}
              height={10000}
              className="absolute opacity-50 animate-[wave_10s_linear_infinite] right-[-25%] top-[-30%] w-[2000px] max-w-none mix-blend-screen"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center px-8 py-10 lg:py-16">
            <h4 className="text-sm uppercase tracking-wide dark:text-white/50 text-black font-normal mb-2">
              {option.subtitle}
            </h4>
            <h2 className="text-4xl font-semibold mb-4 text-black dark:text-white">
              {option.title}
            </h2>
            <p className="mb-4 text-black text-[14px] md:text-[15px] dark:text-white/50 font-light md:font-normal leading-relaxed">
              {option.description}
            </p>
            <ul className="mb-6 text-black text-[15.5px] mt-2 list-disc dark:text-white list-inside space-y-2">
              {option.points.map((point) => (
                <li
                  className="hover:tracking-wider text-sm hover:font-semibold transition-all duration-300 ease-in-out"
                  key={point}
                >
                  {point}
                </li>
              ))}
            </ul>

            <Link href="/collectie" className="">
              <button className="relative px-8 mt-4 mb-2 w-full lg:max-w-[50%] dark:outline-white  font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-black hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-black group-hover:text-white dark:group-hover:text-black dark:text-white transition-all duration-500">
                  Meer informatie
                </span>
                <span className="absolute inset-0 rounded-full dark:bg-white bg-black w-0 group-hover:w-full transition-all duration-500"></span>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ImageTextTwelve;
