import { describe, vi, beforeEach, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as api from "../../api";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import { type ReactNode } from "react";

vi.mock("../api", () => ({
  fetchLocationWeather: vi.fn(),
}));

const mockFetchLocationWeather = vi.mocked(api.fetchLocationWeather);

const mockSearchResults = [
  {
    id: 1,
    name: "New York",
    country: "US",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: 2,
    name: "New York Mills",
    country: "US",
    latitude: 46.518,
    longitude: -95.3731,
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
});
