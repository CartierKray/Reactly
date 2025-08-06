import React from "react";
import AlphaLogoThree from "./AlphaLogoThree";

function AlphaLogoBlackRed() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-[#171719]">
        <div className="flex flex-col items-center justify-center">
          <div className="scale-125">
            <div className="scale-150 grid ">
              <AlphaLogoThree />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlphaLogoBlackRed;
