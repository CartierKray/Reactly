"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Check, Plus } from "lucide-react";

const contactOptions = [
  "Starter",
  "Groei",
  "Professioneel",
  "AI & SEO Boost",
  "All-in Premium",
];

const compactOptions = ["Start", "Groei", "Pro", "Boost", "Premium"];

const pricingByContacts: { [key: string]: string } = {
  Starter: "1999",
  Groei: "€1999",
  Professioneel: "€2499",
  "AI & SEO Boost": "€2749",
  "All-in Premium": "4749",
};

const getVisibleFeatures = (index: number, features: string[]) => {
  const steps = Math.ceil(index + 1);
  return features.slice(0, steps * 3);
};

export default function PricingSection() {
  const [type, setType] = useState<"transactional" | "marketing">("marketing");
  const [contactIndex, setContactIndex] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    setContactIndex(0);
  }, [type]);

  const currentContacts = contactOptions[contactIndex];
  const currentPrice = pricingByContacts[currentContacts];

  const getActiveCard = () => {
    if (contactIndex === 0) return "Start";
    if (contactIndex === 1 || contactIndex === 2) return "Pro Marketing";
    return "Enterprise";
  };

  const activeCard = getActiveCard();

  const tiers = [
    {
      name: "Start",
      basePrice: "1749",
      emails: "Basis website met 1 pagina\nInclusief mobielvriendelijk design",
      features: [
        "Responsief design",
        "Contactformulier",
        "Snelle laadtijden",
        "Basis SEO",
      ],
    },
    {
      name: "Pro Marketing",
      basePrice: currentPrice,
      emails: `${currentContacts} pakket — uitgebreid webdesign & marketingtools`,
      features: [
        "Alle Start functies",
        "Meerdere pagina's",
        "SEO keyword analyse",
        "Google Analytics integratie",
        "E-mailmarketing koppeling",
        "Blog functionaliteit",
        "Conversiegericht ontwerp",
        "2 weken support & revisies",
        "CMS integratie",
        "Sociale media koppeling",
        "GDPR proof",
        "1 aanpassing inbegrepen",
        "Toegang tot support community",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      basePrice: "Custom",
      emails: "Volledig maatwerk inclusief AI-tools en groeistrategie",
      features: [
        "Alles van Pro Marketing",
        "AI gegenereerde content",
        "Webshop integratie",
        "Automatische funnels & CRM",
        "Chatbot integratie",
        "Premium SEO & snelheid",
        "Onbeperkte revisies",
        "Persoonlijke projectmanager",
        "Training & live onboarding",
      ],
      cta: "Vraag offerte aan",
    },
  ];

  return (
    <section className=" w-full py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="pb-14">
          <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 md:text-5xl dark:text-neutral-50">
            Offerte & Pakketten
          </h2>
          <p className="mx-auto max-w-lg pt-4 font-light text-center text-base text-neutral-600 dark:text-neutral-50">
            We staan voor je klaar om je te helpen met al je vragen. Kun je niet
            vinden wat je zoekt? Neemcontact met ons op via &nbsp;
            <a
              href="mailto:info@reactly.nl"
              className="text-blue-500 underline"
            >
              info@reactly.nl
            </a>
          </p>
        </div>

        <div className="inline-flex rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black text-xs font-medium mb-10 overflow-hidden">
          <button
            onClick={() => setType("transactional")}
            className={cn(
              "px-4 py-2 transition-all duration-300",
              type === "transactional"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-black dark:text-white"
            )}
          >
            Webdesign
          </button>
          <button
            onClick={() => setType("marketing")}
            className={cn(
              "px-4 py-2 transition-all duration-300",
              type === "marketing"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-black dark:text-white"
            )}
          >
            SEO & Marketing
          </button>
        </div>

        <div className="mb-10 md:mb-14 mx-auto w-full px-2 sm:px-0 max-w-md sm:max-w-xl relative">
          <input
            type="range"
            min={0}
            max={contactOptions.length - 1}
            step={1}
            value={contactIndex}
            onChange={(e) => setContactIndex(Number(e.target.value))}
            className="w-full h-1 bg-gradient-to-r from-zinc-300 to-zinc-500 dark:from-white/30 dark:to-white/70 rounded-full appearance-none transition-all outline-none"
          />
          <div className="relative mt-4 h-5">
            {contactOptions.map((label, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute -translate-x-1/2 text-[10px] sm:text-xs",
                  idx === contactIndex
                    ? "font-semibold text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                )}
                style={{
                  left: `${(idx / (contactOptions.length - 1)) * 100}%`,
                }}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="inline sm:hidden">{compactOptions[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const isActive = tier.name === activeCard;
            const visibleFeatures = getVisibleFeatures(
              contactIndex,
              tier.features
            );
            return (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col justify-between min-h-[760px] rounded-3xl border bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900",
                  !isActive && "opacity-50 scale-[0.98]"
                )}
              >
                <div className="shadow-input w-full rounded-2xl bg-white p-4 dark:bg-neutral-800">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-medium text-black dark:text-white">
                        {tier.name}
                      </p>
                      <span className="text-xs text-neutral-600 dark:text-neutral-200">
                        {tier.name === "Start"
                          ? "1499 pakket"
                          : tier.name === "Enterprise"
                          ? "Maatwerk Offerte"
                          : "Eenmalige betaling"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-end">
                      <span className="text-lg font-bold text-neutral-500 dark:text-neutral-200">
                        €&nbsp;
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-medium text-neutral-800 dark:text-neutral-50">
                          {tier.basePrice.replace("€", "")}
                        </span>
                        {tier.basePrice !== "1499" &&
                          tier.basePrice !== "Custom" && (
                            <span className="text-xl font-normal text-gray-500 line-through dark:text-neutral-200">
                              €{parseInt(tier.basePrice.replace("€", "")) + 400}
                            </span>
                          )}
                      </div>
                    </div>

                    <a className="mt-10 mb-4 block w-full rounded-lg px-4 py-2 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black text-center">
                      {tier.cta || "Vraag offerte aan"}
                    </a>
                  </div>
                </div>

                <div className="p-4">
                  {visibleFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="my-4 flex items-start justify-start gap-2"
                    >
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-700">
                        <Check className="h-3 w-3 stroke-[4px] text-neutral-300" />
                      </div>
                      <div className="text-sm font-medium text-black dark:text-white">
                        {feat}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <div className="h-px w-full bg-white dark:bg-neutral-950" />
                  <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
                  <div className="absolute inset-0 m-auto flex h-5 w-5 items-center justify-center rounded-xl bg-white dark:bg-neutral-800 shadow-sm">
                    <Plus className="h-3 w-3 stroke-[4px] text-black dark:text-neutral-300" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="my-4 flex items-start justify-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600">
                      <Check className="h-3 w-3 stroke-[4px] text-white" />
                    </div>
                    <div className="text-sm font-medium text-black dark:text-white">
                      Alles in Start
                    </div>
                  </div>
                  <div className="my-4 flex items-start justify-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600">
                      <Check className="h-3 w-3 stroke-[4px] text-white" />
                    </div>
                    <div className="text-sm font-medium text-black dark:text-white">
                      Alles in Pro Marketing
                    </div>
                  </div>
                </div>

                <div className="py-4 grid">
                  <a
                    href="/contact#contactgegevens"
                    className="group w-full px-4 mb-2 font-light text-left text-sm text-neutral-500 dark:text-neutral-200"
                  >
                    Vragen?{" "}
                    <span className="font-medium text-white group-hover:underline">
                      Neem contact met ons op.
                    </span>
                  </a>
                  <a
                    href="mailto:info@reactly.nl"
                    className="group w-full py-2 px-4 text-left font-light text-sm text-neutral-500 dark:text-neutral-200"
                  >
                    of email naar{" "}
                    <span className="font-medium text-white group-hover:underline">
                      info@reactly.nl
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
