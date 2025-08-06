import Image from "next/image";

const KhanLogoWhite = () => {
  return (
    <div className="flex items-center justify-start h-full">
      <Image
        src="/images/khan_logo_white.png"
        alt="BeterLease.nl logo"
        width={160}
        height={40}
        className="h-8 md:h-8 w-auto"
        priority
      />
    </div>
  );
};

export default KhanLogoWhite;
