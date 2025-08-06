import React from "react";

function TextBetweenThree() {
  return (
    <>
      <div className="p-1.5 xl:p-0">
        {" "}
        <div className="p-4 bg-transparent xl:pb-16 md:pb-14 pb-10 pl-5 xl:pl-20">
          <div className="text-white max-w-2xl">
            <p className="text-4xl md:text-5xl pt-2 font-medium">
              Bekijk onze aanbod
              <br />
              <span className="text-amber-500">nieuwste occasions </span>
            </p>
          </div>
          <div className="w-fit pt-2">
            <p className="text-[12px] text-green-500 pt-1 uppercase tracking-wider">
              BESTE OCCASIONS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextBetweenThree;
