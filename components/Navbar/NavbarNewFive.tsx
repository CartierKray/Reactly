"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetFour } from "../Sheet/SheetFour";
import Image from "next/image";
import ByTeam from "../ByTeam/ByTeam";

const tabs = [
  {
    key: "web",
    label: "Web Intelligence",
    icon: "/svg/web-inteligence.svg",
    subtitle:
      "Gain a powerful competitive edge with in-depth insights into your digital landscape",
    bannerImage: "/images/stock_image.webp",
  },
  {
    key: "app",
    label: "App Intelligence",
    icon: "/svg/app-inteligence.svg",
    subtitle: "Unlock data on app performance, downloads, engagement, and more",
    bannerImage: "/images/app_image.webp",
  },
  {
    key: "sales",
    label: "Sales Intelligence",
    icon: "/svg/sales-inteligence.svg",
    subtitle: "Track and optimize your B2B sales pipeline and lead generation",
    bannerImage: "/images/8fb4647e51d32ebe1c38.png",
  },
  {
    key: "shopper",
    label: "Shopper Intelligence",
    icon: "/svg/shopper-inteligence.svg",
    subtitle: "Understand shopper behavior to enhance your retail strategy",
    bannerImage: "/images/5fc79a0c57c1475221aa.png",
  },
  {
    key: "stock",
    label: "Stock Intelligence",
    icon: "/svg/stock-inteligence.svg",
    subtitle: "Access inventory levels and product availability insights",
    bannerImage: "/images/643b79e00d9f68e4c696.png",
  },
];

function NavbarNewFive() {
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [navbarHovered, setNavbarHovered] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("web");

  const handleScroll = () => {
    setNavbarSticky(window.scrollY > 50);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className="sticky w-full z-50 transition-all duration-300 top-0"
        onMouseEnter={() => setNavbarHovered(true)}
        onMouseLeave={() => setNavbarHovered(false)}
      >
        <div className="hidden lg:block">{!navbarSticky}</div>

        <div
          className={`sticky w-full transition-all duration-300 ${
            navbarSticky || navbarHovered
              ? "bg-[#000926] text-white"
              : "bg-[transparent] text-white"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between w-full h-14">
              <Link href="/">
                <div className="flex items-start">
                  <div className="text-2xl"></div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center space-x-4">
                {["PRIJZEN", "OVER ONS", "OFFERTE", "CONTACT", "|"].map(
                  (item) => (
                    <div
                      key={item}
                      className="relative group flex items-center"
                    >
                      <button
                        onClick={() => setPopupVisible(true)}
                        className="px-3 hover:tracking-wider xl-nav-link hover:font-semibold transition-all duration-300 ease-in-out py-2 rounded-md text-[11px] font-normal cursor-pointer"
                      >
                        {item}
                      </button>
                    </div>
                  )
                )}
                <div className="hidden lg:flex">
                  <div className="flex items-center scale-90 pt-1">
                    <SheetFour />
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                <div className="flex items-center pt-1.5">
                  <SheetFour />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {popupVisible && (
        <div
          className="fixed p-4 inset-0 z-40 backdrop-blur-sm bg-black/40 flex justify-center items-start pt-20"
          onClick={() => setPopupVisible(false)}
        >
          <div
            className="bg-white max-w-5xl rounded-xl shadow-xl w-full relative z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex">
              <div className="w-fit bg-[#f9fafb] border-r px-4 py-4">
                <div className="flex items-center">
                  <div className="pb-3">
                    <div className="inline-flex bg-white text-black/50 items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none border border-zinc-200 shadow-sm relative h-9 w-9 xl:h-8 xl:w-60 xl:justify-start xl:px-3">
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 xl:mr-2"
                        aria-hidden="true"
                      >
                        <path
                          d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="hidden xl:inline-flex bg-white text-xs w-full focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <hr className="pt-3" />
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li
                      key={tab.key}
                      className={`flex items-center gap-3 hover:tracking-wide hover:font-medium transition-all duration-300 ease-in-out p-2 my-3 rounded-full cursor-pointer ${
                        activeTab === tab.key
                          ? "bg-[#b8e5ff99] border border-[#4bbdff99]/50 text-black"
                          : "hover:bg-[#b9e5fe99] text-black hover:shadow-sm"
                      }`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      <Image
                        src={tab.icon}
                        alt={tab.label}
                        width={24}
                        height={24}
                      />
                      <div className="text-xs font-light">{tab.label}</div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Main Content */}
              <div className="md:flex-1 px-5 py-6 space-y-6 bg-white">
                {/* Banner die wisselt op basis van activeTab */}
                <div className="bg-gradient-to-r from-[#0b1d3b] via-[#133d8b] to-[#266df1] text-white rounded-xl shadow p-4 relative overflow-hidden md:flex min-h-[150px]">
                  <div className="w-1/2 z-10">
                    <h2 className="font-semibold text-lg md:text-xl mb-2 leading-snug">
                      {tabs.find((t) => t.key === activeTab)?.label}
                    </h2>
                    <p className="text-xs opacity-90 mb-4 max-w-xs leading-relaxed">
                      {
                        {
                          web: "Gain a powerful competitive edge with in-depth insights into your digital landscape",
                          app: "Unlock data on app performance, downloads, engagement, and more",
                          sales:
                            "Track and optimize your B2B sales pipeline and lead generation",
                          shopper:
                            "Understand shopper behavior to enhance your retail strategy",
                          stock:
                            "Access inventory levels and product availability insights",
                        }[activeTab]
                      }
                    </p>
                    <a
                      href="#"
                      className="inline-block mb-2 rounded-full bg-white text-[#0b1d3b] px-4 py-1.5 text-xs font-medium shadow hover:bg-gray-100 transition"
                    >
                      Learn more →
                    </a>
                  </div>

                  {/* Afbeelding die verandert per tab */}
                  <div className="absolute bottom-0 right-0 w-[100%] max-w-[200px]">
                    <Image
                      src={
                        {
                          web: "/images/stock_image.webp",
                          app: "/images/app_image.webp",
                          sales: "/images/8fb4647e51d32ebe1c38.png",
                          shopper: "/images/5fc79a0c57c1475221aa.png",
                          stock: "/images/643b79e00d9f68e4c696.png",
                        }[activeTab] || "/images/stock_image.webp"
                      }
                      alt={`${activeTab} visual`}
                      width={500}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                  {/* Market Intelligence */}
                  {activeTab === "web" && (
                    <>
                      <div className="grid grid-cols-2 md:grid-row-2 xl:grid-cols-3 gap-8 pt-1 pb-3 text-sm text-gray-700">
                        {/* Market Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Market Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.361 9.036c.104-.25.122-.527.052-.788L6.38 6.28c.208.056.427.056.635 0l1.1 1.1a1.227 1.227 0 1 0 2.372 0l1.967-1.967a1.227 1.227 0 1 0-.868-.868L9.62 6.513a1.233 1.233 0 0 0-.635 0l-1.1-1.1a1.227 1.227 0 1 0-2.371 0L3.545 7.38a1.227 1.227 0 1 0 .816 1.655ZM14 11.793H2v1.334h12v-1.334Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Market Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.667 2h4v4h2.666v2H14v6H2V6h2.667V2ZM10 8v4.667H8.667V7.333H10V8Zm1.333 4.667h1.334V9.333h-1.334v3.334Zm-5.333 0V3.333h1.333v9.334H6ZM4.667 7.333H3.333v5.334h1.334V7.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Competitor Analysis
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333ZM5.163 8.667V12H3.83V8.667h1.333ZM7.497 12V6.667H6.163V12h1.334ZM9.83 8.667V12H8.497V8.667H9.83ZM12.163 12V6.667H10.83V12h1.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Benchmarking
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.333 1.333a7.4 7.4 0 0 0-.666.03v7.97H14.637a7.339 7.339 0 0 0-7.303-8ZM13.296 8A6.01 6.01 0 0 0 8 2.703V8h5.296Zm-.304 2.667a6.002 6.002 0 1 1-7.659-7.659v1.418a4.656 4.656 0 0 0-2.666 4.24c0 2.56 2.107 4.667 4.666 4.667a4.655 4.655 0 0 0 4.24-2.666h1.419Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Marketing Strategy
                            </li>
                          </ul>
                        </div>

                        {/* SEO Tools */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">SEO Tools</h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  clip-path="url(#ai-chatbot-traffic_svg__clip0_4062_19035)"
                                  fill="#3A5166"
                                >
                                  <path d="m13 6 .943-2.057L16 3l-2.057-.943L13 0l-.943 2.057L10 3l2.057.943L13 6Z"></path>
                                  <path d="M14.34 7v3.61c0 .83-.67 1.5-1.5 1.5h-.54c-.36 0-.65.29-.65.65v.94l-2.22-1.48a.663.663 0 0 0-.36-.11H3.15c-.83 0-1.5-.67-1.5-1.5V5.23c0-.83.67-1.5 1.5-1.5H9v-1.3H3.15c-1.54 0-2.8 1.25-2.8 2.8v5.39c0 1.54 1.25 2.8 2.8 2.8h5.73l3.07 2.04c.11.07.23.11.36.11.1 0 .21-.02.3-.08a.64.64 0 0 0 .34-.57v-1.51a2.807 2.807 0 0 0 2.69-2.8V7h-1.3Z"></path>
                                </g>
                              </svg>
                              AI Chatbot Traffic
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666V5H2V3.333Zm0 3h12v6.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 12.667V6.333ZM3 3.8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 .5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1-.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.881 9.014C7.645 8.338 6.958 7.8 6.195 7.8c-.954 0-1.695.784-1.695 1.75s.773 1.75 1.728 1.75c.752 0 1.406-.537 1.642-1.214h1.74v1.075h1.158v-1.073h.721V9.015H7.881v-.001ZM6.25 10.13a.578.578 0 0 1-.58-.58c0-.322.258-.58.58-.58.322 0 .58.258.58.58 0 .322-.258.58-.58.58Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Keyword Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.375 13.39a.337.337 0 0 0-.245-.1h-.044l-.123.037a3.354 3.354 0 0 1-.577.227 2.55 2.55 0 0 1-.752.11c-.787 0-1.46-.283-2.012-.83a2.719 2.719 0 0 1-.822-2.002c0-.792.271-1.448.822-2.003A2.763 2.763 0 0 1 11.634 8c.787 0 1.46.282 2.012.829.55.555.822 1.21.822 2.003 0 .264-.035.519-.096.764a2.89 2.89 0 0 1-.228.574.384.384 0 0 0 .062.446l1.705 1.73-.822.765-1.714-1.72Zm-1.741-4.252c-.464 0-.857.164-1.18.492-.324.328-.49.737-.49 1.202 0 .464.166.865.498 1.192.324.328.726.492 1.18.492.456 0 .858-.164 1.182-.492.323-.327.49-.737.49-1.201 0-.465-.167-.865-.5-1.193a1.61 1.61 0 0 0-1.18-.492Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h6v-1.334h-6A.667.667 0 0 1 2 12.667V5.333h12V8h1.333V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.298-.666.667-.666h10.666c.368 0 .667.298.667.666V4H2v-.667Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.333 12V6.667H6V12h1.333ZM4.667 8.667V12H3.333V8.667h1.334Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Rank Tracker
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.403 4.27a4.82 4.82 0 0 0-1.331 4.304 4.822 4.822 0 0 0-4.301 1.332l-2.857 2.856a4.825 4.825 0 0 0 0 6.825 4.828 4.828 0 0 0 6.826 0l2.857-2.857a4.82 4.82 0 0 0 1.33-4.304 4.822 4.822 0 0 0 4.302-1.332l2.857-2.856a4.825 4.825 0 0 0 0-6.825 4.828 4.828 0 0 0-6.826 0L10.403 4.27Zm4.271-1.442-2.857 2.856a2.826 2.826 0 0 0-.59 3.133l.975-.975a1 1 0 1 1 1.414 1.414l-.99.99a2.829 2.829 0 0 0 3.19-.566l2.856-2.856a2.825 2.825 0 0 0 0-3.996 2.828 2.828 0 0 0-3.998 0Zm-5.359 7.9-.965.965a1 1 0 1 0 1.414 1.414l.983-.983a2.826 2.826 0 0 1-.564 3.192l-2.857 2.856a2.827 2.827 0 0 1-3.998-3.996l2.857-2.856a2.829 2.829 0 0 1 3.13-.593Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Backlink Analytics
                            </li>
                          </ul>
                        </div>

                        {/* Ad Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Ad Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.295 5.108a.545.545 0 0 1 0 .772L9.113 8.062a.545.545 0 0 1-.771 0l-1.07-1.07L5.478 8.79a.545.545 0 0 1-.772-.771l2.182-2.182a.545.545 0 0 1 .771 0l1.07 1.069 1.795-1.797a.545.545 0 0 1 .772 0Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Display Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="m7 11 2.667-2L7 7v4Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Video Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2 2h13.333v1.333H2V2Zm7.333 3.333h6v1.334h-6V5.333Zm0 3.334h6V10h-6V8.667Zm6 3.333h-6v1.333h6V12ZM7.294 7.402c-.183-.987-.971-1.742-1.96-1.979v-.756H4v.745c-1.154.24-2 1.1-2 2.263 0 1.29 1.005 2 2.531 2.316.976.2 1.469.549 1.469 1.013 0 .57-.533.999-1.333.999-.75 0-1.334-.53-1.334-1.15H2c0 1.167.857 2.129 2 2.403V14h1.333v-.733c1.155-.24 2-1.1 2-2.263 0-1.29-1.01-2.006-2.533-2.317-.977-.203-1.467-.549-1.467-1.012 0-.57.533-.999 1.334-.999.665 0 1.215.422 1.317.97l1.31-.244Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Search Intelligence
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M11.733 8.8V10h-5.4V8.8h5.4Zm0-2.4v1.2h-5.4V6.4h5.4Zm0-2.4v1.2h-5.4V4h5.4ZM5.133 10V8.8h-1.2V10h1.2ZM5.133 7.6V6.4h-1.2v1.2h1.2ZM5.133 5.2V4h-1.2v1.2h1.2Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Site Audit
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  {/* App Intelligence */}
                  {activeTab === "app" && (
                    <>
                      <div className="grid grid-cols-2 md:grid-row-2 xl:grid-cols-3 gap-8 pt-1 pb-3 text-sm text-gray-700">
                        {/* Market Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Market Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.361 9.036c.104-.25.122-.527.052-.788L6.38 6.28c.208.056.427.056.635 0l1.1 1.1a1.227 1.227 0 1 0 2.372 0l1.967-1.967a1.227 1.227 0 1 0-.868-.868L9.62 6.513a1.233 1.233 0 0 0-.635 0l-1.1-1.1a1.227 1.227 0 1 0-2.371 0L3.545 7.38a1.227 1.227 0 1 0 .816 1.655ZM14 11.793H2v1.334h12v-1.334Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Market Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.667 2h4v4h2.666v2H14v6H2V6h2.667V2ZM10 8v4.667H8.667V7.333H10V8Zm1.333 4.667h1.334V9.333h-1.334v3.334Zm-5.333 0V3.333h1.333v9.334H6ZM4.667 7.333H3.333v5.334h1.334V7.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Competitor Analysis
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333ZM5.163 8.667V12H3.83V8.667h1.333ZM7.497 12V6.667H6.163V12h1.334ZM9.83 8.667V12H8.497V8.667H9.83ZM12.163 12V6.667H10.83V12h1.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Benchmarking
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.333 1.333a7.4 7.4 0 0 0-.666.03v7.97H14.637a7.339 7.339 0 0 0-7.303-8ZM13.296 8A6.01 6.01 0 0 0 8 2.703V8h5.296Zm-.304 2.667a6.002 6.002 0 1 1-7.659-7.659v1.418a4.656 4.656 0 0 0-2.666 4.24c0 2.56 2.107 4.667 4.666 4.667a4.655 4.655 0 0 0 4.24-2.666h1.419Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Marketing Strategy
                            </li>
                          </ul>
                        </div>

                        {/* SEO Tools */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">SEO Tools</h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  clip-path="url(#ai-chatbot-traffic_svg__clip0_4062_19035)"
                                  fill="#3A5166"
                                >
                                  <path d="m13 6 .943-2.057L16 3l-2.057-.943L13 0l-.943 2.057L10 3l2.057.943L13 6Z"></path>
                                  <path d="M14.34 7v3.61c0 .83-.67 1.5-1.5 1.5h-.54c-.36 0-.65.29-.65.65v.94l-2.22-1.48a.663.663 0 0 0-.36-.11H3.15c-.83 0-1.5-.67-1.5-1.5V5.23c0-.83.67-1.5 1.5-1.5H9v-1.3H3.15c-1.54 0-2.8 1.25-2.8 2.8v5.39c0 1.54 1.25 2.8 2.8 2.8h5.73l3.07 2.04c.11.07.23.11.36.11.1 0 .21-.02.3-.08a.64.64 0 0 0 .34-.57v-1.51a2.807 2.807 0 0 0 2.69-2.8V7h-1.3Z"></path>
                                </g>
                              </svg>
                              AI Chatbot Traffic
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666V5H2V3.333Zm0 3h12v6.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 12.667V6.333ZM3 3.8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 .5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1-.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.881 9.014C7.645 8.338 6.958 7.8 6.195 7.8c-.954 0-1.695.784-1.695 1.75s.773 1.75 1.728 1.75c.752 0 1.406-.537 1.642-1.214h1.74v1.075h1.158v-1.073h.721V9.015H7.881v-.001ZM6.25 10.13a.578.578 0 0 1-.58-.58c0-.322.258-.58.58-.58.322 0 .58.258.58.58 0 .322-.258.58-.58.58Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Keyword Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.375 13.39a.337.337 0 0 0-.245-.1h-.044l-.123.037a3.354 3.354 0 0 1-.577.227 2.55 2.55 0 0 1-.752.11c-.787 0-1.46-.283-2.012-.83a2.719 2.719 0 0 1-.822-2.002c0-.792.271-1.448.822-2.003A2.763 2.763 0 0 1 11.634 8c.787 0 1.46.282 2.012.829.55.555.822 1.21.822 2.003 0 .264-.035.519-.096.764a2.89 2.89 0 0 1-.228.574.384.384 0 0 0 .062.446l1.705 1.73-.822.765-1.714-1.72Zm-1.741-4.252c-.464 0-.857.164-1.18.492-.324.328-.49.737-.49 1.202 0 .464.166.865.498 1.192.324.328.726.492 1.18.492.456 0 .858-.164 1.182-.492.323-.327.49-.737.49-1.201 0-.465-.167-.865-.5-1.193a1.61 1.61 0 0 0-1.18-.492Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h6v-1.334h-6A.667.667 0 0 1 2 12.667V5.333h12V8h1.333V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.298-.666.667-.666h10.666c.368 0 .667.298.667.666V4H2v-.667Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.333 12V6.667H6V12h1.333ZM4.667 8.667V12H3.333V8.667h1.334Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Rank Tracker
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.403 4.27a4.82 4.82 0 0 0-1.331 4.304 4.822 4.822 0 0 0-4.301 1.332l-2.857 2.856a4.825 4.825 0 0 0 0 6.825 4.828 4.828 0 0 0 6.826 0l2.857-2.857a4.82 4.82 0 0 0 1.33-4.304 4.822 4.822 0 0 0 4.302-1.332l2.857-2.856a4.825 4.825 0 0 0 0-6.825 4.828 4.828 0 0 0-6.826 0L10.403 4.27Zm4.271-1.442-2.857 2.856a2.826 2.826 0 0 0-.59 3.133l.975-.975a1 1 0 1 1 1.414 1.414l-.99.99a2.829 2.829 0 0 0 3.19-.566l2.856-2.856a2.825 2.825 0 0 0 0-3.996 2.828 2.828 0 0 0-3.998 0Zm-5.359 7.9-.965.965a1 1 0 1 0 1.414 1.414l.983-.983a2.826 2.826 0 0 1-.564 3.192l-2.857 2.856a2.827 2.827 0 0 1-3.998-3.996l2.857-2.856a2.829 2.829 0 0 1 3.13-.593Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Backlink Analytics
                            </li>
                          </ul>
                        </div>

                        {/* Ad Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Ad Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.295 5.108a.545.545 0 0 1 0 .772L9.113 8.062a.545.545 0 0 1-.771 0l-1.07-1.07L5.478 8.79a.545.545 0 0 1-.772-.771l2.182-2.182a.545.545 0 0 1 .771 0l1.07 1.069 1.795-1.797a.545.545 0 0 1 .772 0Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Display Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="m7 11 2.667-2L7 7v4Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Video Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2 2h13.333v1.333H2V2Zm7.333 3.333h6v1.334h-6V5.333Zm0 3.334h6V10h-6V8.667Zm6 3.333h-6v1.333h6V12ZM7.294 7.402c-.183-.987-.971-1.742-1.96-1.979v-.756H4v.745c-1.154.24-2 1.1-2 2.263 0 1.29 1.005 2 2.531 2.316.976.2 1.469.549 1.469 1.013 0 .57-.533.999-1.333.999-.75 0-1.334-.53-1.334-1.15H2c0 1.167.857 2.129 2 2.403V14h1.333v-.733c1.155-.24 2-1.1 2-2.263 0-1.29-1.01-2.006-2.533-2.317-.977-.203-1.467-.549-1.467-1.012 0-.57.533-.999 1.334-.999.665 0 1.215.422 1.317.97l1.31-.244Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Search Intelligence
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M11.733 8.8V10h-5.4V8.8h5.4Zm0-2.4v1.2h-5.4V6.4h5.4Zm0-2.4v1.2h-5.4V4h5.4ZM5.133 10V8.8h-1.2V10h1.2ZM5.133 7.6V6.4h-1.2v1.2h1.2ZM5.133 5.2V4h-1.2v1.2h1.2Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Site Audit
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Sales Intelligence */}
                  {activeTab === "sales" && (
                    <>
                      <div className="grid grid-cols-2 md:grid-row-2 xl:grid-cols-3 gap-8 pt-1 pb-3 text-sm text-gray-700">
                        {/* Market Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Market Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.361 9.036c.104-.25.122-.527.052-.788L6.38 6.28c.208.056.427.056.635 0l1.1 1.1a1.227 1.227 0 1 0 2.372 0l1.967-1.967a1.227 1.227 0 1 0-.868-.868L9.62 6.513a1.233 1.233 0 0 0-.635 0l-1.1-1.1a1.227 1.227 0 1 0-2.371 0L3.545 7.38a1.227 1.227 0 1 0 .816 1.655ZM14 11.793H2v1.334h12v-1.334Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Market Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.667 2h4v4h2.666v2H14v6H2V6h2.667V2ZM10 8v4.667H8.667V7.333H10V8Zm1.333 4.667h1.334V9.333h-1.334v3.334Zm-5.333 0V3.333h1.333v9.334H6ZM4.667 7.333H3.333v5.334h1.334V7.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Competitor Analysis
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333ZM5.163 8.667V12H3.83V8.667h1.333ZM7.497 12V6.667H6.163V12h1.334ZM9.83 8.667V12H8.497V8.667H9.83ZM12.163 12V6.667H10.83V12h1.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Benchmarking
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.333 1.333a7.4 7.4 0 0 0-.666.03v7.97H14.637a7.339 7.339 0 0 0-7.303-8ZM13.296 8A6.01 6.01 0 0 0 8 2.703V8h5.296Zm-.304 2.667a6.002 6.002 0 1 1-7.659-7.659v1.418a4.656 4.656 0 0 0-2.666 4.24c0 2.56 2.107 4.667 4.666 4.667a4.655 4.655 0 0 0 4.24-2.666h1.419Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Marketing Strategy
                            </li>
                          </ul>
                        </div>

                        {/* SEO Tools */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">SEO Tools</h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  clip-path="url(#ai-chatbot-traffic_svg__clip0_4062_19035)"
                                  fill="#3A5166"
                                >
                                  <path d="m13 6 .943-2.057L16 3l-2.057-.943L13 0l-.943 2.057L10 3l2.057.943L13 6Z"></path>
                                  <path d="M14.34 7v3.61c0 .83-.67 1.5-1.5 1.5h-.54c-.36 0-.65.29-.65.65v.94l-2.22-1.48a.663.663 0 0 0-.36-.11H3.15c-.83 0-1.5-.67-1.5-1.5V5.23c0-.83.67-1.5 1.5-1.5H9v-1.3H3.15c-1.54 0-2.8 1.25-2.8 2.8v5.39c0 1.54 1.25 2.8 2.8 2.8h5.73l3.07 2.04c.11.07.23.11.36.11.1 0 .21-.02.3-.08a.64.64 0 0 0 .34-.57v-1.51a2.807 2.807 0 0 0 2.69-2.8V7h-1.3Z"></path>
                                </g>
                              </svg>
                              AI Chatbot Traffic
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666V5H2V3.333Zm0 3h12v6.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 12.667V6.333ZM3 3.8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 .5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1-.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.881 9.014C7.645 8.338 6.958 7.8 6.195 7.8c-.954 0-1.695.784-1.695 1.75s.773 1.75 1.728 1.75c.752 0 1.406-.537 1.642-1.214h1.74v1.075h1.158v-1.073h.721V9.015H7.881v-.001ZM6.25 10.13a.578.578 0 0 1-.58-.58c0-.322.258-.58.58-.58.322 0 .58.258.58.58 0 .322-.258.58-.58.58Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Keyword Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.375 13.39a.337.337 0 0 0-.245-.1h-.044l-.123.037a3.354 3.354 0 0 1-.577.227 2.55 2.55 0 0 1-.752.11c-.787 0-1.46-.283-2.012-.83a2.719 2.719 0 0 1-.822-2.002c0-.792.271-1.448.822-2.003A2.763 2.763 0 0 1 11.634 8c.787 0 1.46.282 2.012.829.55.555.822 1.21.822 2.003 0 .264-.035.519-.096.764a2.89 2.89 0 0 1-.228.574.384.384 0 0 0 .062.446l1.705 1.73-.822.765-1.714-1.72Zm-1.741-4.252c-.464 0-.857.164-1.18.492-.324.328-.49.737-.49 1.202 0 .464.166.865.498 1.192.324.328.726.492 1.18.492.456 0 .858-.164 1.182-.492.323-.327.49-.737.49-1.201 0-.465-.167-.865-.5-1.193a1.61 1.61 0 0 0-1.18-.492Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h6v-1.334h-6A.667.667 0 0 1 2 12.667V5.333h12V8h1.333V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.298-.666.667-.666h10.666c.368 0 .667.298.667.666V4H2v-.667Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.333 12V6.667H6V12h1.333ZM4.667 8.667V12H3.333V8.667h1.334Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Rank Tracker
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.403 4.27a4.82 4.82 0 0 0-1.331 4.304 4.822 4.822 0 0 0-4.301 1.332l-2.857 2.856a4.825 4.825 0 0 0 0 6.825 4.828 4.828 0 0 0 6.826 0l2.857-2.857a4.82 4.82 0 0 0 1.33-4.304 4.822 4.822 0 0 0 4.302-1.332l2.857-2.856a4.825 4.825 0 0 0 0-6.825 4.828 4.828 0 0 0-6.826 0L10.403 4.27Zm4.271-1.442-2.857 2.856a2.826 2.826 0 0 0-.59 3.133l.975-.975a1 1 0 1 1 1.414 1.414l-.99.99a2.829 2.829 0 0 0 3.19-.566l2.856-2.856a2.825 2.825 0 0 0 0-3.996 2.828 2.828 0 0 0-3.998 0Zm-5.359 7.9-.965.965a1 1 0 1 0 1.414 1.414l.983-.983a2.826 2.826 0 0 1-.564 3.192l-2.857 2.856a2.827 2.827 0 0 1-3.998-3.996l2.857-2.856a2.829 2.829 0 0 1 3.13-.593Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Backlink Analytics
                            </li>
                          </ul>
                        </div>

                        {/* Ad Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Ad Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.295 5.108a.545.545 0 0 1 0 .772L9.113 8.062a.545.545 0 0 1-.771 0l-1.07-1.07L5.478 8.79a.545.545 0 0 1-.772-.771l2.182-2.182a.545.545 0 0 1 .771 0l1.07 1.069 1.795-1.797a.545.545 0 0 1 .772 0Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Display Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="m7 11 2.667-2L7 7v4Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Video Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2 2h13.333v1.333H2V2Zm7.333 3.333h6v1.334h-6V5.333Zm0 3.334h6V10h-6V8.667Zm6 3.333h-6v1.333h6V12ZM7.294 7.402c-.183-.987-.971-1.742-1.96-1.979v-.756H4v.745c-1.154.24-2 1.1-2 2.263 0 1.29 1.005 2 2.531 2.316.976.2 1.469.549 1.469 1.013 0 .57-.533.999-1.333.999-.75 0-1.334-.53-1.334-1.15H2c0 1.167.857 2.129 2 2.403V14h1.333v-.733c1.155-.24 2-1.1 2-2.263 0-1.29-1.01-2.006-2.533-2.317-.977-.203-1.467-.549-1.467-1.012 0-.57.533-.999 1.334-.999.665 0 1.215.422 1.317.97l1.31-.244Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Search Intelligence
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M11.733 8.8V10h-5.4V8.8h5.4Zm0-2.4v1.2h-5.4V6.4h5.4Zm0-2.4v1.2h-5.4V4h5.4ZM5.133 10V8.8h-1.2V10h1.2ZM5.133 7.6V6.4h-1.2v1.2h1.2ZM5.133 5.2V4h-1.2v1.2h1.2Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Site Audit
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Placeholder tabs */}
                  {activeTab === "shopper" && (
                    <>
                      <div className="grid grid-cols-2 md:grid-row-2 xl:grid-cols-3 gap-8 pt-1 pb-3 text-sm text-gray-700">
                        {/* Market Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Market Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.361 9.036c.104-.25.122-.527.052-.788L6.38 6.28c.208.056.427.056.635 0l1.1 1.1a1.227 1.227 0 1 0 2.372 0l1.967-1.967a1.227 1.227 0 1 0-.868-.868L9.62 6.513a1.233 1.233 0 0 0-.635 0l-1.1-1.1a1.227 1.227 0 1 0-2.371 0L3.545 7.38a1.227 1.227 0 1 0 .816 1.655ZM14 11.793H2v1.334h12v-1.334Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Market Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.667 2h4v4h2.666v2H14v6H2V6h2.667V2ZM10 8v4.667H8.667V7.333H10V8Zm1.333 4.667h1.334V9.333h-1.334v3.334Zm-5.333 0V3.333h1.333v9.334H6ZM4.667 7.333H3.333v5.334h1.334V7.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Competitor Analysis
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333ZM5.163 8.667V12H3.83V8.667h1.333ZM7.497 12V6.667H6.163V12h1.334ZM9.83 8.667V12H8.497V8.667H9.83ZM12.163 12V6.667H10.83V12h1.333Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Benchmarking
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <span className="w-4 h-4">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.333 1.333a7.4 7.4 0 0 0-.666.03v7.97H14.637a7.339 7.339 0 0 0-7.303-8ZM13.296 8A6.01 6.01 0 0 0 8 2.703V8h5.296Zm-.304 2.667a6.002 6.002 0 1 1-7.659-7.659v1.418a4.656 4.656 0 0 0-2.666 4.24c0 2.56 2.107 4.667 4.666 4.667a4.655 4.655 0 0 0 4.24-2.666h1.419Z"
                                    fill="#3A5166"
                                  />
                                </svg>
                              </span>
                              Marketing Strategy
                            </li>
                          </ul>
                        </div>

                        {/* SEO Tools */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">SEO Tools</h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  clip-path="url(#ai-chatbot-traffic_svg__clip0_4062_19035)"
                                  fill="#3A5166"
                                >
                                  <path d="m13 6 .943-2.057L16 3l-2.057-.943L13 0l-.943 2.057L10 3l2.057.943L13 6Z"></path>
                                  <path d="M14.34 7v3.61c0 .83-.67 1.5-1.5 1.5h-.54c-.36 0-.65.29-.65.65v.94l-2.22-1.48a.663.663 0 0 0-.36-.11H3.15c-.83 0-1.5-.67-1.5-1.5V5.23c0-.83.67-1.5 1.5-1.5H9v-1.3H3.15c-1.54 0-2.8 1.25-2.8 2.8v5.39c0 1.54 1.25 2.8 2.8 2.8h5.73l3.07 2.04c.11.07.23.11.36.11.1 0 .21-.02.3-.08a.64.64 0 0 0 .34-.57v-1.51a2.807 2.807 0 0 0 2.69-2.8V7h-1.3Z"></path>
                                </g>
                              </svg>
                              AI Chatbot Traffic
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666V5H2V3.333Zm0 3h12v6.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 12.667V6.333ZM3 3.8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 .5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1-.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.881 9.014C7.645 8.338 6.958 7.8 6.195 7.8c-.954 0-1.695.784-1.695 1.75s.773 1.75 1.728 1.75c.752 0 1.406-.537 1.642-1.214h1.74v1.075h1.158v-1.073h.721V9.015H7.881v-.001ZM6.25 10.13a.578.578 0 0 1-.58-.58c0-.322.258-.58.58-.58.322 0 .58.258.58.58 0 .322-.258.58-.58.58Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Keyword Research
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.375 13.39a.337.337 0 0 0-.245-.1h-.044l-.123.037a3.354 3.354 0 0 1-.577.227 2.55 2.55 0 0 1-.752.11c-.787 0-1.46-.283-2.012-.83a2.719 2.719 0 0 1-.822-2.002c0-.792.271-1.448.822-2.003A2.763 2.763 0 0 1 11.634 8c.787 0 1.46.282 2.012.829.55.555.822 1.21.822 2.003 0 .264-.035.519-.096.764a2.89 2.89 0 0 1-.228.574.384.384 0 0 0 .062.446l1.705 1.73-.822.765-1.714-1.72Zm-1.741-4.252c-.464 0-.857.164-1.18.492-.324.328-.49.737-.49 1.202 0 .464.166.865.498 1.192.324.328.726.492 1.18.492.456 0 .858-.164 1.182-.492.323-.327.49-.737.49-1.201 0-.465-.167-.865-.5-1.193a1.61 1.61 0 0 0-1.18-.492Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h6v-1.334h-6A.667.667 0 0 1 2 12.667V5.333h12V8h1.333V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.298-.666.667-.666h10.666c.368 0 .667.298.667.666V4H2v-.667Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M7.333 12V6.667H6V12h1.333ZM4.667 8.667V12H3.333V8.667h1.334Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Rank Tracker
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.403 4.27a4.82 4.82 0 0 0-1.331 4.304 4.822 4.822 0 0 0-4.301 1.332l-2.857 2.856a4.825 4.825 0 0 0 0 6.825 4.828 4.828 0 0 0 6.826 0l2.857-2.857a4.82 4.82 0 0 0 1.33-4.304 4.822 4.822 0 0 0 4.302-1.332l2.857-2.856a4.825 4.825 0 0 0 0-6.825 4.828 4.828 0 0 0-6.826 0L10.403 4.27Zm4.271-1.442-2.857 2.856a2.826 2.826 0 0 0-.59 3.133l.975-.975a1 1 0 1 1 1.414 1.414l-.99.99a2.829 2.829 0 0 0 3.19-.566l2.856-2.856a2.825 2.825 0 0 0 0-3.996 2.828 2.828 0 0 0-3.998 0Zm-5.359 7.9-.965.965a1 1 0 1 0 1.414 1.414l.983-.983a2.826 2.826 0 0 1-.564 3.192l-2.857 2.856a2.827 2.827 0 0 1-3.998-3.996l2.857-2.856a2.829 2.829 0 0 1 3.13-.593Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Backlink Analytics
                            </li>
                          </ul>
                        </div>

                        {/* Ad Intelligence */}
                        <div className="px-2">
                          <h5 className="font-semibold mb-3">
                            Ad Intelligence
                          </h5>
                          <ul className="space-y-2.5 text-[11px]">
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.295 5.108a.545.545 0 0 1 0 .772L9.113 8.062a.545.545 0 0 1-.771 0l-1.07-1.07L5.478 8.79a.545.545 0 0 1-.772-.771l2.182-2.182a.545.545 0 0 1 .771 0l1.07 1.069 1.795-1.797a.545.545 0 0 1 .772 0Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Display Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.667 1.333h10.666a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm0 1.334A.667.667 0 0 0 2 3.333V4h12v-.667a.667.667 0 0 0-.667-.666H2.667ZM14 5.333H2v7.334c0 .368.299.666.667.666h10.666a.667.667 0 0 0 .667-.666V5.333Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="m7 11 2.667-2L7 7v4Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Video Advertising
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2 2h13.333v1.333H2V2Zm7.333 3.333h6v1.334h-6V5.333Zm0 3.334h6V10h-6V8.667Zm6 3.333h-6v1.333h6V12ZM7.294 7.402c-.183-.987-.971-1.742-1.96-1.979v-.756H4v.745c-1.154.24-2 1.1-2 2.263 0 1.29 1.005 2 2.531 2.316.976.2 1.469.549 1.469 1.013 0 .57-.533.999-1.333.999-.75 0-1.334-.53-1.334-1.15H2c0 1.167.857 2.129 2 2.403V14h1.333v-.733c1.155-.24 2-1.1 2-2.263 0-1.29-1.01-2.006-2.533-2.317-.977-.203-1.467-.549-1.467-1.012 0-.57.533-.999 1.334-.999.665 0 1.215.422 1.317.97l1.31-.244Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Search Intelligence
                            </li>
                            <li className="flex items-center gap-2 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.333 1.333H2.667a2 2 0 0 0-2 2v7.334a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.299-.666.667-.666h10.666c.369 0 .667.298.667.666v7.334a.667.667 0 0 1-.667.666H2.667A.667.667 0 0 1 2 10.667V3.333ZM5 13.33h6v1.333H5V13.33Z"
                                  fill="#3A5166"
                                ></path>
                                <path
                                  d="M11.733 8.8V10h-5.4V8.8h5.4Zm0-2.4v1.2h-5.4V6.4h5.4Zm0-2.4v1.2h-5.4V4h5.4ZM5.133 10V8.8h-1.2V10h1.2ZM5.133 7.6V6.4h-1.2v1.2h1.2ZM5.133 5.2V4h-1.2v1.2h1.2Z"
                                  fill="#3A5166"
                                ></path>
                              </svg>
                              Site Audit
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="pt-6">
                        <ByTeam />
                      </div>
                    </>
                  )}

                  {/* Placeholder tabs */}
                  {activeTab === "stock" && (
                    <>
                      <p className="text-sm text-gray-600">
                        <ByTeam />
                      </p>
                    </>
                  )}
                </main>
              </div>
            </div>

            <div className="flex bg-[#e9eeff]/50 justify-end">
              <a
                href="#"
                className="text-[10px] p-3 py-2 px-4 text-black font-normal flex items-center gap-1 hover:underline"
              >
                Explore API →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarNewFive;
