"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./EndImage.module.scss"; // Import a CSS module for styling
import Link from "next/link";

function EndImage() {
  useEffect(() => {
    const container = document.querySelector(
      `.${styles.container}`
    ) as HTMLElement;

    if (!container) {
      return;
    }

    const updateRotation = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = y / -20; // Adjust the divisor for a more pronounced effect
      const rotateY = -x / -20; // Adjust the divisor for a more pronounced effect

      if (container.style) {
        container.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    const resetRotation = () => {
      if (container.style) {
        container.style.transform =
          "perspective(2000px) rotateX(0deg) rotateY(0deg)";
      }
    };

    container.addEventListener("mousemove", updateRotation);
    container.addEventListener("mouseleave", resetRotation);

    return () => {
      container.removeEventListener("mousemove", updateRotation);
      container.removeEventListener("mouseleave", resetRotation);
    };
  }, []);

  return (
    <div className={`w-full xl:h-auto flex items-center justify-center `}>
      <div
        className={`flex justify-center mt-[90px] md:mt-[150px] mb-[125px] ${styles.container}`}
      >
        <div
          className={`md:pl-8 md:pr-8 ml-8 mr-8 max-w-7xl md:p-10 items-center `}
        >
          <div
            className={` overflow-hidden object-cover md:p-10 rounded-3xl ${styles.card}`}
          >
            <Image
              src="/IMG/stangel-2022-0527.webp"
              className={`w-full rounded-3xl h-full object-cover shadow-md shadow-neutral-400 ${styles.image}`}
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex gap-6 -mt-[0] md:-mt-[80px]  justify-between md:p-10">
            <div className="">
              <hr className="w-[50px] dark:border-gray-400 mt-5 mb-4" />
              <h1 className="">COLLABORATION</h1>
              <p className="">Capital Code X</p>
            </div>
            <Link href="/diensten">
              <div className="mt-2">
                <button className="relative font-extralight text-[12px] outline-1 outline-gray-200 outline mt-8 w-fit whitespace-nowrap pl-14 pr-14 pt-3 pb-3 bg-white rounded-full overflow-hidden group">
                  <span className="relative z-10 text-black group-hover:text-white transition-all duration-500 ease-in-out">
                    Meer informatie
                  </span>
                  <span className="absolute inset-0 rounded-full bg-black w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndImage;
