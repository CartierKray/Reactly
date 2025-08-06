"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSection = () => {
  const updates = [
    {
      title: "Financial Lease",
      image: "/images/KR_Lease_001-1536x1024.webp",
      label: "Financial Lease",
      link: "/voor-wie#financial-lease",
    },
    {
      title: "Wat is Financial Lease?",
      image: "/images/KR_Lease_007-1536x1018.webp",
      label: "Operational Lease",
      link: "/voor-wie#operational-lease",
    },
    {
      title: "Hoe werkt Financial Lease?",
      image: "/images/KR_Lease_003-1536x1024.webp",
      label: "Equipment Lease",
      link: "/voor-wie#equipment-lease",
    },
    {
      title: "Short Lease",
      image: "/images/KR_Lease_008-1.webp",
      label: "Short Lease",
      link: "/voor-wie#short-leasen",
    },
  ];

  return (
    <section className="pb-20 pt-20 xl:pb-32 ">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-medium text-black">Blogs</h2>
        <div className="w-fit pt-1 mb-12">
          <p className="text-[12px] text-[#000] pt-1 uppercase tracking-wider">
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
              className="group overflow-hidden rounded-xl shadow-lg bg-white block relative"
            >
              {/* Image */}
              <div className="relative cursor-pointer">
                <Image
                  src={update.image}
                  alt={update.title}
                  width={500}
                  height={300}
                  className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />

                {/* Overlay hover text effect */}
                {/* <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center pointer-events-none">
                  <div className="bg-black/75 text-white text-sm p-3 w-full text-center translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    {update.title}
                  </div>
                </div> */}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/5 transition-opacity duration-300 group-hover:opacity-0"></div>

                {/* Label */}
                <div className="absolute top-4 left-3 bg-[#c2b293] px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-md">
                  {update.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
