import { vi } from "vitest";
import { useLocationStore } from "../../hooks/useLocationStore";
import type { SearchResult } from "../../types";
import type { LocationStore } from "../../store/location.store";
import { render, screen } from "@testing-library/react";
import SearchResults from "../../components/searchResult";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useLocationStore");

const mockUseLocationStore = vi.mocked(useLocationStore);

describe("SearchResults Component", () => {
  let isLoading = false;
  let debouncedValue = "";
  const mockSearchResult: SearchResult[] = [
    {
      admin1: "Illinois",
      admin1_id: 1,
      country: "United States",
      country_code: "US",
      country_id: 840,
      elevation: 182,
      feature_code: "PPLA",
      id: 2001,
      latitude: 39.7817,
      longitude: -89.6501,
      name: "Springfield",
      population: 114000,
      timezone: "America/Chicago",
    },
    {
      admin1: "Massachusetts",
      admin1_id: 2,
      country: "United States",
      country_code: "US",
      country_id: 840,
      elevation: 21,
      feature_code: "PPLA2",
      id: 2002,
      latitude: 42.1015,
      longitude: -72.5898,
      name: "Springfield",
      population: 155000,
      timezone: "America/New_York",
    },
    {
      admin1: "Missouri",
      admin1_id: 3,
      country: "United States",
      country_code: "US",
      country_id: 840,
      elevation: 396,
      feature_code: "PPLA2",
      id: 2003,
      latitude: 37.2089,
      longitude: -93.2923,
      name: "Springfield",
      population: 170000,
      timezone: "America/Chicago",
    },
  ];

  const mockSetLocation = vi.fn();
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    isLoading = false;
    debouncedValue = "";
    mockUseLocationStore.mockImplementation((selector) => {
      return selector({
        setLocation: mockSetLocation,
        setSearchQuery: mockSetSearchQuery,
      } as unknown as LocationStore);
    });
  });

  test("should not render list when debouncedValue is empty", () => {
    render(
      <SearchResults
        isLoading={isLoading}
        searchResults={mockSearchResult}
        debouncedValue={debouncedValue}
      />
    );

    const list = document.querySelector("ul");
    expect(list).not.toBeInTheDocument();
  });

  test("should not render list when searchResults is undefined or empty", () => {
    const searchResults: SearchResult[] = [];
    debouncedValue = "test city";
    render(
      <SearchResults
        isLoading={isLoading}
        searchResults={searchResults}
        debouncedValue={debouncedValue}
      />
    );
    const list = document.querySelector("ul");
    expect(list).not.toBeInTheDocument();
  });

  test("should render results when debouncedValue is provided and searchResults has items", () => {
    debouncedValue = "Springfield";
    render(
      <SearchResults
        debouncedValue={debouncedValue}
        isLoading={isLoading}
        searchResults={mockSearchResult}
      />
    );
    const list = screen.getByRole("menu");
    expect(list).toBeInTheDocument();
  });

  test("should show loading indicator when isLoading is true", () => {
    isLoading = true;
    debouncedValue = "lagos";
    render(
      <SearchResults
        isLoading={isLoading}
        debouncedValue={debouncedValue}
        searchResults={mockSearchResult}
      />
    );
    const loadingIndicator = screen.getByRole("status", {
      name: /search in progress/i,
    });
    expect(loadingIndicator).toBeInTheDocument();
    expect(loadingIndicator).toHaveTextContent(/search in progress/i);
  });

  test("should render city name and country for each search result", () => {
    debouncedValue = "springfield";
    render(
      <SearchResults
        debouncedValue={debouncedValue}
        isLoading={isLoading}
        searchResults={mockSearchResult}
      />
    );
    const ul = document.querySelector("ul")!;
    const cities = Array.from(ul.children);
    cities.forEach((city) =>
      expect(city.textContent).toBe("Springfield, United States")
    );
  });

  test("clicking on a search result should call setLocation with correct lat/lng", async () => {
    const user = userEvent.setup();
    debouncedValue = "springfield";
    render(
      <SearchResults
        isLoading={isLoading}
        debouncedValue={debouncedValue}
        searchResults={mockSearchResult}
      />
    );

    const cities = Array.from(screen.getAllByRole("menuitem"));

    await user.click(cities[0]);
    expect(mockSetLocation).toHaveBeenCalledWith(39.7817, -89.6501);
  });

  test("clicking on a search result should clear the search query", async () => {
    const user = userEvent.setup();
    debouncedValue = "springfield";
    render(
      <SearchResults
        isLoading={isLoading}
        debouncedValue={debouncedValue}
        searchResults={mockSearchResult}
      />
    );
    const cities = Array.from(screen.getAllByRole("menuitem"));
    await user.click(cities[0]);
    expect(mockSetSearchQuery).toHaveBeenCalled();
  });
});
