import React from "react";

function DienstenIntro() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-14 pb-8 md:pb-10 mt-10 text-center">
        {/* Titel met lijn */}
        <div className="hidden md:flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
          <div className="flex-grow border-t border-gray-300" />
          <div className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
            Diensten
          </div>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <div className=" flex md:hidden items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
          <div className="flex-grow border-t border-gray-300" />
          <div className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
            Diensten
          </div>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Intro tekst */}
        {/* <p className="text-gray-600 dark:text-white text-[15px] font-light leading-relaxed max-w-3xl mx-auto mb-8">
        Lease uw zakelijke financial lease auto bij BeterLease.nl. Met onze
        jaren ervaring als financial lease expert zijn wij dé leasepartner voor
        ondernemers en maken wij zakelijk leasen betaalbaar en eenvoudig. Kies
        uit <span>financial lease</span>, <span>operational lease</span>,{" "}
        <span>equipment lease</span> of <span>private lease</span>. Onze
        leaseadviseurs helpen u graag bij het vinden van de beste leasevorm en
        leaseauto die past bij uw wensen en ambities.
      </p> */}
      </div>
    </>
  );
}

export default DienstenIntro;
