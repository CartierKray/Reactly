import React from "react";

function HomePageIntro() {
  return (
    <>
      <div className="">
        <div className="max-w-5xl mx-auto  px-4 py-14 pb-8 md:pb-24 md:py-20 mt-10 text-center">
          {/* Titel met lijn */}
          <div className="hidden md:flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
            <div className="flex-grow border-t border-gray-300" />
            <div className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
              Welkom
            </div>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <div className=" flex md:hidden items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
            <div className="flex-grow border-t border-gray-300" />
            <div className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
              Welkom
            </div>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageIntro;
