import { useQuery } from "@tanstack/react-query";
import { fetchLocationWeather } from "../api";

export function useLocationSearch(debouncedValue: string) {
  return useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return [];
      const data = await fetchLocationWeather(debouncedValue);
      if (!data || !data.results) return [];
      return data.results;
    },
    enabled: debouncedValue.length > 0,
  });
}
