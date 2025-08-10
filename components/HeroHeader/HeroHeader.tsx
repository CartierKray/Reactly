"use client";

import { useEffect, useState } from "react";
import { ChevronDown, LayoutTemplate, Search } from "lucide-react";
import NavbarNewFour from "../Navbar/NavbarNewFour";
import Image from "next/image";
import dynamic from "next/dynamic";
import NavbarNewFive from "../Navbar/NavbarNewFive";

const Meteors = dynamic(
  () => import("../ui/meteors").then((mod) => mod.Meteors),
  {
    ssr: false,
  }
);

export default function HeroHeader() {
  const [domain, setDomain] = useState("");

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

  return (
    <div className="relative overflow-x-clip bg-[#000926] text-white flex flex-col items-center justify-start gap-12">
      {/* Smoke Layers */}
      {/* <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/images/smoke1.png"
          alt="smoke1"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_8s_linear_infinite] left-[-50%] top-[-5%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_15s_linear_infinite] left-[-10%] top-[-45%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_10s_linear_infinite] right-[-25%] top-[-15%] w-[2000px] max-w-none mix-blend-screen"
        />
      </div> */}
      {/* NavBar */}

      {/* <NavbarNewFour /> */}
      {/* <NavbarNewFive /> */}

      {/* Titel */}
      <h1 className="text-center z-20 mt-10  text-4xl sm:text-5xl font-semibold leading-snug">
        Uw partner in premium <br className="hidden md:flex" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ad2a3] to-[#1658ea]">
          en exclusieve
        </span>{" "}
        web analyse
      </h1>

      {/* Zoekbox voor mobile -md */}
      <div className="w-full z-20 max-w-md bg-[#0f112e] rounded-2xl p-6 shadow-lg border border-[#1e223e] relative flex flex-col gap-4 md:hidden">
        <div className="flex z-50 items-center justify-between bg-[#111736] rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 text-white">
            <LayoutTemplate size={18} />
            <span className="text-sm">Website</span>
          </div>
          <ChevronDown size={16} className="text-white" />
        </div>

        <div className="flex items-center bg-[#111736] rounded-lg px-4 py-3 gap-2">
          <Search size={18} className="text-white" />
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter a domain"
            className="bg-transparent outline-none w-full placeholder-white/70 text-sm text-white"
          />
        </div>

        <button className="bg-[#2563eb] hover:bg-[#1e4ed8] text-white text-sm font-medium py-3 rounded-full w-full flex justify-center items-center">
          <span>Get insights</span>
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m15.834 7.5 1.042-2.292 2.291-1.041-2.291-1.042L15.834.833l-1.042 2.292-2.291 1.042 2.291 1.042L15.834 7.5Zm0 5-1.042 2.292-2.291 1.042 2.291 1.041 1.042 2.292 1.042-2.292 2.291-1.041-2.291-1.042-1.042-2.292ZM7.501 3.334l2.083 4.583L14.167 10l-4.583 2.084-2.083 4.583-2.084-4.584L.834 10l4.583-2.083 2.084-4.583Zm0 9.308.825-1.817L10.142 10l-1.816-.825L7.5 7.358l-.825 1.817L4.859 10l1.817.825.825 1.817Z"
                fill="#fff"
              />
            </svg>
          </span>
        </button>

        <div
          className="absolute inset-0 rounded-2xl border border-[#1e223e] pointer-events-none"
          style={{ boxShadow: "0 0 30px 10px rgba(0, 119, 255, 0.2)" }}
        />
      </div>

      {/* Zoekbox voor md+ */}
      <div className="hidden md:scale-95 lg:scale-100 p z-20 md:flex mt-10 items-center bg-[#0c1128] border border-[#1e223e] rounded-full px-3 py-2 md:py-3.5 shadow-[0_0_40px_5px_rgba(0,123,255,0.2)] w-full max-w-4xl mx-auto space-x-2">
        <div className="flex items-center gap-2 bg-[#111736] text-white px-4 py-2 rounded-full text-sm font-medium">
          <LayoutTemplate size={16} />
          <span className="md:py-2 md:pr-20">Website</span>
          <ChevronDown size={14} />
        </div>

        <div className="flex-1 bg-[#111736] text-white text-sm px-4 w-full py-2   rounded-full flex items-center gap-2">
          <Search size={16} />
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter a domain"
            className="bg-transparent md:py-2 outline-none w-full placeholder-white/70"
          />
        </div>

        <button className="bg-[rgb(37,99,235)] hover:bg-[#1e4ed8] md:px-10 text-white text-sm font-medium px-6 py-2 rounded-full transition-colors duration-200 flex items-center">
          <span className="md:py-2 pr-2">Get insights</span>
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m15.834 7.5 1.042-2.292 2.291-1.041-2.291-1.042L15.834.833l-1.042 2.292-2.291 1.042 2.291 1.042L15.834 7.5Zm0 5-1.042 2.292-2.291 1.042 2.291 1.041 1.042 2.292 1.042-2.292 2.291-1.041-2.291-1.042-1.042-2.292ZM7.501 3.334l2.083 4.583L14.167 10l-4.583 2.084-2.083 4.583-2.084-4.584L.834 10l4.583-2.083 2.084-4.583Zm0 9.308.825-1.817L10.142 10l-1.816-.825L7.5 7.358l-.825 1.817L4.859 10l1.817.825.825 1.817Z"
                fill="#fff"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Video */}
      <div className="flex gap-4 lg:max-w-7xl mb-20 md:mb-10 w-full justify-center items-start mt-6 px-4">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover rounded-xl shadow-xl"
        >
          <source src="/video/desktop-website-homepage.mp4" type="video/mp4" />
          Jouw browser ondersteunt geen video.
        </video>
      </div>

      <div className="inset-0 absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#000926] pointer-events-none"></div>
      <div className="hidden md:block">{/* <Meteors number={20} /> */}</div>
    </div>
  );
}
