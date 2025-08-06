/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  {
    key: "app",
    label: "Component Packs",
    categories: [
      "Product Grid",
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
    components: [
      {
        title: "Hero Sections",
        items: 9,
        price: 12,
        oldPrice: 18,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A collection of hero sections that are modern and stand out",
      },
      {
        title: "Logo Clouds",
        items: 3,
        price: 10,
        oldPrice: 16,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A collection of logo clouds with micro interactions and minimal animations",
      },
      {
        title: "Feature Sections",
        items: 4,
        price: 9,
        oldPrice: 14,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A set of feature sections ranging from bento grids to simple layouts",
      },
      {
        title: "Hero Sections",
        items: 9,
        price: 12,
        oldPrice: 18,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A collection of hero sections that are modern and stand out",
      },
      {
        title: "Logo Clouds",
        items: 3,
        price: 10,
        oldPrice: 16,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A collection of logo clouds with micro interactions and minimal animations",
      },
      {
        title: "Feature Sections",
        items: 4,
        price: 9,
        oldPrice: 14,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A set of feature sections ranging from bento grids to simple layouts",
      },
      {
        title: "Backgrounds",
        items: 8,
        price: 9,
        oldPrice: 15,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A set of beautiful, creative backgrounds for landing pages",
      },
      {
        title: "Bento Grids",
        items: 3,
        price: 12,
        oldPrice: 18,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description: "A set of bento grids for various use cases",
      },
      {
        title: "Blog Content Sections",
        items: 2,
        price: 9,
        oldPrice: 15,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description: "Content sections for your single blog posts",
      },
      {
        title: "Hero Sections",
        items: 9,
        price: 12,
        oldPrice: 18,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A collection of hero sections that are modern and stand out",
      },
      {
        title: "Logo Clouds",
        items: 3,
        price: 10,
        oldPrice: 16,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A collection of logo clouds with micro interactions and minimal animations",
      },
      {
        title: "Feature Sections",
        items: 4,
        price: 9,
        oldPrice: 14,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A set of feature sections ranging from bento grids to simple layouts",
      },
      {
        title: "Backgrounds",
        items: 8,
        price: 9,
        oldPrice: 15,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description:
          "A set of beautiful, creative backgrounds for landing pages",
      },
      {
        title: "Bento Grids",
        items: 3,
        price: 12,
        oldPrice: 18,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description: "A set of bento grids for various use cases",
      },
      {
        title: "Blog Content Sections",
        items: 2,
        price: 9,
        oldPrice: 15,
        image: "/images/5_other_image_17355647422135117692.jpg",
        description: "Content sections for your single blog posts",
      },
    ],
  },
];

export default function ComponentenLijst() {
  const [activeTab] = useState("app");
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

  return (
    <div className="dark:bg-black min-h-screen text-white lg:pt-10 pb-10 md:pb-20 lg:pb-40">
      <div className="flex max-w-7xl mx-auto">
        <aside className="w-64 sticky top-0 h-screen overflow-y-auto p-6 hidden lg:block border-r border-black/10 dark:border-white/10">
          <h2 className="text-[13.5px] text-black dark:text-white  font-normal mb-3">
            Componenten
          </h2>
          <ul className="space-y-1.5 text-sm">
            {activeContent?.categories.map((cat, idx) => (
              <li
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "cursor-pointer transition",
                  activeCategory === cat
                    ? "dark:text-white text-black font-medium text-[12.5px]"
                    : "dark:text-white/50 text-black/50 hover:text-black dark:hover:text-white text-[12.5px]"
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
            {activeCategory === "Product Grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeContent?.components?.map((component, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 border border-black/10 dark:border-white/5"
                  >
                    <div className="relative aspect-[5/3]">
                      <Image
                        src={component.image}
                        alt={component.title}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex mt-2.5 justify-between items-center mb-2">
                        <h3 className="text-black dark:text-white font-medium text-base">
                          {component.title}
                          <span className="text-[10px] dark:bg-[#444] px-1 py-0.5 rounded-3xl border border-[#707070] ml-1">
                            {component.items}
                          </span>
                        </h3>
                        <div className="text-sm space-x-1 text-right">
                          <span className="line-through text-[12px] text-black/40 dark:text-white/40 mr-1">
                            €{component.oldPrice}
                          </span>
                          <span className="text-black dark:text-white">
                            €{component.price}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs py-3  max-w-[300px] text-black/50 dark:text-white/60">
                        {component.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory !== "Product Grid" && (
              <p className="text-white text-xl font-medium">{activeCategory}</p>
            )}

            {activeCategory === "Hero Sections" && (
              <p className="text-white text-xl font-medium">Hero Sections</p>
            )}
            {activeCategory === "Logo Clouds" && (
              <p className="text-white text-xl font-medium">Logo Clouds</p>
            )}
            {activeCategory === "Bento Grids" && (
              <p className="text-white text-xl font-medium">Bento Grids</p>
            )}
            {activeCategory === "CTA Sections" && (
              <p className="text-white text-xl font-medium">CTA Sections</p>
            )}
            {activeCategory === "Testimonials" && (
              <p className="text-white text-xl font-medium">Testimonials</p>
            )}
            {activeCategory === "Feature sections" && (
              <p className="text-white text-xl font-medium">Feature sections</p>
            )}
            {activeCategory === "Pricing sections" && (
              <p className="text-white text-xl font-medium">Pricing sections</p>
            )}
            {activeCategory === "Cards" && (
              <p className="text-white text-xl font-medium">Cards</p>
            )}
            {activeCategory === "Navbars" && (
              <p className="text-white text-xl font-medium">Navbars</p>
            )}
            {activeCategory === "Footers" && (
              <p className="text-white text-xl font-medium">Footers</p>
            )}
            {activeCategory === "Login and Signup" && (
              <p className="text-white text-xl font-medium">Login and Signup</p>
            )}
            {activeCategory === "Contact Sections" && (
              <p className="text-white text-xl font-medium">Contact Sections</p>
            )}
            {activeCategory === "Blog Sections" && (
              <p className="text-white text-xl font-medium">Blog Sections</p>
            )}
            {activeCategory === "Blog Content Sections" && (
              <p className="text-white text-xl font-medium">
                Blog Content Sections
              </p>
            )}
            {activeCategory === "FAQs" && (
              <p className="text-white text-xl font-medium">FAQs</p>
            )}
            {activeCategory === "Sidebars" && (
              <p className="text-white text-xl font-medium">Sidebars</p>
            )}
            {activeCategory === "Stats Sections" && (
              <p className="text-white text-xl font-medium">Stats Sections</p>
            )}
            {activeCategory === "Animations" && (
              <p className="text-white text-xl font-medium">Animations</p>
            )}
            {activeCategory === "Integrations" && (
              <p className="text-white text-xl font-medium">Integrations</p>
            )}
            {activeCategory === "Code Snippets" && (
              <p className="text-white text-xl font-medium">Code Snippets</p>
            )}
            {activeCategory === "Newsletter Forms" && (
              <p className="text-white text-xl font-medium">Newsletter Forms</p>
            )}
            {activeCategory === "Social Proof" && (
              <p className="text-white text-xl font-medium">Social Proof</p>
            )}
            {activeCategory === "Widgets" && (
              <p className="text-white text-xl font-medium">Widgets</p>
            )}
            {activeCategory === "Modals" && (
              <p className="text-white text-xl font-medium">Modals</p>
            )}
            {activeCategory === "Tables" && (
              <p className="text-white text-xl font-medium">Tables</p>
            )}
            {activeCategory === "Data Grids" && (
              <p className="text-white text-xl font-medium">Data Grids</p>
            )}
            {activeCategory === "Pagination" && (
              <p className="text-white text-xl font-medium">Pagination</p>
            )}
            {activeCategory === "Search Bars" && (
              <p className="text-white text-xl font-medium">Search Bars</p>
            )}
            {activeCategory === "Tags" && (
              <p className="text-white text-xl font-medium">Tags</p>
            )}
            {activeCategory === "Category Filters" && (
              <p className="text-white text-xl font-medium">Category Filters</p>
            )}
            {activeCategory === "Dropdown Menus" && (
              <p className="text-white text-xl font-medium">Dropdown Menus</p>
            )}
            {activeCategory === "Tooltips" && (
              <p className="text-white text-xl font-medium">Tooltips</p>
            )}
            {activeCategory === "Avatars" && (
              <p className="text-white text-xl font-medium">Avatars</p>
            )}
            {activeCategory === "Loaders" && (
              <p className="text-white text-xl font-medium">Loaders</p>
            )}
            {activeCategory === "Image Galleries" && (
              <p className="text-white text-xl font-medium">Image Galleries</p>
            )}
            {activeCategory === "Video Embeds" && (
              <p className="text-white text-xl font-medium">Video Embeds</p>
            )}
            {activeCategory === "Media Blocks" && (
              <p className="text-white text-xl font-medium">Media Blocks</p>
            )}
            {activeCategory === "Content Blocks" && (
              <p className="text-white text-xl font-medium">Content Blocks</p>
            )}
            {activeCategory === "Tabs" && (
              <p className="text-white text-xl font-medium">Tabs</p>
            )}
            {activeCategory === "Carousels" && (
              <p className="text-white text-xl font-medium">Carousels</p>
            )}
            {activeCategory === "Announcements" && (
              <p className="text-white text-xl font-medium">Announcements</p>
            )}
            {activeCategory === "Testimonials (Alt)" && (
              <p className="text-white text-xl font-medium">
                Testimonials (Alt)
              </p>
            )}
            {activeCategory === "Checkout Sections" && (
              <p className="text-white text-xl font-medium">
                Checkout Sections
              </p>
            )}
            {activeCategory === "Error Pages" && (
              <p className="text-white text-xl font-medium">Error Pages</p>
            )}
            {activeCategory === "Password Resets" && (
              <p className="text-white text-xl font-medium">Password Resets</p>
            )}
            {activeCategory === "Onboarding Flows" && (
              <p className="text-white text-xl font-medium">Onboarding Flows</p>
            )}
            {activeCategory === "Steps Components" && (
              <p className="text-white text-xl font-medium">Steps Components</p>
            )}
            {activeCategory === "Maps" && (
              <p className="text-white text-xl font-medium">Maps</p>
            )}
            {activeCategory === "404 Pages" && (
              <p className="text-white text-xl font-medium">404 Pages</p>
            )}
            {activeCategory === "Coming Soon Pages" && (
              <p className="text-white text-xl font-medium">
                Coming Soon Pages
              </p>
            )}
            {activeCategory === "Maintenance Pages" && (
              <p className="text-white text-xl font-medium">
                Maintenance Pages
              </p>
            )}
          </main>

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
