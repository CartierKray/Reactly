"use client";

import React from "react";

interface QualityItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const qualities: QualityItem[] = [
  {
    title: "Smart contracts",
    description:
      "Nooit meer vast aan één leasecontract. Als je behoeften veranderen, kunnen we je gemakkelijk helpen bij het vinden van een nieuw voertuig dat beter bij je past.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="51"
        height="61"
        viewBox="0 0 51 61"
        fill="none"
      >
        <path
          d="M22.9688 53.66C22.9688 53.4244 22.827 53.2118 22.6096 53.1213C20.0682 52.0619 18.2812 49.5551 18.2812 46.6299V24.1299C18.2812 21.2046 20.0682 18.6978 22.6096 17.6385C22.827 17.5479 22.9688 17.3352 22.9688 17.0998V17.0986H18.2812C14.398 17.0986 11.25 20.2466 11.25 24.1299V46.6299C11.25 50.5131 14.398 53.6611 18.2812 53.6611H22.9688V53.66Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          d="M23.3711 42.0091L36.6295 28.7507"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 21.7861L44.0625 3.03613"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Beste prijzen & voorwaarden",
    description:
      "Bij Smart Autolease werken we samen met alle Nederlandse leasebanken, zodat onze klanten altijd de beste leasevoorwaarden krijgen.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="61"
        viewBox="0 0 60 61"
        fill="none"
      >
        <path
          d="M30 3.03613V7.72363"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48.75 3.03613L44.0625 7.72363"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Meeste Aanbod",
    description:
      "Met meer dan 70.000 Smart Deals heeft Smart Autolease altijd de perfecte auto voor je, of je nu op zoek bent naar een sportwagen, een bedrijfswagen, of iets daartussenin!",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="61"
        viewBox="0 0 60 61"
        fill="none"
      >
        <path
          d="M8.75573 37.4401L35.3054 10.8904C37.136 9.05979 40.104 9.05979 41.9345 10.8904L36.8955 5.85133"
          fill="white"
          fillOpacity="0.1"
        />
      </svg>
    ),
  },
  {
    title: "Snel & gemakkelijk",
    description:
      "Jouw financial lease, snel en gemakkelijk. Met ons eenvoudige proces en snelle service regelen we jouw financial lease zonder gedoe.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="61"
        viewBox="0 0 60 61"
        fill="none"
      >
        <path
          d="M23.5465 5.14551C19.8452 5.14551 16.4904 7.3232 14.9836 10.7038"
          fill="white"
          fillOpacity="0.1"
        />
      </svg>
    ),
  },
];

const AutoleaseQualities: React.FC = () => {
  return (
    <section className="bg-stone-800 text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          De Kwaliteiten Van Smart Autolease
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((quality, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-teal-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 text-white w-12 h-12 flex items-center justify-center">
                {quality.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{quality.title}</h3>
              <p className="text-sm">{quality.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoleaseQualities;
