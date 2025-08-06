"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductModal from "../SpringModal.tsx/SpringModal";
import DrawerCars from "../Drawer/DrawerCars";
import NavbarNewThree from "../Navbar/NavbarNewThree";
import { Meteors } from "../ui/meteors";
import ModalComponentAanbod from "../Modal/ModalComponentAanbod";

export interface Car {
  details: any;
  id: number;
  year: number;
  name: string;
  description: string;
  km: string;
  fuel: string;
  transmission: string;
  images?: string[]; // Optional array of images
  power: string;
  price: number;
  monthly: number;
  image: string;
  btw: string;
}

interface Product {
  id: number;
  img: string;
  title: string;
  price: number;
  stock: string;
  description: string;
  km: string;
  fuel: string;
  transmission: string;
  btw: string;
  monthly: number;
  images?: string[]; // Voeg deze regel toe
}

const HeaderLeaseAanbod: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const openDrawer = (car: Car) => {
    setSelectedCar(car);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedCar(null);
    setIsDrawerOpen(false);
  };

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    model: "",
    budget: "",
  });

  // Laad auto's vanuit JSON-bestand
  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch("/data/cars.json");
      const data = await res.json();
      setCars(data);
      setFilteredCars(data);
    };

    fetchCars();
  }, []);

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

  // Dynamische filters toepassen
  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesSearch =
        filters.search === "" ||
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesBrand =
        filters.brand === "" ||
        car.name.toLowerCase().includes(filters.brand.toLowerCase());

      const matchesModel =
        filters.model === "" ||
        car.description.toLowerCase().includes(filters.model.toLowerCase());

      const matchesBudget =
        filters.budget === "" ||
        (filters.budget === "1" && car.monthly <= 99) ||
        (filters.budget === "2" && car.monthly >= 0 && car.monthly <= 199) ||
        (filters.budget === "3" && car.monthly >= 0 && car.monthly <= 299) ||
        (filters.budget === "4" && car.monthly >= 0 && car.monthly <= 399) ||
        (filters.budget === "5" && car.monthly >= 0 && car.monthly <= 499) ||
        (filters.budget === "6" && car.monthly >= 0 && car.monthly <= 599) ||
        (filters.budget === "7" && car.monthly >= 0 && car.monthly <= 699) ||
        (filters.budget === "8" && car.monthly >= 0 && car.monthly <= 799) ||
        (filters.budget === "9" && car.monthly >= 0 && car.monthly <= 899) ||
        (filters.budget === "10" && car.monthly >= 0 && car.monthly <= 999) ||
        (filters.budget === "11" && car.monthly >= 1000);

      return matchesSearch && matchesBrand && matchesModel && matchesBudget;
    });

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [filters, cars]);

  // Dynamisch beschikbare modellen filteren
  const availableModels = Array.from(
    new Set(
      cars
        .filter(
          (car) =>
            filters.brand === "" ||
            car.name.toLowerCase().includes(filters.brand.toLowerCase())
        )
        .map((car) => car.description.split(" ")[0]) // Pak bijvoorbeeld het eerste woord als model
    )
  );

  // Verwerk paginering
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const visiblePages = (() => {
    const maxVisible = 3;
    const pages: number[] = [];

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  })();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const sortedCars = cars.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-screen h-fit">
      {/* Filters */}
      <div className="w-screen h-[75%] flex flex-col items-center bg-[#f9f9f9] relative">
        <div className="inset-0 absolute bottom-0 ">
          <Image
            src="/svg/bg-accent-two.svg"
            alt="bg-accent"
            width={1000}
            height={1000}
            className="w-full h-full opacity-10 z-0"
          />
        </div>

        {/* Header Section */}
        <header className="mt-4 sm:mt-0 w-full flex flex-col items-center px-6 py-10 z-10">
          <div className="mt-8 w-full max-w-7xl grid  md:flex flex-wrap md:justify-between items-center gap-4 relative">
            <input
              type="text"
              placeholder="Zoek op trefwoorden"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E2F2C]"
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <select
              className="outline-none rounded-3xl outline py-3 px-6 md:py-3 border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E2F2C]"
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            >
              <option value="">Alle merken</option>
              <option value="Acura">Acura</option>
              <option value="Alfa Romeo">Alfa Romeo</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Audi">Audi</option>
              <option value="Bentley">Bentley</option>
              <option value="BMW">BMW</option>
              <option value="Bugatti">Bugatti</option>
              <option value="Buick">Buick</option>
              <option value="Cadillac">Cadillac</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Chrysler">Chrysler</option>
              <option value="Citroën">Citroën</option>
              <option value="Dacia">Dacia</option>
              <option value="Daewoo">Daewoo</option>
              <option value="Daihatsu">Daihatsu</option>
              <option value="Dodge">Dodge</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Fiat">Fiat</option>
              <option value="Ford">Ford</option>
              <option value="Genesis">Genesis</option>
              <option value="GMC">GMC</option>
              <option value="Honda">Honda</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Infiniti">Infiniti</option>
              <option value="Jaguar">Jaguar</option>
              <option value="Jeep">Jeep</option>
              <option value="Kia">Kia</option>
              <option value="Koenigsegg">Koenigsegg</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Lancia">Lancia</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Lexus">Lexus</option>
              <option value="Lincoln">Lincoln</option>
              <option value="Lotus">Lotus</option>
              <option value="Maserati">Maserati</option>
              <option value="Mazda">Mazda</option>
              <option value="McLaren">McLaren</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Mini">Mini</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Opel">Opel</option>
              <option value="Pagani">Pagani</option>
              <option value="Peugeot">Peugeot</option>
              <option value="Porsche">Porsche</option>
              <option value="Ram">Ram</option>
              <option value="Renault">Renault</option>
              <option value="Rolls-Royce">Rolls-Royce</option>
              <option value="Saab">Saab</option>
              <option value="Seat">Seat</option>
              <option value="Skoda">Skoda</option>
              <option value="Smart">Smart</option>
              <option value="Subaru">Subaru</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Tesla">Tesla</option>
              <option value="Toyota">Toyota</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Volvo">Volvo</option>
            </select>
            <select
              className=" outline-none rounded-3xl outline py-3 px-6 md:py-3 border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E2F2C]"
              onChange={(e) => handleFilterChange("budget", e.target.value)}
            >
              <option value="">Kies je budget</option>
              <option value="1">t/m €99</option>
              <option value="2">t/m €199</option>
              <option value="3">t/m €299</option>
              <option value="4">t/m €399</option>
              <option value="5">t/m €499</option>
              <option value="6">t/m €599</option>
              <option value="7">t/m €699</option>
              <option value="8">t/m €799</option>
              <option value="9">t/m €899</option>
              <option value="10">t/m €999</option>
              <option value="10">€1000+</option>
            </select>
            {/* <button className="flex md:items-center md:justify-center text-white px-6 py-2.5 md:py-3 bg-[#212124] hover:from-black/75 hover:via-black/50 hover:to-black/25 shadow-inner shadow-white/25 hover:shadow-white/35 rounded-full focus:outline-none focus:ring-2 focus:ring-[#c2b293]">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
                    fill="#fff"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
                    fill="#fff"
                  />
                  <script />
                </svg>
                Meer filters
              </span>
            </button> */}

            <button className="flex justify-center px-6 py-3 border bg-white border-gray-300 rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E2F2C]">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 22"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m3-7.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>
                Alpha Deals ({filteredCars.length})
              </span>
            </button>
          </div>
        </header>
      </div>

      {/* Car List Section */}
      <section className="pt-10 pb-20 px-4 md:px-6 bg-gradient-to-b from-[#f9f9f9] to-[#fff] ">
        <div className="max-w-7xl relative mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 gap-y-8">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className=" rounded-xl shadow-inner shadow-white/10 overflow-hidden bg-[#1E2F2C] backdrop-blur-md"
            >
              {/* Smoke Layers */}
              <div className="absolute inset-0 z-0 pointer-events-none">
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
              </div>

              <div className="relative overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={car.image}
                  alt={car.name}
                  className="w-full cursor-pointer z-50 h-72 sm:h-60 md:h-72 xl:h-72 object-cover hover:scale-110 transition transform duration-1000 ease-in-out"
                  onClick={() =>
                    openModal({
                      id: car.id,
                      img: car.image,
                      title: car.name,
                      price: car.price,
                      stock: "1", // of andere dummywaarde indien niet beschikbaar
                      description: car.description,
                      km: car.km,
                      fuel: car.fuel,
                      transmission: car.transmission,
                      btw: car.btw,
                      monthly: car.monthly,
                      images: car.images,
                    })
                  }
                />

                <span className="absolute top-3 right-3 custom-shadow-small bg-[#1E2F2C] shadow-inner shadow-[#4b766e] backdrop-blur-md  text-white text-xs px-3 py-1 rounded-full">
                  {car.year}
                </span>
                <span className="absolute top-7 right-[7px] custom-shadow-small hover:scale-110 transition transform duration-300 ease-in-out text-amber-200 hover:tracking-wider text-xs px-3 py-1 rounded-full">
                  <Image
                    src={"/svg/bovag.svg"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-9 h-10 cursor-pointer"
                  />
                </span>
                <span className="absolute top-[52px] right-2 custom-shadow-small hover:scale-110 transition transform duration-300 ease-in-out text-amber-200 hover:tracking-wider text-xs px-3 py-1 rounded-full">
                  <Image
                    src={"/svg/rdw.svg"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-9 h-10 cursor-pointer"
                  />
                </span>
              </div>
              <div className="p-4">
                <div className="flex flex-col justify-between flex-1">
                  <div className="pt-3 p-6">
                    {/* Bovenkant */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <h3 className="font-medium text-[20px] text-white">
                          {car.name}
                        </h3>
                        <p className="text-gray-400 max-w-[175px] text-[14px]">
                          {car.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[20px] tracking-wider text-white">
                          €{car.price.toLocaleString("nl-NL")}
                        </p>

                        {/* Handgetekende lijn */}
                        <svg
                          className="mt-1 pl-1 w-[90px] h-[10px]" // Zorgt voor goede positie
                          viewBox="0 0 100 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 8 C25 2, 100 0, 100 4"
                            stroke="#FFF"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Subtitel */}
                    {car.power && (
                      <>
                        <div className="w-full flex justify-between">
                          <p className="text-white text-[14px] mt-3">
                            {car.power}
                          </p>
                          {/* <p className="text-white flex items-center mt-3 text-sm">
                            {car.btw}
                          </p> */}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Horizontale lijn */}
                  <hr className="border-white/25 mx-6 py-1" />

                  {/* Onderkant */}
                  <div className="flex divide-x py-2 divide-white/25 text-center text-[15px] font-semibold text-gray-800">
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="text-[13px] text-gray-400 mb-1 tracking-wide">
                        KM
                      </span>
                      <span className="text-white text-sm pt-4">{car.km}</span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="text-[13px] text-gray-400 mb-1 tracking-wide">
                        Transmissie
                      </span>
                      <span className="text-white text-sm pt-4">
                        {car.transmission}
                      </span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="text-[13px] text-gray-400 mb-1 tracking-wide">
                        BTW
                      </span>
                      <span className="text-white text-sm pt-4">{car.btw}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-x-2 mt-3 mb-2">
                  <div className="w-full">
                    <button
                      onClick={() =>
                        openModal({
                          id: car.id,
                          img: car.image,
                          title: car.name,
                          price: car.price,
                          stock: "1", // of andere dummywaarde indien niet beschikbaar
                          description: car.description,
                          km: car.km,
                          fuel: car.fuel,
                          transmission: car.transmission,
                          btw: car.btw,
                          monthly: car.monthly,
                          images: car.images,
                        })
                      }
                      className="flex justify-center w-full bg-[#0f1d1b] hover:tracking-wider backdrop-blur-sm text-white py-2 rounded-md text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out"
                    >
                      Offerte aanvragen
                    </button>
                  </div>

                  <div className=" items-center flex gap-x-2 ">
                    <button
                      className="inline-flex items-center hover:text-white/50 bg-[#0f1d1b] text-white justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-8 w-8 shrink-0"
                      onClick={() => openDrawer(car)}
                    >
                      <div className="block">
                        <svg
                          width="4"
                          height="4"
                          viewBox="0 0 15 15"
                          fill=""
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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
                        className="inline-flex items-center bg-[#0f1d1b] text-white justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  dark:bg-border h-8 w-8 shrink-0"
                        title="Favorite"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 hover:text-red-500 hover:fill-red-500"
                          aria-hidden="true"
                        >
                          <path
                            d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Favorite</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button
            className="px-3 py-1 text-gray-400 hover:text-[#1E2F2C] border rounded-md hover:bg-white"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          <button
            className="px-3 py-1 text-gray-400 hover:text-[#1E2F2C] border rounded-md hover:bg-white"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-white text-gray-400"
                  : "hover:bg-white text-gray-400 hover:text-[#1E2F2C]"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 text-gray-400 hover:text-[#1E2F2C] border rounded-md hover:bg-white"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>

          <button
            className="px-3 py-1 text-gray-400 hover:text-[#1E2F2C] border rounded-md hover:bg-white"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
        <div className="mt-6 text-center tracking-wider text-sm text-gray-400">
          {filteredCars.length > 0 ? (
            <>
              Resultaten weergeven {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredCars.length)} van{" "}
              {filteredCars.length}
            </>
          ) : (
            <span className="text-gray-500">Geen resultaten beschikbaar</span>
          )}
        </div>

        {/* <Meteors number={20} /> */}
      </section>
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

      <DrawerCars
        isOpen={isDrawerOpen}
        car={selectedCar}
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
    </div>
  );
};

export default HeaderLeaseAanbod;
