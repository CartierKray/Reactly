"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import ModalComponentAanbod from "../Modal/ModalComponentAanbod";
import Link from "next/link";
import DrawerCars from "../Drawer/DrawerCars";

interface Car {
  id: number;
  name: string;
  description: string;
  year: number;
  km: string;
  power: string;
  transmission: string;
  btw: string;
  price: number;
  image: string;
  fuel?: string;
  monthly?: number;
  images?: string[];
}

interface Product {
  id: number;
  img: string;
  title: string;
  price: number;
  description: string;
  km: string;
  fuel?: string;
  transmission: string;
  btw: string;
  monthly?: number;
  images?: string[];
  stock: string;
}

export default function CarShowcaseSlider({ cars }: { cars: Car[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const slide = useCallback(
    (dir: "left" | "right") => {
      setActiveIndex((prev) =>
        dir === "left"
          ? (prev - 1 + cars.length) % cars.length
          : (prev + 1) % cars.length
      );
    },
    [cars.length]
  );

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) slide("right");
      if (distance < -50) slide("left");
      touchStartX.current = null;
      touchEndX.current = null;
    };

    const slider = document.getElementById("carousel-slider");
    if (slider) {
      slider.addEventListener("touchstart", handleTouchStart);
      slider.addEventListener("touchmove", handleTouchMove);
      slider.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (slider) {
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [slide]);

  const getVisibleCars = () => {
    const visible: Car[] = [];
    const total = cars.length;
    for (let i = -2; i <= 2; i++) {
      visible.push(cars[(activeIndex + i + total) % total]);
    }
    return visible;
  };

  const getSlideClasses = (position: number) => {
    switch (position) {
      case -2:
        return "scale-75 opacity-30 blur-sm -translate-x-[160%] z-0";
      case -1:
        return "scale-75 md:scale-90 opacity-60 blur-sm -translate-x-[80%] z-10";
      case 0:
        return "scale-90 md:scale-105 opacity-100 blur-0 translate-x-0 z-20";
      case 1:
        return "scale-75 md:scale-90 opacity-60 blur-sm translate-x-[80%] z-10";
      case 2:
        return "scale-75 opacity-30 blur-sm translate-x-[160%] z-0";
      default:
        return "hidden";
    }
  };

  const openDrawer = (car: Car) => {
    setSelectedCar(car);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedCar(null);
    setIsDrawerOpen(false);
  };

  const openModal = (car: Car) => {
    const product: Product = {
      id: car.id,
      img: car.image,
      title: car.name,
      price: car.price,
      description: car.description,
      km: car.km,
      fuel: car.fuel,
      transmission: car.transmission,
      btw: car.btw,
      monthly: car.monthly,
      images: car.images,
      stock: "1",
    };
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!cars.length) return null;

  return (
    <section className="bg-white dark:bg-transparent max-w-7xl mx-auto w-full flex flex-col items-center pb-10 relative overflow-hidden">
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <button
          onClick={() => slide("left")}
          className="absolute left-0 md:left-4 z-30 w-10 h-10 md:w-20 md:h-20 bg-none flex items-center justify-center"
        >
          <ChevronLeft className="w-full h-full text-black dark:text-white" />
        </button>

        <div
          id="carousel-slider"
          className="relative w-full h-full flex items-center justify-center"
        >
          {getVisibleCars().map((car, i) => {
            const position = i - 2;
            return (
              <div
                key={car.id}
                className={clsx(
                  "absolute transition-all duration-700 border border-1 dark:border-none dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] border-black/10 ease-in-out transform rounded-xl overflow-hidden bg-[#f0f0f0] shadow-xl w-[400px]",
                  getSlideClasses(position)
                )}
              >
                {/* Smoke Layers */}
                {/* <div className="absolute inset-0 z-0 pointer-events-none">
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
                </div> */}

                <div className="relative w-full h-64">
                  <Image
                    onClick={() => openModal(car)}
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover cursor-pointer"
                  />
                  <span className="absolute top-3 dark:shadow-inner dark:bg-[#282828] dark:shadow-[#626262] right-3 dark:font-medium dark:text-whit bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white text-xs px-3 py-1 rounded-full">
                    {car.year}
                  </span>
                </div>
                <div className="p-4  min-w-[300px]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="max-w-md">
                      <h3 className="text-md dark:text-white text-black font-semibold">
                        {car.name}
                      </h3>
                      <div className="text-black/50 dark:text-white/50 text-xs my-1.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                        {car.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-black dark:text-white font-semibold">
                        €{car.price.toLocaleString("nl-NL")}
                      </p>
                      {/* Handgetekende lijn */}
                      <svg
                        className="mt-1 pl-1 w-[90px] h-[10px]"
                        viewBox="0 0 100 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 8 C25 2, 100 0, 100 4"
                          className="stroke-[#c2b293] dark:stroke-red-600"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-xs text-black dark:text-white mb-5">
                    {car.power}
                  </p>
                  {/* Horizontale lijn */}
                  <hr className="border-black/20 dark:border-white/20 my-2" />

                  {/* Onderkant */}
                  <div className="flex divide-x py-2 dark:divide-white/25 divide-black/25 text-center text-[15px] font-semibold dark:text-white/75 text-black/50">
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="text-[13px] text-black/50 dark:text-white/50 mb-1 tracking-wide">
                        KM
                      </span>
                      <span className="text-black dark:text-white text-sm pt-4">
                        {car.km}
                      </span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="text-[13px] text-black/50 dark:text-white/50 mb-1 tracking-wide">
                        Transmissie
                      </span>
                      <span className="text-black dark:text-white text-sm pt-4">
                        {car.transmission}
                      </span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="text-[13px] text-black/50 dark:text-white/50 mb-1 tracking-wide">
                        BTW
                      </span>
                      <span className="text-black dark:text-white text-sm pt-4">
                        {car.btw}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-x-2 mt-3 mb-2">
                    <div className="w-full">
                      <button
                        onClick={() => openModal(car)}
                        className="flex justify-center w-full dark:font-medium dark:hover:font-semibold dark:bg-white dark:text-black dark:shadow-none bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] hover:tracking-wider backdrop-blur-sm text-white py-2 rounded-md text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out"
                      >
                        Offerte aanvragen
                      </button>
                    </div>

                    <div className=" items-center flex gap-x-2 ">
                      <button
                        className="inline-flex items-center dark:shadow-none dark:bg-white dark:text-black bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-8 w-8 shrink-0"
                        onClick={() => openDrawer(car)}
                      >
                        <div className="block">
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 15 15"
                            fill=""
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 dark:hover:text-black hover:text-black dark:text-red-600"
                            aria-hidden="true"
                          >
                            <path
                              d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Preview</span>
                        </div>
                      </button>
                      <Link href={``} passHref>
                        <button
                          className="inline-flex items-center dark:bg-white dark:shadow-none bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 w-8 shrink-0"
                          title="Favorite"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 dark:hover:text-red-500 hover:text-red-500 dark:text-red-600"
                          >
                            <path
                              d="M4.9 2.35C3.5 2.35 2.35 3.5 2.35 4.9C2.35 6.4 3.2 7.9 4.37 9.34C5.39 10.58 6.59 11.67 7.5 12.48C8.41 11.67 9.61 10.58 10.63 9.34C11.79 7.9 12.65 6.4 12.65 4.9C12.65 3.5 11.51 2.35 10.1 2.35C9.27 2.35 8.82 2.64 8.54 2.96C8.28 3.25 8.15 3.59 8.03 3.89C8 3.94 7.98 4 7.96 4.05C7.88 4.23 7.7 4.35 7.5 4.35C7.3 4.35 7.12 4.23 7.04 4.05C7.02 4 7 3.94 6.98 3.89C6.85 3.59 6.72 3.25 6.46 2.96C6.18 2.64 5.73 2.35 4.9 2.35Z"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="sr-only">Favorite</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => slide("right")}
          className="absolute right-0 md:right-4 z-30 w-10 h-10 md:w-20 md:h-20 bg-none flex items-center justify-center"
        >
          <ChevronRight className="w-full h-full text-black dark:text-white" />
        </button>
      </div>

      <DrawerCars
        isOpen={isDrawerOpen}
        car={
          selectedCar as import("../HeaderLease/HeaderLeaseAanbod").Car | null
        }
        onClose={closeDrawer}
        onOfferteClick={(car) => {
          closeDrawer();
          setSelectedProduct({
            id: car.id,
            img: car.image,
            title: car.name,
            price: car.price,
            stock: "1",
            description: car.description,
            km: car.km,
            fuel: car.fuel,
            transmission: car.transmission,
            btw: car.btw,
            monthly: car.monthly,
            images: car.images,
          });
          setIsModalOpen(true);
        }}
      />

      <ModalComponentAanbod
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedCard={{
          title: selectedProduct?.title || "",
          imageSrc: selectedProduct?.img || "",
          price: selectedProduct?.price || 0,
          km: selectedProduct?.km || "",
          fuel: selectedProduct?.fuel || "",
          transmission: selectedProduct?.transmission || "",
          btw: selectedProduct?.btw || "",
        }}
        selectedServices={[]}
      />
    </section>
  );
}
