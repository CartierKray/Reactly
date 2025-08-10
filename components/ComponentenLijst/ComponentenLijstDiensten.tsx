/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Voor welke DIENSTEN-categorieën wil je een kaarten-grid tonen?
 * Voeg hier de exacte categorienamen toe.
 * Laat je een categorie weg -> dan kun je onderaan in de per-afdeling
 * if-blokken je eigen content renderen (zoals op je andere pagina).
 */
const servicesGridCategories = new Set<string>([
  "Website Pakketten",
  "Growth Bundles", // haal weg als je hier geen grid wilt
]);

const tabs = [
  /**
   * WEB & DEVELOPMENT
   */
  {
    key: "web",
    label: "Web & Development",
    categories: [
      "Website Pakketten",
      "Webdesign (UX/UI)",
      "Webdevelopment",
      "E-commerce",
      "Landing Pages",
      "Technische SEO",
      "Performance & Speed",
      "Toegankelijkheid (WCAG)",
      "Webcare & Onderhoud",
      "Hosting & Domeinen",
      "CMS / Headless CMS",
      "Migratie & Replatforming",
      "Integraties & API's",
      "Web App / MVP",
      "Security & Hardening",
      "Analytics & Tracking",
      "Privacy & Cookie Consent (CMP)",
    ],
    // Kaarten die we tonen wanneer de actieve categorie in servicesGridCategories zit
    components: [
      {
        title: "Website Starter",
        items: 1,
        price: 995,
        oldPrice: 1295,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "Snel live met een strakke one-pager. Inclusief basis SEO en analytics.",
      },
      {
        title: "Business Site",
        items: 1,
        price: 2495,
        oldPrice: 2895,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "Meerdere pagina's, blog, formulieren en on-brand componenten.",
      },
      {
        title: "Pro / Headless",
        items: 1,
        price: 4995,
        oldPrice: 5495,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "Next.js + headless CMS, performance-first, schaalbaar en future-proof.",
      },
    ],
  },

  /**
   * MARKETING & GROWTH
   */
  {
    key: "marketing",
    label: "Marketing & Growth",
    categories: [
      "Growth Bundles",
      "SEO (On-page)",
      "Technische SEO",
      "Lokale SEO",
      "SEA / Google Ads",
      "Social Ads (Meta/TikTok/LinkedIn)",
      "Content Marketing",
      "Copywriting",
      "E-mail & Marketing Automation",
      "CRO / A/B Testing",
      "Analytics & Dashboarding",
      "Social Media Management",
      "Brand Strategy",
      "Branding & Visual Identity",
      "Foto & Video",
      "PR & Linkbuilding",
      "Influencer Marketing",
      "Funnels & Lead Magnets",
      "App Store Optimization (ASO)",
    ],
    components: [
      {
        title: "SEO Sprint",
        items: 1,
        price: 795,
        oldPrice: 995,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "Kansanalyse, on-page optimalisatie en content-roadmap voor 90 dagen.",
      },
      {
        title: "Ads Accelerator",
        items: 1,
        price: 950,
        oldPrice: 1200,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "Opzet + optimalisatie van Google & Social ads met conversietracking.",
      },
      {
        title: "Content Engine",
        items: 1,
        price: 680,
        oldPrice: 850,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "Maandelijkse contentkalender, copy, visuals en distributie.",
      },
    ],
  },
];

export default function ComponentenLijstDiensten() {
  // begin bij Web & Development
  const [activeTab, setActiveTab] = useState<"web" | "marketing">("web");
  const [activeCategory, setActiveCategory] = useState("Website Pakketten");

  const activeContent = tabs.find((tab) => tab.key === activeTab);

  const currentIndex = activeContent?.categories.findIndex(
    (cat) => cat === activeCategory
  );

  const goToPrevious = () => {
    if (activeContent && currentIndex !== undefined && currentIndex > 0) {
      setActiveCategory(activeContent.categories[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (
      activeContent &&
      currentIndex !== undefined &&
      currentIndex < activeContent.categories.length - 1
    ) {
      setActiveCategory(activeContent.categories[currentIndex + 1]);
    }
  };

  const shouldShowGrid =
    activeContent != null &&
    servicesGridCategories.has(activeCategory as string);

  return (
    <div className="dark:bg-black min-h-screen text-white lg:pt-10 pb-10 md:pb-20 lg:pb-40">
      <div className="flex max-w-7xl mx-auto">
        {/* sticky top-10 behouden */}
        <aside className="w-64 sticky top-10 h-screen overflow-y-auto p-6 hidden lg:block border-r border-black/10 dark:border-white/10">
          {/* WEB */}
          <h2 className="text-[14px] text-black dark:text-white font-medium mb-3">
            Web & Development
          </h2>
          <ul className="space-y-1.5 text-sm mb-6">
            {tabs
              .find((t) => t.key === "web")
              ?.categories.map((cat, idx) => (
                <li
                  key={`web-${idx}`}
                  onClick={() => {
                    setActiveTab("web");
                    setActiveCategory(cat);
                  }}
                  className={cn(
                    "cursor-pointer transition",
                    activeTab === "web" && activeCategory === cat
                      ? "dark:text-white text-black font-medium text-[12.5px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                      : "dark:text-white/50 text-black/50 hover:text-black dark:hover:text-white text-[12.5px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                  )}
                >
                  {cat}
                </li>
              ))}
          </ul>

          {/* MARKETING */}
          <h2 className="text-[14px] text-black dark:text-white font-medium mb-3">
            Marketing & Growth
          </h2>
          <ul className="space-y-1.5 text-sm">
            {tabs
              .find((t) => t.key === "marketing")
              ?.categories.map((cat, idx) => (
                <li
                  key={`mkt-${idx}`}
                  onClick={() => {
                    setActiveTab("marketing");
                    setActiveCategory(cat);
                  }}
                  className={cn(
                    "cursor-pointer transition",
                    activeTab === "marketing" && activeCategory === cat
                      ? "dark:text-white text-black font-medium text-[12.5px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                      : "dark:text-white/50 text-black/50 hover:text-black dark:hover:text-white text-[12.5px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                  )}
                >
                  {cat}
                </li>
              ))}
          </ul>
        </aside>

        <div className="grid">
          <div className="w-full text-black dark:text-white flex lg:hidden text-2xl mb-2 text-center justify-center">
            {tabs.find((t) => t.key === activeTab)?.label}: {activeCategory}
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            {/* GRID (alleen voor categorieën in servicesGridCategories) */}
            {shouldShowGrid && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeContent?.components?.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 border border-black/10 dark:border-white/5"
                  >
                    <div className="relative aspect-[5/3]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex mt-2.5 justify-between items-center mb-2">
                        <h3 className="text-black dark:text-white font-medium text-base">
                          {card.title}
                          <span className="text-[10px] dark:bg-[#444] px-1 py-0.5 rounded-3xl border border-[#707070] ml-1">
                            {card.items}
                          </span>
                        </h3>
                        <div className="text-sm space-x-1 text-right">
                          <span className="line-through text-[12px] text-black/40 dark:text-white/40 mr-1">
                            €{card.oldPrice}
                          </span>
                          <span className="text-black dark:text-white">
                            €{card.price}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs py-3 max-w-[300px] text-black/50 dark:text-white/60">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ------------ WEB & DEV: per-afdeling placeholders ------------ */}
            {activeTab === "web" && !shouldShowGrid && (
              <p className="text-white text-xl font-medium"></p>
            )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Webdesign (UX/UI)" && (
                <p className="text-white text-xl font-medium">
                  Webdesign (UX/UI)
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Webdevelopment" && (
                <p className="text-white text-xl font-medium">Webdevelopment</p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "E-commerce" && (
                <p className="text-white text-xl font-medium">E-commerce</p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Landing Pages" && (
                <p className="text-white text-xl font-medium">Landing Pages</p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Technische SEO" && (
                <p className="text-white text-xl font-medium">Technische SEO</p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Performance & Speed" && (
                <p className="text-white text-xl font-medium">
                  Performance & Speed
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Toegankelijkheid (WCAG)" && (
                <p className="text-white text-xl font-medium">
                  Toegankelijkheid (WCAG)
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Webcare & Onderhoud" && (
                <p className="text-white text-xl font-medium">
                  Webcare & Onderhoud
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Hosting & Domeinen" && (
                <p className="text-white text-xl font-medium">
                  Hosting & Domeinen
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "CMS / Headless CMS" && (
                <p className="text-white text-xl font-medium">
                  CMS / Headless CMS
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Migratie & Replatforming" && (
                <p className="text-white text-xl font-medium">
                  Migratie & Replatforming
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Integraties & API's" && (
                <p className="text-white text-xl font-medium">
                  Integraties & API&apos;s
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Web App / MVP" && (
                <p className="text-white text-xl font-medium">Web App / MVP</p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Security & Hardening" && (
                <p className="text-white text-xl font-medium">
                  Security & Hardening
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Analytics & Tracking" && (
                <p className="text-white text-xl font-medium">
                  Analytics & Tracking
                </p>
              )}
            {activeTab === "web" &&
              !shouldShowGrid &&
              activeCategory === "Privacy & Cookie Consent (CMP)" && (
                <p className="text-white text-xl font-medium">
                  Privacy & Cookie Consent (CMP)
                </p>
              )}

            {/* ------------ MARKETING: per-afdeling placeholders ------------ */}
            {activeTab === "marketing" && !shouldShowGrid && (
              <p className="text-white text-xl font-medium"></p>
            )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "SEO (On-page)" && (
                <p className="text-white text-xl font-medium">SEO (On-page)</p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Technische SEO" && (
                <p className="text-white text-xl font-medium">Technische SEO</p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Lokale SEO" && (
                <p className="text-white text-xl font-medium">Lokale SEO</p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "SEA / Google Ads" && (
                <p className="text-white text-xl font-medium">
                  SEA / Google Ads
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Social Ads (Meta/TikTok/LinkedIn)" && (
                <p className="text-white text-xl font-medium">
                  Social Ads (Meta/TikTok/LinkedIn)
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Content Marketing" && (
                <p className="text-white text-xl font-medium">
                  Content Marketing
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Copywriting" && (
                <p className="text-white text-xl font-medium">Copywriting</p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "E-mail & Marketing Automation" && (
                <p className="text-white text-xl font-medium">
                  E-mail & Marketing Automation
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "CRO / A/B Testing" && (
                <p className="text-white text-xl font-medium">
                  CRO / A/B Testing
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Analytics & Dashboarding" && (
                <p className="text-white text-xl font-medium">
                  Analytics & Dashboarding
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Social Media Management" && (
                <p className="text-white text-xl font-medium">
                  Social Media Management
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Brand Strategy" && (
                <p className="text-white text-xl font-medium">Brand Strategy</p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Branding & Visual Identity" && (
                <p className="text-white text-xl font-medium">
                  Branding & Visual Identity
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Foto & Video" && (
                <p className="text-white text-xl font-medium">Foto & Video</p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "PR & Linkbuilding" && (
                <p className="text-white text-xl font-medium">
                  PR & Linkbuilding
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Influencer Marketing" && (
                <p className="text-white text-xl font-medium">
                  Influencer Marketing
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "Funnels & Lead Magnets" && (
                <p className="text-white text-xl font-medium">
                  Funnels & Lead Magnets
                </p>
              )}
            {activeTab === "marketing" &&
              !shouldShowGrid &&
              activeCategory === "App Store Optimization (ASO)" && (
                <p className="text-white text-xl font-medium">
                  App Store Optimization (ASO)
                </p>
              )}
          </main>

          {/* mobile nav */}
          <div className="flex justify-between items-center mt-6 px-6 lg:hidden w-[100vw]">
            <button
              onClick={goToPrevious}
              className="bg-black/10 dark:bg-white/10 text-black dark:text-white outline dark:outline-white/20 outline-black/20 px-4 py-2 rounded-md disabled:opacity-30"
              disabled={
                !activeContent ||
                currentIndex === undefined ||
                currentIndex === 0
              }
            >
              ← Vorige
            </button>
            <span className="text-xs text-black/40 dark:text-white/40">
              {activeCategory}
            </span>
            <button
              onClick={goToNext}
              className="bg-black/10 dark:bg-white/10 dark:text-white text-black outline dark:outline-white/20 outline-black/20 px-4 py-2 rounded-md disabled:opacity-30"
              disabled={
                !activeContent ||
                currentIndex === undefined ||
                currentIndex === activeContent.categories.length - 1
              }
            >
              Volgende →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
