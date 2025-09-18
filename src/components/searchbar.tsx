import { type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useLocationStore } from "../hooks/useLocationStore";
import { fetchLocationWeather } from "../api";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./errorPage";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSearchResults, searchResults } =
    useLocationStore((state) => state);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const debounceValue = useDebounce(searchQuery);

  const handleSearch = async () => {
    const result = await fetchLocationWeather(debounceValue);
    setSearchResults(result.results);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["search", debounceValue],
    queryFn: async () => {
      if (!debounceValue) return [];
      const data = await fetchLocationWeather(debounceValue);
      if (!data || !data.results) {
        setSearchResults([]);
        return [];
      }
      setSearchResults(data.results || null);
      return data.results;
    },
    enabled: debounceValue.length > 0,
  });

  console.log({ debounceValue, data, searchResults });

  return (
    <section className="relative flex items-center justify-center lg:mt-16 mt-12">
      <div className="relative md:h-[3.5rem] w-[41rem] flex flex-col md:flex-row gap-4">
        <img
          src="/assets/images/icon-search.svg"
          alt="Search"
          className="h-[1.25rem] w-[1.25rem] absolute left-4 top-4.5"
        />
        <input
          placeholder="Search for a place..."
          value={searchQuery}
          onChange={handleInputChange}
          className="bg-[#262540] h-14 md:flex-1 rounded-xl pl-12 pr-4 placeholder:text-[#D4D3D9] text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-[#4658D9] w-full md:w-[7.125rem] h-14  rounded-xl text-white font-medium font-sans text-[1.25rem] capitalize cursor-pointer"
        >
          search
        </button>
        {debounceValue && data && data.length > 0 && (
          <ul className="absolute top-[4rem] bg-[#262540] px-2 py-3 right-0 left-0 md:w-[33rem] rounded-lg max-h-60 overflow-y-auto z-50">
            {isLoading && (
              <li className="text-white p-4 border-b border-b-[#3C3B5E] h-[2.4375rem] flex gap-4 items-center">
                <img src="/assets/images/icon-loading.svg" alt="loading" />{" "}
                Search in progress
              </li>
            )}

            {data?.map((city) => (
              <li
                key={city.id}
                className="text-white rounded-lg hover:bg-[#3C3B5E] cursor-pointer px-2 py-[0.625rem]"
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && createPortal(<ErrorPage />, document.getElementById("root")!)}
    </section>
  );
};

export default SearchBar;
