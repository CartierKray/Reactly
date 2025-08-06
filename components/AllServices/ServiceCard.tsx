export const ServiceCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <div className="w-full md:w-[360px] border border-[#f6f6f6] py-12 p-6 bg-white dark:bg-neutral-900 rounded-3xl shadow-md dark:shadow-inner dark:shadow-neutral-800 hover:scale-105 transform transition duration-500 ease-in-out">
    <div className="flex items-center gap-3">
      <div className="text-black dark:invert">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-gray-500 mt-6">{description}</p>

    <button
      onClick={onClick}
      className="relative w-full px-10 mt-10 font-medium text-[14px] backdrop-blur-xl outline outline-1 outline-black hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent rounded-full overflow-hidden group"
    >
      <span className="relative z-10 text-black group-hover:text-white transition-all duration-500">
        Meer informatie
      </span>
      <span className="absolute inset-0 rounded-full bg-black w-0 group-hover:w-full transition-all duration-500"></span>
    </button>
  </div>
);
