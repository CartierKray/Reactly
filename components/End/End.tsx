"use client";

import { BiSupport } from "react-icons/bi";

function End() {
  return (
    <div className="flex justify-evenly text-center xl:h-[11.1vh] items-center flex-wrap bg-gradient-to-b from-[#2d3033] to-[#191c1f]">
      <div className="p-5">
        <div
          className="flex text-sm text-white
         items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
          <p className="ml-2 text-[15px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
            Snel op weg
          </p>
        </div>
        <p className="ml-8 text-[14px] font-light text-left footer-text-color hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
          Efficiënt en gemakkelijk
        </p>
      </div>

      <div className="p-5 ">
        <div
          className="flex text-center text-sm
            items-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>

          <p className="ml-2 text-[15px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
            Alle mogelijkheden
          </p>
        </div>
        <p className="ml-8 text-[14px] font-light text-left footer-text-color hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
          Jouw auto, jouw keuze
        </p>
      </div>

      <div className="p-5">
        <div
          className="flex text-center text-sm text-white
         items-center"
        >
          <BiSupport size={24} className="text-white" />

          <p className="ml-2 text-[15px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
            Hulp nodig? Wij zijn er 24/7
          </p>
        </div>
        <p className="ml-5 text-[14px] font-light footer-text-color hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
          Neem contact met ons op
        </p>
      </div>
    </div>
  );
}

export default End;
