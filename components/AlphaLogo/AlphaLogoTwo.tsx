const AlphaLogoTwo = () => {
  return (
    <div className="flex flex-col w-full items-start -mt-1 justify-start leading-none">
      {/* ALPHA Tekst met Gradient */}
      <div className="bg-gradient-to-b custom-shadow-small from-white via-gray-300 to-gray-900 text-transparent bg-clip-text text-3xl font-bold tracking-widest uppercase">
        ALPHA
      </div>

      {/* Lease Group met lijnen aan beide zijden */}
      <div className="flex items-center pl-[1px] mt-[-2px]">
        <div className="w-7 h-[0.5px] rounded-3xl bg-gradient-to-r from-[#f00] to-[#f00]"></div>
        <div className="bg-gradient-to-b custom-shadow-small text-[6px] from-white to-gray-600 text-transparent bg-clip-text font-semibold tracking-widest mx-2 uppercase">
          LEASE GROUP
        </div>
        <div className="w-7 h-[0.5px] rounded-3xl bg-gradient-to-l from-[#f00] to-[#f00]"></div>
      </div>
    </div>
  );
};

export default AlphaLogoTwo;
