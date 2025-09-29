import { vi } from "vitest";
import type { RefObject } from "react";
import { useLocationStore } from "../../hooks/useLocationStore";
import { useToggleUnit } from "../../hooks/useToggleUnit";
import { render, screen } from "@testing-library/react";
import Header from "../../components/header";

vi.mock("../../hooks/useLocationStore");
vi.mock("../../hooks/useToggleUnit");

vi.mock("../../components/unitsMenu", () => ({
  default: ({ menuRef }: { menuRef: RefObject<HTMLDivElement> }) => (
    <div ref={menuRef} data-testid="units-menu" id="units-menu">
      Units Menu
    </div>
  ),
}));

const mockUseLocationStore = vi.mocked(useLocationStore);
const mockUseToggleUnit = vi.mocked(useToggleUnit);

describe("Header Component", () => {
  let mockToggleUnitsMounted: ReturnType<typeof vi.fn>;
  let mockMenuRef: RefObject<HTMLDivElement | null>;
  let mockButtonRef: RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    mockToggleUnitsMounted = vi.fn();
    mockMenuRef = { current: null };
    mockButtonRef = { current: null };

    mockUseLocationStore.mockReturnValue({
      isUnitsMounted: false,
      toggleUnitsMounted: mockToggleUnitsMounted,
    });

    mockUseToggleUnit.mockReturnValue({
      menuRef: mockMenuRef,
      buttonRef: mockButtonRef,
    });
  });

  describe("Rendering", () => {
    test("should render the Header with logo", () => {
      render(<Header />);

      const logo = screen.getByAltText("weather logo");
      expect(logo).toBeInTheDocument();
    });

    test("should render the units button", () => {
      render(<Header />);

      const unitsButton = screen.getByRole("button", { name: /units/i });
      expect(unitsButton).toBeInTheDocument();
    });
  });
});
