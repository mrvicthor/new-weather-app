import { vitest } from "vitest";
import { getForecasts } from "../../utils/getForecasts";
import type { WeatherApiResponse } from "../../types";

const createMockWeatherData = (
  currentTime: string,
  dailyCount: number = 7,
  hourlyCount: number = 24
): WeatherApiResponse => ({
  location: {
    address: {
      city: "New York",
      state: "NY",
      country: "US",
    },
  },
  weather: {
    current: {
      time: currentTime,
      temperature_2m: 22.5,
      apparent_temperature: 24.1,
      relative_humidity_2m: 65,
      wind_speed_10m: 12.3,
      precipitation: 0.0,
      weather_code: 1,
    },
    current_units: {
      relative_humidity_2m: "%",
      precipitation: "mm",
    },
    daily: {
      time: Array.from({ length: dailyCount }, (_, i) => {
        const date = new Date(currentTime);
        date.setDate(date.getDate() + i);
        return date.toISOString().split("T")[0]; // YYYY-MM-DD format
      }),
      temperature_2m_max: Array.from({ length: dailyCount }, (_, i) => 25 + i),
      temperature_2m_min: Array.from({ length: dailyCount }, (_, i) => 15 + i),
      weather_code: Array.from({ length: dailyCount }, (_, i) => i % 5),
    },
    hourly: {
      time: Array.from({ length: hourlyCount }, (_, i) => {
        const date = new Date(currentTime);
        date.setHours(i);
        return date.toISOString();
      }),
      weather_code: Array.from({ length: hourlyCount }, (_, i) => i % 10),
      temperature_2m: Array.from(
        { length: hourlyCount },
        (_, i) => 20 + (i % 15)
      ),
    },
  },
});

describe("getForecasts", () => {
  const mockCurrentTime = "2024-03-15T12:00:00Z";
  const mockData = createMockWeatherData(mockCurrentTime);

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("should return correctly formatted today date", () => {
    const selectedDay = new Date("2024-03-15'");
    const result = getForecasts(mockData, selectedDay);

    expect(result.today).toEqual(new Date(mockCurrentTime));
    expect(result.formattedDate).toBe("Friday, Mar 15, 2024");
    expect(result.formatDay).toBe("Friday");
  });

  test("should generate 7 daily forecasts", () => {
    const selectedDay = new Date("2024-03-15'");
    const result = getForecasts(mockData, selectedDay);

    expect(result.dailyForecast.length).toBe(7);
    result.dailyForecast.forEach((forecast, index) => {
      expect(forecast.day).toBe(
        new Date(mockData.weather.daily.time[index]).toLocaleDateString(
          "en-US",
          { weekday: "short" }
        )
      );
      expect(forecast.maxTemp).toBe(
        Math.round(mockData.weather.daily.temperature_2m_max[index])
      );
      expect(forecast.minTemp).toBe(
        Math.round(mockData.weather.daily.temperature_2m_min[index])
      );
      expect(forecast.weatherCode).toBe(
        mockData.weather.daily.weather_code[index]
      );
    });
  });

  test("should generate 7 days in daysList", () => {
    const selectedDay = new Date("2024-03-15'");
    const result = getForecasts(mockData, selectedDay);

    expect(result.daysList.length).toBe(7);
    result.daysList.forEach((dayItem, index) => {
      expect(dayItem.day).toBe(
        new Date(mockData.weather.daily.time[index]).toLocaleDateString(
          "en-US",
          { weekday: "long" }
        )
      );
      expect(dayItem.date).toEqual(
        new Date(mockData.weather.daily.time[index])
      );
    });
  });

  test("should format hourly forecasts for the selected day", () => {
    const selectedDay = new Date("2024-03-15'");
    const result = getForecasts(mockData, selectedDay);

    result.hourlyForecast.forEach((forecast) => {
      expect(forecast.date.getDay()).toBe(selectedDay.getDay());
    });
  });

  test("should format hourly forecasts data correctly", () => {
    const selectedDay = new Date("2024-03-15'");
    const result = getForecasts(mockData, selectedDay);

    if (result.hourlyForecast.length > 0) {
      const firstForecast = result.hourlyForecast[0];
      expect(firstForecast.date).toEqual(
        new Date(mockData.weather.hourly.time[0])
      );
      expect(firstForecast.weatherCode).toBe(
        mockData.weather.hourly.weather_code[0]
      );
      expect(firstForecast.temperature).toBe(
        Math.round(mockData.weather.hourly.temperature_2m[0])
      );
      expect(firstForecast.time).toBe(
        new Date(mockData.weather.hourly.time[0]).toLocaleDateString("en-US", {
          hour: "2-digit",
        })
      );
    }
  });

  test("should handle different selected days", () => {
    const selectedDay = new Date("2024-03-16");
    const result = getForecasts(mockData, selectedDay);

    expect(result.today).toEqual(new Date(mockCurrentTime));
    expect(result.dailyForecast).toHaveLength(7);
    expect(result.daysList).toHaveLength(7);
  });
});
