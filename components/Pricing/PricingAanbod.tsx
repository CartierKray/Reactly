/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import InfinitiveMovingCardsIMG from "../InfinitiveMovingCards/InfinitiveMovingCardsIMG";
import FAQSection from "../FaqSection/FaqSection";
import PricingPlans from "./PricingPlans";
import DirectAdvies from "../DirectAdvies/DirectAdvies";
import DirectAdviesTwo from "../DirectAdvies/DirectAdviesTwo";
import ReviewSlider from "../Reviews/ReviewSlider";
import { Reviews } from "../Reviews/Reviews";

const tabs = [
  {
    key: "web",
    label: "Web inteligence",
    icon: "/svg/web-inteligence.svg",
    title: "Web Inteligence",
    subtitle:
      "For marketers, researchers, and SEO/ PPC teams looking for web traffic insights.",
  },
  {
    key: "app",
    label: "App inteligence",
    icon: "/svg/app-inteligence.svg",
    title: "App Inteligence",
    subtitle:
      "For marketers, analysts, and product teams who want to grow their app with competitive insights and benchmarks.",
  },
  {
    key: "sales",
    label: "Sales inteligence",
    icon: "/svg/sales-inteligence.svg",
    title: "Sales Inteligence",
    subtitle:
      "For B2B sales teams looking to discover and qualify new prospects using digital signals.",
  },
  {
    key: "shopper",
    label: "Shopper inteligence",
    icon: "/svg/shopper-inteligence.svg",
    title: "Shopper Inteligence",
    subtitle:
      "For ecommerce and category managers optimizing performance and competition insights.",
  },
  {
    key: "stock",
    label: "Stock Inteligence",
    icon: "/svg/stock-inteligence.svg",
    title: "Stock Inteligence",
    subtitle:
      "For hedge funds and investors seeking fundamental signals from consumer behavior.",
  },
];

export default function PricingAanbod() {
  const [activeTab, setActiveTab] = useState("financial lease");
  const activeContent = tabs.find((tab) => tab.key === activeTab);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-[#e9eeff] relative">
      <div className="flex flex-col gap-5 lg:flex-row max-w-7xl mx-auto w-full">
        {/* Sidebar md */}
        <div className="lg:hidden px-4 pt-6">
          <div
            className="bg-white rounded-3xl shadow p-4 flex items-center justify-between cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-3">
              <Image
                src={activeContent?.icon || ""}
                alt={activeContent?.label || ""}
                width={32}
                height={32}
              />
              <div>
                <h3 className="font-semibold text-sm text-[#0a2640]">
                  {activeContent?.label}
                </h3>
                <p className="text-xs text-[#667085] leading-tight">
                  {activeContent?.subtitle.slice(0, 50)}
                </p>
              </div>
            </div>
            <svg
              className={`transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="#34475e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {isDropdownOpen && (
            <div className="mt-2 rounded-3xl shadow bg-white overflow-hidden">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className={cn(
                    "flex items-start gap-3 p-4 border-t cursor-pointer transition-all",
                    activeTab === tab.key
                      ? "bg-[#f2f8ff]"
                      : "hover:bg-[#f9fbff]"
                  )}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setIsDropdownOpen(false); // ⬅️ Close after selection
                  }}
                >
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={32}
                    height={32}
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-[#0a2640]">
                      {tab.label}
                    </h3>
                    <p className="text-xs text-[#667085]">
                      {tab.subtitle.slice(0, 60)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar md+ */}
        <aside className="w-64 pt-24 p-6 sticky top-0 h-screen bg-[#e9eeff] hidden lg:block">
          <h2 className="uppercase text-sm font-medium text-gray-500 mb-4">
            ONZE DIENSTEN
          </h2>
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab.key}
                className={cn(
                  "flex items-center gap-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out p-2 my-3 rounded-full cursor-pointer",
                  activeTab === tab.key
                    ? "bg-[#b8e5ff99] border border-[#4bbdff99]/50 text-black"
                    : "hover:bg-[#b9e5fe99] hover:shadow-sm"
                )}
                onClick={() => setActiveTab(tab.key)}
              >
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <div className="text-sm font-normal">{tab.label}</div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeContent && (
            <div className="text-center mb-10 lg:pt-16">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Image
                  src={activeContent.icon}
                  alt={`${activeContent.title} Icon`}
                  width={36}
                  height={36}
                />
                <h1 className="text-3xl tracking-wide font-semibold text-[#0a2640]">
                  {activeContent.title}
                </h1>
              </div>
              <p className="text-xs pt-1 font-normal text-[#34475e] max-w-3xl mx-auto">
                {activeContent.subtitle}
              </p>
            </div>
          )}

          {/* FINANCIAL LEASE */}
          {activeTab === "web" && (
            <div>
              {/* 0e DEEL */}
              <PricingPlans />
              {/* 1e DEEL */}
              <div className="">
                <div className="bg-white rounded-3xl shadow mb-10 flex p-10 min-h-[400px] relative overflow-hidden">
                  {/* Tekstblok */}
                  <div className="w-1/2 z-10">
                    <h2 className="font-medium text-4xl whitespace-nowrap mb-6">
                      Gain access to
                    </h2>
                    <ul className="space-y-3 pt-1 text-gray-700 mb-8">
                      {[
                        "iOS & Android insights",
                        "Store Downloads",
                        "Store Ranking",
                        "Ratings",
                        "Usage & Engagement",
                        "Audience Insights",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">✓</span>
                          <span className="whitespace-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="rounded-full hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out bg-blue-600 text-white px-8 py-2.5 font-medium text-xs md:text-sm">
                      Contact
                    </button>
                  </div>

                  {/* Afbeelding die aan de onderkant plakt */}
                  <div className="absolute bottom-0 right-0 w-1/2">
                    <Image
                      src="/images/app_image.webp"
                      alt="App Intelligence Visual"
                      width={1000}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2e DEEL */}
              <div className="rounded-3xl">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Explore our add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add-on 1 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/sentiment.svg"
                          alt="Review Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        Review & Sentiment Analysis
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Improve your app product based on near real-time customer
                      feedback. Unlock AI sentiment insights from your app and
                      competitor reviews.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 4B App Reviews in English & all local languages</li>
                      <li>✓ AI-powered classification to 18 topics</li>
                    </ul>
                  </div>

                  {/* Add-on 2 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/techy.svg"
                          alt="SDK Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        App Technographics (SDK)
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The freshest SDK data with best in class coverage from 2M+
                      apps. Get access to insight on 2.8K SDKs organised in 32
                      categories.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 99%+ coverage of Top Chart apps</li>
                      <li>✓ Precise classification to 32 categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3e DEEL */}
              <div className="pt-12">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Trusted by the Biggest Brands
                </h2>
                <InfinitiveMovingCardsIMG />
              </div>

              {/* 4e DEEL */}
              <div className="pt-14">
                <Reviews />
              </div>

              {/* 5e DEEL */}
              <div className="">
                <FAQSection />
              </div>
            </div>
          )}

          {/* OPERATIONAL LEASE */}
          {activeTab === "app" && (
            <div>
              {/* 1e DEEL */}
              <div className="">
                <div className="bg-white rounded-3xl shadow mb-10 flex p-10 min-h-[400px] relative overflow-hidden">
                  {/* Tekstblok */}
                  <div className="w-1/2 z-10">
                    <h2 className="font-medium text-4xl whitespace-nowrap mb-6">
                      Gain access to
                    </h2>
                    <ul className="space-y-3 pt-1 text-gray-700 mb-8">
                      {[
                        "iOS & Android insights",
                        "Store Downloads",
                        "Store Ranking",
                        "Ratings",
                        "Usage & Engagement",
                        "Audience Insights",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">✓</span>
                          <span className="whitespace-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="rounded-full hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out bg-blue-600 text-white px-8 py-2.5 font-medium text-xs md:text-sm">
                      Contact
                    </button>
                  </div>

                  {/* Afbeelding die aan de onderkant plakt */}
                  <div className="absolute bottom-0 right-0 w-1/2">
                    <Image
                      src="/images/app_image.webp"
                      alt="App Intelligence Visual"
                      width={1000}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2e DEEL */}
              <div className="rounded-3xl">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Explore our add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add-on 1 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/sentiment.svg"
                          alt="Review Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        Review & Sentiment Analysis
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Improve your app product based on near real-time customer
                      feedback. Unlock AI sentiment insights from your app and
                      competitor reviews.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 4B App Reviews in English & all local languages</li>
                      <li>✓ AI-powered classification to 18 topics</li>
                    </ul>
                  </div>

                  {/* Add-on 2 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/techy.svg"
                          alt="SDK Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        App Technographics (SDK)
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The freshest SDK data with best in class coverage from 2M+
                      apps. Get access to insight on 2.8K SDKs organised in 32
                      categories.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 99%+ coverage of Top Chart apps</li>
                      <li>✓ Precise classification to 32 categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3e DEEL */}
              <div className="pt-12">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Trusted by the Biggest Brands
                </h2>
                <InfinitiveMovingCardsIMG />
              </div>

              {/* 4e DEEL */}
              <div className="pt-12 pb-6">
                <ReviewSlider />
              </div>

              {/* 5e DEEL */}
              <div className="">
                <FAQSection />
              </div>
            </div>
          )}

          {/* SHORT LEASE */}
          {activeTab === "sales" && (
            <div>
              {/* 1e DEEL */}
              <div className="">
                <div className="bg-white rounded-3xl shadow mb-10 flex p-10 min-h-[400px] relative overflow-hidden">
                  {/* Tekstblok */}
                  <div className="w-1/2 z-10">
                    <h2 className="font-medium text-4xl whitespace-nowrap mb-6">
                      Gain access to
                    </h2>
                    <ul className="space-y-3 pt-1 text-gray-700 mb-8">
                      {[
                        "iOS & Android insights",
                        "Store Downloads",
                        "Store Ranking",
                        "Ratings",
                        "Usage & Engagement",
                        "Audience Insights",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">✓</span>
                          <span className="whitespace-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="rounded-full hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out bg-blue-600 text-white px-8 py-2.5 font-medium text-xs md:text-sm">
                      Contact
                    </button>
                  </div>

                  {/* Afbeelding die aan de onderkant plakt */}
                  <div className="absolute bottom-0 right-0 w-1/2">
                    <Image
                      src="/images/app_image.webp"
                      alt="App Intelligence Visual"
                      width={1000}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2e DEEL */}
              <div className="rounded-3xl">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Explore our add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add-on 1 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/sentiment.svg"
                          alt="Review Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        Review & Sentiment Analysis
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Improve your app product based on near real-time customer
                      feedback. Unlock AI sentiment insights from your app and
                      competitor reviews.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 4B App Reviews in English & all local languages</li>
                      <li>✓ AI-powered classification to 18 topics</li>
                    </ul>
                  </div>

                  {/* Add-on 2 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/techy.svg"
                          alt="SDK Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        App Technographics (SDK)
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The freshest SDK data with best in class coverage from 2M+
                      apps. Get access to insight on 2.8K SDKs organised in 32
                      categories.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 99%+ coverage of Top Chart apps</li>
                      <li>✓ Precise classification to 32 categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3e DEEL */}
              <div className="pt-12">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Trusted by the Biggest Brands
                </h2>
                <InfinitiveMovingCardsIMG />
              </div>

              {/* 4e DEEL */}
              <div className="">
                <FAQSection />
              </div>
            </div>
          )}

          {/* PRIVATE LEASE */}
          {activeTab === "shopper" && (
            <div>
              {/* 1e DEEL */}
              <div className="">
                <div className="bg-white rounded-3xl shadow mb-10 flex p-10 min-h-[400px] relative overflow-hidden">
                  {/* Tekstblok */}
                  <div className="w-1/2 z-10">
                    <h2 className="font-medium text-4xl whitespace-nowrap mb-6">
                      Gain access to
                    </h2>
                    <ul className="space-y-3 pt-1 text-gray-700 mb-8">
                      {[
                        "iOS & Android insights",
                        "Store Downloads",
                        "Store Ranking",
                        "Ratings",
                        "Usage & Engagement",
                        "Audience Insights",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">✓</span>
                          <span className="whitespace-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="rounded-full bg-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out text-white px-8 py-2.5 font-medium text-xs md:text-sm">
                      Contact
                    </button>
                  </div>

                  {/* Afbeelding die aan de onderkant plakt */}
                  <div className="absolute bottom-0 right-0 w-1/2">
                    <Image
                      src="/images/app_image.webp"
                      alt="App Intelligence Visual"
                      width={1000}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2e DEEL */}
              <div className="rounded-3xl">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Explore our add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add-on 1 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/sentiment.svg"
                          alt="Review Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        Review & Sentiment Analysis
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Improve your app product based on near real-time customer
                      feedback. Unlock AI sentiment insights from your app and
                      competitor reviews.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 4B App Reviews in English & all local languages</li>
                      <li>✓ AI-powered classification to 18 topics</li>
                    </ul>
                  </div>

                  {/* Add-on 2 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/techy.svg"
                          alt="SDK Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        App Technographics (SDK)
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The freshest SDK data with best in class coverage from 2M+
                      apps. Get access to insight on 2.8K SDKs organised in 32
                      categories.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 99%+ coverage of Top Chart apps</li>
                      <li>✓ Precise classification to 32 categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3e DEEL */}
              <div className="pt-12">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Trusted by the Biggest Brands
                </h2>
                <InfinitiveMovingCardsIMG />
              </div>

              {/* 4e DEEL */}
              <div className="">
                <FAQSection />
              </div>
            </div>
          )}

          {/* EQUIPMENT LEASE */}
          {activeTab === "stock" && (
            <div>
              {/* 1e DEEL */}
              <div className="">
                <div className="bg-white rounded-3xl shadow mb-10 flex p-10 min-h-[400px] relative overflow-hidden">
                  {/* Tekstblok */}
                  <div className="w-1/2 z-10">
                    <h2 className="font-medium text-4xl whitespace-nowrap mb-6">
                      Gain access to
                    </h2>
                    <ul className="space-y-3 pt-1 text-gray-700 mb-8">
                      {[
                        "iOS & Android insights",
                        "Store Downloads",
                        "Store Ranking",
                        "Ratings",
                        "Usage & Engagement",
                        "Audience Insights",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">✓</span>
                          <span className="whitespace-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="rounded-full hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out bg-blue-600 text-white px-8 py-2.5 font-medium text-xs md:text-sm">
                      Contact
                    </button>
                  </div>

                  {/* Afbeelding die aan de onderkant plakt */}
                  <div className="absolute bottom-0 right-0 w-1/2">
                    <Image
                      src="/images/app_image.webp"
                      alt="App Intelligence Visual"
                      width={1000}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2e DEEL */}
              <div className="rounded-3xl">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Explore our add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add-on 1 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/sentiment.svg"
                          alt="Review Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        Review & Sentiment Analysis
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Improve your app product based on near real-time customer
                      feedback. Unlock AI sentiment insights from your app and
                      competitor reviews.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 4B App Reviews in English & all local languages</li>
                      <li>✓ AI-powered classification to 18 topics</li>
                    </ul>
                  </div>

                  {/* Add-on 2 */}
                  <div className="bg-white rounded-2xl shadow p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#edf2ff] p-2 rounded-lg">
                        <Image
                          src="/svg/techy.svg"
                          alt="SDK Icon"
                          width={14}
                          height={14}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium tracking-wide text-[#0a2640] uppercase">
                        App Technographics (SDK)
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The freshest SDK data with best in class coverage from 2M+
                      apps. Get access to insight on 2.8K SDKs organised in 32
                      categories.
                    </p>
                    <button className="rounded-full bg-[#3366ff] text-white py-3 font-medium text-sm mt-2">
                      Talk to sales
                    </button>
                    <ul className="text-sm text-gray-700 space-y-2 pt-2">
                      <li>✓ App Store & Google Play</li>
                      <li>✓ 99%+ coverage of Top Chart apps</li>
                      <li>✓ Precise classification to 32 categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3e DEEL */}
              <div className="pt-12">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#0a2640] mb-8">
                  Trusted by the Biggest Brands
                </h2>
                <InfinitiveMovingCardsIMG />
              </div>

              {/* 4e DEEL */}
              <div className="">
                <FAQSection />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
