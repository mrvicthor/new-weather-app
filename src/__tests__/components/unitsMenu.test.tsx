import { vi } from "vitest";
import { useLocationStore } from "../../hooks/useLocationStore";
import type { LocationStore, Temperature } from "../../store/location.store";
import { render, screen } from "@testing-library/react";
import UnitsMenu from "../../components/unitsMenu";
import userEvent from "@testing-library/user-event";

type Unit = "Metric" | "Imperial";
type Precipitation = "millimeters" | "inches";
type WindSpeed = "km/h" | "mph";

vi.mock("../../hooks/useLocationStore");

const mockUseLocationStore = vi.mocked(useLocationStore);

describe("UnitsMenu Component", () => {
  let mockSelectedUnit: Unit = "Metric";
  let mockSelectedPrecipitation: Precipitation = "millimeters";
  let mockSelectedWindSpeed: WindSpeed = "km/h";
  let mockSelectedTemperature: Temperature = "Celsius";

  const mockSetSelectedUnit = vi.fn(() => {
    mockSelectedUnit = mockSelectedUnit === "Imperial" ? "Metric" : "Imperial";
    mockSelectedPrecipitation =
      mockSelectedUnit === "Imperial" ? "inches" : "millimeters";
    mockSelectedWindSpeed = mockSelectedUnit === "Imperial" ? "mph" : "km/h";
    mockSelectedTemperature =
      mockSelectedUnit === "Imperial" ? "Fahrenheit" : "Celsius";
  });

  const mockSetSelectedTemperature = vi.fn();

  const mockSetSelectedPrecipitation = vi.fn();

  const mockSetSelectedWindSpeed = vi.fn();
  const menuRef = { current: null };
  mockSelectedUnit = "Metric";
  mockSelectedPrecipitation = "millimeters";
  mockSelectedWindSpeed = "km/h";

  mockUseLocationStore.mockImplementation((selector) => {
    return selector({
      selectedUnit: mockSelectedUnit,
      setSelectedUnit: mockSetSelectedUnit,
      selectedTemperature: mockSelectedTemperature,
      setSelectedTemperature: mockSetSelectedTemperature,
      selectedPrecipitation: mockSelectedPrecipitation,
      setSelectedPrecipitation: mockSetSelectedPrecipitation,
      selectedWindSpeed: mockSelectedWindSpeed,
      setSelectedWindSpeed: mockSetSelectedWindSpeed,
    } as unknown as LocationStore);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render Units Menu component", () => {
    render(<UnitsMenu menuRef={menuRef} />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  test("should toggle and update button label when setSelectedUnit is called", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<UnitsMenu menuRef={menuRef} />);

    let button = screen.getByRole("menuitem", {
      name: /switch to imperial/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Switch to Imperial");

    await user.click(button);
    expect(mockSetSelectedUnit).toHaveBeenCalledTimes(1);

    rerender(<UnitsMenu menuRef={menuRef} />);
    button = screen.getByRole("menuitem", {
      name: /switch to metric/i,
    });
    expect(button).toHaveTextContent("Switch to Metric");
  });
});
