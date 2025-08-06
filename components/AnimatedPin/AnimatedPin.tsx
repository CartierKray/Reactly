"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";
import Image from "next/image";

export function AnimatedPin() {
  return (
    <div className="h-[40rem] bg-[#171719] w-full flex items-center justify-center ">
      <PinContainer title="Google maps" href="https://twitter.com/mannupaaji">
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs tracking-wider !pb-3 !m-0 font-semibold text-2xl text-slate-100">
            Alpha Lease Group
          </h3>
          <div className="text-base pb-2 font-normal">
            <span className="text-xs text-neutral-300 ">
              Creative agency - Amsterdam
            </span>
          </div>
          {/* <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" /> */}
          <div>
            <Image
              src="/images/141-Rotterdam.jpeg"
              alt=""
              width={1000}
              height={1000}
              className="h-48 mt-4 rounded-md"
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
