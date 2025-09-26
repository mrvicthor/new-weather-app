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

  test("should cancel previous timeout if value changes before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );
    rerender({ value: "second" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    rerender({ value: "third" });
    expect(result.current).toBe("first");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("third");
  });

  test("should respect custom delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "start", delay: 1000 },
      }
    );
    rerender({ value: "changed", delay: 1000 });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("start");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("changed");
  });
});
