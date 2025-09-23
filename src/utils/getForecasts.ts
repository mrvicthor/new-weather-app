import type { Forecast, HourlyForecast, WeatherApiResponse } from "../types";

export function getForecasts(data: WeatherApiResponse) {
  const today = new Date(data?.weather.current.time);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const formatDay = today.toLocaleDateString("en-US", { weekday: "long" });

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
  return { today, formattedDate, formatDay, hourlyForecast, dailyForecast };
}
