import React from "react";

function CardsIntro() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 mt-20 pt-5 text-center">
        <div className="hidden md:flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
          <div className="flex-grow border-t border-gray-300" />
          <h1 className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
            Lease jouw droomauto
          </h1>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex md:hidden items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
          <div className="flex-grow border-t border-gray-300" />
          <h1 className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
            Leasevormen
          </h1>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        {/* <p className="text-gray-600 dark:text-white text-[15px] font-light leading-relaxed max-w-3xl mx-auto mb-8">
          Lease uw zakelijke financial lease auto bij BeterLease.nl Met onze
          jaren ervaring als financial lease expert zijn wij dé leasepartner
          voor ondernemers en maken wij zakelijk leasen betaalbaar en eenvoudig.
          Kies uit <span>financial lease</span>
          ,&nbsp;
          <span>operational lease</span>,&nbsp;<span>equipment lease</span> of{" "}
          <span>private lease</span>. Onze leaseadviseurs helpen u graag bij het
          vinden van de beste leasevorm en leaseauto die past bij uw wensen en
          ambities.
        </p> */}

        {/* <p className="text-gray-600 text-[10px] leading-relaxed max-w-3xl mx-auto italic font-serif">
          <span className="font-semibold">Belangrijk:</span> Wij verwelkomen u
          graag op ons bezoekadres. Omdat onze horloges niet op locatie aanwezig
          zijn, vragen wij u vriendelijk om vooraf een afspraak te maken. Bij
          aankopen accepteren wij contante betalingen tot een maximum van
          €2000,-. We vragen u om de betaling persoonlijk te doen en dit te
          bevestigen met een geldig legitimatiebewijs.
        </p> */}
      </div>
    </>
  );
}

export default CardsIntro;
