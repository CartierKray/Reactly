import Link from "next/link";
import React from "react";

function Opening() {
  return (
    <>
      <div className="max-w-[1300px] pt-20 mx-auto sm:px-6">
        {/* Title */}
        <div className="pl-6 md:pl-3.5 lg:pl-5">
          <h2 className="text-4xl md:text-5xl font-medium  text-black">
            Dé leasevormen van<span className="text-black"> BeterLease.nl</span>
          </h2>
          <div className="w-fit pt-1">
            <p className="text-[12px] text-[#000] pt-1 uppercase tracking-wider">
              LEASEVOORRAAD
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Opening;
