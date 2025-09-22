import { useLocationStore } from "../hooks/useLocationStore";
import { useToggleUnit } from "../hooks/useToggleUnit";

const Header = () => {
  const { isUnitsMounted, toggleUnitsMounted } = useLocationStore(
    (state) => state
  );

  const { menuRef, buttonRef } = useToggleUnit(toggleUnitsMounted);

  return (
    <header className="bg-[#02012C] py-4 md:py-6 lg:py-12">
      <nav className="container mx-auto flex justify-between items-center px-4 md:px-6 relative">
        <button className="h-[2.6875rem]">
          <img
            src="/assets/images/logo.svg"
            alt="weather logo"
            className="h-[2.6875rem]"
          />
        </button>{" "}
        <button
          ref={buttonRef}
          onClick={toggleUnitsMounted}
          aria-haspopup="true"
          aria-expanded={isUnitsMounted}
          aria-controls="units-menu"
          className="text-white flex items-center gap-[10px] h-[2.6875rem] w-[7.4375rem] px-4 bg-[#262540] rounded-xl cursor-pointer"
        >
          <img
            src="/assets/images/icon-units.svg"
            alt=""
            className="w-4 h-[0.84375rem]"
            aria-hidden="true"
          />
          <span>units</span>
          <img
            src="/assets/images/icon-dropdown.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
        {isUnitsMounted && (
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
            <article
              aria-labelledby="temp-label"
              className="flex flex-col gap-2"
            >
              <p id="temp-label" className="text-[#ACACB7] pl-2 capitalize">
                temperature
              </p>
              <button
                role="menuitem"
                className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
              >
                celsius
              </button>
              <button
                role="menuitem"
                className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
              >
                fahrenheit
              </button>
            </article>
            <hr className="text-[#ACACB7] my-1" />
            <article
              aria-labelledby="wind-label"
              className="flex flex-col gap-2"
            >
              <p id="wind-label" className="pl-2 text-[#ACACB7] capitalize ">
                wind speed
              </p>
              <button
                role="menuitem"
                className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
              >
                km/h
              </button>
              <button
                role="menuitem"
                className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
              >
                mph
              </button>
            </article>
            <hr className="text-[#ACACB7] my-1" />
            <article
              aria-labelledby="precipitation-label"
              className="flex flex-col gap-2"
            >
              <p
                id="precipitation-label"
                className="text-[#ACACB7] pl-2 capitalize"
              >
                precipitation
              </p>
              <button
                role="menuitem"
                className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
              >
                millimeters
              </button>
              <button
                role="menuitem"
                className="text-white h-[2.4375rem] flex items-center w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium capitalize"
              >
                inches
              </button>
            </article>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
