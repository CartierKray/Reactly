import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Car } from "../HeaderLease/HeaderLeaseAanbod";
import Link from "next/link";

interface DrawerCarsProps {
  isOpen: boolean;
  car: Car | null;
  onClose: () => void;
  onOfferteClick: (car: Car) => void;
}

const DrawerCars: React.FC<DrawerCarsProps> = ({
  isOpen,
  car,
  onClose,
  onOfferteClick,
}) => {
  const [activeTab, setActiveTab] = useState("kenmerken");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!car) return null;

  const images = car.images ? [car.image, ...car.images] : [car.image];

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="fixed bottom-0 max-w-7xl mx-auto left-0 w-full md:h-fit h-[85%] md:pb-8 max-h-[85%] bg-[#111] dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] text-white shadow-lg z-50 rounded-t-lg flex flex-col">
        {/* Scrollable content */}

        <div className="flex-1 overflow-y-auto px-4 pt-3.5 py-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: Images */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <Image
                  src={images[currentImageIndex]}
                  alt={car.name}
                  width={1000}
                  height={1000}
                  className="object-cover h-[270px] md:h-[475px] lg:h-[400px] rounded-md w-full"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/20 text-white p-3"
                    >
                      ‹
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/20 text-white p-3"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-2 w-full">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`rounded-md overflow-hidden border-2 aspect-[4/3] w-full ${
                      index === currentImageIndex
                        ? "border-red-500"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-2">
                  {car.name}
                </h1>
                <p className="text-base text-white/50 mb-6">
                  {car.description}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <Detail label="Bouwjaar" value={car.year} />
                  <Detail label="Kilometerstand" value={car.km} />
                  <Detail label="Brandstof" value={car.fuel} />
                  <Detail label="Transmissie" value={car.transmission} />
                  <Detail label="Vermogen" value={car.power} />
                  <Detail label="BTW / Marge" value={car.btw} />
                  {/* <Detail
                    label="Lease per maand"
                    value={`€${car.monthly.toLocaleString("nl-NL")}`}
                  /> */}
                </div>
              </div>

              <div className="text-start lg:max-w-lg text-white/50 tracking-wide text-[12px] max-w-2xl mt-7">
                Bij BeterLease.nl maken we het eenvoudig en betaalbaar om in uw
                droomauto te rijden, zoals deze exclusieve{" "}
                <span className="font-medium hover:text-[#FFF] text-xs">
                  {car.name}
                </span>{" "}
                /{" "}
                <span className="font-medium text-xs hover:text-[#FFF]">
                  {car.description}
                </span>
                <span className="text-sm font-medium text-white/50">
                  &nbsp;
                  <div className="hidden md:flex pt-2 text-[10px] font-light text-white/50">
                    &nbsp;&nbsp; <span className="text-[#f00]">*</span>
                    &nbsp;De BTW dient altijd uit eigen middelen voldaan te
                    worden.
                  </div>
                  <div className="md:hidden pt-2 flex text-[10px] font-light dark:text-white/50 text-black/50">
                    &nbsp;&nbsp; <span className="text-[#f00]">*</span>
                    &nbsp; De BTW dient altijd uit eigen middelen voldaan te
                    worden.
                  </div>
                </span>
              </div>

              <div className="mt-5 md:mt-8 border-t border-white/10 pt-4">
                <h2 className="text-2xl font-semibold text-white dark:text-white">
                  €{car.price.toLocaleString("nl-NL")}{" "}
                  <span className=" px-1 text-sm text-white/50 font-medium">
                    ({car.btw ?? "–"})
                  </span>
                </h2>
                <p className="text-xs pt-2.5 pb-0.5 text-white/50 dark:text-white/50">
                  Leasen vanaf €{car.monthly.toLocaleString("nl-NL")} per maand
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => onOfferteClick(car)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded text-white font-medium text-sm"
                  >
                    Offerte aanvragen
                  </button>
                  <Link
                    href={`/auto/${car.id}`}
                    className="border border-white text-white hover:border-gray-300 px-5 py-3
                     rounded font-medium text-sm"
                  >
                    Meer informatie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="text-white font-medium text-base md:text-lg">
        {value}
      </span>
    </div>
  );
}

export default DrawerCars;
