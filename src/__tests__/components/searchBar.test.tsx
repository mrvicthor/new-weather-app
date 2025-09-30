import { vi } from "vitest";
import { useLocationStore } from "../../hooks/useLocationStore";
import { render, screen } from "@testing-library/react";
// import type { LocationStore } from "../../store/location.store";
import SearchBar from "../../components/searchbar";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useLocationStore");
vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: vi.fn((value) => value),
}));
const mockUseLocationStore = vi.mocked(useLocationStore);

describe("SearchBar Component", () => {
  let currentSearchQuery = "";
  let mockSetSearchQuery: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    currentSearchQuery = "";
    mockSetSearchQuery = vi.fn((newQuery: string) => {
      currentSearchQuery = newQuery;
    });

    mockUseLocationStore.mockImplementation(() => ({
      searchQuery: currentSearchQuery,
      setSearchQuery: mockSetSearchQuery,
    }));
  });

  test("should render SearchBar component", () => {
    render(<SearchBar />);
    const inputField = screen.getByPlaceholderText("Search for a place...");
    expect(inputField).toBeInTheDocument();
  });

  test("should update search query on input change", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const inputField = screen.getByTestId("search-input") as HTMLInputElement;
    await user.type(inputField, "New York");

    expect(mockSetSearchQuery).toHaveBeenCalledTimes(8);
    expect(mockUseLocationStore).toHaveBeenCalledWith(expect.any(Function));
  });

  test("should display value from store in input", async () => {
    currentSearchQuery = "Tokyo";

    render(<SearchBar />);
    const inputField = screen.getByTestId("search-input") as HTMLInputElement;
    expect(inputField.value).toBe("Tokyo");
  });
});
