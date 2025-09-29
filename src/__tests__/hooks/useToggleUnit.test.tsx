import { act, renderHook } from "@testing-library/react";
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
  describe("click outside behaviour", () => {
    test("should call toggleUnitsMounted when clicking outside both menu and button", () => {
      const { result } = renderHook(() =>
        useToggleUnit(mockToggleUnitsMounted)
      );
      const mockMenuElement = {
        contains: vi.fn().mockReturnValue(false),
      } as unknown as HTMLDivElement;

      const mockButtonElement = {
        contains: vi.fn().mockReturnValue(false),
      } as unknown as HTMLButtonElement;

      act(() => {
        result.current.menuRef.current = mockMenuElement;
        result.current.buttonRef.current = mockButtonElement;
      });

      const outsideElement = document.createElement("div");
      const mockEvent = {
        target: outsideElement,
      } as unknown as MouseEvent;

      act(() => {
        const calls = vi.mocked(document.addEventListener).mock.calls;
        const mousedownHandler = calls.find(
          (call) => call[0] === "mousedown"
        )?.[1] as (event: MouseEvent) => void;
        mousedownHandler(mockEvent);
      });

      expect(mockMenuElement.contains).toHaveBeenCalledWith(outsideElement);
      expect(mockButtonElement.contains).toHaveBeenCalledWith(outsideElement);
      expect(mockToggleUnitsMounted).toHaveBeenCalledTimes(1);
    });

    test("should NOT call toggleUnitsMounted when clicking inside menu", () => {
      const { result } = renderHook(() =>
        useToggleUnit(mockToggleUnitsMounted)
      );

      const mockMenuElement = {
        contains: vi.fn().mockReturnValue(true),
      } as unknown as HTMLDivElement;

      const mockButtonElement = {
        contains: vi.fn().mockReturnValue(false),
      } as unknown as HTMLButtonElement;

      act(() => {
        result.current.menuRef.current = mockMenuElement;
        result.current.buttonRef.current = mockButtonElement;
      });

      const mockEvent = {
        target: document.createElement("div"),
      } as unknown as MouseEvent;

      act(() => {
        const calls = vi.mocked(document.addEventListener).mock.calls;
        const mousedownHandler = calls.find(
          (call) => call[0] === "mousedown"
        )?.[1] as (event: MouseEvent) => void;
        mousedownHandler(mockEvent);
      });
      expect(mockToggleUnitsMounted).not.toHaveBeenCalled();
    });

    test("should NOT call toggleUnitsMounted when clicking inside button", () => {
      const { result } = renderHook(() =>
        useToggleUnit(mockToggleUnitsMounted)
      );

      const mockMenuElement = {
        contains: vi.fn().mockReturnValue(false),
      } as unknown as HTMLDivElement;

      const mockButtonElement = {
        contains: vi.fn().mockReturnValue(true),
      } as unknown as HTMLButtonElement;

      act(() => {
        result.current.menuRef.current = mockMenuElement;
        result.current.buttonRef.current = mockButtonElement;
      });

      const mockEvent = {
        target: document.createElement("div"),
      } as unknown as MouseEvent;

      act(() => {
        const calls = vi.mocked(document.addEventListener).mock.calls;
        const mousedownHandler = calls.find(
          (call) => call[0] === "mousedown"
        )?.[1] as (event: MouseEvent) => void;
        mousedownHandler(mockEvent);
      });
      expect(mockToggleUnitsMounted).not.toHaveBeenCalled();
    });

    test("should handle null refs gracefully", () => {
      renderHook(() => useToggleUnit(mockToggleUnitsMounted));
      const mockEvent = {
        target: document.createElement("div"),
      } as unknown as MouseEvent;

      expect(() => {
        act(() => {
          const calls = vi.mocked(document.addEventListener).mock.calls;
          const mousedownHandler = calls.find(
            (call) => call[0] === "mousedown"
          )?.[1] as (event: MouseEvent) => void;
          mousedownHandler(mockEvent);
        });
      }).not.toThrow();

      expect(mockToggleUnitsMounted).not.toHaveBeenCalled();
    });
  });

  describe("keyboard behaviour", () => {
    test("should call toggleUnitsMounted and focus button on Escape key", () => {
      const { result } = renderHook(() =>
        useToggleUnit(mockToggleUnitsMounted)
      );

      const mockFocus = vi.fn();
      const mockButtonElement = {
        focus: mockFocus,
      } as unknown as HTMLButtonElement;

      act(() => {
        result.current.buttonRef.current = mockButtonElement;
      });

      const mockEvent = {
        key: "Escape",
      } as unknown as KeyboardEvent;

      act(() => {
        const calls = vi.mocked(document.addEventListener).mock.calls;
        const keydownHandler = calls.find(
          (call) => call[0] === "keydown"
        )?.[1] as (event: KeyboardEvent) => void;
        keydownHandler(mockEvent);
      });

      expect(mockToggleUnitsMounted).toHaveBeenCalledTimes(1);
      expect(mockFocus).toHaveBeenCalledTimes(1);
    });

    test("should NOT call toggleUnitsMounted for non-Escape keys", () => {
      renderHook(() => useToggleUnit(mockToggleUnitsMounted));

      const mockEvent = {
        key: "Enter",
      } as unknown as KeyboardEvent;

      act(() => {
        const calls = vi.mocked(document.addEventListener).mock.calls;
        const keydownHandler = calls.find(
          (call) => call[0] === "keydown"
        )?.[1] as (event: KeyboardEvent) => void;
        keydownHandler(mockEvent);
      });

      expect(mockToggleUnitsMounted).not.toHaveBeenCalled();
    });

    test("should handle Escape key with null buttonRef gracefully", () => {
      renderHook(() => useToggleUnit(mockToggleUnitsMounted));

      const mockEvent = {
        key: "Escape",
      } as unknown as KeyboardEvent;
      expect(() => {
        act(() => {
          const calls = vi.mocked(document.addEventListener).mock.calls;
          const keydownHandler = calls.find(
            (call) => call[0] === "keydown"
          )?.[1] as (event: KeyboardEvent) => void;
          keydownHandler(mockEvent);
        });
      }).not.toThrow();

      expect(mockToggleUnitsMounted).toHaveBeenCalledTimes(1);
    });
    test("should test multiple keyboard events", () => {
      const { result } = renderHook(() =>
        useToggleUnit(mockToggleUnitsMounted)
      );
      const mockFocus = vi.fn();
      const mockButtonElement = {
        focus: mockFocus,
      } as unknown as HTMLButtonElement;

      act(() => {
        result.current.buttonRef.current = mockButtonElement;
      });

      const escapeEvent = { key: "Escape" } as unknown as KeyboardEvent;
      const enterEvent = { key: "Enter" } as unknown as KeyboardEvent;
      const arrowEvent = { key: "ArrowDown" } as unknown as KeyboardEvent;

      act(() => {
        const calls = vi.mocked(document.addEventListener).mock.calls;
        const keydownHandler = calls.find(
          (call) => call[0] === "keydown"
        )?.[1] as (event: KeyboardEvent) => void;

        keydownHandler(escapeEvent);
        keydownHandler(enterEvent);
        keydownHandler(arrowEvent);
      });

      expect(mockToggleUnitsMounted).toHaveBeenCalledTimes(1);
      expect(mockFocus).toHaveBeenCalledTimes(1);
    });
  });
});
