"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface ThreeDCardProps {
  imageSrc: string;
  title: string;
  onClick?: () => void;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({
  imageSrc,
  title,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer w-auto sm:w-[25rem]">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card hover:shadow-lg hover:shadow-blue-500 dark:bg-black dark:border-white/[0.2] border-black/[0.1] border-none h-auto rounded-xl border">
          <CardItem translateZ="100" className="w-full">
            <Image
              src={imageSrc}
              height={1000}
              width={1000}
              className="h-80 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
            <div className="absolute inset-0 flex items-end left-4 bottom-3 font-semibold text-2xl text-white">
              {title}
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default ThreeDCard;
