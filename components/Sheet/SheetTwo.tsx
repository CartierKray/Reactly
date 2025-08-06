"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Reviews } from "../Reviews/Reviews";

export function SheetTwo() {
  const [name, setName] = useState("Pedro Duarte");
  const [username, setUsername] = useState("@peduarte");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent -mt-5 hover:shadow-lg hover:bg-transparent hover:backdrop-blur-sm hover:outline hover:outline-1 hover:outline-white/50 hover:rounded-3xl">
          <div className="flex">
            <div className="flex items-center text-center justify-center">
              <Image
                src="/images/google-sm.png"
                alt=""
                width={1000}
                height={1000}
                className="w-5 h-5 mr-5 mb-2 mt-1.5"
              />
            </div>
            <div className="w-full flex items-center text-center justify-center mb-1">
              <div className="flex items-center  justify-center mx-auto w-full space-x-4 text-center">
                <div className="">
                  <div className="flex space-x-1">
                    <div className="flex pt-1">
                      <Image
                        src="/svg/staryellow.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-4 h-4 text-yellow-500"
                      />
                      <Image
                        src="/svg/staryellow.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-4 h-4"
                      />
                      <Image
                        src="/svg/staryellow.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-4 h-4"
                      />
                      <Image
                        src="/svg/staryellow.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-4 h-4"
                      />
                      <Image
                        src="/svg/staryellowhalf.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[10px] cursor-pointer ml-2 pt-2 text-black font-medium underline">
              186 reviews
            </div>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-3xl">Google reviews</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
        </SheetHeader>
        <Reviews />
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
