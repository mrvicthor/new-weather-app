import { renderHook, act } from "@testing-library/react";
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

  test("should update value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );
    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("updated");
  });
});
