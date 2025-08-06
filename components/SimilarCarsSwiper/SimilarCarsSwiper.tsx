// components/SimilarCarsSwiper.tsx
"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/Product";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SimilarCarsSwiper({ cars }: { cars: Product[] }) {
  const router = useRouter();

  return (
    <>
      <div className="pb-20 p-6 pt-10 max-w-7xl mx-auto ">
        <h2 className="text-2xl lg:text-3xl font-medium mb-10 text-black dark:text-white">
          Andere interessante auto&apos;s
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation
          breakpoints={{
            640: { slidesPerView: 1.25 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation]}
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id} className="h-full">
              <div
                onClick={() => router.push(`/auto/${car.id}`)}
                className="flex flex-col justify-between min-h-[650px] max-h-[680px] h-full rounded-xl overflow-hidden dark:bg-[#282828] dark:shadow-[#444444] dark:border-none bg-[#f0f0f0] shadow-[#ffffff] border border-[#fcfcfc] shadow-inner backdrop-blur-md"
              >
                <Image
                  src={
                    car.image.startsWith("http")
                      ? car.image
                      : `/` + car.image.replace(/^\//, "")
                  }
                  alt={car.name}
                  width={800}
                  height={500}
                  className="w-full h-72 lg:h-60 object-cover"
                />
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div className="flex-1">
                    <div className="pt-3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                          <h3 className="font-medium text-[20px] dark:text-white text-black">
                            {car.name}
                          </h3>
                          <p className="text-gray-600 max-w-[175px] dark:text-white/50 text-[12.5px]">
                            {car.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[20px] tracking-wider dark:text-white text-black">
                            €{car.price.toLocaleString("nl-NL")}
                          </p>
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

                      {car.power && (
                        <div className="w-full flex justify-between">
                          <div>
                            <p className="text-black dark:text-white text-[14px] mt-3">
                              {car.power}
                            </p>
                          </div>
                          <div className="">
                            <p className="text-black dark:text-white/50 font-medium tracking-wide text-[10px] mt-4">
                              Leasen vanaf €
                              {Math.round(car.monthly).toLocaleString("nl-NL")}{" "}
                              p/m <span className="text-red-600">*</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <hr className="border-black/10 dark:border-white/20 mx-6 py-1" />

                    <div className="flex divide-x py-2 divide-black/10 dark:divide-white/20 text-center text-[15px] font-semibold text-gray-800">
                      <div className="flex-1 p-5 flex flex-col">
                        <span className="text-[13px] text-gray-600 dark:text-white/50 mb-1 tracking-wide">
                          KM
                        </span>
                        <span className="text-black dark:text-white text-sm pt-4">
                          {car.km}
                        </span>
                      </div>
                      <div className="flex-1 p-5 flex flex-col">
                        <span className="text-[13px] text-gray-600 dark:text-white/50 mb-1 tracking-wide">
                          Transmissie
                        </span>
                        <span className="text-black dark:text-white text-sm pt-4">
                          {car.transmission}
                        </span>
                      </div>
                      <div className="flex-1 p-5 flex flex-col">
                        <span className="text-[13px] text-gray-600 dark:text-white/50 mb-1 tracking-wide">
                          BTW
                        </span>
                        <span className="text-black dark:text-white text-sm pt-4">
                          {car.btw}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-x-2 mt-3 mb-2">
                    <div className="w-full">
                      <button
                        onClick={() => router.push(`/auto/${car.id}`)}
                        className="flex justify-center dark:bg-white dark:text-black dark:shadow-none w-full bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] hover:tracking-wider text-white py-2 rounded-md text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out"
                      >
                        Bekijken
                      </button>
                    </div>

                    <div className="items-center flex gap-x-2">
                      <button className="inline-flex items-center bg-[#c2b293] dark:bg-white dark:shadow-none dark:text-red-600 hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white justify-center rounded-md text-sm h-8 w-8">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 hover:text-black"
                        >
                          <path
                            d="M7.5 11C4.8 11 2.5 9.6 1.1 7.5C2.5 5.4 4.8 4 7.5 4C10.2 4 12.5 5.4 13.9 7.5C12.5 9.6 10.2 11 7.5 11ZM7.5 3C4.3 3 1.7 4.7 0.1 7.2C-0.03 7.4 -0.03 7.6 0.1 7.8C1.7 10.3 4.3 12 7.5 12C10.7 12 13.3 10.3 14.9 7.8C15 7.6 15 7.4 14.9 7.2C13.3 4.7 10.7 3 7.5 3ZM7.5 9.5C8.6 9.5 9.5 8.6 9.5 7.5C9.5 6.4 8.6 5.5 7.5 5.5C6.4 5.5 5.5 6.4 5.5 7.5C5.5 8.6 6.4 9.5 7.5 9.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>

                      <button
                        className="inline-flex items-center dark:bg-white dark:shadow-none dark:text-red-600 bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white justify-center rounded-md text-sm h-8 w-8"
                        title="Favorite"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 hover:text-red-500 hover:fill-red-500"
                        >
                          <path
                            d="M4.9 2.35C3.5 2.35 2.35 3.5 2.35 4.9C2.35 6.4 3.2 7.9 4.37 9.34C5.39 10.58 6.59 11.67 7.5 12.48C8.41 11.67 9.61 10.58 10.63 9.34C11.79 7.9 12.65 6.4 12.65 4.9C12.65 3.5 11.51 2.35 10.1 2.35C9.27 2.35 8.82 2.64 8.54 2.96C8.28 3.25 8.15 3.59 8.03 3.89C8 3.94 7.98 4 7.96 4.05C7.88 4.23 7.7 4.35 7.5 4.35C7.3 4.35 7.12 4.23 7.04 4.05C7.02 4 7 3.94 6.98 3.89C6.85 3.59 6.72 3.25 6.46 2.96C6.18 2.64 5.73 2.35 4.9 2.35Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
