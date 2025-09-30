import { test, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

vi.mock("../../hooks/useLocationStore", () => ({
  useLocationStore: vi.fn((selector) =>
    selector({
      isUnitsMounted: false,
      toggleUnitsMounted: vi.fn(),
      isDayslistMounted: false,
      latitude: 40.7128,
      longitude: -74.006,
      searchQuery: "New York",
      selectedDay: new Date("2025-09-29"),
      selectedPrecipitation: "millimeters",
      selectedTemperature: "Celsius",
      selectedUnit: "Metric",
      selectedWindSpeed: "km/h",
      setLocation: vi.fn(),
      setSearchQuery: vi.fn(),
      setSelectedDay: vi.fn(),
      setSelectedPrecipitation: vi.fn(),
      setSelectedTemperature: vi.fn(),
      setSelectedUnit: vi.fn(),
      setSelectedWindSpeed: vi.fn(),
      toggleDaysList: vi.fn(),
    })
  ),
}));

vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: vi.fn((value) => value),
}));

vi.mock("../../hooks/useGeolocation", () => ({
  useGeolocation: vi.fn((setLocation) => {
    setLocation(40.7128, -74.006);
  }),
}));

vi.mock("../../hooks/useLocationSearch", () => ({
  useLocationSearch: vi.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
  })),
}));

vi.mock("../../hooks/useWeather", () => ({
  useWeather: vi.fn(() => ({
    data: {
      weather: {
        current: {
          temperature_2m: 20,
          apparent_temperature: 19,
          relative_humidity_2m: 65,
          wind_speed_10m: 15,
          precipitation: 0,
          weather_code: 0,
        },
        current_units: {
          relative_humidity_2m: "%",
          precipitation: "mm",
        },
      },
      location: {
        address: {
          city: "New York",
          state: "New York",
          country: "United States",
        },
      },
    },
    isError: false,
    isPending: false,
  })),
}));

vi.mock("../../hooks/useToggleDaysDropdown", () => ({
  useToggleDaysDropdown: vi.fn(() => ({
    menuRef: { current: null },
    buttonRef: { current: null },
    itemsRef: { current: [] },
    handleKeyDown: vi.fn(),
  })),
}));

vi.mock("../../hooks/useToggleUnit", () => ({
  useToggleUnit: vi.fn(() => ({
    menuRef: { current: null },
    buttonRef: { current: null },
  })),
}));

// Mock utility functions
vi.mock("../../utils/getForecasts", () => ({
  getForecasts: vi.fn(() => ({
    formattedDate: "Monday, Sep 29, 2025",
    hourlyForecast: [],
    dailyForecast: [],
    daysList: [],
  })),
}));

vi.mock("../../utils/formatTemperature", () => ({
  getDisplayTemperature: vi.fn((unit, temp) => temp),
}));

vi.mock("../../utils/convertSpeed", () => ({
  convertSpeed: vi.fn((speed) => speed),
}));

vi.mock("../../utils/convertMillimetersToInches", () => ({
  convertMillimetersToInches: vi.fn((value) => value),
}));

vi.mock("../../components/header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("../../components/searchbar", () => ({
  default: () => <div data-testid="searchbar">SearchBar</div>,
}));

vi.mock("../../components/location", () => ({
  default: () => <div data-testid="location">Location</div>,
}));

vi.mock("../../components/card", () => ({
  default: () => <div data-testid="card">Card</div>,
}));

vi.mock("../../components/cardWithSpace", () => ({
  default: () => <div data-testid="card-with-space">CardWithSpace</div>,
}));

vi.mock("../../components/dailyForecast", () => ({
  default: () => <div data-testid="daily-forecast">Daily Forecast</div>,
}));

vi.mock("../../components/hourlyForecasts", () => ({
  default: () => <div data-testid="hourly-forecasts">Hourly Forecasts</div>,
}));

vi.mock("../../components/daysDropdown", () => ({
  default: () => <div data-testid="days-dropdown">Days Dropdown</div>,
}));

vi.mock("../../components/loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("../../components/errorPage", () => ({
  default: () => <div data-testid="error-page">Error Page</div>,
}));

vi.mock("../../Pages/home", () => ({
  default: () => (
    <div data-testid="home-page">
      <header data-testid="header">Header</header>
      <main>
        <h1>How's the sky looking today?</h1>
        <div data-testid="searchbar">SearchBar</div>
        <div data-testid="location">Location</div>
      </main>
    </div>
  ),
}));

vi.mock("../../providers/location.store.provider", () => ({
  LocationStoreProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="location-store-provider">{children}</div>
  ),
}));

describe("App Component", () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
  });

  test("renders App without crashing", () => {
    const { container } = render(<App />, { wrapper: createWrapper() });
    expect(container).toBeInTheDocument();
  });
});
