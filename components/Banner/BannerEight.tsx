"use client";

import { useEffect, useState } from "react";

const texts = [
  { text: "Bekroond als #1 in Webdesign & Marketing  🎉" },
  { text: "Offerte voor web & marketing binnen 24 uur 🚀" },
  { text: "17+ jaar design & marketing ervaring 👨🏻‍💻" },
  { text: "Websites die klanten opleveren ✅" },
  { text: "Boost je merk met creatieve campagnes 📈" },
  { text: "SEO & SEA die omzet genereren 💰" },
  { text: "Pixel-perfect responsive design 📲" },
  { text: "Verdubbel je bereik op social 📣" },
  { text: "Data-gedreven groei voor maximale ROI 📊" },
  { text: "Alles van branding tot lancering 🏠" },
  { text: "Snel en schaalbaar online groeien ⚡️" },
  { text: "Creatieve campagnes die blijven hangen 🎨" },
  { text: "Conversiegericht webdesign dat werkt ⚡️" },
  { text: "Jouw merk, onze strategie 🤝" },
  { text: "Meer leads, meer klanten, meer omzet 💎" },
  { text: "Digitale oplossingen die resultaat geven 🌐" },
];

export default function BannerEight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  // Tekstrotatie (blijft werken)
  useEffect(() => {
    const id = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((p) => (p + 1) % texts.length);
    }, 4000);
    return () => clearInterval(id);
  }, [currentIndex]);

  return (
    <div
      className={[
        // blok met vaste hoogte
        "relative w-full h-10",
        // blauw + inner shadow (beide randen zichtbaar)
        "bg-blue-600 text-white shadow-inner shadow-[#0080ff]",
        // geen seam/clip
        "overflow-visible isolate border-none ring-0 outline-none",
      ].join(" ")}
    >
      <div
        className="
          relative z-10 max-w-7xl h-full px-4 md:px-10 mx-auto
          grid grid-cols-1 lg:grid-cols-3 items-center
          justify-items-center lg:justify-items-stretch
        "
      >
        {/* MIDDEN — ALTIJD GECENTREERD */}
        <div className="col-span-1 pt-0.5 lg:col-start-2 flex items-center justify-center w-full mx-auto">
          {/* Animatievenster: grid-overlap i.p.v. relative/absolute */}
          <div className="h-5 w-full grid place-items-center overflow-hidden">
            {texts.map((item, index) => {
              let cls =
                // overlap in dezelfde gridcel, gecentreerd
                "col-start-1 row-start-1 text-[12px] px-2 " +
                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform";

              if (index === currentIndex) cls += " translate-y-0 opacity-100";
              else if (index === prevIndex)
                cls += " -translate-y-full opacity-0";
              else cls += " translate-y-full opacity-0";

              return (
                <div key={index} className={cls}>
                  <span className="tracking-wider font-medium whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
