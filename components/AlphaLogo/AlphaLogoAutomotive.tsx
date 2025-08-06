import React from "react";
import AlphaLogoFour from "./AlphaLogoFour";

function AlphaLogoAutomotive() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-[#171719]">
        <div className="flex flex-col items-center justify-center">
          <div className="scale-125">
            <div className="scale-150 grid ">
              <AlphaLogoFour />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlphaLogoAutomotive;
