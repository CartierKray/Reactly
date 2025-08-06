"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import NavbarNew from "../Navbar/NavbarNew";
import NavbarNewTwo from "../Navbar/NavbarNewTwo";

interface Car {
  id: number;
  year: number;
  name: string;
  description: string;
  km: string;
  fuel: string;
  transmission: string;
  power: string;
  price: number;
  monthly: number;
  image: string;
}

function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    model: "",
    budget: "",
  });

  // Load cars from JSON
  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch("/data/cars.json");
      const data = await res.json();
      setCars(data);
      setFilteredCars(data);
    };

    fetchCars();
  }, []);

  // Dynamisch filters toepassen
  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesSearch =
        filters.search === "" ||
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.fuel.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.transmission.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.year.toString().includes(filters.search) ||
        car.power.toLowerCase().includes(filters.search);

      const matchesBrand =
        filters.brand === "" ||
        car.name.toLowerCase().includes(filters.brand.toLowerCase());

      const matchesModel =
        filters.model === "" ||
        car.description.toLowerCase().includes(filters.model.toLowerCase());

      const matchesBudget =
        filters.budget === "" ||
        (filters.budget === "1" && car.monthly >= 100 && car.monthly <= 199) ||
        (filters.budget === "2" && car.monthly >= 200 && car.monthly <= 299) ||
        (filters.budget === "3" && car.monthly >= 300 && car.monthly <= 399) ||
        (filters.budget === "4" && car.monthly >= 400 && car.monthly <= 499) ||
        (filters.budget === "5" && car.monthly >= 500 && car.monthly <= 599) ||
        (filters.budget === "6" && car.monthly >= 600 && car.monthly <= 699) ||
        (filters.budget === "7" && car.monthly >= 700 && car.monthly <= 799) ||
        (filters.budget === "8" && car.monthly >= 800 && car.monthly <= 899) ||
        (filters.budget === "9" && car.monthly >= 900 && car.monthly <= 999);

      return matchesSearch && matchesBrand && matchesModel && matchesBudget;
    });

    setFilteredCars(filtered);
    setCurrentPage(1); // Reset naar pagina 1 bij nieuwe filters
  }, [filters, cars]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // Berekening van auto's voor de huidige pagina
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  // Aantal pagina's
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <>
      {/* Car List Section */}
      <section className="pt-10 pb-20 px-4 md:px-6 bg-gradient-to-b from-[#1a1a1a] to-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 gap-y-8">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="border border-white/5 rounded-2xl shadow-inner shadow-white/10 overflow-hidden bg-white/5 backdrop-blur-md"
            >
              <div className="relative overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={car.image}
                  alt={car.name}
                  className="w-full h-72 sm:h-60 md:h-72 xl:h-72 object-cover hover:scale-110 transition transform duration-300 ease-in-out"
                />
                <span className="absolute top-3 right-3 custom-shadow-small  shadow-inner shadow-amber-400 bg-amber-500  text-amber-200 text-xs px-3 py-1 rounded-full">
                  {car.year}
                </span>
                <span className="absolute top-7 right-1.5 custom-shadow-small hover:scale-110 transition transform duration-300 ease-in-out text-amber-200 hover:tracking-wider text-xs px-3 py-1 rounded-full">
                  <Image
                    src={"/svg/bovag.svg"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-10 h-10 cursor-pointer"
                  />
                </span>
                <span className="absolute top-[52px] right-2 custom-shadow-small hover:scale-110 transition transform duration-300 ease-in-out text-amber-200 hover:tracking-wider text-xs px-3 py-1 rounded-full">
                  <Image
                    src={"/svg/rdw.svg"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-10 h-10 cursor-pointer"
                  />
                </span>
                {/* <span className="absolute top-8 right-0 custom-shadow-small hover:scale-110 transition transform duration-300 ease-in-out text-amber-200 hover:tracking-wider text-xs px-3 py-1 rounded-full">
                    <Image
                      src={"/svg/bovag.svg"}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-[52px] h-10"
                    />
                  </span>
                  <span className="absolute top-16 right-0 custom-shadow-small hover:scale-110 transition transform duration-300 ease-in-out text-amber-200 hover:tracking-wider text-xs px-3 py-1 rounded-full">
                    <Image
                      src={"/svg/rdw.svg"}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-[52px] h-10"
                    />
                  </span> */}
              </div>
              <div className="p-4">
                <h3 className="font-semibold w-full text-center custom-shadow-small text-2xl  pb-1.5 text-white">
                  {car.name}
                </h3>
                <p className="text-white font-medium w-full custom-shadow-small pb-2 text-center text-sm">
                  {car.description}
                </p>
                <ul className="mt-2 mb-4 grid grid-cols-2 gap-y-2 w-full text-sm pt-4 text-gray-500 pb-2">
                  <li className="text-center">
                    <strong className="font-normal text-white/75 custom-shadow-small">
                      {car.km}
                    </strong>
                  </li>
                  <li className="text-center">
                    <strong className="font-normal text-white/75 custom-shadow-small">
                      {car.fuel}
                    </strong>
                  </li>
                  <li className="text-center">
                    <strong className="font-normal text-white/75 custom-shadow-small">
                      {car.transmission}
                    </strong>
                  </li>
                  <li className="text-center">
                    <strong className="font-normal text-white/75 custom-shadow-small">
                      {car.power}
                    </strong>
                  </li>
                </ul>

                <hr className="border-white/5" />

                <div className="mt-4 w-full text-center">
                  <p className="text-md font-semibold text-white tracking-wide">
                    € {car.price.toLocaleString()}
                  </p>
                  <p className="text-amber-500 tracking-wider text-2xl pt-4 pb-2 font-medium custom-shadow-small">
                    € {car.monthly},-{" "}
                    <span className="font-normal tracking-wider text-sm">
                      {" "}
                      p/m
                    </span>
                  </p>
                </div>
                <button className="mt-4 w-full py-2 bg-amber-500 shadow-inner shadow-amber-400 hover:shadow-inner hover:shadow-green-500 hover:bg-green-600 text-white rounded-full  transition">
                  Offerte aanvragen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          {/* Eerste pagina knop */}
          <button
            className="px-3 py-1 text-white hover:text-black border rounded-md hover:bg-white"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          {/* Paginanummers */}
          {Array.from({ length: Math.min(10, totalPages) }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`px-4 py-2 tracking-widest border rounded-md ${
                  currentPage === page
                    ? "bg-white text-black font-bold"
                    : "hover:bg-white text-white hover:text-black"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          {/* Laatste pagina knop */}
          {totalPages > 10 && <span className="px-4 py-2">...</span>}
          <button
            className="px-3 py-1 text-white hover:text-black border rounded-md hover:bg-white "
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
        <div className="mt-6 text-center tracking-wider text-sm text-white/50">
          Resultaten weergeven {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, filteredCars.length)} van{" "}
          {filteredCars.length}
        </div>
      </section>
    </>
  );
}

export default Carlist;
