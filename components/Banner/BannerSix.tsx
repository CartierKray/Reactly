import React from "react";

function BannerSix() {
  return (
    <>
      <div className="relative">
        <div className="bg-black text-white md:py-2">
          <div className="max-w-7xl text-xs mx-auto px-12 flex flex-col md:flex-row justify-around items-center md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-green-500 text-base">✓</span>
              <p>Financial lease voor ondernemers</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-500 text-base">✓</span>
              <p>Alle merken en modellen beschikbaar</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-400 text-base">★</span>
              <p>9,5 voor klanttevredenheid</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerSix;
