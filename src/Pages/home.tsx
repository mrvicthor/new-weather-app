import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/header";
import SearchBar from "../components/searchbar";
import { useLocationStore } from "../hooks/useLocationStore";
import {
  fetchLocation,
  fetchLocationWeather,
  fetchWeatherDetails,
} from "../api";
import Card from "../components/card";
import CardWithSpace from "../components/cardWithSpace";
import type { Forecast, HourlyForecast } from "../types";
import DailyForecast from "../components/dailyForecast";
import HourlyForecasts from "../components/hourlyForecasts";
import ErrorPage from "../components/errorPage";
import { useDebounce } from "../hooks/useDebounce";
import Loading from "../components/loading";
import { createPortal } from "react-dom";
import Location from "../components/location";

const Home = () => {
  const { setLocation, latitude, longitude, searchQuery, setSearchQuery } =
    useLocationStore((state) => state);

  const debouncedValue = useDebounce(searchQuery);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(latitude, longitude);
      });
    }
  }, [setLocation]);

  const {
    data: searchResults,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return [];

      const data = await fetchLocationWeather(debouncedValue);
      if (!data || !data.results) return [];

      return data.results;
    },
    enabled: debouncedValue.length > 0,
  });

  const { data, isError, isPending } = useQuery({
    queryKey: ["location", latitude, longitude],
    queryFn: async () => {
      if (latitude == null || longitude == null)
        return Promise.reject("No location");
      const [location, weather] = await Promise.all([
        fetchLocation(Number(latitude), Number(longitude)),
        fetchWeatherDetails(Number(latitude), Number(longitude)),
      ]);
      return { location, weather };
    },
    enabled: latitude != null && longitude != null,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const today = new Date(data?.weather.current.time);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);
  const formatDay = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const hourlyForecast: HourlyForecast[] = [];
  const dailyForecast: Forecast[] = [];
  for (let i = 0; i < 7; i++) {
    const forecast: Forecast = {
      day: new Date(data.weather.daily.time[i]).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      maxTemp: Math.ceil(data.weather.daily.temperature_2m_max[i]),
      minTemp: Math.ceil(data.weather.daily.temperature_2m_min[i]),
      weatherCode: data.weather.daily.weather_code[i],
    };
    dailyForecast.push(forecast);
  }

  for (let i = 0; i < 24; i++) {
    const forecast: HourlyForecast = {
      weatherCode: data.weather.hourly.weather_code[i],
      time: new Date(data.weather.hourly.time[i]).toLocaleDateString("en-US", {
        hour: "2-digit",
      }),
      temperature: Math.ceil(data.weather.hourly.temperature_2m[i]),
    };

    hourlyForecast.push(forecast);
  }

  return (
    <>
      <Header />
      <main className="container mx-auto relative px-4 md:px-6 pb-12 lg:pb-[5rem]">
        <h1 className="text-center text-white text-[3.25rem] font-bold font-Bricolage">
          How’s the sky looking today?
        </h1>
        <section className="relative flex flex-col items-center lg:mt-16 mt-12">
          <SearchBar />
          <div className="relative w-[41rem] gap-4">
            {debouncedValue && searchResults && searchResults.length > 0 && (
              <ul className="absolute top-4 bg-[#262540] px-2 py-3 right-0 left-0 md:w-[33rem] rounded-lg max-h-60 overflow-y-auto z-50">
                {isLoading && (
                  <li className="text-white p-4 border-b border-b-[#3C3B5E] h-[2.4375rem] flex gap-4 items-center">
                    <img src="/assets/images/icon-loading.svg" alt="loading" />{" "}
                    Search in progress
                  </li>
                )}

                {searchResults?.map((city) => (
                  <li
                    key={city.id}
                    className="text-white rounded-lg hover:bg-[#3C3B5E] cursor-pointer px-2 py-[0.625rem]"
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
        </section>

        {searchResults && searchResults.length === 0 ? (
          <p className="text-white mt-12 text-center font-bold text-[1.75rem]">
            No search results found
          </p>
        ) : (
          <section className="grid lg:grid-cols-3 md:grid-rows-[43.3125rem] mt-8 lg:mt-12 gap-8">
            <div className="lg:col-span-2">
              <Location
                temperature={data.weather.current.temperature_2m}
                city={data.location.address.city}
                state={data.location.address.state}
                date={formattedDate}
                country={data.location.address.country}
                weatherCode={data.weather.current.weather_code}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 mt-5 lg:mt-8 gap-6">
                <Card
                  title="feels like"
                  value={Math.ceil(data.weather.current.apparent_temperature)}
                  unit={data.weather.current_units.temperature_2m}
                />
                <Card
                  title="humidity"
                  value={data.weather.current.relative_humidity_2m}
                  unit={data.weather.current_units.relative_humidity_2m}
                />
                <CardWithSpace
                  title="wind"
                  value={data.weather.current.wind_speed_10m}
                  unit={data.weather.current_units.wind_speed_10m}
                />
                <CardWithSpace
                  title="precipitation"
                  value={data.weather.current.precipitation}
                  unit={data.weather.current_units.precipitation}
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
              <div className="flex justify-between items-center">
                <p className="text-[1.25rem] font-semibold text-white">
                  Hourly forecast
                </p>
                <button className="py-2 px-4 bg-[#3C3B5E] flex items-center gap-1 justify-between rounded-lg capitalize text-white cursor-pointer">
                  {formatDay}
                  <img src="/assets/images/icon-dropdown.svg" />
                </button>
              </div>
              <HourlyForecasts data={hourlyForecast} />
            </div>
          </section>
        )}
      </main>
      {error && createPortal(<ErrorPage />, document.getElementById("root")!)}
    </>
  );
};

export default Home;
