import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import type { Temperature } from "../../store/location.store";
import OptionButton from "../../components/optionButton";
import userEvent from "@testing-library/user-event";

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

  test("renders the label with unit if provided", () => {
    render(
      <OptionButton
        label={label}
        unit={unit}
        selected={false}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(`${label} (${unit})`)).toBeInTheDocument();
  });

  test("renders checkmark and background when selected", () => {
    render(
      <OptionButton label={label} selected={true} onClick={mockOnClick} />
    );

    const button = screen.getByRole("menuitem");
    expect(button).toHaveClass("bg-[#302F4A]");
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("does not render checkmark when not selected", () => {
    render(
      <OptionButton label={label} selected={false} onClick={mockOnClick} />
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("calls onClick when button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <OptionButton label={label} selected={false} onClick={mockOnClick} />
    );
    const button = screen.getByRole("menuitem");
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("always has base classes applied", () => {
    render(
      <OptionButton label={label} selected={false} onClick={mockOnClick} />
    );
    const button = screen.getByRole("menuitem");
    expect(button).toHaveClass(
      "text-white h-[2.4375rem] flex items-center justify-between w-full hover:bg-[#302F4A] cursor-pointer px-2 rounded-lg font-medium"
    );
  });
});
