import { vi } from "vitest";
import { useStore, createStore } from "zustand";
import type { LocationStore } from "../../store/location.store";
import {
  LocationStoreContext,
  useLocationStore,
} from "../../hooks/useLocationStore";
import { type ReactNode } from "react";
import type { LocationStoreApi } from "../../providers/location.store.provider";
import { renderHook } from "@testing-library/react";

vi.mock("zustand", async (importOriginal) => {
  const actual = await importOriginal<typeof import("zustand")>();
  return {
    ...actual,
    useStore: vi.fn(),
  };
});

const mockUseStore = vi.mocked(useStore);

const mockLocationStore: LocationStore = {
  latitude: 40.7128,
  longitude: -74.006,
  searchQuery: "New York",
  isUnitsMounted: false,
  selectedUnit: "Metric",
  selectedTemperature: "Celsius",
  selectedWindSpeed: "km/h",
  selectedPrecipitation: "millimeters",
  isDayslistMounted: false,
  selectedDay: new Date(),
  setLocation: vi.fn(),
  setSearchQuery: vi.fn(),
  toggleUnitsMounted: vi.fn(),
  setSelectedUnit: vi.fn(),
  setSelectedTemperature: vi.fn(),
  setSelectedWindSpeed: vi.fn(),
  setSelectedPrecipitation: vi.fn(),
  toggleDaysList: vi.fn(),
  setSelectedDay: vi.fn(),
};

const createWrapper = (storeApi: LocationStoreApi) => {
  return ({ children }: { children: ReactNode }) => (
    <LocationStoreContext.Provider value={storeApi}>
      {children}
    </LocationStoreContext.Provider>
  );
};

describe("useLocationStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should throw error if used outside of LocationStoreProvider", () => {
    expect(() => {
      renderHook(() => useLocationStore((store) => store.latitude));
    }).toThrow("useLocationStore must be used within LocationStoreProvider");
  });

  test("should return selected value when used within provider", () => {
    const mockStoreApi = createStore(() => mockLocationStore);
    mockUseStore.mockReturnValue(mockLocationStore.selectedDay);
    const wrapper = createWrapper(mockStoreApi);
    const { result } = renderHook(
      () => useLocationStore((store) => store.selectedDay),
      { wrapper }
    );
    expect(result.current).toEqual(mockLocationStore.selectedDay);
  });

  test("should work with different selectors", () => {
    const mockStoreApi = createStore(() => mockLocationStore);
    mockUseStore.mockReturnValue(mockLocationStore.latitude);
    const wrapper = createWrapper(mockStoreApi);
    const { result } = renderHook(
      () => useLocationStore((store) => store.latitude),
      { wrapper }
    );
    expect(result.current).toEqual(mockLocationStore.latitude);
  });

  test("should pass selector function to useStore correctly", () => {
    const mockStoreApi = createStore(() => mockLocationStore);
    const mockSelector = vi.fn((store: LocationStore) => store.longitude);
    mockUseStore.mockReturnValue(mockLocationStore.longitude);
    const wrapper = createWrapper(mockStoreApi);
    renderHook(() => useLocationStore(mockSelector), { wrapper });
    expect(mockUseStore).toHaveBeenCalledWith(mockStoreApi, mockSelector);
  });

  test("should handle undefined context gracefully", () => {
    const UndefinedWrapper = ({ children }: { children: ReactNode }) => (
      <LocationStoreContext.Provider value={undefined}>
        {children}
      </LocationStoreContext.Provider>
    );
    expect(() => {
      renderHook(() => useLocationStore((store) => store.latitude), {
        wrapper: UndefinedWrapper,
      });
    }).toThrow("useLocationStore must be used within LocationStoreProvider");
  });
});
