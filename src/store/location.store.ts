import { createStore } from "zustand";

export type LocationState = {
  latitude: number | null;
  longitude: number | null;
};

export type LocationActions = {
  setLocation: (latitude: number, longitude: number) => void;
};

export type LocationStore = LocationState & LocationActions;

export const defaultInitialState: LocationState = {
  latitude: null,
  longitude: null,
};

export const createLocationStore = (
  initState: LocationState = defaultInitialState
) => {
  return createStore<LocationStore>()((set) => ({
    ...initState,
    setLocation: (latitude: number, longitude: number) =>
      set(() => ({ latitude, longitude })),
  }));
};
