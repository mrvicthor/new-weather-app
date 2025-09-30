import { vi } from "vitest";
import { useLocationStore } from "../../hooks/useLocationStore";
import type { Day } from "../../types";
import { render, screen } from "@testing-library/react";
import DaysDropDown from "../../components/daysDropdown";
import type { LocationStore } from "../../store/location.store";

vi.mock("../../hooks/useLocationStore");

const mockUseLocationStore = vi.mocked(useLocationStore);

describe("DaysDropdown Component", () => {
  const mockSetSelectedDay = vi.fn();
  const mockToggleDaysList = vi.fn();
  const mockHandleKeyDown = vi.fn();

  const daysList: Day[] = [
    { day: "Monday", date: new Date("2025-09-29") },
    { day: "Tuesday", date: new Date("2025-09-30") },
  ];

  const setup = () => {
    const menuRef = { current: null };
    const itemsRef = { current: [] as (HTMLButtonElement | null)[] };

    mockUseLocationStore.mockImplementation((selector) =>
      selector({
        setSelectedDay: mockSetSelectedDay,
        toggleDaysList: mockToggleDaysList,
      } as unknown as LocationStore)
    );

    render(
      <DaysDropDown
        daysList={daysList}
        menuRef={menuRef}
        itemsRef={itemsRef}
        handleKeyDown={mockHandleKeyDown}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render DaysDropdown component", () => {
    setup();
    expect(screen.getByRole("menu")).toBeInTheDocument();

    daysList.forEach(({ day }) => {
      expect(screen.getByRole("menuitem", { name: day })).toBeInTheDocument();
    });
  });
});
