import { vi } from "vitest";
import type { ReactNode } from "react";
import { fetchLocation, fetchWeatherDetails } from "../../api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useWeather } from "../../hooks/useWeather";

vi.mock("../../api", () => ({
  fetchLocation: vi.fn(),
  fetchWeatherDetails: vi.fn(),
}));

const mockFetchLocation = vi.mocked(fetchLocation);
const mockFetchWeatherDetails = vi.mocked(fetchWeatherDetails);

describe("useWeather", () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  test("should fetch location and weather data successfully", async () => {
    const mockLocationData = {
      name: "London",
      country: "UK",
      state: "England",
    };

    const mockWeatherData = {
      temperature: 20,
      condition: "Sunny",
      humidity: 65,
    };
    mockFetchLocation.mockResolvedValue(mockLocationData);
    mockFetchWeatherDetails.mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });

    // Initial loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      location: mockLocationData,
      weather: mockWeatherData,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    // Verify API calls
    expect(mockFetchLocation).toHaveBeenCalledWith(51.5074, -0.1278);
    expect(mockFetchWeatherDetails).toHaveBeenCalledWith(51.5074, -0.1278);
    expect(mockFetchLocation).toHaveBeenCalledTimes(1);
    expect(mockFetchWeatherDetails).toHaveBeenCalledTimes(1);
  });

  test("should not fetch when latitude is null", () => {
    const { result } = renderHook(
      () => useWeather(null as unknown as number, -0.1278),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.fetchStatus).toBe("idle");
  });

  test("should not fetch when longitude is null", () => {
    const { result } = renderHook(
      () => useWeather(51.5074, null as unknown as number),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.fetchStatus).toBe("idle");

    // API should not be called
    expect(mockFetchLocation).not.toHaveBeenCalled();
    expect(mockFetchWeatherDetails).not.toHaveBeenCalled();
  });

  test("should not fetch when both coordinates are null", () => {
    const { result } = renderHook(
      () => useWeather(null as unknown as number, null as unknown as number),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.fetchStatus).toBe("idle");

    // API should not be called
    expect(mockFetchLocation).not.toHaveBeenCalled();
    expect(mockFetchWeatherDetails).not.toHaveBeenCalled();
  });

  test("should handle API errors gracefully", async () => {
    const errorMessage = "Failed to fetch weather data";
    mockFetchLocation.mockRejectedValue(new Error(errorMessage));
    mockFetchWeatherDetails.mockResolvedValue({ temperature: 20 });

    const { result } = renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  test("should handle fetchLocation error", async () => {
    mockFetchLocation.mockRejectedValue(new Error("Location not found"));
    mockFetchWeatherDetails.mockResolvedValue({ temperature: 20 });

    const { result } = renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe("Location not found");
  });

  test("should handle fetchWeatherDetails error", async () => {
    mockFetchLocation.mockResolvedValue({ name: "London" });
    mockFetchWeatherDetails.mockRejectedValue(
      new Error("Weather service unavailable")
    );
    const { result } = renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe(
      "Weather service unavailable"
    );
  });

  test("should use correct query key", () => {
    renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });

    // Access the query from the cache
    const queries = queryClient.getQueryCache().getAll();
    expect(queries.length).toBe(1);
    expect(queries[0].queryKey).toEqual(["location", 51.5074, -0.1278]);
  });

  test("should update when coordinates change", async () => {
    const mockLocationData1 = { name: "London" };
    const mockWeatherData1 = { temperature: 20 };
    const mockLocationData2 = { name: "Paris" };
    const mockWeatherData2 = { temperature: 22 };

    mockFetchLocation
      .mockResolvedValueOnce(mockLocationData1)
      .mockResolvedValueOnce(mockLocationData2);

    mockFetchWeatherDetails
      .mockResolvedValueOnce(mockWeatherData1)
      .mockResolvedValueOnce(mockWeatherData2);

    const { result, rerender } = renderHook(
      ({ lat, lng }) => useWeather(lat, lng),
      {
        wrapper: createWrapper(),
        initialProps: { lat: 51.5074, lng: -0.1278 },
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.location).toEqual(mockLocationData1);
    expect(result.current.data?.weather).toEqual(mockWeatherData1);

    rerender({ lat: 48.8566, lng: 2.3522 });

    await waitFor(() => expect(result.current.isFetching).toBe(true));

    await waitFor(() => {
      return result.current.data?.location === mockLocationData2;
    });

    expect(result.current.data?.location).toEqual(mockLocationData2);
    expect(result.current.data?.weather).toEqual(mockWeatherData2);

    // Both API functions should have been called twice
    expect(mockFetchLocation).toHaveBeenCalledTimes(2);
    expect(mockFetchWeatherDetails).toHaveBeenCalledTimes(2);
  });

  test("should fetch both API calls in parallel", async () => {
    const mockLocationData = { name: "London" };
    const mockWeatherData = { temperature: 20 };

    let locationResolve: (value: typeof mockLocationData) => void;
    let weatherResolve: (value: typeof mockWeatherData) => void;

    const locationPromise = new Promise<typeof mockLocationData>((resolve) => {
      locationResolve = resolve;
    });

    const weatherPromise = new Promise<typeof mockWeatherData>((resolve) => {
      weatherResolve = resolve;
    });

    mockFetchLocation.mockReturnValue(locationPromise);
    mockFetchWeatherDetails.mockReturnValue(weatherPromise);

    const { result } = renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);

    // Both should be called immediately (not waiting for each other)
    expect(mockFetchLocation).toHaveBeenCalledTimes(1);
    expect(mockFetchWeatherDetails).toHaveBeenCalledTimes(1);

    locationResolve!(mockLocationData);
    weatherResolve!(mockWeatherData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      location: mockLocationData,
      weather: mockWeatherData,
    });
  });

  test("should cache results based on query key", async () => {
    const mockLocationData = { name: "London" };
    const mockWeatherData = { temperature: 20 };

    mockFetchLocation.mockResolvedValue(mockLocationData);
    mockFetchWeatherDetails.mockResolvedValue(mockWeatherData);

    // First render
    const { result: result1, unmount } = renderHook(
      () => useWeather(51.5074, -0.1278),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result1.current.isSuccess).toBe(true));

    expect(mockFetchLocation).toHaveBeenCalledTimes(1);
    expect(mockFetchWeatherDetails).toHaveBeenCalledTimes(1);

    unmount();

    // second render with same coordinates should use cache
    const { result: result2 } = renderHook(() => useWeather(51.5074, -0.1278), {
      wrapper: createWrapper(),
    });

    // should get data immediately from cache
    expect(result2.current.data).toEqual({
      location: mockLocationData,
      weather: mockWeatherData,
    });

    // should not make additional API calls
    expect(mockFetchLocation).toHaveBeenCalledTimes(1);
    expect(mockFetchWeatherDetails).toHaveBeenCalledTimes(1);
  });
});
