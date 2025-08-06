"use client";

// components/Nieuwbinnen/Nieuwbinnen.tsx
import Image from "next/image";

import { Button } from "@/components/ui/button"; // Zorg dat deze bestaat, of pas aan
import { useRef } from "react";
import { Card, CardContent } from "../ui/card";

interface Car {
  id: number;
  model: string;
  type: string;
  description: string;
  price: string;
  kmStand: number;
  bouwjaar: number;
  kleur: string;
  image: string;
  verkocht: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    model: "A3",
    type: "Sportback 45 TFSI E S-Line",
    description: "Sportback 45 TFSI E S-Line",
    price: "€39.990,-",
    kmStand: 32000,
    bouwjaar: 2022,
    kleur: "Grijs",
    image:
      "/images/2020 Audi S4 Sedan B9 5 - Turbo blue - Bolzano - Italy 07.jpg",
    verkocht: true,
  },
  {
    id: 2,
    model: "Q8",
    type: "60 TFSI E Quattro S-Line",
    description: "60 TFSI E Quattro S-Line",
    price: "€89.990,-",
    kmStand: 65000,
    bouwjaar: 2021,
    kleur: "Zwart",
    image:
      "/images/2020 Audi S4 Sedan B9 5 - Turbo blue - Bolzano - Italy 07.jpg",
    verkocht: true,
  },
  {
    id: 3,
    model: "A6",
    type: "Avant 55 TFSI E Quattro S-Line",
    description: "Avant 55 TFSI E Quattro S-Line",
    price: "€59.990,-",
    kmStand: 39000,
    bouwjaar: 2021,
    kleur: "Blauw",
    image:
      "/images/2020 Audi S4 Sedan B9 5 - Turbo blue - Bolzano - Italy 07.jpg",
    verkocht: false,
  },
  {
    id: 4,
    model: "A6",
    type: "Avant 55 TFSI E Quattro S-Line",
    description: "Avant 55 TFSI E Quattro S-Line",
    price: "€59.990,-",
    kmStand: 39000,
    bouwjaar: 2021,
    kleur: "Blauw",
    image:
      "/images/2020 Audi S4 Sedan B9 5 - Turbo blue - Bolzano - Italy 07.jpg",
    verkocht: false,
  },
];

export default function NieuwBinnen() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto relative">
      <h2 className="text-3xl text-white font-semibold text-center mb-8">
        Nieuw binnen
      </h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
        >
          &#8592;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth snap-x snap-mandatory px-10"
        >
          {cars.map((car) => (
            <Card
              key={car.id}
              className="min-w-[300px] flex-shrink-0 snap-center relative"
            >
              {car.verkocht && (
                <div className="absolute top-16 -left-5 bg-yellow-400 text-black px-6 py-1 text-[11.5px] font-bold transform -rotate-45 origin-top-left">
                  VERKOCHT
                </div>
              )}
              <Image
                src={car.image}
                alt={car.model}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">Audi {car.model}</h3>
                    <p className="text-sm text-gray-600">{car.description}</p>
                  </div>
                  <div className="text-right font-bold">
                    {car.price}
                    <br />
                    <span className="text-xs font-normal">incl. BTW</span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">KM Stand</span>
                    <span className="text-gray-800">{car.kmStand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bouwjaar</span>
                    <span className="text-gray-800">{car.bouwjaar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kleur</span>
                    <span className="text-gray-800">{car.kleur}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
        >
          &#8594;
        </button>
      </div>
      <div className="flex justify-center mt-10">
        <Button className="bg-beige text-black hover:bg-beige-dark">
          Bekijk volledig aanbod
        </Button>
      </div>
    </div>
  );
}
