import Link from "next/link";

export function CTAButton() {
  return (
    <div className="mt-10 mb-20 md:mb-0 md:mt-0">
      {/* Light mode button */}
      <Link href="/diensten">
        <div className="dark:hidden md:mt-5 flex mb-5 md:mb-2 justify-start w-full mx-auto">
          <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 border-black border-1 border-t border-b mt-8 w-fit px-14 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent overflow-hidden group">
            <span className="relative z-10 text-black uppercase group-hover:text-white font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
              Ontdek onze diensten
            </span>
            <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
          </button>
        </div>
      </Link>

      {/* Dark mode button */}
      <div className="md:mt-5 hidden dark:flex mb-5 md:mb-2 justify-start w-full mx-auto">
        <Link className="mx-auto" href="/diensten">
          <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 border-white border-1 border-t border-b mt-8 w-fit px-14 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent overflow-hidden group">
            <span className="relative z-10 text-white uppercase group-hover:text-black font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
              Ontdek onze diensten
            </span>
            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
          </button>
        </Link>
      </div>
    </div>
  );
}
