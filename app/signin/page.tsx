import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BeterLeaseLogoTwo from "@/components/BeterLeaseLogo/BeterLeaseLogoTwo";

function SignInPage() {
  return (
    <>
      <div className="w-full h-screen hidden lg:block">
        <div className="w-full lg:flex h-screen">
          <div className="w-full lg:w-1/2 flex relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-screen object-cover"
            >
              <source src="/video/BeterLease.nl.mp4" type="video/mp4" />
              Jouw browser ondersteunt geen video tag.
            </video>

            {/* <div className="w-full">
              <Image
                alt="A description of the image"
                src="/images/cq5dam.web.2880 (3).webp"
                width={1920} // Gebruik een passende breedte
                height={1080} // Gebruik een passende hoogte
                className="w-full h-screen object-cover"
              />
            </div> */}

            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/10 via-transparent to-black">
              <div className="w-1/2 relative">
                {/* Terug knop */}
                <Link href="/">
                  <p className="absolute top-5 left-5 pl-5 pr-5 bg-transparent outline-white/50 outline-1 outline backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm z-10">
                    Terug
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className=" w-full h-full lg:w-1/2 lg:bg-[#171719] flex flex-col justify-center items-center p-10 lg:p-20 space-y-4">
            <div className="xl:scale-75 md:pb-5">
              <BeterLeaseLogoTwo />
            </div>

            <Input
              className="rounded-3xl w-full h-12 max-w-xl bg-zinc-200 border-zinc-200 placeholder:text-zinc-400"
              placeholder="E-mail Adres"
              id="email"
              type="email"
              name="email"
            />
            <Input
              className="rounded-3xl w-full h-12 max-w-xl bg-zinc-200 border-zinc-200 placeholder:text-zinc-400"
              placeholder="Wachtwoord"
              id="password"
              type="password"
              name="password"
            />
            <Link href="/signup">
              <div className="p-2 font-normal text-sm hover:underline text-white">
                Nog geen account? Meld je aan!
              </div>
            </Link>

            <Button className="rounded-3xl bg-white text-black hover:font-semibold hover:tracking-wider hover:bg-white transition-all ease-in-out duration-500 w-full max-w-xl">
              Aanmelden
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-screen block lg:hidden relative">
        {/* Achtergrondafbeelding met overlay */}
        <div className="absolute inset-0 z-0">
          {/* <Image
            alt="A description of the image"
            src="/images/cq5dam.web.2880 (3).webp"
            width={1920}
            height={1080}
            className="w-full h-screen object-cover"
          /> */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-screen object-cover"
          >
            <source src="/video/BeterLease.nl.mp4" type="video/mp4" />
            Jouw browser ondersteunt geen video tag.
          </video>
          {/* Donkere overlay */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 custom-bg-image w-full h-full flex flex-col justify-center items-center p-10 lg:p-20 space-y-4">
          {/* <div className="mb-0">
            <Image
              src="/svg/alpha-logo-bgtrans-white.svg"
              alt=""
              width={1000}
              height={1000}
              className="w-48"
            />
          </div> */}
          <div className="scale-90 md:pb-10">
            <BeterLeaseLogoTwo />
          </div>

          <Input
            className="rounded-3xl w-full h-12 max-w-xl bg-zinc-200 border-zinc-200 placeholder:text-black"
            placeholder="E-mail Adres"
            id="email"
            type="email"
            name="email"
          />
          <Input
            className="rounded-3xl w-full h-12 max-w-xl bg-zinc-200 border-zinc-200 placeholder:text-black"
            placeholder="Wachtwoord"
            id="password"
            type="password"
            name="password"
          />
          <Link href="/signup">
            <div className="p-2 font-normal text-white text-sm hover:underline">
              Nog geen account? Meld je aan!
            </div>
          </Link>

          <Link href="" className="w-full">
            <div className="mb-5 md:mb-2 outline backdrop-blur-sm outline-1 bg-white mx-auto max-w-xl hover:outline-none rounded-3xl outline-white/25 flex justify-center w-full">
              <Button className="relative font-light text-[14px] outline-1 outline-white hover:outline-none w-full max-w-xl hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-3 pb-3 bg-transparent rounded-full overflow-hidden group">
                <span className="relative z-10 text-black group-hover:text-white hover:custom-shadow-small font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                  Aanmelden
                </span>
                <span className="absolute inset-0 rounded-full bg-red-600 shadow-inner shadow-red-500 hover:shadow-inner hover:shadow-red-500 w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
