"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSectionTwo = () => {
  const updates = [
    {
      title: "Financial Lease",
      image:
        "/images/2021 Audi A3 8Y Sportback Atollblue - Lisboa - Portugal 12.jpg",
      label: "Financial Lease",
      link: "/voor-wie#financial-lease",
    },
    {
      title: "Wat is Financial Lease?",
      image:
        "/images/2019 Audi SQ8 TDI - Daytona Grey - Tardes - France 04.jpg",
      label: "Operational Lease",
      link: "/voor-wie#operational-lease",
    },
    {
      title: "Hoe werkt Financial Lease?",
      image:
        "/images/2022 Audi E-Tron Black Edition 55 - Chronos grey - Malmo - Sweden 01.jpg",
      label: "Equipment Lease",
      link: "/voor-wie#equipment-lease",
    },
    {
      title: "Waarom Financial Lease",
      image:
        "/images/2020 Audi S4 Sedan B9 5 - Turbo blue - Bolzano - Italy 08.jpg",
      label: "Voordelen van leasen",
      link: "/voor-wie#waarom-leasen",
    },
  ];

  return (
    <section className="pb-20 p-0.5 md:pb-40 pt-5 md:pt-20 xl:pt-0 xl:pb-52 bg-[#171719]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-medium text-white">
          Leer meer over <span className="text-[#f00]"> leasen</span>
        </h2>
        <div className="w-fit pt-2 mb-12">
          <p className="text-[12px] text-[#f00] pt-1 uppercase tracking-wider">
            ONZE BLOGS
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {updates.map((update, index) => (
            <Link
              href={update.link}
              key={index}
              passHref
              className="group overflow-hidden rounded-xl shadow-lg bg-white block"
            >
              {/* Image */}
              <div className="relative cursor-pointer">
                <Image
                  src={update.image}
                  alt={update.title}
                  width={500}
                  height={300}
                  className="w-full h-[275px] md:h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />

                {/* Label */}
                <div className="absolute tracking-wider top-3 left-3 bg-black/80 hover:from-black/75  hover:via-black/50 hover:to-black/25  shadow-white/35 hover:shadow-white/50 backdrop-blur-md px-3 py-2 rounded-full text-xs font-medium text-white shadow-xl custom-shadow-small">
                  {update.label}
                </div>
              </div>
              {/* Title */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSectionTwo;
