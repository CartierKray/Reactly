"use client";

import Image from "next/image";
import TrustpilotBadge from "../TrustPilotBadge/TrustPilotBadge";

export default function G2BadgeSection() {
  const badgePaths = [
    "/images/g2-1.png",
    "/images/g2-2.png",
    "/images/g2-3.png",
    "/images/g2-4.png",
    "/images/g2-5.png",
    "/images/g2-6.png",
  ];

  const cesarSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 58 122"
      className="h-[140px] md:h-[130px] "
      fill="none"
    >
      <path
        fill="#E4D9C8"
        fillRule="evenodd"
        d="M33.688 17.303C40.086 8.367 35.282.055 35.282.055s-11.64 11.269-5.529 20.85a59.214 59.214 0 0 0-6.309 7.56c3.124-10.946-4.587-17.175-4.587-17.175s-6.622 14.299 1.992 21.17a66.54 66.54 0 0 0-4.496 9.016C18.268 30.7 10.387 25.25 10.387 25.25S4.634 40.588 14.51 46.57a66.685 66.685 0 0 0-1.996 7.96c-.422-10.67-9.03-14.39-9.03-14.39s-2.622 16.161 8.23 20.1a61.8 61.8 0 0 0-.272 6.736c.017 1.144.067 2.288.15 3.43C8.138 61.873.089 60.482.089 60.482s1.253 16.179 12.585 17.59a52.912 52.912 0 0 0 4.36 12.58C10.152 81.979.769 84.326.769 84.326s7.82 14.468 18.858 10.934a51.876 51.876 0 0 0 4.921 6.573c-8.237-4.28-15.282-.065-15.282-.065s11.227 11.125 20.647 5.382c3.01 2.604 6.42 5.008 10.255 7.166-10.548-3.93-17.37 3.085-17.37 3.085s14.431 8.283 21.913-.74c3.532 1.669 7.378 3.148 11.55 4.411a.673.673 0 1 0 .39-1.29c-4.172-1.262-8.005-2.742-11.516-4.411.944-13.095-9.448-16.39-9.448-16.39s-.469 7.872 3.243 13.051a60.232 60.232 0 0 1-7.77-5.587c5.813-12.083-2.87-18.948-2.87-18.948s-4.085 9.073-.771 15.557a51.904 51.904 0 0 1-4.382-5.085 50.45 50.45 0 0 1-2.789-4.102c9.044-10.38 2.221-19.36 2.221-19.36s-6.264 7.812-4.627 14.932a51.626 51.626 0 0 1-3.922-11.52c12.124-6.09 9.356-16.875 9.356-16.875s-9.122 4.945-10.13 12.349a57.276 57.276 0 0 1-.454-6.434 60.25 60.25 0 0 1 .17-5.479l.013.101c13.4-3.521 12.787-14.809 12.787-14.809s-9.595 2.974-12.228 9.796a65.259 65.259 0 0 1 2.847-11.348c13.627.153 16.124-10.725 16.124-10.725s-9.513.21-14.095 5.596a64.473 64.473 0 0 1 5.002-9.178c13.006 4.173 18.613-5.505 18.613-5.505s-10.116-2.861-16.013 1.845a56.68 56.68 0 0 1 5.408-6.098c11.98 6.596 19.347-1.843 19.347-1.843s-8.94-4.514-15.59-1.479a46.571 46.571 0 0 1 5.855-4.004c13.148.627 16.189-9.81 16.189-9.81s-13.671-.484-16.651 8.52a48.138 48.138 0 0 0-6.881 4.765Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className=" mb-12 md:-mb-1">
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Left SVG */}
        <div className="rotate-[7.32deg]">{cesarSvg}</div>

        {/* Center content */}
        <div className="flex flex-col items-center justify-center text-center gap-3">
          {/* <div className="flex mb-2 items-center cursor-pointer text-[10px] gap-1">
            <span className="font-semibold hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              <Image
                src="/svg/stars-trustpilot.svg"
                alt="Google"
                width={10}
                height={10}
                className="w-full h-3"
              />
            </span>
            <span className="">218 reviews op</span>
            <div className="flex text-yellow-500">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <AiFillStar key={i} size={14} />
                ))}
            </div>
          </div> */}
          <div className="">
            <TrustpilotBadge />
          </div>

          <div className="grid grid-cols-3 grid-rows-2 md:flex md:flex-wrap items-center justify-center gap-2">
            {badgePaths.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`G2 Badge ${index + 1}`}
                width={64}
                height={100}
                className="w-[64px] md:w-[50px] aspect-[895/1000] object-contain"
              />
            ))}
          </div>
        </div>

        {/* Right SVG (mirrored) */}
        <div className="rotate-[-7.32deg] scale-x-[-1]">{cesarSvg}</div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl md:text-4xl font-medium text-black dark:text-white">
          Klanten beoordelen ons als #1 <br /> in webdesign & marketing
        </h2>

        <div className="mt-8 flex flex-row gap-4 text-sm items-center justify-center">
          {/* Ontdek de mogelijkheden */}
          {/* <Link href="/aanbod">
            <button className="relative border-t border-b border-black dark:border-[#c2b293] px-6 py-2 text-black dark:text-white overflow-hidden group transform-gpu">
              <span className="relative z-10 text-xs sm:text-sm uppercase group-hover:tracking-wide group-hover:font-medium transition-all duration-500 ease-in-out group-hover:text-white">
                Ontdek onze diensten
              </span>
              <span className="absolute inset-0 bg-black dark:bg-[#c2b293] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 transform-gpu will-change-transform" />
            </button>
          </Link> */}

          {/* Neem contact op */}
          {/* <Link href="/contact">
            <button className="relative border-t border-b border-black dark:border-white px-4 py-2 text-black dark:text-white overflow-hidden group transform-gpu">
              <span className="relative z-10 text-xs sm:text-sm uppercase group-hover:tracking-wide group-hover:font-medium transition-all duration-500 ease-in-out group-hover:text-white dark:group-hover:text-black">
                Neem contact op
              </span>
              <span className="absolute inset-0 bg-black dark:bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 transform-gpu will-change-transform" />
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
