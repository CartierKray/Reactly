"use client";

import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const images = [
  {
    src: "/images/mercedes-benz-digital-companion-stage-3840x3840-06-2024.avif",
    alt: "Binnen een week jouw droom auto voor de deur.",
    description:
      "Wil jij graag snel in de auto stappen, of heb je deze snel nodig voor je bedrijfs activiteiten? Neem contact met ons op!",
  },
  {
    src: "/images/1920x1920-q4_2021_2516.avif", // Update with your image paths
    alt: "Zonder jaarcijfers ook financiering mogelijk.",
    description:
      "Ben jij net begonnen en heb je nog geen jaarcijfers beschikbaar? Dan helpt Alpha Lease jou daarbij! Neem contact op voor de mogelijkheden!",
  },
  {
    src: "/images/contact-tab.webp",
    alt: "Met BKR registratie financiering verkrijgen.",
    description:
      "Vaak met een negatieve BKR-registratie, kun je niet leasen. Wij helpen jou en adviseren jou wat te doen om alsnog je droom auto te leasen!",
  },
];

const CarouselThreeStrikes: React.FC = () => {
  return (
    <div className="w-full py-10 bg-gradient-to-b from-[#f8f8f8] to-transparent">
      <div className="p-8 lg:pl-14 pt-20 lg:pb-10">
        <h2 className="text-start text-sm font-semibold">
          Een verrijking van je reis
        </h2>

        <h3 className="text-start text-2xl pt-2 lg:text-3xl">
          Wat maakt ons zo speciaal?
        </h3>
      </div>
      <div className="hidden w-full lg:grid lg:grid-cols-3 lg:pl-14 lg:pr-14 lg:gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full shadow-md overflow-hidden rounded-md group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={1000}
              className="w-full h-[60vh] lg:h-[50vh] transition-transform duration-1000 ease-in-out xl:h-[75vh] rounded-md object-cover group-hover:scale-110"
            />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"></div>
            <div className="absolute bottom-4 p-3 left-4 text-white">
              <h4 className="text-2xl xl:text-3xl font-semibold">
                {image.alt}
              </h4>
              <p className="text-sm md:text-md pt-2 font-light">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:hidden relative">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-2xl font-semibold">{image.alt}</h4>
                  <p className="text-md pb-2 pt-2">{image.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselThreeStrikes;
