"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";

const frequencies = [
  { value: "monthly", label: "One-time payment", priceSuffix: "/ excl. BTW" },
  {
    value: "annually",
    label: "Two-time payment",
    priceSuffix: "/ excl. BTW",
  },
];
const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "/contact#contactgegevens",
    price: { monthly: "€1499", annually: "€599" },
    description: "The essentials to provide your best work for clients.",
    features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
  },
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "/contact#contactgegevens",
    price: { monthly: "€2499", annually: "€899" },
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "/contact#contactgegevens",
    price: { monthly: "€3499", annually: "€1299" },
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "Marketing automations",
      "24-hour support response time",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "/contact#contactgegevens",
    price: { monthly: "€5995", annually: "€2295" },
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "Marketing automations",
      "Custom reporting tools",
      "1-hour, dedicated support response time",
    ],
    mostPopular: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingCards() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div
      id="prijzen"
      className="p-5 bg-gradient-to-b pb-20 from-transparent via-[#e3e0d8] to-transparent"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 scale-105">
        <div className="w-full flex justify-center text-center items-center mt-20 md:mt-36">
          <h2 className="text-[38px] md:text-7xl lg:text-[85px] font-semibold relative text-center mb-5 md:mb-0 text-black max-w-9xl mx-auto">
            Prijzen voor alle <br className="hidden md:block" />
            <p className="relative bg-clip-text text-transparent lg:p-5 bg-gradient-to-t from-black to-black/80 z-10">
              soorten klanten
            </p>
          </h2>
        </div>
        <p className="mx-auto md:mt-6 max-w-2xl text-center text-lg leading-8 text-black/50">
          Kies een betaalbaar plan dat boordevol zit met de beste functies om je
          publiek te betrekken, klantloyaliteit te creëren en de verkoop te
          stimuleren
        </p>
        {/* <div className="mt-10 md:mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset bg-white/25 ring-white shadow-sm"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked
                      ? "bg-[#F3BD3E] outline outline-1 outline-white text-black"
                      : "text-black/50",
                    "cursor-pointer rounded-full px-2.5 py-1"
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div> */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "ring-1 ring-[#F3BD3E]/50 bg-white"
                  : "ring-1 ring-gray-200 bg-white",
                "flex flex-col justify-between rounded-3xl p-8 h-full hover:scale-110 duration-1000 ease-in-out hover:shadow-md hover:shadow-yellow-400 hover:ring-[#F3BD3E]/50" // Voeg 'flex flex-col justify-between h-full' toe
              )}
            >
              <div className="">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? "text-black" : "text-gray-900",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {typeof tier.price === "string"
                      ? tier.price
                      : tier.price[frequency.value as keyof typeof tier.price]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {frequency.priceSuffix}
                  </span>
                </p>
                <p className="mt-4 text-sm mb-10 leading-6 text-gray-600">
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className="space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Image
                        src="/svg/checkround.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 flex-none text-yellow-400"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-[#F3BD3E] text-black shadow-sm hover:shadow-md"
                    : "text-black ring-1 ring-inset ring-[#F3BD3E] hover:bg-[#F3BD3E] hover:Text-black hover:shadow-md",
                  "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                )}
              >
                Start nu
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
