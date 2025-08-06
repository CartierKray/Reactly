import React from "react";

function TextBetweenFive() {
  return (
    <>
      <div className="p-1.5 xl:p-0">
        {" "}
        <div className="p-4 bg-transparent xl:pb-16 md:pb-14 pb-10 pl-4 xl:pl-20">
          <div className="text-black max-w-2xl">
            <p className="text-4xl md:text-5xl  pt-2 font-medium">
              Bekijk onze aanbod
              <br />
              <span className="text-black">nieuwste occasions </span>
            </p>
          </div>
          <div className="w-fit pt-2">
            <p className="text-[12px] text-black pt-1 uppercase tracking-wider">
              BESTE OCCASIONS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextBetweenFive;
