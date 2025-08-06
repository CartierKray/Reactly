"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";

const data = [
  {
    id: 1,
    number: "#1",
    title: "Financial Lease",
    description: "Ontdek Financial Lease",
    descriptionTwo:
      "Met Financial Lease kies je voor eigendom en flexibiliteit. Jij bent de economische eigenaar, waardoor je profiteert van fiscale voordelen zoals investeringsaftrek. Betaal in termijnen en bouw je kredietscore op.",
    buttonText: "Bekijk Financial Lease",
    path: "/voor-wie#financial-lease",
    image: "/images/Q6_SB_2023_5211-1080x1920.avif",
  },
  {
    id: 2,
    number: "#2",
    title: "Operational Lease",
    description: "Ontdek Operational Lease",
    descriptionTwo:
      "Met Operational Lease geniet je van zorgeloos rijden zonder eigendom. Onderhoud, reparaties en verzekeringen zijn inbegrepen in één maandbedrag. Na de looptijd lever je de auto gemakkelijk in, .",
    buttonText: "Bekijk Operational Lease",
    path: "/voor-wie#operational-lease",
    image: "/images/1920x1920-audi-q8-tfsi-e-my2021-stage-1445.avif",
  },
  {
    id: 3,
    number: "#3",
    title: "Equipment Lease",
    description: "Ontdek Operational Lease",
    descriptionTwo:
      "Met Equipment Lease investeer je in de apparatuur die je nodig hebt, zonder grote directe kosten. Kies voor moderne technologie en houd je cashflow vrij voor andere bedrijfsuitgaven. Ontdek het nu!",
    buttonText: "Bekijk Equipment Lease",
    path: "/voor-wie#equipment-lease",
    image: "/images/Q8_e_tron_1920x1920_3.avif",
  },
  {
    id: 4,
    number: "#4",
    title: "Bekijk de voordelen",
    description: "Ontdek de fiscale voordelen",
    descriptionTwo:
      "Leasen biedt gemak en financiële zekerheid. Eén vast maandbedrag dekt kosten zoals onderhoud, verzekering en wegenbelasting. Of je nu kiest voor financieel of operationeel leasen.",
    buttonText: "Bekijk alle voordelen",
    path: "/voor-wie#waarom-leasen",
    image: "/images/1920x1920-q4_2021_2516.avif",
  },
];

const CardsSlider = () => {
  return (
    <div className="bg-stone-800 md:px-1 lg:px-5 xl:p-10 2xl:px-40 p-5 pb-10 md:pb-32 xl:pb-40 pt-20">
      <div className="max-w-[1400px] xl:max-w-[1500px] md:px-5 mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-medium text-white">
          Meer over <span className="text-amber-500"> leasen</span>
        </h2>
        <div className="w-fit pt-2 mb-12">
          <p className="text-[12px] text-green-500 pt-1 uppercase tracking-wider">
            ONZE BLOGS
          </p>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid px-5 max-w-[1400px] xl:max-w-[1500px] mx-auto md:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl shadow-lg overflow-hidden transition-all duration-500"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute top-0 w-full h-full transition-all duration-500 bg-green-800/80"
              style={{
                clipPath: "polygon(0 0, 110% 0, 0 30%, 0 100%)",
              }}
            >
              <div className="absolute p-4 pt-2.5 w-full transition-all duration-500 group-hover:opacity-100">
                <h3 className="text-white custom-shadow-small text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-white/75 text-[12px] custom-shadow-small group-hover:text-white">
                  {item.description}
                </p>
                <div className="w-fit">
                  <p className="text-[30px] font-bold text-green-500/25 pt-1 uppercase tracking-wide">
                    {item.number}
                  </p>
                </div>
              </div>
            </div>
            <Link href={item.path || "#"}>
              <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-black/20 to-black/60 p-2.5 transition-all duration-500 group-hover:via-black/50 group-hover:to-black/90">
                <p className="text-white/50 p-2.5 pb-1.5 text-[12.5px] max-w-md xl:max-w-[275px] absolute bottom-16 custom-shadow-small pt-1 group-hover:text-white">
                  {item.descriptionTwo}
                </p>
                <button className="bg-green-600/50 shadow-inner shadow-green-500/50 font-light tracking-wide outline-green-500 absolute bottom-5 text-[13px] text-white py-2 px-8 rounded-3xl transition-all duration-300 group-hover:tracking-wider group-hover:font-semibold group-hover:shadow-green-500/50">
                  {item.buttonText}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          modules={[Pagination]}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group relative rounded-3xl shadow-lg overflow-hidden transition-all duration-500">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-[55vh] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute top-0 p-4 pt-2 w-full h-full transition-all duration-500 bg-green-800/60 group-hover:bg-green-900/80"
                  style={{
                    clipPath: "polygon(0 0, 110% 0, 0 22%, 0 0%)",
                  }}
                >
                  <h3 className="text-white custom-shadow-small text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-white/75 text-[12px] custom-shadow-small">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-0 p-4 bg-gradient-to-b from-green-900/20 to-green-800/80 group-hover:backdrop-blur-sm group-hover:from-green-900/50 group-hover:to-green-800/90  h-[160px] w-full">
                  <p className="text-white/50 pb-1.5 text-[13px] max-w-[400px] xl:max-w-[275px] absolute bottom-16 custom-shadow-small group-hover:text-white">
                    {item.descriptionTwo}
                  </p>
                  <Link href={item.path || "#"}>
                    <button className="bg-green-600/50 shadow-inner shadow-green-500/50 font-light tracking-wide outline-green-500 absolute bottom-5 text-[13px] text-white py-2 px-8 rounded-3xl transition-all duration-300 group-hover:tracking-wider group-hover:font-semibold group-hover:bg-green-700 group-hover:shadow-green-600">
                      {item.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination-custom flex justify-center mt-4"></div>
      </div>
    </div>
  );
};

export default CardsSlider;
