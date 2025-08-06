import Image from "next/image";

function FooterImage() {
  return (
    <div className="relative hidden md:block">
      <Image
        src="/IMG/stangel-2022-1640.webp"
        className="w-full h-full "
        alt=""
        width={10000}
        height={10000}
      />

      <div className="absolute inset-0">
        {/* Darker Tint Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 hover:opacity-10 transform transition duration-1000 ease-in-out"></div>

        {/* Content */}
        <div className="absolute w-full flex justify-center mt-12 md:mt-0 items-center md:justify-start md:items-end md:pl-14 xl:pl-20 md:bottom-20 xl:bottom-32 text-white">
          <div className="grid justify-start gap-4 ">
            <div className="text-center md:text-start">
              <hr className="w-[50px] dark:border-gray-400 mt-5 mb-4" />
              <h1 className="text-[30px] md:text-[50px] tracking-wide font-medium custom-shadow">
                CAPITAL CODE X
              </h1>
              <p className="md:text-[24px] mb-2 tracking-wide custom-shadow">
                Partners in Online Succes
              </p>
            </div>
            <div className="">
              <button className="relative font-extralight text-[12px] outline-1 outline-gray-200 outline w-fit whitespace-nowrap pl-20 pr-20 pt-3 pb-3 md:pt-4 md:pb-4  bg-white rounded-full overflow-hidden group">
                <span className="relative z-10 text-black group-hover:text-white transition-all duration-500 ease-in-out">
                  Neem contact op
                </span>
                <span className="absolute inset-0 rounded-full bg-black w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterImage;
