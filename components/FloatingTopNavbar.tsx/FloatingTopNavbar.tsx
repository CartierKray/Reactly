"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function FloatinTopNavbar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed pt-5 p-5 top-10 inset-x-0 max-w-5xl mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="flex justify-between w-full">
          <Link href="/">
            <Image
              src="/svg/logo.svg"
              alt=""
              width={1000}
              height={1000}
              priority
              className="w-10 h-10"
            />
          </Link>

          <div className="flex space-x-5 pt-2">
            <Link href="/diensten">
              <div className="">
                <MenuItem setActive={setActive} active={null} item="Diensten">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/diensten">SEO & SEA</HoveredLink>
                    <HoveredLink href="/diensten">Webdesign</HoveredLink>
                    <HoveredLink href="/diensten">Marketing</HoveredLink>
                    <HoveredLink href="/diensten">Advertenties</HoveredLink>
                    <HoveredLink href="/diensten">Onderhoud</HoveredLink>
                  </div>
                </MenuItem>
              </div>
            </Link>

            <div className="hidden md:block">
              <Link href="/cases">
                <MenuItem setActive={setActive} active={null} item="Ons werk">
                  <div className="text-sm grid grid-cols-2 gap-10 p-4">
                    <ProductItem
                      title="YoYo!"
                      href=""
                      src="/images/yo-banner.webp"
                      description="Order now online your favourite boba tea!"
                    />
                    <ProductItem
                      title="Qualident"
                      href=""
                      src="/images/qualident-banner.webp"
                      description="Start smiling with the newest service of qualident"
                    />
                    <ProductItem
                      title="Daily Paper "
                      href=""
                      src="/images/daily-paper-banner.webp"
                      description="Shop jou favourite producten online met gemak!"
                    />
                    <ProductItem
                      title="Reclame Video"
                      href=""
                      src="/images/reclame-video-banner.webp"
                      description="Bestel jou op maat gemaakte reclame video en start je marketing met succes"
                    />
                    <Link href="/projecten">
                      <div>
                        <Button className="w-full bg-[#F3BD3E] hover:shadow-md hover:text-white hover:bg-amber-500 text-black transition-all duration-300 ease-in">
                          Cases bekijken
                        </Button>
                      </div>
                    </Link>
                    <Link href="/offerte">
                      <div>
                        <Button className="w-full bg-[#F3BD3E] hover:shadow-md hover:text-white hover:bg-amber-500 text-black transition-all duration-300 ease-in">
                          Offerte aanvragen
                        </Button>
                      </div>
                    </Link>
                  </div>
                </MenuItem>
              </Link>
            </div>

            <div className="hidden md:block">
              <Link href="/componenten">
                <MenuItem
                  setActive={setActive}
                  active={null}
                  item="Componenten"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/hobby">Hobby</HoveredLink>
                    <HoveredLink href="/individual">Individual</HoveredLink>
                    <HoveredLink href="/team">Team</HoveredLink>
                    <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                  </div>
                </MenuItem>
              </Link>
            </div>

            <div className="hidden md:block">
              <Link href="/over-ons">
                <MenuItem
                  setActive={setActive}
                  active={null}
                  item="Capital Code X"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/over-ons">Over ons</HoveredLink>
                  </div>
                </MenuItem>
              </Link>
            </div>
          </div>

          <Link href="/contact">
            <button className="bg-[#F3BD3E] h-full pl-5 pr-5 font-medium">
              Contact
            </button>
          </Link>
        </div>
      </Menu>
    </div>
  );
}
