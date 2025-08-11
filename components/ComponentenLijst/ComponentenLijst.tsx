/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HeroHeader from "../HeroHeader/HeroHeader";
import { HeroScrollDemo } from "../Hero/HeroScroll";
import ProductGrid, {
  ProductGridItem,
  appItems,
  templateItems,
} from "../ProductGrid/ProductGrid";
import TemplateGrid from "../TemplateGrid/TemplateGrid";
import GridClothing from "../GridClothing/GridClothing";

/**
 * Kies hier voor welke TEMPLATE-categorieën je het kaarten-grid wilt tonen.
 * Laat de set leeg => nooit grid bij Templates.
 * Voeg namen toe (exacte strings) => alleen voor die categorieën grid.
 *
 * Voorbeeld:
 * const templateGridCategories = new Set(["Landing Pages", "Portfolio"]);
 */
const templateGridCategories = new Set<string>([]);

const tabs = [
  // TEMPLATES sectie
  {
    key: "templates",
    label: "Templates",
    categories: [
      "Landing Pages",
      "SaaS Templates",
      "Portfolio",
      "Agency",
      "Blog",
      "E-commerce",
      "Pricing Pages",
      "Auth Flows",
    ],
  },

  // JOUW BESTAANDE "Component Packs"
  {
    key: "app",
    label: "Component Packs",
    categories: [
      "Product Grid",
      "Grid Clothing",
      "Hero Sections",
      "Logo Clouds",
      "Bento Grids",
      "CTA Sections",
      "Testimonials",
      "Feature sections",
      "Pricing sections",
      "Cards",
      "Navbars",
      "Footers",
      "Login and Signup",
      "Contact Sections",
      "Blog Sections",
      "Blog Content Sections",
      "FAQs",
      "Sidebars",
      "Stats Sections",
      "Animations",
      "Integrations",
      "Code Snippets",
      "Newsletter Forms",
      "Social Proof",
      "Widgets",
      "Modals",
      "Tables",
      "Data Grids",
      "Pagination",
      "Search Bars",
      "Tags",
      "Category Filters",
      "Dropdown Menus",
      "Tooltips",
      "Avatars",
      "Loaders",
      "Image Galleries",
      "Video Embeds",
      "Media Blocks",
      "Content Blocks",
      "Tabs",
      "Carousels",
      "Announcements",
      "Testimonials (Alt)",
      "Checkout Sections",
      "Error Pages",
      "Password Resets",
      "Onboarding Flows",
      "Steps Components",
      "Maps",
      "404 Pages",
      "Coming Soon Pages",
      "Maintenance Pages",
    ],
  },
];

export default function ComponentenLijst() {
  // wisselen tussen Componenten en Templates
  const [activeTab, setActiveTab] = useState<"app" | "templates">("app");
  const [activeCategory, setActiveCategory] = useState("Product Grid");

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

  // helper: bepalen of grid getoond moet worden
  const shouldShowGrid =
    (activeTab === "app" && activeCategory === "Product Grid") ||
    (activeTab === "templates" &&
      templateGridCategories.has(activeCategory as string));

  return (
    <div className="dark:bg-black min-h-screen text-white lg:pt-10 pb-10 md:pb-20 lg:pb-40">
      <div className="flex max-w-7xl mx-auto">
        {/* NB: jouw sticky top-10 en styling behouden */}
        <aside className="w-64 sticky top-10 h-screen overflow-y-auto p-6 hidden lg:block border-r border-black/10 dark:border-white/10">
          {/* Templates boven Componenten */}
          <h2 className="text-[14px] text-black dark:text-white font-medium mb-3">
            Templates
          </h2>
          <ul className="space-y-1.5 text-sm mb-6">
            {tabs
              .find((t) => t.key === "templates")
              ?.categories.map((cat, idx) => (
                <li
                  key={`tpl-${idx}`}
                  onClick={() => {
                    setActiveTab("templates");
                    setActiveCategory(cat);
                  }}
                  className={cn(
                    "cursor-pointer transition",
                    activeTab === "templates" && activeCategory === cat
                      ? "dark:text-white text-black font-medium text-[12.5px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                      : "dark:text-white/50 text-black/50 hover:text-black  dark:hover:text-white text-[12.5px] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                  )}
                >
                  {cat}
                </li>
              ))}
          </ul>

          <h2 className="text-[14px] text-black dark:text-white font-medium mb-3">
            Componenten
          </h2>
          <ul className="space-y-1.5 text-sm">
            {tabs
              .find((t) => t.key === "app")
              ?.categories.map((cat, idx) => (
                <li
                  key={`cmp-${idx}`}
                  onClick={() => {
                    setActiveTab("app");
                    setActiveCategory(cat);
                  }}
                  className={cn(
                    "cursor-pointer transition",
                    activeTab === "app" && activeCategory === cat
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
            {activeCategory}
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            {/* ----------------------------COMPONENTEN per-afdeling ------------------------ */}
            {/* App -> Product Grid */}
            {activeTab === "app" && activeCategory === "Product Grid" && (
              <ProductGrid items={appItems} />
            )}

            {activeTab === "app" && activeCategory === "Grid Clothing" && (
              <GridClothing />
            )}

            {activeTab === "templates" &&
              templateGridCategories.has(activeCategory as string) && (
                <ProductGrid items={templateItems} />
              )}

            {activeTab === "app" && activeCategory === "Hero Sections" && (
              <div className="h-full">
                <HeroHeader />
              </div>
            )}
            {activeTab === "app" && activeCategory === "Logo Clouds" && (
              <p className="text-white text-xl font-medium">Logo Clouds</p>
            )}
            {activeTab === "app" && activeCategory === "Bento Grids" && (
              <p className="text-white text-xl font-medium">Bento Grids</p>
            )}
            {activeTab === "app" && activeCategory === "CTA Sections" && (
              <p className="text-white text-xl font-medium">CTA Sections</p>
            )}
            {activeTab === "app" && activeCategory === "Testimonials" && (
              <p className="text-white text-xl font-medium">Testimonials</p>
            )}
            {activeTab === "app" && activeCategory === "Feature sections" && (
              <p className="text-white text-xl font-medium">Feature sections</p>
            )}
            {activeTab === "app" && activeCategory === "Pricing sections" && (
              <p className="text-white text-xl font-medium">Pricing sections</p>
            )}
            {activeTab === "app" && activeCategory === "Cards" && (
              <p className="text-white text-xl font-medium">Cards</p>
            )}
            {activeTab === "app" && activeCategory === "Navbars" && (
              <p className="text-white text-xl font-medium">Navbars</p>
            )}
            {activeTab === "app" && activeCategory === "Footers" && (
              <p className="text-white text-xl font-medium">Footers</p>
            )}
            {activeTab === "app" && activeCategory === "Login and Signup" && (
              <p className="text-white text-xl font-medium">Login and Signup</p>
            )}
            {activeTab === "app" && activeCategory === "Contact Sections" && (
              <p className="text-white text-xl font-medium">Contact Sections</p>
            )}
            {activeTab === "app" && activeCategory === "Blog Sections" && (
              <p className="text-white text-xl font-medium">Blog Sections</p>
            )}
            {activeTab === "app" &&
              activeCategory === "Blog Content Sections" && (
                <p className="text-white text-xl font-medium">
                  Blog Content Sections
                </p>
              )}
            {activeTab === "app" && activeCategory === "FAQs" && (
              <p className="text-white text-xl font-medium">FAQs</p>
            )}
            {activeTab === "app" && activeCategory === "Sidebars" && (
              <p className="text-white text-xl font-medium">Sidebars</p>
            )}
            {activeTab === "app" && activeCategory === "Stats Sections" && (
              <p className="text-white text-xl font-medium">Stats Sections</p>
            )}
            {activeTab === "app" && activeCategory === "Animations" && (
              <p className="text-white text-xl font-medium">Animations</p>
            )}
            {activeTab === "app" && activeCategory === "Integrations" && (
              <p className="text-white text-xl font-medium">Integrations</p>
            )}
            {activeTab === "app" && activeCategory === "Code Snippets" && (
              <p className="text-white text-xl font-medium">Code Snippets</p>
            )}
            {activeTab === "app" && activeCategory === "Newsletter Forms" && (
              <p className="text-white text-xl font-medium">Newsletter Forms</p>
            )}
            {activeTab === "app" && activeCategory === "Social Proof" && (
              <p className="text-white text-xl font-medium">Social Proof</p>
            )}
            {activeTab === "app" && activeCategory === "Widgets" && (
              <p className="text-white text-xl font-medium">Widgets</p>
            )}
            {activeTab === "app" && activeCategory === "Modals" && (
              <p className="text-white text-xl font-medium">Modals</p>
            )}
            {activeTab === "app" && activeCategory === "Tables" && (
              <p className="text-white text-xl font-medium">Tables</p>
            )}
            {activeTab === "app" && activeCategory === "Data Grids" && (
              <p className="text-white text-xl font-medium">Data Grids</p>
            )}
            {activeTab === "app" && activeCategory === "Pagination" && (
              <p className="text-white text-xl font-medium">Pagination</p>
            )}
            {activeTab === "app" && activeCategory === "Search Bars" && (
              <p className="text-white text-xl font-medium">Search Bars</p>
            )}
            {activeTab === "app" && activeCategory === "Tags" && (
              <p className="text-white text-xl font-medium">Tags</p>
            )}
            {activeTab === "app" && activeCategory === "Category Filters" && (
              <p className="text-white text-xl font-medium">Category Filters</p>
            )}
            {activeTab === "app" && activeCategory === "Dropdown Menus" && (
              <p className="text-white text-xl font-medium">Dropdown Menus</p>
            )}
            {activeTab === "app" && activeCategory === "Tooltips" && (
              <p className="text-white text-xl font-medium">Tooltips</p>
            )}
            {activeTab === "app" && activeCategory === "Avatars" && (
              <p className="text-white text-xl font-medium">Avatars</p>
            )}
            {activeTab === "app" && activeCategory === "Loaders" && (
              <p className="text-white text-xl font-medium">Loaders</p>
            )}
            {activeTab === "app" && activeCategory === "Image Galleries" && (
              <p className="text-white text-xl font-medium">Image Galleries</p>
            )}
            {activeTab === "app" && activeCategory === "Video Embeds" && (
              <p className="text-white text-xl font-medium">Video Embeds</p>
            )}
            {activeTab === "app" && activeCategory === "Media Blocks" && (
              <p className="text-white text-xl font-medium">Media Blocks</p>
            )}
            {activeTab === "app" && activeCategory === "Content Blocks" && (
              <p className="text-white text-xl font-medium">Content Blocks</p>
            )}
            {activeTab === "app" && activeCategory === "Tabs" && (
              <p className="text-white text-xl font-medium">Tabs</p>
            )}
            {activeTab === "app" && activeCategory === "Carousels" && (
              <p className="text-white text-xl font-medium">Carousels</p>
            )}
            {activeTab === "app" && activeCategory === "Announcements" && (
              <p className="text-white text-xl font-medium">Announcements</p>
            )}
            {activeTab === "app" && activeCategory === "Testimonials (Alt)" && (
              <p className="text-white text-xl font-medium">
                Testimonials (Alt)
              </p>
            )}
            {activeTab === "app" && activeCategory === "Checkout Sections" && (
              <p className="text-white text-xl font-medium">
                Checkout Sections
              </p>
            )}
            {activeTab === "app" && activeCategory === "Error Pages" && (
              <p className="text-white text-xl font-medium">Error Pages</p>
            )}
            {activeTab === "app" && activeCategory === "Password Resets" && (
              <p className="text-white text-xl font-medium">Password Resets</p>
            )}
            {activeTab === "app" && activeCategory === "Onboarding Flows" && (
              <p className="text-white text-xl font-medium">Onboarding Flows</p>
            )}
            {activeTab === "app" && activeCategory === "Steps Components" && (
              <p className="text-white text-xl font-medium">Steps Components</p>
            )}
            {activeTab === "app" && activeCategory === "Maps" && (
              <p className="text-white text-xl font-medium">Maps</p>
            )}
            {activeTab === "app" && activeCategory === "404 Pages" && (
              <p className="text-white text-xl font-medium">404 Pages</p>
            )}
            {activeTab === "app" && activeCategory === "Coming Soon Pages" && (
              <p className="text-white text-xl font-medium">
                Coming Soon Pages
              </p>
            )}
            {activeTab === "app" && activeCategory === "Maintenance Pages" && (
              <p className="text-white text-xl font-medium">
                Maintenance Pages
              </p>
            )}

            {/* ---------------------------- TEMPLATE per-afdeling ------------------------ */}

            {/* TEMPLATE per-afdeling blokken (nu werken ze 1-op-1 zoals bij Componenten) */}

            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Landing Pages" && <TemplateGrid />}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Landing Pages" && <div></div>}

            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "SaaS Templates" && (
                <p className="text-white text-xl font-medium">SaaS Templates</p>
              )}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Portfolio" && (
                <p className="text-white text-xl font-medium">Portfolio</p>
              )}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Agency" && (
                <p className="text-white text-xl font-medium">Agency</p>
              )}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Blog" && (
                <p className="text-white text-xl font-medium">Blog</p>
              )}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "E-commerce" && (
                <p className="text-white text-xl font-medium">E-commerce</p>
              )}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Pricing Pages" && (
                <p className="text-white text-xl font-medium">Pricing Pages</p>
              )}
            {activeTab === "templates" &&
              !shouldShowGrid &&
              activeCategory === "Auth Flows" && (
                <p className="text-white text-xl font-medium">Auth Flows</p>
              )}
          </main>

          {/* mobile prev/next blijft hetzelfde */}
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
