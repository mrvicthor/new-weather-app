import { type ChangeEvent } from "react";

import { useLocationStore } from "../hooks/useLocationStore";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useLocationStore((state) => state);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const debounceValue = useDebounce(searchQuery);

  return (
    <div className="relative md:h-[3.5rem] w-full lg:w-[41rem] flex flex-col md:flex-row gap-4">
      <img
        src="/assets/images/icon-search.svg"
        alt="Search"
        className="h-[1.25rem] w-[1.25rem] absolute left-4 top-4.5"
      />
      <input
        placeholder="Search for a place..."
        data-testid="search-input"
        value={searchQuery}
        onChange={handleInputChange}
        className="bg-[#262540] h-14 md:flex-1 rounded-xl pl-12 pr-4 placeholder:text-[#D4D3D9] text-white"
      />
      <button
        disabled={!debounceValue}
        className="bg-[#4658D9] w-full md:w-[7.125rem] h-14  rounded-xl text-white font-medium font-sans text-[1.25rem] capitalize cursor-pointer hover:bg-[#2B1B9C]"
      >
        search
      </button>
    </div>
  );
};

export default SearchBar;
