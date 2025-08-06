"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function ThreeDCardSix() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card hover:shadow-lg hover:shadow-yellow-300 dark:bg-black dark:border-white/[0.2] border-black/[0.1] border-none w-auto sm:w-[30rem] h-auto rounded-xl border">
        <CardItem translateZ="100" className="w-full">
          <Image
            src="/images/5_other_image_17355647422135117692.jpg"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />

          <div className="custom-shadow absolute inset-0 justify-start text-white items-end flex bottom-2 left-3 font-semibold text-2xl">
            {" "}
            Forest Engine
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
