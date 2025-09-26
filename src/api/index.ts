import type { SearchResponse } from "../types";

export const fetchLocation = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    if (!response.ok) {
      throw new Error(`Error fetching location details`);
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching weather details: ${error}`);
    throw error;
  }
};

export const fetchWeatherDetails = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&forecast_days=7`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather details`);
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching weather details: ${error}`);
    throw error;
  }
};

export const fetchLocationWeather = async (
  location: string
): Promise<SearchResponse | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=4`
    );

    if (!response.ok) {
      throw new Error(`Error fetching location weather details`);
    }

    const result = response.json();
    return result;
  } catch (error) {
    console.error("Fetch location error:", error);
    throw error;
  }
};
