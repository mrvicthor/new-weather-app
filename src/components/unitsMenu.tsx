import {
  precipitationOptions,
  temperatureOptions,
  windOptions,
} from "../utils";

type UnitsMenuProps = {
  menuRef: React.RefObject<HTMLDivElement | null>;
};

const UnitsMenu = ({ menuRef }: UnitsMenuProps) => {
  return (
    <div
      ref={menuRef}
      role="menu"
      id="units-menu"
      aria-label="Units menu"
      className="absolute top-12 right-6 bg-[#262540] px-2 py-[0.375rem] w-[13.375rem] z-50 rounded-xl"
    >
      <button
        role="menuitem"
        className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium"
      >
        Switch to Imperial
      </button>
      <article aria-labelledby="temp-label" className="flex flex-col gap-2">
        <p id="temp-label" className="text-[#ACACB7] pl-2 capitalize">
          temperature
        </p>
        {temperatureOptions.map((item) => (
          <button
            key={item.label}
            role="menuitem"
            className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
          >
            {item.label}
          </button>
        ))}
      </article>
      <hr className="text-[#ACACB7] my-1" />
      <article aria-labelledby="wind-label" className="flex flex-col gap-2">
        <p id="wind-label" className="pl-2 text-[#ACACB7] capitalize ">
          wind speed
        </p>
        {windOptions.map((item) => (
          <button
            key={item.label}
            role="menuitem"
            className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
          >
            {item.label}
          </button>
        ))}
      </article>
      <hr className="text-[#ACACB7] my-1" />
      <article
        aria-labelledby="precipitation-label"
        className="flex flex-col gap-2"
      >
        <p id="precipitation-label" className="text-[#ACACB7] pl-2 capitalize">
          precipitation
        </p>
        {precipitationOptions.map((item) => (
          <button
            key={item.label}
            role="menuitem"
            className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
          >
            {item.label}
          </button>
        ))}
      </article>
    </div>
  );
};

export default UnitsMenu;
