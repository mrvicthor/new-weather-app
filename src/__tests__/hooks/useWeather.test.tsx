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
});
