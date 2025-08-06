import React from "react";
import { InfiniteMovingImageCards } from "../ui/infinitive-moving-cards-two";

function InfinitiveMovingCardsIMG() {
  return (
    <>
      <div className="">
        <InfiniteMovingImageCards
          images={[
            {
              src: "/svg/raceplanet.svg",
              alt: "RacePlanet",
            },

            { src: "/svg/bambuu.svg", alt: "BambBuu" },
            {
              src: "/svg/bitvavo.svg",
              alt: "Bitvavo",
            },
            {
              src: "/svg/khanAangepast.svg",
              alt: "Khan Premium Automotive",
            },
            {
              src: "/svg/bridgefund.svg",
              alt: "BridgeFund",
            },
            {
              src: "/svg/brendakookt.svg",
              alt: "BrendaKookt",
            },
            {
              src: "/svg/yoyo.svg",
              alt: "YoYo",
            },

            {
              src: "/svg/bouwmensen.svg",
              alt: "Bouw Mensen",
            },
            { src: "/svg/breinstein.svg", alt: "Breinstein" },
            { src: "/svg/volvo-kuyk.svg", alt: "Volvo" },
            { src: "/svg/hearingcoach.svg", alt: "Hearing Coach" },
            { src: "/svg/bigairbag.svg", alt: "Big Airbag" },
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
