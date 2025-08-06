// components/ReviewSlider.tsx
"use client";

import Image from "next/image";
import React from "react";

const reviews = [
  {
    score: 1,
    text: "Als huurder werk ik graag mee aan een keuring. WK heeft dan ook alle toegang gehad. Hoe ze er mee omgaan en ho...",
    name: "G",
    date: "19-12-2024",
  },
  {
    score: 8,
    text: "Uitgebreide keuring voor een energie label. Mail was niet gekomen, na hiervoor contact te hebben gehad, was de...",
    name: "L.",
    date: "18-12-2024",
  },
  {
    score: 9,
    text: "Heel prettig kontakt met de persoon die bij mij geHeel goed.weest is.",
    name: "B.G.",
    date: "18-12-2024",
  },
  {
    score: 10,
    text: "Afspraak gemaakt en goed geholpen met het energielabel.",
    name: "Aswin",
    date: "16-12-2024",
  },
];

const ReviewSlider = () => {
  return (
    <section className="rounded-3xl outline outline-[#f9f9f9] dark:outline-none dark:border-none dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] shadow-lg max-w-7xl mx-auto md:mt-0 lg:p-10 pb-10 mb-5 lg:pb-5 ">
      <div className="max-w-7xl grid lg:flex space-x-5 md:space-x-10 lg:space-x-20 mx-auto">
        <div className="mb-8 pt-12 lg:pt-12 pl-5 md:pl-10 lg:pl-0 pb-7">
          <h2 className="text-3xl whitespace-nowrap font-semibold tracking-wide mb-6">
            WAT VINDEN ONZE <br className="md:hidden lg:flex" />
            KLANTEN
          </h2>
          <div className="flex items-center md:gap-16 pt-2 gap-40">
            <div className="relative w-[80px] h-[80px]">
              <Image
                src="/images/klantenvertellen_logo.png"
                alt="score"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 flex justify-center items-center font-bold text-black">
                9.5
              </div>
            </div>
            <div>
              <div className="text-yellow-500 text-xl">★★★★☆</div>
              <div className="text-2xl font-semibold">232</div>
              <p className="text-sm dark:text-white/75 text-gray-600">
                Beoordelingen
              </p>
            </div>
          </div>
          <button className="mt-10 md:mt-10 dark:text-white text-xl whitespace-nowrap font-semibold text-black flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-ou">
            Bekijk alle beoordelingen{" "}
            <span className="text-green-500 text-xl">→</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 w-full">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className=" min-h-[300px] min-w-[230px] bg-white/25 max-w-[280px] italic font-serif shadow-md rounded-xl p-6"
              >
                <div className="relative pt-2 w-[72px] h-[72px]">
                  <Image
                    src="/images/klantenvertellen_logo.png"
                    alt="score"
                    width={1000}
                    height={1000}
                  />
                  <div className="absolute inset-0 pt-2 flex justify-center items-center font-bold text-black">
                    {review.score}
                  </div>
                </div>
                <p className="italic text-sm mt-6 dark:text-white pt-4 text-gray-800 mb-6">
                  “{review.text}“
                </p>
                <div className="font-bold text-sm dark:text-white  pt-6">
                  {review.name}
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white/50">
                  {review.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
