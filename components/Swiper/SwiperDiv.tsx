import React from "react";
import CardSwiper from "./Swiper";
import BannerTwo from "../Banner/BannerTwo";
import Link from "next/link";

function SwiperDiv() {
  return (
    <div>
      <div className="w-full flex h-screen custom-bg-image-swiper">
        <div className="w-full h-full ">
          <CardSwiper />
        </div>
      </div>
    </div>
  );
}

export default SwiperDiv;
