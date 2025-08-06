import React from "react";

function FaqIntro() {
  return (
    <>
      <div className="pb-16">
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-neutral-900 text-center dark:text-white"
        >
          Veel gestelde vragen
        </h2>
        <p className="mt-2 text-md md:text-lg max-w-xs md:max-w-xl mx-auto text-neutral-600 text-center dark:text-neutral-200">
          We staan voor je klaar om je te helpen met al je vragen. Kun je niet
          vinden wat je zoekt? Neem contact met ons op via &nbsp;
          <a href="mailto:info@reactly.nl" className="text-blue-500 underline">
            info@reactly.nl
          </a>
        </p>
      </div>
    </>
  );
}

export default FaqIntro;
