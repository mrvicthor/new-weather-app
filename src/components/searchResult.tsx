import { useLocationStore } from "../hooks/useLocationStore";
import type { SearchResult } from "../types";

type SearchResultProps = {
  isLoading: boolean;
  debouncedValue: string;
  searchResults: SearchResult[] | undefined;
};

const SearchResults = ({
  searchResults,
  debouncedValue,
  isLoading,
}: SearchResultProps) => {
  const { setLocation, setSearchQuery } = useLocationStore((state) => state);
  return (
    <div className="relative w-[41rem] gap-4">
      {debouncedValue && searchResults && searchResults.length > 0 && (
        <ul
          role="menu"
          aria-label="Search Results"
          tabIndex={0}
          className="absolute top-4 bg-[#262540] border border-[#302F4A] px-2 py-3 right-0 left-0 md:w-[33rem] rounded-lg max-h-60 overflow-y-auto z-50"
        >
          {isLoading && (
            <li
              role="status"
              aria-live="polite"
              aria-label="Search in progress"
              className="text-white p-4 border border-[#302F4A] h-[2.4375rem] flex gap-4 items-center"
            >
              <img src="/assets/images/icon-loading.svg" alt="loading" /> Search
              in progress
            </li>
          )}
          {searchResults?.map((city) => (
            <li
              role="menuitem"
              key={city.id}
              className="text-white rounded-lg hover:bg-[#302F4A] hover:border border-[#3C3B5E] cursor-pointer px-2 py-[0.625rem]"
              onClick={() => {
                setLocation(city.latitude, city.longitude);
                setSearchQuery("");
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
