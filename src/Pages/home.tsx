import Header from "../components/header";
import SearchBar from "../components/searchbar";
import { useLocationStore } from "../hooks/useLocationStore";
import Card from "../components/card";
import CardWithSpace from "../components/cardWithSpace";
import DailyForecast from "../components/dailyForecast";
import HourlyForecasts from "../components/hourlyForecasts";
import Location from "../components/location";
import ErrorPage from "../components/errorPage";
import Loading from "../components/loading";
import { getDisplayTemperature } from "../utils/formatTemperature";
import { convertSpeed } from "../utils/convertSpeed";
import { useDebounce } from "../hooks/useDebounce";
import { createPortal } from "react-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { getForecasts } from "../utils/getForecasts";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { useWeather } from "../hooks/useWeather";
import { convertMillimetersToInches } from "../utils/convertMillimetersToInches";
import DaysDropDown from "../components/daysDropdown";
import { useToggleDaysDropdown } from "../hooks/useToggleDaysDropdown";
import SearchResults from "../components/searchResult";

const Home = ({
  useLocationStoreHook = useLocationStore,
  useDebounceHook = useDebounce,
  createPortalFn = createPortal,
  getForecastsFn = getForecasts,
  useGeolocationHook = useGeolocation,
} = {}) => {
  const {
    setLocation,
    latitude,
    longitude,
    searchQuery,
    selectedTemperature,
    selectedWindSpeed,
    selectedPrecipitation,
    toggleDaysList,
    isDayslistMounted,
    selectedDay,
  } = useLocationStoreHook((state) => state);

  const debouncedValue = useDebounceHook(searchQuery);
  useGeolocationHook(setLocation);

  const {
    data: searchResults,
    error,
    isLoading,
  } = useLocationSearch(debouncedValue);

  const { menuRef, buttonRef, itemsRef, handleKeyDown } = useToggleDaysDropdown(
    isDayslistMounted,
    toggleDaysList
  );

  const { data, isError, isPending } = useWeather(
    Number(latitude),
    Number(longitude)
  );

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const { formattedDate, hourlyForecast, dailyForecast, daysList } =
    getForecastsFn(data, selectedDay);
  const formatDay = selectedDay.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <>
      <Header />
      <main className="container mx-auto relative px-4 md:px-6 pb-12 lg:pb-[5rem]">
        <h1 className="text-center text-white text-[3.25rem] font-bold font-Bricolage">
          How’s the sky looking today?
        </h1>
        <section className="relative flex flex-col items-center lg:mt-16 mt-12">
          <SearchBar />
          <SearchResults
            isLoading={isLoading}
            searchResults={searchResults}
            debouncedValue={debouncedValue}
          />
        </section>
        {searchResults && searchResults.length === 0 ? (
          <p className="text-white mt-12 text-center font-bold text-[1.75rem]">
            No search results found
          </p>
        ) : (
          <section className="grid lg:grid-cols-3 md:grid-rows-[43.3125rem] mt-8 lg:mt-12 gap-8">
            <div className="lg:col-span-2">
              <Location
                temperature={data?.weather?.current?.temperature_2m ?? 0}
                city={data?.location?.address?.city ?? "Unknown City"}
                state={data?.location?.address?.state ?? "Unknown State"}
                date={formattedDate}
                country={data?.location?.address?.country ?? "Unknown Country"}
                weatherCode={data?.weather?.current?.weather_code}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 mt-5 lg:mt-8 gap-6">
                <Card
                  title="feels like"
                  value={getDisplayTemperature(
                    selectedTemperature,
                    data.weather.current.apparent_temperature
                  )}
                  unit="&deg;"
                />
                <Card
                  title="humidity"
                  value={data?.weather?.current?.relative_humidity_2m}
                  unit={data?.weather?.current_units?.relative_humidity_2m}
                />
                <CardWithSpace
                  title="wind"
                  value={convertSpeed(
                    data?.weather?.current?.wind_speed_10m,
                    selectedWindSpeed
                  )}
                  unit={selectedWindSpeed === "km/h" ? "km/h" : "mph"}
                />
                <CardWithSpace
                  title="precipitation"
                  value={convertMillimetersToInches(
                    data?.weather?.current?.precipitation,
                    data?.weather?.current_units?.precipitation
                  )}
                  unit={selectedPrecipitation === "millimeters" ? "mm" : "in"}
                />
              </div>
              <div className="mt-8 lg:mt-12">
                <p className="text-white text-[1.25rem] font-semibold">
                  Daily forecast
                </p>
                <DailyForecast data={dailyForecast} />
              </div>
            </div>
            <div className="bg-[#262540] rounded-[1.25rem] px-6 py-6 ">
              <div className="flex justify-between items-center relative">
                <p className="text-[1.25rem] font-semibold text-white">
                  Hourly forecast
                </p>
                <button
                  ref={buttonRef}
                  onClick={toggleDaysList}
                  aria-haspopup="true"
                  aria-expanded={isDayslistMounted}
                  aria-controls="days-menu"
                  id="days-menu-button"
                  className="py-2 px-4 bg-[#3C3B5E] flex items-center gap-1 justify-between rounded-lg capitalize text-white cursor-pointer"
                >
                  {formatDay}
                  <img src="/assets/images/icon-dropdown.svg" alt="" />
                </button>
                {isDayslistMounted && (
                  <DaysDropDown
                    daysList={daysList}
                    menuRef={menuRef}
                    itemsRef={itemsRef}
                    handleKeyDown={handleKeyDown}
                  />
                )}
              </div>
              <HourlyForecasts data={hourlyForecast} />
            </div>
          </section>
        )}
      </main>
      {error && createPortalFn(<ErrorPage />, document.getElementById("root")!)}
    </>
  );
};

export default Home;
