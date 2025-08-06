"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

type CarData = {
  name: string;
  price: string;
  image: string;
  buttonText: string;
  text: string;
};

const tabs = ["Personenauto's", "Bedrijfsauto's", "Elektrisch"];

const cars: {
  [key: string]: CarData[];
} = {
  "Personenauto's": [
    {
      name: "Volkswagen Golf",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Golf",
      text: "De plug-in hybride sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/volkswagen-golf.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes EQA",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes EQA",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/Mercedes-EQA.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi A6 e-tron",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de Audi A6 e-tron",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/Audi-a6-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi e-tron GT",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek Audi e-tron GT",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Audi-e-tron-gt.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi Q6 e-tron",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de Audi Q6 e-tron",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/Audi-q6-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
  ],
  "Bedrijfsauto's": [
    {
      name: "Fiat Ducato",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Fiat Ducato",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/fiat-ducato.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford e-transit",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford e-transit",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Ford-E-transit.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford Transit Connect",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford Transit Connect",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/ford-transit-connect.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford Transit Custom",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford Transit Custom",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/ford-transit-custom.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes Vito",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes Vito",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/mercedes-vito.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes Sprinter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes Sprinter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/mercedes-sprinter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes e-Sprinter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes e-Sprinter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/mercedes-sprinter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel Vivaro",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel Vivaro",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-vivaro-e.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel e-Vivaro",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel e-Vivaro",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-vivaro-e.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault Master e-Tech",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de renault Master e-Tech",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-master-e-tech.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault Trafic",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Renault Trafic",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-trafic.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id Buzz",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id Buzz",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-idbuzz.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id Buzz Cargo",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id Buzz Cargo",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-idbuzz.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Caddy",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Caddy",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-caddy.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Crafter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Crafter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-crafter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Transporter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Transporter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-transporter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen e-Transporter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen e-Transporter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-e-transporter.webp", // Pas deze aan naar je eigen afbeelding
    },
  ],
  Elektrisch: [
    {
      name: "Audi A6 e-tron",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de Audi A6 e-tron",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/Audi-a6-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi e-tron GT",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek Audi e-tron GT",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Audi-e-tron-gt.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi Q6 e-tron",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de Audi Q6 e-tron",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/Audi-q6-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi Q8 e-tron",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de Audi Q8 e-tron",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/Audi-q8-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
  ],
};

const CarSelector = () => {
  const [activeTab, setActiveTab] = useState<string>("Personenauto's");
  const [showDots, setShowDots] = useState<boolean>(true);

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
    }`;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const updateDotsVisibility = () => {
      setShowDots(window.innerWidth < 768);
    };
    updateDotsVisibility();
    window.addEventListener("resize", updateDotsVisibility);
    return () => {
      window.removeEventListener("resize", updateDotsVisibility);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-dots-container text-black bg-black mt-10">
        {dots}
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 mt-28 md:mt-20 rounded-full bg-[#5d9087] transition-all duration-300"></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="relative p-6 md:p-6 mb-20 mt-10 px-50 md:px-10 xl:px-[30px] bg-gradient-to-b xl:max-w-[1340px] 2xl:max-w-[1578px] mx-auto">
      {/* Smoke Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/smoke1.png"
          alt="smoke1"
          width={2000}
          height={2000}
          className="absolute opacity-40 animate-[wave_8s_linear_infinite] left-[-40%] top-[-20%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={2000}
          height={2000}
          className="absolute opacity-40 animate-[wave_15s_linear_infinite] left-[-10%] top-[-60%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={2000}
          height={2000}
          className="absolute opacity-40 animate-[wave_10s_linear_infinite] right-[-25%] top-[-30%] w-[2000px] max-w-none mix-blend-screen"
        />
      </div>

      <div className="xl:px-5 2xl:pl-36 2xl:pr-36 relative z-10">
        <div className="flex relative justify-start mt-0 space-x-8 border-b border-[#123728]/25">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm text-center w-full font-medium tracking-wide ${
                activeTab === tab
                  ? "text-black/50 border-b-4 border-[#123728]"
                  : "text-black hover:text-[#123728]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="md:pt-6 max-w-[1280px] mx-auto">
          <Slider className="pb-0 mb-20 z-10 h-[500px]" {...settings}>
            {cars[activeTab as keyof typeof cars].map(
              (car: CarData, index: number) => (
                <div key={index} className="relative p-1 md:p-4 pt-8">
                  <div className="relative z-10 mb-10 bg-[#1E2F2C] rounded-3xl p-4 shadow-lg">
                    <Image
                      width={1000}
                      height={1000}
                      src={car.image}
                      alt={car.name}
                      priority
                      className="h-full pb-4 scale-105 hover:scale-110 duration-500 ease-in-out transform transition-all rounded-lg w-full mx-auto object-fit"
                    />
                    <div className="w-full p-2 h-min">
                      <h3 className="text-xl md:text-xl xl:text-2xl tracking-wide customs-shadow font-semibold text-white mt-10">
                        {car.name}
                      </h3>
                      <p className="text-white hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out pt-2 text-sm mt-2">
                        {car.price}
                      </p>
                      <p className="pt-4 tracking-wide text-white/50 font-light pb-4 text-xs">
                        {car.text}
                      </p>
                      <Link href="/offerte">
                        <button className="bg-[#0f1d1b] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out z-20 mt-5 text-white text-center py-2.5 px-6 rounded-full w-fit mx-auto lg:mx-0 text-sm shadow-md">
                          {car.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        </section>
      </div>
    </section>
  );
};

export default CarSelector;
