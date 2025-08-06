import React from "react";
import { InfiniteMovingImageCardsThree } from "../ui/infinitive-moving-cards-three";

function InfinitiveMovingCardsIMG() {
  return (
    <>
      <div className="">
        <InfiniteMovingImageCardsThree
          images={[
            { src: "/images/audi_logo.png", alt: "Audi" },
            {
              src: "/images/mercedes_logo.png",
              alt: "Mercedes-Benz",
            },
            {
              src: "/images/landrover_logo.png",
              alt: "Land-rover",
            },
            {
              src: "/images/porsche_logo.png",
              alt: "Porsche",
            },
            {
              src: "/images/Volkswagen_logo.jpeg",
              alt: "Volkswagen",
            },
            {
              src: "/images/Seat_logo.png",
              alt: "Seat",
            },
            { src: "/images/bmw_logo.png", alt: "BMW" },
            // enz.
          ]}
          direction="right"
          speed="slow"
        />
      </div>
    </>
  );
}

export default InfinitiveMovingCardsIMG;
