import { vi } from "vitest";
import { useToggleDaysDropdown } from "../../hooks/useToggleDaysDropdown";
import { act, renderHook } from "@testing-library/react";
import type React from "react";

describe("useToggleDaysDropdown", () => {
  let mockToggleDaysList: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockToggleDaysList = vi.fn();
    vi.spyOn(document, "addEventListener");
    vi.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should return refs and handleKeyDown function", () => {
    const { result } = renderHook(() =>
      useToggleDaysDropdown(false, mockToggleDaysList)
    );
    expect(result.current.menuRef).toBeDefined();
    expect(result.current.buttonRef).toBeDefined();
    expect(result.current.itemsRef).toBeDefined();
    expect(result.current.handleKeyDown).toBeInstanceOf(Function);
  });

  test("should focus first item when dropdown opens", () => {
    const mockFocus = vi.fn();
    const mockElement = { focus: mockFocus } as unknown as HTMLButtonElement;
    const { result, rerender } = renderHook(
      ({ isOpen }) => useToggleDaysDropdown(isOpen, mockToggleDaysList),
      { initialProps: { isOpen: false } }
    );

    act(() => {
      result.current.itemsRef.current = [mockElement, null];
    });

    rerender({ isOpen: true });

    expect(mockFocus).toHaveBeenCalled();
  });

  test("should add mousedown event listener when dropdown is open", () => {
    renderHook(() => useToggleDaysDropdown(true, mockToggleDaysList));
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
  });

  test("should remove event listener on cleanup", () => {
    const { unmount } = renderHook(() =>
      useToggleDaysDropdown(true, mockToggleDaysList)
    );
    unmount();
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
  });

  test("should call toggleDaysList when clicking outside menu and button", () => {
    const { result } = renderHook(() =>
      useToggleDaysDropdown(true, mockToggleDaysList)
    );

    const mockMenuElement = {
      contains: vi.fn().mockReturnValue(false),
    } as unknown as HTMLUListElement;
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
    expect(mockToggleDaysList).toHaveBeenCalled();
  });

  test("should not call toggleDaysList when clicking inside menu", () => {
    const { result } = renderHook(() =>
      useToggleDaysDropdown(true, mockToggleDaysList)
    );
    const mockMenuElement = {
      contains: vi.fn().mockReturnValue(true),
    } as unknown as HTMLUListElement;

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
    expect(mockToggleDaysList).not.toHaveBeenCalled();
  });
  describe("handleKeyDown", () => {
    let mockItems: (HTMLButtonElement | null)[];
    let mockEvent: Partial<React.KeyboardEvent<HTMLUListElement>>;

    beforeEach(() => {
      mockItems = [
        { focus: vi.fn() } as unknown as HTMLButtonElement,
        { focus: vi.fn() } as unknown as HTMLButtonElement,
        { focus: vi.fn() } as unknown as HTMLButtonElement,
      ];
      mockEvent = {
        preventDefault: vi.fn(),
        key: "",
      };

      Object.defineProperty(document, "activeElement", {
        value: mockItems[1],
        writable: true,
      });
    });

    test("should focus next item on ArrowDown", () => {
      const { result } = renderHook(() =>
        useToggleDaysDropdown(true, mockToggleDaysList)
      );

      act(() => {
        result.current.itemsRef.current = mockItems;
      });

      mockEvent.key = "ArrowDown";

      act(() => {
        result.current.handleKeyDown(
          mockEvent as React.KeyboardEvent<HTMLUListElement>
        );
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect((mockItems[2] as HTMLButtonElement).focus).toHaveBeenCalled();
    });

    test("should focus previous item on ArrowUp", () => {
      const { result } = renderHook(() =>
        useToggleDaysDropdown(true, mockToggleDaysList)
      );

      act(() => {
        result.current.itemsRef.current = mockItems;
      });

      mockEvent.key = "ArrowUp";

      act(() => {
        result.current.handleKeyDown(
          mockEvent as React.KeyboardEvent<HTMLUListElement>
        );
      });
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect((mockItems[0] as HTMLButtonElement).focus).toHaveBeenCalled();
    });
  });
});
