import Image from "next/image";

const BeterLeaseLogoSheet = () => {
  return (
    <div className="flex items-center justify-start h-full">
      <Image
        src="/svg/BeterLeaseSVG.svg"
        alt="BeterLease.nl logo"
        width={1000}
        height={1000}
        className="h-16 lg:h-20 w-auto"
        priority
      />
    </div>
  );
};

export default BeterLeaseLogoSheet;
