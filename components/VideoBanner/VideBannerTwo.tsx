"use client";

import { LogIn, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetDemo } from "../Sheet/SheetThree";
import { SheetFour } from "../Sheet/SheetFour";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import NavbarNew from "../Navbar/NavbarNew";
import Image from "next/image";
import { SheetOne } from "../Sheet/Sheet";
import Banner from "../Banner/Banner";
import NavbarNewTwo from "../Navbar/NavbarNewTwo";
import NavbarNewThree from "../Navbar/NavbarNewThree";

const VideoBannerTwo: React.FC = () => {
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
    <div className="relative w-full h-[55vh] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#171719] via-transparent/50 to-[#171719]">
        <NavbarNewThree />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[55vh] object-cover"
      >
        <source src="/video/AlphaLeaseGroupVideo.mp4" type="video/mp4" />
        Jouw browser ondersteunt geen video tag.
      </video>
      {/* <div className="block md:hidden">
        <Image
          alt="A description of the image"
          src="/images/wallpaper-mercedes.jpg"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="hidden md:block">
        <Image
          alt="A description of the image"
          src="/images/wallpaper-mercedes.jpg"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div> */}

      {/* Center */}
      <div className="-mt-10 lg:-mt-20 absolute top-0 w-full left-0 right-0 bottom-0 flex flex-col justify-center md:items-start md:text-start items-center text-center p-8 md:p-10">
        <div className="w-full flex flex-col items-center md:px-6 py-10 z-10">
          <h1 className="text-[46px] bg-gradient-to-b from-white via-gray-300 to-gray-800 text-transparent bg-clip-text leading-[3.0rem] md:leading-none md:text-5xl tracking-wide lg:text-7xl xl:text-[77px] font-bold text-center pb-4 lg:pb-2">
            Vind Jouw
            <br className="flex md:hidden" />
            <span className="bg-gradient-to-b bg-clip-text leading-[3.0rem] md:leading-none md:text-5xl tracking-wide lg:text-7xl xl:text-[77px] font-bold text-center">
              {" "}
              Perfecte Auto!
            </span>
          </h1>

          <Banner />

          {/* Filter Section */}
          <div className="lg:mt-5 hidden lg:flex lg:bg-black/25 shadow-2xl lg:backdrop-blur-md lg:p-3 lg:pl-3 lg:pr-3 lg:rounded-full w-full max-w-3xl lg:max-w-5xl  flex-col lg:flex-row gap-4 z-30 relative">
            <input
              type="text"
              placeholder="Zoek op trefwoorden..."
              className="flex-1 px-4 py-3 border backdrop-blur-sm bg-white/25 placeholder:text-white/80 custom-shadow-small text-white border-white/5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f00]"
            />
            <select className="flex-1 px-4 py-3 border backdrop-blur-sm  bg-white/25 text-white custom-shadow-small trakcing-wide border-white/5 placeholder:text-white/50 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f00]">
              <option value="">Alle merken</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Tesla">Tesla</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Toyota">Toyota</option>
              <option value="Ford">Ford</option>
              <option value="Volvo">Volvo</option>
              <option value="Porsche">Porsche</option>
              <option value="Nissan">Nissan</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Kia">Kia</option>
              <option value="Peugeot">Peugeot</option>
              <option value="Renault">Renault</option>
              <option value="Mazda">Mazda</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Jaguar">Jaguar</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Honda">Honda</option>
              <option value="Lexus">Lexus</option>
              <option value="Fiat">Fiat</option>
              <option value="Jeep">Jeep</option>
              <option value="Subaru">Subaru</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Mini">Mini</option>
            </select>
            <select className="flex-1 px-4 py-3 border backdrop-blur-sm bg-white/25 text-white custom-shadow-small trakcing-wide border-white/5 placeholder:text-white/50 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f00]">
              <option value="">Alle modellen</option>
              {/* Audi */}
              <option value="Audi A1">Audi A1</option>
              <option value="Audi A3">Audi A3</option>
              <option value="Audi A4">Audi A4</option>
              <option value="Audi A6">Audi A6</option>
              <option value="Audi Q3">Audi Q3</option>
              <option value="Audi Q5">Audi Q5</option>
              <option value="Audi Q7">Audi Q7</option>
              {/* BMW */}
              <option value="BMW 1 Series">BMW 1 Series</option>
              <option value="BMW 2 Series">BMW 2 Series</option>
              <option value="BMW 3 Series">BMW 3 Series</option>
              <option value="BMW 5 Series">BMW 5 Series</option>
              <option value="BMW 7 Series">BMW 7 Series</option>
              <option value="BMW X1">BMW X1</option>
              <option value="BMW X3">BMW X3</option>
              <option value="BMW X5">BMW X5</option>
              {/* Mercedes-Benz */}
              <option value="Mercedes A-Class">Mercedes-Benz A-Class</option>
              <option value="Mercedes C-Class">Mercedes-Benz C-Class</option>
              <option value="Mercedes E-Class">Mercedes-Benz E-Class</option>
              <option value="Mercedes GLA">Mercedes-Benz GLA</option>
              <option value="Mercedes GLC">Mercedes-Benz GLC</option>
              <option value="Mercedes GLE">Mercedes-Benz GLE</option>
              {/* Tesla */}
              <option value="Tesla Model S">Tesla Model S</option>
              <option value="Tesla Model 3">Tesla Model 3</option>
              <option value="Tesla Model X">Tesla Model X</option>
              <option value="Tesla Model Y">Tesla Model Y</option>
              {/* Volkswagen */}
              <option value="Volkswagen Golf">Volkswagen Golf</option>
              <option value="Volkswagen Passat">Volkswagen Passat</option>
              <option value="Volkswagen Tiguan">Volkswagen Tiguan</option>
              <option value="Volkswagen Polo">Volkswagen Polo</option>
              <option value="Volkswagen ID.3">Volkswagen ID.3</option>
              <option value="Volkswagen ID.4">Volkswagen ID.4</option>
              {/* Toyota */}
              <option value="Toyota Yaris">Toyota Yaris</option>
              <option value="Toyota Corolla">Toyota Corolla</option>
              <option value="Toyota RAV4">Toyota RAV4</option>
              <option value="Toyota Camry">Toyota Camry</option>
              <option value="Toyota Hilux">Toyota Hilux</option>
              {/* Ford */}
              <option value="Ford Fiesta">Ford Fiesta</option>
              <option value="Ford Focus">Ford Focus</option>
              <option value="Ford Mustang">Ford Mustang</option>
              <option value="Ford Ranger">Ford Ranger</option>
              <option value="Ford Puma">Ford Puma</option>
              {/* Volvo */}
              <option value="Volvo XC40">Volvo XC40</option>
              <option value="Volvo XC60">Volvo XC60</option>
              <option value="Volvo XC90">Volvo XC90</option>
              <option value="Volvo V60">Volvo V60</option>
              <option value="Volvo S90">Volvo S90</option>
              {/* Porsche */}
              <option value="Porsche 911">Porsche 911</option>
              <option value="Porsche Cayenne">Porsche Cayenne</option>
              <option value="Porsche Macan">Porsche Macan</option>
              <option value="Porsche Taycan">Porsche Taycan</option>
            </select>
            <select className="flex-1 px-4 py-3 border backdrop-blur-sm bg-white/25 text-white custom-shadow-small trakcing-wide border-white/5 placeholder:text-white/50 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f00]">
              <option value="">Kies je budget</option>
              <option value="1">Alle deals</option>
              <option value="1">€100 t/m €199</option>
              <option value="2">€200 t/m €299</option>
              <option value="3">€300 t/m €399</option>
              <option value="4">€400 t/m €499</option>
              <option value="5">€500 t/m €599</option>
              <option value="6">€600 t/m €699</option>
              <option value="7">€700 t/m €799</option>
              <option value="8">€800 t/m €899</option>
              <option value="9">€900 t/m €999</option>
              <option value="1">€1000+</option>
            </select>
            <Link className="" href={"/aanbod"}>
              <button className="hidden lg:block mt-[1.5px] custom-shadow-small tracking-wide px-[13.5px] lg:px-[0.5px]  hover:tracking-widest hover:font-medium transition-all duration-300 ease-in-out bg-red-700 shadow-red-500 shadow-inner hover:shadow-red-400 text-white rounded-full">
                <Search className="scale-90 m-3" />
              </button>
            </Link>
          </div>

          <Link className="w-full flex lg:hidden" href="/aanbod">
            <div className=" mb-5 md:mb-2 flex justify-start w-full mx-auto">
              <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 outline-white outline mt-8 w-[75%] md:w-1/2 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-white group-hover:text-black hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                  Bekijk ons volledige aanbod
                </span>
                <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </button>
            </div>
          </Link>

          {/* <div className="mt-10 mb-5">
            <SheetOne />
          </div> */}
        </div>
      </div>

      {/* <footer className="absolute bottom-0 w-full bg-transparent items-center justify-center hover:bg-stone-800 hover:text-white hover:font-normal tranform transition-all duration-300 ease-in-out text-white text-center py-4 px-3 md:px-3"> */}
      <footer className="absolute bottom-0 w-full bg-transparent items-center justify-center hover:backdrop-blur-sm hover:text-white hover:font-normal tranform transition-all duration-300 ease-in-out text-white text-center py-4 px-3 md:px-3">
        <div className="w-full flex justify-center items-center">
          <div className="text-[10px] max-w-sm md:max-w-full md:text-[11px] font-light text-center">
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
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Rijden binnen een week
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Leasen zonder jaarcijfers ook voor starters
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoBannerTwo;
