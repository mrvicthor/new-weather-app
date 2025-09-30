import { vi } from "vitest";
import { useLocationStore } from "../../hooks/useLocationStore";
import { render, screen } from "@testing-library/react";
import type { LocationStore } from "../../store/location.store";
import SearchBar from "../../components/searchbar";

vi.mock("../../hooks/useLocationStore");
const mockUseLocationStore = vi.mocked(useLocationStore);

describe("SearchBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockSetSearchQuery = vi.fn();
  mockUseLocationStore.mockImplementation((selector) => {
    return selector({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
    } as unknown as LocationStore);
  });

  test("should render SearchBar component", () => {
    render(<SearchBar />);
    const inputField = screen.getByPlaceholderText("Search for a place...");
    expect(inputField).toBeInTheDocument();
  });
});
