"use client";

import React from "react";
import Image from "next/image";

const images = [
  {
    src: "/images/1920x1080_fahrtenbuch.avif", // Update with your image paths
    alt: "Financial Lease",
    description: "Financial Lease is een zakelijke leasevorm voor ondernemers!",
  },
  {
    src: "/images/1920x1080-audi-e-tron-s-interior-my2021-0481.avif",
    alt: "Operational Lease",
    description: "Ontdek de voordelen van Operationnal Lease",
  },
  {
    src: "/images/1920x1920-audi-q8-tfsi-e-my2021-stage-1445.avif",
    alt: "Private Lease",
    description:
      "Private lease voor particulieren die zonder zorgen de weg op willen.",
  },
  {
    src: "/images/A3_2023_5635_without_cast.avif",
    alt: "Short Lease",
    description: "Onze duurzame oplossing tot Short Lease",
  },
];

const CollectionShowcase: React.FC = () => {
  return (
    <div className="w-full py-10 xl:pb-0">
      <div className="p-5 lg:pl-40 lg:pb-10 lg:pt-20">
        <h2 className="text-start text-sm font-semibold">
          Een verrijking van je reis
        </h2>

        <h3 className="text-start pt-2 text-2xl lg:text-3xl">
          Wat maakt ons zo speciaal?
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:gap-10 lg:pl-40 lg:pr-40 lg:pb-20">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden shadow-md lg:rounded-md group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={1000}
              className="w-full h-[30vh] lg:h-[60vh] transition-transform duration-1000 ease-in-out lg:rounded-md object-cover group-hover:scale-110"
            />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"></div>
            <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 text-white">
              <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                {image.alt}
              </h4>
              <p className="text-sm md:text-md ">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionShowcase;
