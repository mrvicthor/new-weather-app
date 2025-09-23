import { createStore } from "zustand";

export type Temperature = "Celsius" | "Fahrenheit";

export type LocationState = {
  latitude: number | null;
  longitude: number | null;
  searchQuery: string;
  isUnitsMounted: boolean;
  selectedUnit: "Metric" | "Imperial";
  selectedTemperature: Temperature;
  selectedWindSpeed: "km/h" | "mph";
  selectedPrecipitation: "millimeters" | "inches";
  isDayslistMounted: boolean;
  selectedDay: Date;
};

export type LocationActions = {
  setLocation: (latitude: number, longitude: number) => void;
  setSearchQuery: (query: string) => void;
  toggleUnitsMounted: () => void;
  setSelectedUnit: () => void;
  setSelectedTemperature: (value: Temperature) => void;
  setSelectedWindSpeed: (value: "km/h" | "mph") => void;
  setSelectedPrecipitation: (value: "millimeters" | "inches") => void;
  toggleDaysList: () => void;
  setSelectedDay: (value: Date) => void;
};

export type LocationStore = LocationState & LocationActions;

export const defaultInitialState: LocationState = {
  latitude: null,
  longitude: null,
  searchQuery: "",
  isUnitsMounted: false,
  selectedUnit: "Metric",
  selectedTemperature: "Celsius",
  selectedWindSpeed: "km/h",
  selectedPrecipitation: "millimeters",
  isDayslistMounted: false,
  selectedDay: new Date(),
};

export const createLocationStore = (
  initState: LocationState = defaultInitialState
) => {
  return createStore<LocationStore>()((set) => ({
    ...initState,
    setLocation: (latitude: number, longitude: number) =>
      set(() => ({ latitude, longitude })),
    setSearchQuery: (input: string) => set(() => ({ searchQuery: input })),
    toggleUnitsMounted: () =>
      set((state) => ({ isUnitsMounted: !state.isUnitsMounted })),
    setSelectedUnit: () =>
      set((state) => ({
        selectedUnit: state.selectedUnit === "Imperial" ? "Metric" : "Imperial",
        selectedPrecipitation:
          state.selectedPrecipitation === "millimeters"
            ? "inches"
            : "millimeters",
        selectedTemperature:
          state.selectedTemperature === "Celsius" ? "Fahrenheit" : "Celsius",
        selectedWindSpeed: state.selectedWindSpeed === "km/h" ? "mph" : "km/h",
      })),
    setSelectedTemperature: (temperature: Temperature) =>
      set(() => ({ selectedTemperature: temperature })),
    setSelectedPrecipitation: (value: "millimeters" | "inches") =>
      set(() => ({ selectedPrecipitation: value })),
    setSelectedWindSpeed: (value: "km/h" | "mph") =>
      set(() => ({ selectedWindSpeed: value })),
    toggleDaysList: () =>
      set((state) => ({ isDayslistMounted: !state.isDayslistMounted })),
    setSelectedDay: (input: Date) => set(() => ({ selectedDay: input })),
  }));
};
