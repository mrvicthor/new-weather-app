const Header = () => {
  return (
    <header className="bg-[#02012C] py-12">
      <nav className="container mx-auto flex justify-between items-center">
        <button className="h-[2.6875rem]">
          <img
            src="/assets/images/logo.svg"
            alt="weather logo"
            className="h-[2.6875rem]"
          />
        </button>{" "}
        <button className="text-white flex items-center gap-[10px] h-[2.6875rem] w-[7.4375rem] px-4 bg-[#262540] rounded-xl cursor-pointer">
          <img
            src="/assets/images/icon-units.svg"
            alt="units icon"
            className="w-4 h-[0.84375rem]"
          />
          units
          <img src="/assets/images/icon-dropdown.svg" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
