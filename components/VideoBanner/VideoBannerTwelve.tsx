"use client";

import { LogIn, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import NavbarNewThree from "../Navbar/NavbarNewThree";
import ParticleLinks from "../Particles/ParticleLinks";
import Image from "next/image";
import BeterLeaseLogoTwo from "../BeterLeaseLogo/BeterLeaseLogoTwo";
import { Meteors } from "../ui/meteors";

const VideoBannerTwelve: React.FC = () => {
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [navbarHovered, setNavbarHovered] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSticky(true);
    } else {
      setNavbarSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent/75 via-transparent/50 to-transparent">
        <NavbarNewThree />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[70vh] object-cover"
      >
        <source src="/video/AlphaLeaseGroupVideo.mp4" type="video/mp4" />
        Jouw browser onderst
      </video>
      {/* Placeholder Image (naast de video)
      <div className="w-full h-[100vh] relative">
        <Image
          src="/images/cq5dam.web.2880 (1).webp"
          alt="Placeholder Alpha Lease Group"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
*/}
      {/* <div className="inset-0 absolute">
        <ParticleLinks />
      </div> */}

      {/* <div className="block md:hidden">
        <Image
          alt="A description of the image"
          src="/images/2016 Audi RS6 C7 5 Stage4 1200hp Quattro - Matte black - Amsterdam - Netherlands 02.jpg"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="hidden md:block">
        <Image
          alt="A description of the image"
          src="/images/2016 Audi RS6 C7 5 Stage4 1200hp Quattro - Matte black - Amsterdam - Netherlands 02.jpg"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div> */}

      {/* Center */}
      <div className=" absolute top-0 w-full left-0 right-0 bottom-0 flex flex-col justify-center md:items-start md:text-start items-center text-center p-8 md:p-10">
        <div className="w-full flex flex-col items-center md:px-6 py-10 z-10">
          <div className="flex items-center items-justify-center">
            <BeterLeaseLogoTwo />
          </div>
          {/* <h1 className="text-[46px] text-white custom-shadow-small leading-[3.0rem] md:leading-none md:text-5xl tracking-wide lg:text-6xl  font-semibold text-center pb-4 lg:pb-2">
            Vind Jouw
            <br className="flex md:hidden" />
            <span className="bg-gradient-to-b bg-clip-text leading-[3.0rem] md:leading-none md:text-5xl tracking-wide lg:text-6xl font-semibold text-center">
              {" "}
              Perfecte Auto!
            </span>
          </h1> */}

          <Banner />

          {/* <div className="flex items-center space-x-2 pb-4 pt-8 text-white">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#FABB05" // Beige-achtig
                  className="w-5 h-5"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FABB05"
                className="w-5 h-5"
              >
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#FABB05" />
                    <stop offset="50%" stopColor="white" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half)"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </div>
            <p className="text-sm">4.5/5 op basis van 218 reviews</p>
          </div> */}

          {/* <Link className="w-full max-w-[680px] " href="/aanbod">
            <div className=" mb-5 md:mb-2 flex justify-start w-full mx-auto">
              <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 outline-white outline mt-8 w-[75%] md:w-1/2 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-white group-hover:text-black hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                  Ontdek de mogelijkheden
                </span>
                <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </button>
            </div>
          </Link> */}

          <div className="hidden md:block w-full max-w-[380px] md:max-w-[480px] mx-auto mb-5 md:mb-2 mt-8">
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
              {/* Ontdek de mogelijkheden */}
              <Link href="/aanbod" className="w-full md:w-1/2">
                <button className="relative w-full font-light text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-white rounded-full overflow-hidden group">
                  <span className="relative z-10 text-black group-hover:text-black transition-all duration-500">
                    Bekijk ons aanbod
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
                </button>
              </Link>

              {/* Neem contact op */}
              <Link href="/contact" className="w-full md:w-1/2">
                <button className="relative w-full font-light text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                  <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                    Neem contact op
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
                </button>
              </Link>
            </div>
          </div>

          <div className="md:hidden block w-full max-w-[380px] md:max-w-[480px] mx-auto mb-5 md:mb-2 md:mt-8 mt-10">
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
              {/* Neem contact op */}
              <Link href="/contact" className="w-full md:w-1/2">
                <button className="relative w-full font-light text-[14px] backdrop-blur-xl outline outline-1 outline-white hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2 pb-2 bg-transparent rounded-full overflow-hidden group">
                  <span className="relative z-10 text-white group-hover:text-black transition-all duration-500">
                    Neem contact op
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500"></span>
                </button>
              </Link>
            </div>
          </div>

          {/* <div className="mt-10 mb-5">
            <SheetOne />
          </div> */}
        </div>
      </div>

      {/* <footer className="absolute bottom-0 w-full bg-transparent items-center justify-center hover:bg-stone-800 hover:text-white hover:font-normal tranform transition-all duration-300 ease-in-out text-white text-center py-4 px-3 md:px-3"> */}
      <footer className="absolute bottom-2 md:bottom-4 w-full bg-transparent items-center justify-center hoverbackdrop-blur-sm hover:text-white hover:font-normal tranform transition-all duration-300 ease-in-out text-white text-center py-4 px-3 md:px-3">
        <div className="w-full flex justify-center items-center">
          {/* <div className="text-[10px] max-w-sm md:max-w-full md:text-[11px] font-light text-center">
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Alle merken en modellen
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Geen aanbetaling nodig
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              BOVAG en Autrotrust
            </span>
          </div> */}
          <div className="flex text-sm items-center space-x-2 pt-6 text-white">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#FFC107" // Groen
                  className="w-5 h-5"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#c5b59c"
                className="w-5 h-5"
              >
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#FFC107" />
                    <stop offset="50%" stopColor="white" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half)"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </div>
            <p className="text-xs hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer">
              4.5/5 op basis van 248 reviews
            </p>
          </div>
        </div>
      </footer>
      <div className="hidden md:block">
        <Meteors number={20} />
      </div>
    </div>
  );
};

export default VideoBannerTwelve;
