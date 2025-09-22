import { useLocationStore } from "../hooks/useLocationStore";
import { useToggleUnit } from "../hooks/useToggleUnit";
import UnitsMenu from "./unitsMenu";

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
        {isUnitsMounted && <UnitsMenu menuRef={menuRef} />}
      </nav>
    </header>
  );
};

export default Header;
