import Image from "next/image";

const BeterLeaseLogoTwo = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Image
        src="/svg/BeterLeaseSVGTwoBlack.svg"
        alt="BeterLease.nl logo"
        width={160}
        height={40}
        className="h-[100px] w-auto"
        priority
      />
    </div>
  );
};

export default BeterLeaseLogoTwo;
