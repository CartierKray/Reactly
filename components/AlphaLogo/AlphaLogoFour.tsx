import Image from "next/image";

const AlphaLogoThree = () => {
  return (
    <div className="flex flex-col w-full items-start justify-start leading-none">
      <div className="bg-gradient-to-b custom-shadow-small from-white via-gray-300 to-gray-900 text-transparent bg-clip-text text-3xl font-bold tracking-widest uppercase">
        <Image
          src={"/svg/BeterLeaseSVG.svg"}
          alt=""
          width={1000}
          height={1000}
          className="h-10 flex "
        />
      </div>
    </div>
  );
};

export default AlphaLogoThree;
