import React from "react";
import End from "@/components/End/End";
import Footer from "@/components/FooterCCX/Footer";
import VideoBannerTen from "@/components/VideoBanner/VideoBannerTen";

function PrivacybeleidPage() {
  return (
    <>
      <div>
        <VideoBannerTen />
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-stone-800 via-stone-900 to-[#2d3033] text-white py-20">
          <div className="max-w-3xl p-4 md:p-10 md:text-center">
            <div className="block">
              <h1 className="text-2xl font-bold mb-4">Privacybeleid</h1>
              <p className="text-sm mb-2">Laatst bijgewerkt: 27-05-2025</p>
              <p className="mb-4">
                Wij hechten veel waarde aan jouw privacy en gaan zorgvuldig om
                met je persoonsgegevens. In dit privacybeleid leggen we uit
                welke gegevens we verzamelen, waarom we dat doen en hoe we ze
                beschermen.
              </p>
              <h2 className="text-xl font-semibold mt-6">
                Welke gegevens verzamelen we?
              </h2>
              <p className="mb-4">
                Wij kunnen de volgende gegevens verzamelen wanneer je onze
                website bezoekt of contact met ons opneemt:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Naam en contactgegevens (zoals e-mailadres en telefoonnummer)
                </li>
                <li>IP-adres en browsergegevens</li>
                <li>
                  Eventuele andere gegevens die je vrijwillig verstrekt via
                  contactformulieren
                </li>
              </ul>
              <h2 className="text-xl font-semibold mt-6">
                Waarom verzamelen we deze gegevens?
              </h2>
              <p className="mb-4">Wij gebruiken jouw gegevens om:</p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Onze website te verbeteren en gebruiksvriendelijker te maken
                </li>
                <li>Contact met je op te nemen indien nodig</li>
                <li>Wettelijke verplichtingen na te leven</li>
              </ul>
              <h2 className="text-xl font-semibold mt-6">
                Hoe beschermen we jouw gegevens?
              </h2>
              <p className="mb-4">
                Wij nemen passende technische en organisatorische maatregelen om
                jouw gegevens te beveiligen tegen verlies, misbruik of
                ongeoorloofde toegang.
              </p>
              <h2 className="text-xl font-semibold mt-6">
                Delen we jouw gegevens met derden?
              </h2>
              <p className="mb-4">
                Wij delen jouw gegevens niet met derden, tenzij dit noodzakelijk
                is voor de uitvoering van onze diensten of wettelijk verplicht
                is.
              </p>
              <h2 className="text-xl font-semibold mt-6">Cookies</h2>
              <p className="mb-4">
                Onze website maakt gebruik van cookies om de gebruikerservaring
                te verbeteren. Voor meer informatie kun je ons cookiebeleid
                raadplegen.
              </p>
              <h2 className="text-xl font-semibold mt-6">Jouw rechten</h2>
              <p className="mb-4">
                Je hebt het recht om jouw gegevens in te zien, te corrigeren of
                te laten verwijderen. Neem hiervoor contact met ons op via{" "}
                <a
                  href="mailto:info@beterlease.nl"
                  className="text-blue-400 underline"
                >
                  info@beterlease.nl
                </a>
                .
              </p>
              <h2 className="text-xl font-semibold mt-6">Contact</h2>
              <p>
                Voor vragen over dit privacybeleid kun je contact met ons
                opnemen via
                <a
                  href="mailto:info@beterlease.nl"
                  className="text-blue-400 underline"
                >
                  {" "}
                  info@beterlease.nl
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <End />
        <Footer />
      </div>
    </>
  );
}

export default PrivacybeleidPage;
