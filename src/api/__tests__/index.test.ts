import { fetchLocation, fetchLocationWeather } from "..";
import fetchMock from "jest-fetch-mock";
import type { SearchResult } from "../../types";

fetchMock.enableMocks();
describe("fetchLocation", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchMock.resetMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
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
        fetchMock.mockResponseOnce(JSON.stringify(mockLocationData));

        const result = await fetchLocationWeather("lagos");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
          "https://geocoding-api.open-meteo.com/v1/search?name=lagos&count=4"
        );
        expect(result).toEqual(mockLocationData);
      });
    });
    describe("failed request", () => {
      test("should throw error when response is not ok", async () => {
        fetchMock.mockResponseOnce("Not found", { status: 404 });

        await expect(fetchLocationWeather("lagos")).rejects.toThrow(
          "Error fetching location weather details"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Fetch location error:",
          expect.any(Error)
        );
      });

      test("should throw error on network failure", async () => {
        fetchMock.mockRejectOnce(new Error("Network error"));

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
        fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));

        const location = "New York";
        await fetchLocationWeather(location);

        expect(fetchMock).toHaveBeenCalledWith(
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

        fetchMock.mockResponseOnce(JSON.stringify(mockLocationData));
        const result = await fetchLocation(40.7128, -74.006);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=40.7128&lon=-74.006&format=json"
        );
        expect(result).toEqual(mockLocationData);
      });

      test("should handle different coordinates format", async () => {
        const mockData = { display_name: "Test Location" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
        const result = await fetchLocation(6.5244, 3.3792);

        expect(fetchMock).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=6.5244&lon=3.3792&format=json"
        );
        expect(result).toEqual(mockData);
      });

      test("should handle custom response headers", async () => {
        const mockData = { display_name: "Test Location with Headers" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
        const result = await fetchLocation(34.0522, -118.2437);

        expect(result).toEqual(mockData);
      });
    });

    describe("error handling", () => {
      test("should throw error when response is not ok", async () => {
        fetchMock.mockResponseOnce("Not found", { status: 404 });

        await expect(fetchLocation(40.7128, -74.006)).rejects.toThrow(
          "Error fetching location details"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Error fetching weather details: Error: Error fetching location details"
        );
      });

      test("should throw error on network failure", async () => {
        fetchMock.mockRejectOnce(new Error("Network error"));

        await expect(fetchLocation(40.7128, -74.006)).rejects.toThrow(
          "Network error"
        );

        expect(console.error).toHaveBeenCalledWith(
          "Error fetching weather details: Error: Network error"
        );
      });

      test("should handle invalid JSON response", async () => {
        fetchMock.mockResponseOnce("Invalid JSON", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });

        await expect(fetchLocation(40.7128, -74.006)).rejects.toThrow();
      });
    });

    describe("edge cases", () => {
      test("should handle zero coordinates", async () => {
        const mockData = { display_name: "Equator and Prime Meridian" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
        const result = await fetchLocation(0, 0);

        expect(fetchMock).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/reverse?lat=0&lon=0&format=json"
        );

        expect(result).toEqual(mockData);
      });
    });
  });
});
