"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DirectAdvies from "../DirectAdvies/DirectAdvies";

const GoogleMaps: React.FC = () => {
  return (
    <>
      <footer className="bg-white text-black">
        <div className="w-full mx-auto">
          <div className="">
            {/* Google Maps */}
            <div className="shadow-md rounded overflow-hidden">
              <iframe
                title="Eerlijk Leasen"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2466.170278648665!2d5.028316615912441!3d51.97356297970915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66109763bc5cd%3A0x91f3741d9cf8b324!2sBedrijfsweg%207A%2C%203411%20NV%20Lopik!5e0!3m2!1snl!2snl!4v1684512220000!5m2!1snl!2snl"
                width="100%"
                height="200"
                loading="lazy"
                className="w-full h-full min-h-[200px] border-none"
                allowFullScreen
              ></iframe>
            </div>

            {/* Contactgegevens */}
            {/* <div className="shadow-md bg-white border-[0.1px]">
              <DirectAdvies />
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default GoogleMaps;
