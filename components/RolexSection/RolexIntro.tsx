"use client";

import React from "react";

const RolexIntro: React.FC = () => {
  return (
    <section className="md:max-w-5xl max-w-md mx-auto px-4 py-20 mt-10 text-center">
      <div className="flex md:hidden items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
        <div className="flex-grow border-t border-gray-300" />
        <h1 className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
          A.I.
        </h1>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <div className="hidden md:flex items-center mx-auto justify-center gap-4 text-center max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
        <div className="flex-grow border-t border-gray-300" />
        <h1 className="text-4xl sm:text-5xl font-medium whitespace-nowrap">
          Artificial Intelligence
        </h1>
        <div className="flex-grow border-t border-gray-300" />
      </div>
    </section>
  );
};

export default RolexIntro;
