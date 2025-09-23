import { useQuery } from "@tanstack/react-query";
import { fetchLocation, fetchWeatherDetails } from "../api";

export function useWeather(latitude: number, longitude: number) {
  return useQuery({
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
}
