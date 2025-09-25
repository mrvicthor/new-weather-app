import { fetchLocation, fetchLocationWeather, fetchWeatherDetails } from "..";
import type { SearchResult } from "../../types";
import { vi, describe, test, beforeEach } from "vitest";

global.fetch = vi.fn();
describe("fetchLocation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  const createMockWeatherResponse = (overrides = {}) => ({
    latitude: 50.9,
    longitude: -1.4000001,
    generationtime_ms: 0.2956390380859375,
    utc_offset_seconds: 0,
    timezone: "GMT",
    timezone_abbreviation: "GMT",
    elevation: 22,
    current: {
      time: "2025-09-24T14:15",
      interval: 900,
      temperature_2m: 16.9,
      wind_speed_10m: 15.7,
      precipitation: 0,
      relative_humidity_2m: 78,
      apparent_temperature: 15.2,
      weather_code: 3,
    },
    current_units: {
      time: "iso8601",
      interval: "seconds",
      temperature_2m: "°C",
      wind_speed_10m: "km/h",
      precipitation: "mm",
      relative_humidity_2m: "%",
      apparent_temperature: "°C",
      weather_code: "wmo code",
    },
    daily: {
      time: [
        "2025-09-24",
        "2025-09-25",
        "2025-09-26",
        "2025-09-27",
        "2025-09-28",
        "2025-09-29",
        "2025-09-30",
      ],
      temperature_2m_max: [18.5, 19.2, 17.8, 16.4, 18.9, 20.1, 19.7],
      temperature_2m_min: [12.3, 13.1, 11.8, 10.9, 12.7, 14.2, 13.8],
      weather_code: [3, 1, 2, 61, 3, 1, 2],
    },
    daily_units: {
      time: "iso8601",
      temperature_2m_max: "°C",
      temperature_2m_min: "°C",
      weather_code: "wmo code",
    },
    hourly: {
      time: Array.from(
        { length: 168 },
        (_, i) =>
          `2025-09-${24 + Math.floor(i / 24)}T${String(i % 24).padStart(
            2,
            "0"
          )}:00`
      ),
      temperature_2m: Array.from(
        { length: 168 },
        () => 15 + Math.random() * 10
      ),
      relative_humidity_2m: Array.from(
        { length: 168 },
        () => 60 + Math.random() * 30
      ),
      wind_speed_10m: Array.from({ length: 168 }, () => 5 + Math.random() * 15),
      weather_code: Array.from({ length: 168 }, () =>
        Math.floor(Math.random() * 4)
      ),
    },
    hourly_units: {
      time: "iso8601",
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      wind_speed_10m: "km/h",
      weather_code: "wmo code",
    },
    ...overrides,
  });

  describe("fetchLocationWeather", () => {
    describe("successful request", () => {
      test("should fetch location data successfully", async () => {
        const mockLocationData: SearchResult = {
          admin1: "Lagos",
          admin1_id: 2332453,
          country: "Nigeria",
          country_code: "NG",
          country_id: 2328926,
          elevation: 11,
          feature_code: "PPLA2",
          id: 2332459,
          latitude: 6.45407,
          longitude: 3.39467,
          name: "Lagos",
          population: 15388000,
          timezone: "Africa/Lagos",
        };
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockLocationData),
        });

        const result = await fetchLocationWeather("lagos");
        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://geocoding-api.open-meteo.com/v1/search?name=lagos&count=4"
        );
        expect(result).toEqual(mockLocationData);
      });
    });
    describe("failed request", () => {
      test("should throw error when response is not ok", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: "Not found",
        });

        await expect(fetchLocationWeather("lagos")).rejects.toThrow(
          "Error fetching location weather details"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Fetch location error:",
          expect.any(Error)
        );
      });

      test("should throw error on network failure", async () => {
        globalThis.fetch = vi
          .fn()
          .mockRejectedValueOnce(new Error("Network error"));

        await expect(fetchLocationWeather("lagos")).rejects.toThrow(
          "Network error"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Fetch location error:",
          expect.any(Error)
        );
      });
    });

    describe("request url", () => {
      test("should call the correct url with the location parameter", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce({ results: [] }),
        });

        const location = "New York";
        await fetchLocationWeather(location);

        expect(globalThis.fetch).toHaveBeenCalledWith(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=4`
        );
      });
    });
  });

  describe("fetchLocation", () => {
    describe("successful request", () => {
      test("should fetch location data successfully", async () => {
        const mockLocationData = {
          place_id: 123456,
          licence: "Data © OpenStreetMap contributors, ODbL 1.0",
          osm_type: "way",
          osm_id: 456789,
          lat: "40.7128",
          lon: "-74.0060",
          display_name: "New York, NY, USA",
          address: {
            city: "New York",
            state: "New York",
            country: "United States",
            postcode: "10001",
          },
        };

        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockLocationData),
        });
        const result = await fetchLocation(40.7128, -74.006);

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=40.7128&lon=-74.006&format=json"
        );
        expect(result).toEqual(mockLocationData);
      });

      test("should handle different coordinates format", async () => {
        const mockData = { display_name: "Test Location" };
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockData),
        });
        const result = await fetchLocation(6.5244, 3.3792);

        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=6.5244&lon=3.3792&format=json"
        );
        expect(result).toEqual(mockData);
      });

      test("should handle custom response headers", async () => {
        const mockData = { display_name: "Test Location with Headers" };
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockData),
          headers: {
            get: (name: string) => {
              if (name === "Content-Type") {
                return "application/json";
              }
              return null;
            },
          },
        });
        const result = await fetchLocation(34.0522, -118.2437);

        expect(result).toEqual(mockData);
      });
    });

    describe("error handling", () => {
      test("should throw error when response is not ok", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: false,
          json: vi.fn().mockResolvedValueOnce({ message: "Not found" }),
        });

        await expect(fetchLocation(40.7128, -74.006)).rejects.toThrow(
          "Error fetching location details"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Error fetching weather details: Error: Error fetching location details"
        );
      });

      test("should throw error on network failure", async () => {
        globalThis.fetch = vi
          .fn()
          .mockRejectedValueOnce(new Error("Network error"));

        await expect(fetchLocation(40.7128, -74.006)).rejects.toThrow(
          "Network error"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Error fetching weather details: Error: Network error"
        );
      });

      test("should handle invalid JSON response", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          headers: { "Content-Type": "application/json" },
        });

        await expect(fetchLocation(40.7128, -74.006)).rejects.toThrow();
      });
    });

    describe("edge cases", () => {
      test("should handle zero coordinates", async () => {
        const mockData = { display_name: "Equator and Prime Meridian" };
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockData),
        });
        const result = await fetchLocation(0, 0);

        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=0&lon=0&format=json"
        );

        expect(result).toEqual(mockData);
      });

      test("should handle empty responses", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce({}),
        });
        const result = await fetchLocation(40.7128, -74.006);
        expect(result).toEqual({});
      });

      test("should handle null response", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(null),
        });

        const result = await fetchLocation(40.7128, -74.006);
        expect(result).toBeNull();
      });
    });

    describe("inspect request url", () => {
      test("should call the correct url with the latitude and longitude parameters", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce({}),
        });
        await fetchLocation(12.34567, -98.76543);

        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=12.34567&lon=-98.76543&format=json"
        );
      });

      test("should verify request count", async () => {
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce({}),
        });

        await fetchLocation(40.7128, -74.006);

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("fetchWeatherDetails", () => {
    describe("successful request", () => {
      test("should fetch weather data successfully", async () => {
        const mockWeatherData = createMockWeatherResponse();
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockWeatherData),
        });
        const result = await fetchWeatherDetails(50.9, -1.4000001);
        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://api.open-meteo.com/v1/forecast?latitude=50.9&longitude=-1.4000001&current=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&forecast_days=7"
        );
        expect(result).toEqual(mockWeatherData);
      });

      test("should handle different coordinates format", async () => {
        const mockData = createMockWeatherResponse({
          latitude: 6.5244,
          longitude: 3.3792,
        });
        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockData),
        });
        await fetchWeatherDetails(6.5244, 3.3792);
        expect(globalThis.fetch).toHaveBeenCalledWith(
          expect.stringContaining("latitude=6.5244&longitude=3.3792")
        );
      });
    });
  });
});
