import React from "react";

function FaqIntro() {
  return (
    <>
      <div className="pb-16">
        <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 md:text-5xl dark:text-neutral-50">
          Veel gestelde vragen
        </h2>
        <p className="mx-auto max-w-lg pt-4 font-light text-center text-base text-neutral-600 dark:text-neutral-50">
          We staan voor je klaar om je te helpen met al je vragen. Kun je niet
          vinden wat je zoekt? Neemcontact met ons op via &nbsp;
          <a href="mailto:info@reactly.nl" className="text-blue-500 underline">
            info@reactly.nl
          </a>
        </p>
      </div>
    </>
  );
}

export default FaqIntro;
