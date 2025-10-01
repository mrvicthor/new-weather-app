import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import type { Temperature } from "../../store/location.store";
import OptionButton from "../../components/optionButton";

describe("Option Button Component", () => {
  const label = "Option 1";
  const mockOnClick = vi.fn();
  const unit: Temperature = "Celsius";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the label correctly without unit", () => {
    render(
      <OptionButton label={label} selected={false} onClick={mockOnClick} />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.queryByText(/\(.*\)/)).not.toBeInTheDocument();
  });
});
