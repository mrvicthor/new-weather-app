import { fetchLocationWeather } from "..";
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

  describe("FetchLocationWeather", () => {
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
});
