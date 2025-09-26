import { renderHook } from "@testing-library/react";
import { describe, beforeEach, vi } from "vitest";
import { useDebounce } from "../../hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  test("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });
});
