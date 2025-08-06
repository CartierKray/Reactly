// Deze file is aangepast voor sticky sidebar vanaf md en behoudt volledige card-styling

"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import DrawerCars from "../Drawer/DrawerCars";
import ModalComponentAanbod from "../Modal/ModalComponentAanbod";

export interface Car {
  id: number;
  year: number;
  name: string;
  description: string;
  km: string;
  fuel: string;
  transmission: string;
  images?: string[];
  power: string;
  price: number;
  monthly: number;
  image: string;
  btw: string;
  details: string; // <-- verplicht veld
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
  images?: string[];
}

const HeaderLeaseAanbodTwo: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const itemsPerPage = 12;
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    model: "",
    budget: "",
    transmission: "",
    margin: "",
    kmFrom: "",
    kmTo: "",
    yearFrom: "",
    yearTo: "",
    fuel: "",
    body: "",
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      brand: "",
      model: "",
      budget: "",
      transmission: "",
      margin: "",
      kmFrom: "",
      kmTo: "",
      yearFrom: "",
      yearTo: "",
      fuel: "",
      body: "",
    });
  };

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
        (filters.budget === "2" && car.monthly <= 199) ||
        (filters.budget === "3" && car.monthly <= 299) ||
        (filters.budget === "4" && car.monthly <= 399) ||
        (filters.budget === "5" && car.monthly <= 499) ||
        (filters.budget === "6" && car.monthly <= 599) ||
        (filters.budget === "7" && car.monthly <= 699) ||
        (filters.budget === "8" && car.monthly <= 799) ||
        (filters.budget === "9" && car.monthly <= 899) ||
        (filters.budget === "10" && car.monthly <= 999) ||
        (filters.budget === "11" && car.monthly >= 1000);

      const matchesTransmission =
        filters.transmission === "" ||
        car.transmission.toLowerCase() === filters.transmission.toLowerCase();

      const matchesMargin =
        filters.margin === "" ||
        (filters.margin === "Ja" && car.btw?.toLowerCase().includes("marge")) ||
        (filters.margin === "Nee" && !car.btw?.toLowerCase().includes("marge"));

      const matchesKm =
        (!filters.kmFrom ||
          parseInt(car.km.replace(/\D/g, "")) >= parseInt(filters.kmFrom)) &&
        (!filters.kmTo ||
          parseInt(car.km.replace(/\D/g, "")) <= parseInt(filters.kmTo));

      const matchesYear =
        (!filters.yearFrom || car.year >= parseInt(filters.yearFrom)) &&
        (!filters.yearTo || car.year <= parseInt(filters.yearTo));

      const matchesFuel =
        filters.fuel === "" ||
        car.fuel.toLowerCase().includes(filters.fuel.toLowerCase());

      const matchesBody =
        filters.body === "" ||
        car.description.toLowerCase().includes(filters.body.toLowerCase());

      return (
        matchesSearch &&
        matchesBrand &&
        matchesModel &&
        matchesBudget &&
        matchesTransmission &&
        matchesMargin &&
        matchesKm &&
        matchesYear &&
        matchesFuel &&
        matchesBody
      );
    });

    // Sorteer alfabetisch op naam
    const sorted = filtered.sort((a, b) =>
      a.name.localeCompare(b.name, "nl", { sensitivity: "base" })
    );

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [filters, cars]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="w-full justify-center pt-8 2xl:pt-10 flex flex-col md:flex-row">
      {/* Sticky Sidebar (md+) */}
      {/* <div className="max-w-[300px]">
        <aside className="hidden md:block justify-start w-full sticky top-10 h-screen overflow-y-auto p-6">
          <h2 className="text-3xl font-medium mt-1 mb-4">Filters</h2>
          <input
            type="text"
            placeholder="Zoek op trefwoorden"
            className="mb-4 w-full px-4 py-2 bg-[#f0f0f0] border border-gray-300 rounded-full"
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
          <select
            className="mb-4 w-full px-4 py-2 border border-gray-300 dark:text-black/50 bg-[#f0f0f0] rounded-full"
            onChange={(e) => handleFilterChange("brand", e.target.value)}
          >
            <option className="" value="">
              Alle merken
            </option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
          </select>
          <select
            className="mb-4 w-full px-4 bg-[#f0f0f0] py-2 border dark:text-black/50 border-gray-300 rounded-full"
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
            <option value="11">€1000+</option>
          </select>
          <select
            className="mb-4 w-full px-4 py-2 border bg-[#f0f0f0] dark:text-black/50 border-gray-300 rounded-full"
            onChange={(e) => handleFilterChange("transmission", e.target.value)}
          >
            <option value="">Transmissie</option>
            <option value="Handgeschakeld">Handgeschakeld</option>
            <option value="Automaat">Automaat</option>
          </select>

          <div className="mb-4 flex gap-2">
            <input
              type="number"
              placeholder="KM van"
              className="w-1/2 px-4 py-2 border bg-[#f0f0f0] border-gray-300 rounded-full"
              onChange={(e) => handleFilterChange("kmFrom", e.target.value)}
            />
            <input
              type="number"
              placeholder="tot"
              className="w-1/2 px-4 py-2 border bg-[#f0f0f0] border-gray-300 rounded-full"
              onChange={(e) => handleFilterChange("kmTo", e.target.value)}
            />
          </div>

          <div className="mb-4 flex gap-2">
            <input
              type="number"
              placeholder="Bouwjaar van"
              className="w-1/2 px-4 py-2 border bg-[#f0f0f0] border-gray-300 rounded-full"
              onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
            />
            <input
              type="number"
              placeholder="tot"
              className="w-1/2 px-4 py-2 border bg-[#f0f0f0] border-gray-300 rounded-full"
              onChange={(e) => handleFilterChange("yearTo", e.target.value)}
            />
          </div>

          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 bg-[#f0f0f0] border-gray-300 rounded-full"
            onChange={(e) => handleFilterChange("fuel", e.target.value)}
          >
            <option value="">Brandstof</option>
            <option value="Benzine">Benzine</option>
            <option value="Hybride benzine">Hybride benzine</option>
            <option value="Elektriciteit">Elektriciteit</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybride diesel">Hybride diesel</option>
          </select>

          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 bg-[#f0f0f0] border-gray-300 rounded-full"
            onChange={(e) => handleFilterChange("body", e.target.value)}
          >
            <option value="">Carrosserie</option>
            <option value="SUV">SUV / Terreinwagen</option>
            <option value="Stationwagen">Stationwagen</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="MPV">MPV</option>
          </select>

          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 bg-[#f0f0f0] border-gray-300 rounded-full"
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">Status</option>
            <option value="Beschikbaar">Beschikbaar</option>
            <option value="Verkocht">Verkocht</option>
            <option value="Gereserveerd">Gereserveerd</option>
            <option value="Verwacht">Verwacht</option>
          </select>

          <select
            className="mb-4 w-full px-4 py-2 bg-[#f0f0f0] border border-gray-300 dark:text-black/50 rounded-full"
            onChange={(e) => handleFilterChange("margin", e.target.value)}
          >
            <option value="">Marge</option>
            <option value="Ja">Ja</option>
            <option value="Nee">Nee</option>
          </select>
          <button className="w-full dark:bg-red-600 dark:shadow-red-400 hover:tracking-wider text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out  bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white rounded-full py-2">
            Toon {filteredCars.length} Resultaten
          </button>
           <button
    onClick={resetFilters}
    className="w-full bg-white border border-gray-300 text-gray-700 font-medium rounded-full py-2 hover:bg-gray-100 transition-all duration-200 dark:bg-[#2a2a2a] dark:text-white/80 dark:hover:bg-[#3a3a3a]"
  >
    Reset filters
  </button>
        </aside>
      </div> */}
      <div className="max-w-[300px]">
        <aside className="hidden md:block sticky top-10 h-screen overflow-y-auto px-4 py-6 rounded-2xl bg-transparent">
          <h2 className="text-3xl font-medium mt-1 mb-4">Filters</h2>

          {/* Trefwoord */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Zoeken
            </label>
            <input
              type="text"
              placeholder="Bijv. GTI, 4x4"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-4 py-2 rounded-xl border dark:border-[#3e3e3e] border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#c2b293]"
            />
          </div>

          {/* Merk */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Merk
            </label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
            >
              <option value="">Alle merken</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
            </select>
          </div>

          {/* Budget */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Budget
            </label>
            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange("budget", e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
            >
              <option value="">Kies je budget</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  t/m €{(i + 1) * 100 - 1}
                </option>
              ))}
              <option value="11">€1000+</option>
            </select>
          </div>

          {/* Transmissie */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Transmissie
            </label>
            <select
              value={filters.transmission}
              onChange={(e) =>
                handleFilterChange("transmission", e.target.value)
              }
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
            >
              <option value="">Alles</option>
              <option value="Handgeschakeld">Handgeschakeld</option>
              <option value="Automaat">Automaat</option>
            </select>
          </div>

          {/* Kilometerstand */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Kilometerstand
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Van"
                value={filters.kmFrom}
                onChange={(e) => handleFilterChange("kmFrom", e.target.value)}
                className="w-1/2 px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
              />
              <input
                type="number"
                placeholder="Tot"
                value={filters.kmTo}
                onChange={(e) => handleFilterChange("kmTo", e.target.value)}
                className="w-1/2 px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
              />
            </div>
          </div>

          {/* Bouwjaar */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Bouwjaar
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Van"
                value={filters.yearFrom}
                onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                className="w-1/2 px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
              />
              <input
                type="number"
                placeholder="Tot"
                value={filters.yearTo}
                onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                className="w-1/2 px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
              />
            </div>
          </div>

          {/* Brandstof */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Brandstof
            </label>
            <select
              value={filters.fuel}
              onChange={(e) => handleFilterChange("fuel", e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
            >
              <option value="">Alles</option>
              <option value="Benzine">Benzine</option>
              <option value="Hybride benzine">Hybride benzine</option>
              <option value="Elektriciteit">Elektriciteit</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride diesel">Hybride diesel</option>
            </select>
          </div>

          {/* Carrosserie */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Carrosserie
            </label>
            <select
              value={filters.body}
              onChange={(e) => handleFilterChange("body", e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
            >
              <option value="">Alles</option>
              <option value="SUV">SUV / Terreinwagen</option>
              <option value="Stationwagen">Stationwagen</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="MPV">MPV</option>
            </select>
          </div>

          {/* Status */}
          {/* <div className="mb-5">
      <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">Status</label>
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
      >
        <option value="">Alles</option>
        <option value="Beschikbaar">Beschikbaar</option>
        <option value="Verkocht">Verkocht</option>
        <option value="Gereserveerd">Gereserveerd</option>
        <option value="Verwacht">Verwacht</option>
      </select>
    </div> */}

          {/* Marge */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 dark:text-white/80 mb-1">
              Marge
            </label>
            <select
              value={filters.margin}
              onChange={(e) => handleFilterChange("margin", e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:bg-[#2a2a2a] dark:border-[#3e3e3e]"
            >
              <option value="">Alles</option>
              <option value="Ja">Ja</option>
              <option value="Nee">Nee</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            {/* Reset */}
            {/* <button
              onClick={resetFilters}
              className="w-full bg-white border text-sm border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-all duration-200 dark:bg-[#2a2a2a] dark:text-white/80 dark:hover:bg-[#3a3a3a] py-2.5"
            >
              Reset filters
            </button> */}
            <button
              onClick={resetFilters}
              className="w-full text-center uppercase text-xs pb-2 text-gray-700 font-medium rounded-full transition-all duration-200 dark:text-white/80"
            >
              Reset filters
            </button>

            {/*Toon Resultaten */}
            <button className="w-full dark:bg-red-600 dark:shadow-red-400 hover:tracking-wider text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white rounded-full py-2.5">
              Toon {filteredCars.length} Resultaten
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile Filters (zichtbaar onder md) */}
      <div className="block md:hidden p-4">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Zoek op trefwoorden"
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 border-gray-300 bg-[#f0f0f0] rounded-full"
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 border-gray-300 bg-[#f0f0f0] rounded-full"
            onChange={(e) => handleFilterChange("brand", e.target.value)}
          >
            <option value="">Alle merken</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
          </select>
          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 border-gray-300 bg-[#f0f0f0] rounded-full"
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
            <option value="11">€1000+</option>
          </select>
          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 border-gray-300 bg-[#f0f0f0] rounded-full"
            onChange={(e) => handleFilterChange("transmission", e.target.value)}
          >
            <option value="">Transmissie</option>
            <option value="Handgeschakeld">Handgeschakeld</option>
            <option value="Automaat">Automaat</option>
          </select>
          <select
            className="mb-4 w-full px-4 py-2 border dark:text-black/50 border-gray-300 bg-[#f0f0f0] rounded-full"
            onChange={(e) => handleFilterChange("margin", e.target.value)}
          >
            <option value="">Marge</option>
            <option value="Ja">Ja</option>
            <option value="Nee">Nee</option>
          </select>
        </div>

        <button className="w-full dark:bg-red-600 dark:shadow-red-400 hover:tracking-wider text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white rounded-full py-2.5">
          Toon {filteredCars.length} Resultaten
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 max-w-7xl py-7">
        <div className="mb-4 hidden md:block">
          <div className="text-3xl font-medium">Zoek naar uw droomauto</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 ">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="flex flex-col justify-between h-full rounded-xl overflow-hidden dark:bg-[#282828] dark:shadow-[#444444] dark:border-none bg-[#f0f0f0] shadow-[#ffffff] border border-[#fcfcfc] shadow-inner backdrop-blur-md"
            >
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
                      stock: "1",
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
                <span className="absolute top-3 right-3 dark:shadow-inner dark:bg-[#282828] dark:shadow-[#626262] custom-shadow-small bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white text-xs px-3 py-1 rounded-full">
                  {car.year}
                </span>
                <span className="absolute top-7 right-[7px] custom-shadow-small text-xs px-3 py-1 rounded-full">
                  <Image
                    src={"/svg/bovag.svg"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-9 h-10 cursor-pointer"
                  />
                </span>
                <span className="absolute top-[52px] right-2 custom-shadow-small text-xs px-3 py-1 rounded-full">
                  <Image
                    src={"/svg/rdw.svg"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-9 h-10 cursor-pointer"
                  />
                </span>
              </div>

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
                      onClick={() =>
                        openModal({
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
                        })
                      }
                      className="flex justify-center dark:bg-white dark:text-black dark:shadow-none w-full bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] hover:tracking-wider text-white py-2 rounded-md text-sm z-10 hover:font-semibold transition-all duration-300 ease-in-out"
                    >
                      Offerte aanvragen
                    </button>
                  </div>

                  <div className="items-center flex gap-x-2">
                    <button
                      className="inline-flex items-center bg-[#c2b293] dark:bg-white dark:shadow-none dark:text-red-600 hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white justify-center rounded-md text-sm h-8 w-8"
                      onClick={() => openDrawer(car)}
                    >
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
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-20 flex justify-center items-center space-x-2">
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

          {Array.from(
            { length: Math.ceil(filteredCars.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
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
            disabled={
              currentPage === Math.ceil(filteredCars.length / itemsPerPage)
            }
          >
            ›
          </button>

          <button
            className="px-3 py-1 text-gray-400 hover:text-[#1E2F2C] border rounded-md hover:bg-white"
            onClick={() =>
              setCurrentPage(Math.ceil(filteredCars.length / itemsPerPage))
            }
            disabled={
              currentPage === Math.ceil(filteredCars.length / itemsPerPage)
            }
          >
            »
          </button>
        </div>

        <div className="mt-6 text-center mb-12 tracking-wider text-sm text-gray-400">
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
      </main>

      {/* Modals */}
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
        onClose={() => setIsDrawerOpen(false)}
        onOfferteClick={(car) => {
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
          setIsDrawerOpen(false);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default HeaderLeaseAanbodTwo;
