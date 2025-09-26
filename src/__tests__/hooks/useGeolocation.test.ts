import { renderHook } from "@testing-library/react";
import { describe, beforeEach, vi } from "vitest";
import { useGeolocation } from "../../hooks/useGeolocation";

describe("useGeolocation", () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error - overriding navigator.geolocation for testing purposes
    global.navigator.geolocation = mockGeolocation;
  });

  test("should call setLocation with correct coordinates", () => {
    const setLocation = vi.fn();
    const mockCoords = { latitude: 51.5074, longitude: -0.1278 };
    const mockPosition = { coords: mockCoords };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(mockPosition)
    );

    renderHook(() => useGeolocation(setLocation));

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(setLocation).toHaveBeenCalledWith(
      mockCoords.latitude,
      mockCoords.longitude
    );
  });

  test("should not call setLocation if geolocation is not available", () => {
    // Remove geolocation from navigator
    // @ts-expect-error testing absence
    delete global.navigator.geolocation;
    const setLocation = vi.fn();

    expect(() => renderHook(() => useGeolocation(setLocation))).not.toThrow();
    expect(setLocation).not.toHaveBeenCalled();
  });
});
