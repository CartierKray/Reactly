"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SheetFour } from "@/components/Sheet/SheetFour";
import Image from "next/image";

interface MenuItem {
  label: string;
  href?: string;
  dropdown?: boolean;
}

const menuItems: MenuItem[] = [
  { label: "DIENSTEN", href: "/diensten" },
  { label: "COMPONENTEN", href: "/componenten" },
  { label: "PRIJZEN", href: "/prijzen" },
  { label: "FAQ", href: "/faq" },
  { label: "CONTACT", href: "/contact" },
];

export function NavMenuTwo() {
  return (
    <div className="hidden lg:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList className="space-x-2 flex items-center">
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.dropdown ? (
                <>
                  <NavigationMenuTrigger className="px-3 py-2  xl-nav-link text-[11px] font-normal uppercase tracking-wide hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border border-[#f0f0f0] dark:border-white/10  px-5 py-6 text-black dark:text-white shadow-xl max-w-max">
                    {item.label === "DIENSTEN" && (
                      <div className="flex items-start space-x-6">
                        {/* Links */}
                        <div className="flex flex-col text-xs  space-y-2 text-black dark:text-white min-w-max pt-1">
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Email API
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            SMTP Service
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Audiences
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Broadcasts
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            SMTP Service
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Audiences
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Broadcasts
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Email API
                          </span>
                        </div>

                        {/* Rechts */}
                        <div className="flex space-x-2">
                          <div className="relative w-[160px] h-[200px] border border-white/10 rounded-2xl overflow-hidden">
                            <Image
                              src="/images/navigation-transactional.webp"
                              alt="Transactional"
                              fill
                              className="object-cover bg-black/75 dark:bg-white/50"
                            />
                            <div className="absolute bottom-3 left-3 text-sm font-medium z-10">
                              Transactional
                              <br />
                              Emails
                            </div>
                          </div>
                          <div className="relative w-[160px] h-[200px] border border-white/10 rounded-2xl overflow-hidden">
                            <Image
                              src="/images/navigation-marketing.webp"
                              alt="Marketing"
                              fill
                              className="object-cover bg-black/75 dark:bg-white/50"
                            />
                            <div className="absolute bottom-3 left-3 text-sm font-medium z-10">
                              Marketing
                              <br />
                              Emails
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.label === "PRIJZEN" && (
                      <div className="flex items-start space-x-6">
                        {/* Links */}
                        <div className="flex flex-col text-xs  space-y-2 text-black dark:text-white min-w-max pt-1">
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Email API
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            SMTP Service
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Audiences
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Broadcasts
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            SMTP Service
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Audiences
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Broadcasts
                          </span>
                        </div>

                        {/* Rechts */}
                        <div className="grid grid-rows-2 space-y-2">
                          <div className="relative w-[200px] h-[75px] border border-white/10 rounded-2xl overflow-hidden">
                            <Image
                              src="/images/navigation-transactional.webp"
                              alt="Transactional"
                              fill
                              className="object-cover bg-black/75 dark:bg-white/50"
                            />
                            <div className="absolute bottom-3 left-3 text-sm font-medium z-10">
                              Transactional
                              <br />
                              Emails
                            </div>
                          </div>
                          <div className="relative w-[200px] h-[75px] border border-white/10 rounded-2xl overflow-hidden">
                            <Image
                              src="/images/navigation-marketing.webp"
                              alt="Marketing"
                              fill
                              className="object-cover bg-black/75 dark:bg-white/50"
                            />
                            <div className="absolute bottom-3 left-3 text-sm font-medium z-10">
                              Marketing
                              <br />
                              Emails
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.label === "COMPONENTEN" && (
                      <div className="flex items-start space-x-6">
                        {/* Links */}
                        <div className="flex flex-col text-xs  space-y-2 text-black dark:text-white min-w-max pt-1">
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Email API
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            SMTP Service
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Audiences
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Broadcasts
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            SMTP Service
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Audiences
                          </span>
                          <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                            Broadcasts
                          </span>
                        </div>

                        {/* Rechts */}
                        <div className="grid grid-rows-2 space-y-2">
                          <div className="relative w-[200px] h-[75px] border border-white/10 rounded-2xl overflow-hidden">
                            <Image
                              src="/images/navigation-transactional.webp"
                              alt="Transactional"
                              fill
                              className="object-cover bg-black/75 dark:bg-white/50"
                            />
                            <div className="absolute bottom-3 left-3 text-sm font-medium z-10">
                              Transactional
                              <br />
                              Emails
                            </div>
                          </div>
                          <div className="relative w-[200px] h-[75px] border border-white/10 rounded-2xl overflow-hidden">
                            <Image
                              src="/images/navigation-marketing.webp"
                              alt="Marketing"
                              fill
                              className="object-cover bg-black/75 dark:bg-white/50"
                            />
                            <div className="absolute bottom-3 left-3 text-sm font-medium z-10">
                              Marketing
                              <br />
                              Emails
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href || "#"}
                    className="px-3 py-2 text-[11px] font-normal uppercase tracking-wide hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <div className="flex items-center scale-90 pt-1">
          <SheetFour />
        </div>
      </div>
    </div>
  );
}
