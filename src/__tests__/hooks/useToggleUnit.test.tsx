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
});
