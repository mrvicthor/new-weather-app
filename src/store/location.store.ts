import { createStore } from "zustand";
import type { SearchResult } from "../types";

export type LocationState = {
  latitude: number | null;
  longitude: number | null;
  searchQuery: string;
  searchResults: SearchResult[] | null;
};

export type LocationActions = {
  setLocation: (latitude: number, longitude: number) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[] | null) => void;
};

export type LocationStore = LocationState & LocationActions;

export const defaultInitialState: LocationState = {
  latitude: null,
  longitude: null,
  searchQuery: "",
  searchResults: null,
};

export const createLocationStore = (
  initState: LocationState = defaultInitialState
) => {
  return createStore<LocationStore>()((set) => ({
    ...initState,
    setLocation: (latitude: number, longitude: number) =>
      set(() => ({ latitude, longitude })),
    setSearchQuery: (input: string) => set(() => ({ searchQuery: input })),
    setSearchResults: (results: SearchResult[] | null) =>
      set(() => ({ searchResults: results })),
  }));
};
