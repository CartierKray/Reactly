import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButtonTwo";

export function SheetFour() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <div className="flex items-center px-3 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out py-2 font-normal cursor-pointer">
            <MenuIcon className="-mt-1.5 -mr-2" />
          </div>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="bg-gradient-to-b from-white via-gray-300 to-gray-800 text-transparent bg-clip-text text-start md:text-5xl ">
            {/* <BeterLeaseLogoSheet /> */}
            <div>
              <Image
                src="/svg/BeterLeaseSVG.svg"
                alt="BeterLease.nl logo"
                width={160}
                height={40}
                className="h-full md:h-20 w-auto"
                priority
              />
            </div>
          </SheetTitle>
          {/* <SheetDescription className="text-[#FFF] hidden md:flex text-[10px] lg:text-xs tracking-wider text-start md:pt-2.5 md:hover:tracking-wider md:hover:font-semibold transition-all duration-300 ease-in-out py-2 font-normal cursor-pointer">
            Beter geregeld. Beter geprijsd. BeterLease.nl
          </SheetDescription> */}
        </SheetHeader>

        <div className="text-black h-screen w-full flex flex-col">
          <div className="flex-1 text-start overflow-auto">
            <div className="md:space-y-6 grid md:flex justify-between pt-12 md:pt-20">
              {/* Linker kolom */}
              <div className="grid gap-4 md:gap-6 w-full md:w-1/2 pb-10">
                {[
                  {
                    href: "/diensten",
                    label: "Diensten",
                    textSize: "text-3xl md:text-4xl",
                  },
                  {
                    href: "/componenten",
                    label: "Producten",
                    textSize: "text-3xl md:text-4xl",
                  },
                  {
                    href: "/prijzen",
                    label: "Prijzen",
                    textSize: "text-3xl md:text-4xl",
                  },
                  {
                    href: "/faq",
                    label: "FAQ",
                    textSize: "text-3xl md:text-4xl",
                  },
                  {
                    href: "/contact",
                    label: "Contact",
                    textSize: "text-3xl md:text-4xl",
                  },
                ].map(({ href, label, textSize }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block font-semibold bg-gradient-to-b from-white to-white text-transparent bg-clip-text hover:text-white hover:tracking-widest hover:font-semibold transition-all duration-300 ease-in-out"
                  >
                    <div className={`${textSize}`}>{label}</div>
                  </Link>
                ))}
              </div>

              {/* Rechter kolom */}
              <div className="grid gap-2 w-full md:w-2/3 md:text-end">
                <div className="grid pb-2">
                  <div className="block text-[13px] lg:text-[15px] font-medium text-[#c2b293] dark:text-[#c2b293]">
                    Bereikbaarheid
                  </div>
                  <a
                    href="tel:+31610102952"
                    className="block text-[10px] md:text-[13px] lg:text-[14px] font-extralight text-white hover:text-[[#FFF] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                  >
                    +31 (0)6 10 10 29 52
                  </a>
                </div>

                <div className="grid pb-2 md:pt-2">
                  <div className="block text-[13px] lg:text-[15px] font-medium text-[#c2b293] dark:text-[#c2b293]">
                    E-mail
                  </div>
                  <a
                    href="mailto:info@alphaleasegroup.nl"
                    className="block text-[10px] md:text-[13px] lg:text-[14px] font-extralight text-white hover:text-[[#FFF] hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                  >
                    info@reactly.nl
                  </a>
                </div>

                <div className="grid pb-2 md:pt-2">
                  <Link href="/contact#contactgegevens">
                    <div className="block text-[13px] lg:text-[15px] font-medium text-[#c2b293] dark:text-[#c2b293]">
                      Adres
                    </div>
                  </Link>
                  <div className="block text-[10px] md:text-[13px] lg:text-[14px] font-extralight text-white hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                    Nijenburg 98
                  </div>
                  <div className="block text-[10px] md:text-[13px] lg:text-[14px] font-extralight text-white hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                    1081 GG Amsterdam
                  </div>
                </div>

                <div className="grid pb-2 pt-2">
                  <Link href="/contact#contactgegevens">
                    <div className="block text-[13px] lg:text-[15px] font-medium text-[#c2b293] dark:text-[#c2b293]">
                      Openingstijden
                    </div>
                    <div className="block text-[10px] md:text-[13px] lg:text-[14px] font-extralight text-white hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                      Reactly.nl is geopend van Ma t/m Za&nbsp;
                      <br />
                      en is bereikbaar van 08:00 t/m 21:00
                    </div>
                  </Link>
                </div>

                <div className="pt-4 flex w-full justify-end">
                  <Image
                    src="/images/fd-gazellen.webp"
                    // src={"/svg/award.svg"}
                    alt="FD Gazellen"
                    width={1000}
                    height={1000}
                    className="hidden md:flex max-w-[18rem] xl:max-w-[20rem]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-6">
            <hr className="border-t border-white/20 mb-4" />
            <div className="flex items-center justify-between text-white text-xs px-2">
              <div className="flex items-center gap-2">
                <MenuIcon className="w-4 h-4" />
                <span className="text-white/60">
                  BeterLease - Alle rechten voorbehouden
                </span>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <div>
            <WhatsAppButton
              triggerChatbot={function (): void {
                throw new Error("Function not implemented.");
              }}
              showPopup={false}
              hidePopup={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          {/* <SheetClose asChild>
            <Button className="" type="button">
              Sluiten
            </Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
