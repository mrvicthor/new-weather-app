import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useToggleUnit } from "../../hooks/useToggleUnit";

describe("useToggleUnit", () => {
  let mockToggleUnitsMounted: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockToggleUnitsMounted = vi.fn();
    vi.spyOn(document, "addEventListener");
    vi.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should return refs", () => {
    const { result } = renderHook(() => useToggleUnit(mockToggleUnitsMounted));
    expect(result.current.menuRef).toBeDefined();
    expect(result.current.buttonRef).toBeDefined();
    expect(result.current.buttonRef.current).toBeNull();
    expect(result.current.menuRef.current).toBeNull();
  });

  test("should add event listeners on mount", () => {
    renderHook(() => useToggleUnit(mockToggleUnitsMounted));
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    expect(document.addEventListener).toHaveBeenCalledTimes(2);
  });

  test("should remove event listeners on unmount", () => {
    const { unmount } = renderHook(() => useToggleUnit(mockToggleUnitsMounted));
    unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );

    expect(document.removeEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
  });
});
