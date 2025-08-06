import Image from "next/image";

const BeterLeaseLogoBlack = () => {
  return (
    <div className="flex items-center justify-start h-full">
      <Image
        src="/svg/BeterLeaseSVGBlack.svg"
        alt="BeterLease.nl logo"
        width={160}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
};

export default BeterLeaseLogoBlack;
