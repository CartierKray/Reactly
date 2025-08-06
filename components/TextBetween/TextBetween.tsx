import React from "react";

function TextBetween() {
  return (
    <>
      <div className="">
        {" "}
        <div className="bg-transparent xl:pb-16 md:pb-6 pb-10">
          <div className="text-white max-w-2xl">
            <p className="text-4xl md:text-5xl pt-2 font-medium">
              Populaire zakelijke
              <br />
              <span className="text-[#f00]">lease modellen </span>
            </p>
          </div>
          <div className="w-fit pt-2">
            <p className="text-[12px] text-white pt-1 uppercase tracking-wider">
              BESTE DEALS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextBetween;
