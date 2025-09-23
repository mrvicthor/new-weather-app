import type {
  Day,
  Forecast,
  HourlyForecast,
  WeatherApiResponse,
} from "../types";

export function getForecasts(data: WeatherApiResponse, selectedDay: Date) {
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
  const daysList: Day[] = [];
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

  for (let i = 0; i < data.weather.hourly.time.length; i++) {
    if (
      new Date(selectedDay).getDay() ===
      new Date(data.weather.hourly.time[i]).getDay()
    ) {
      const forecast: HourlyForecast = {
        date: new Date(data.weather.hourly.time[i]),
        weatherCode: data.weather.hourly.weather_code[i],
        time: new Date(data.weather.hourly.time[i]).toLocaleDateString(
          "en-US",
          {
            hour: "2-digit",
          }
        ),
        temperature: Math.ceil(data.weather.hourly.temperature_2m[i]),
      };
      hourlyForecast.push(forecast);
    }
  }

  for (let i = 0; i < 7; i++) {
    daysList.push({
      day: new Date(data.weather.daily.time[i]).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      date: new Date(data.weather.daily.time[i]),
    });
  }
  return {
    today,
    formattedDate,
    hourlyForecast,
    dailyForecast,
    formatDay,
    daysList,
  };
}
