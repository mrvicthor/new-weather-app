import { describe, vi, beforeEach, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as api from "../../api";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import { type ReactNode } from "react";
import type { SearchResult } from "../../types";

vi.mock("../../api", () => ({
  fetchLocationWeather: vi.fn(),
}));

const mockFetchLocationWeather = vi.mocked(api.fetchLocationWeather);

const mockSearchResults: SearchResult[] = [
  {
    admin1: "New York",
    admin1_id: 5128638,
    country: "United States",
    country_code: "US",
    country_id: 6252001,
    elevation: 10,
    feature_code: "PPL",
    id: 5128581,
    latitude: 40.7128,
    longitude: -74.006,
    name: "New York",
    population: 8175133,
    timezone: "America/New_York",
  },
  {
    admin1: "Minnesota",
    admin1_id: 5037779,
    country: "United States",
    country_code: "US",
    country_id: 6252001,
    elevation: 408,
    feature_code: "PPL",
    id: 5043473,
    latitude: 46.518,
    longitude: -95.3731,
    name: "New York Mills",
    population: 1199,
    timezone: "America/Chicago",
  },
];

const mockApiResponse = {
  results: mockSearchResults,
  generationtime_ms: 0.123,
};

// Test wrapper with QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
        gcTime: 0, // Disable caching for tests
      },
    },
  });

const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLocationSearch", () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test("should return empty array when debouncedValue is empty", async () => {
    const { result } = renderHook(() => useLocationSearch(""), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isEnabled).toBe(false);
    expect(result.current.status).toBe("pending");
  });

  test("should not fetch when debouncedValue length is 0", async () => {
    const { result } = renderHook(() => useLocationSearch(""), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.isEnabled).toBe(false);
    expect(result.current.status).toBe("pending");

    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for any async operations

    expect(result.current.fetchStatus).toBe("idle");
  });

  test("should fetch and return results when debouncedValue is provided", async () => {
    mockFetchLocationWeather.mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(() => useLocationSearch("New York"), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isEnabled).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockSearchResults);
    expect(mockFetchLocationWeather).toHaveBeenCalledWith("New York");
    expect(mockFetchLocationWeather).toHaveBeenCalledTimes(1);
  });

  test("should return empty array when API returns empty results", async () => {
    mockFetchLocationWeather.mockResolvedValueOnce({ results: [] });

    const { result } = renderHook(() => useLocationSearch("London"), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
    expect(mockFetchLocationWeather).toHaveBeenCalledWith("London");
  });
});
