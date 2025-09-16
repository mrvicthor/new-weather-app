const SearchBar = () => {
  return (
    <section className=" flex items-center justify-center mt-16">
      <div className="relative h-[3.5rem] w-[41rem] flex gap-4">
        <img
          src="/assets/images/icon-search.svg"
          alt="Search"
          className="h-[1.25rem] w-[1.25rem] absolute left-4 top-4.5"
        />
        <input
          placeholder="Search for a place..."
          className="bg-[#262540] flex-1 rounded-xl pl-12 pr-4 placeholder:text-[#D4D3D9]"
        />
        <button className="bg-[#4658D9] w-[7.125rem] rounded-xl text-white font-medium font-sans text-[1.25rem] capitalize cursor-pointer">
          search
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
