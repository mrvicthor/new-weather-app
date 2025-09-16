import { createContext, useContext } from "react";
import { useStore } from "zustand";
import type { LocationStore } from "../store/location.store";
import type { LocationStoreApi } from "../providers/location.store.provider";

export const LocationStoreContext = createContext<LocationStoreApi | undefined>(
  undefined
);

export const useLocationStore = <T>(
  selector: (store: LocationStore) => T
): T => {
  const locationStoreContext = useContext(LocationStoreContext);
  if (!locationStoreContext) {
    throw new Error(
      `useLocationStore must be used within LocationStoreProvider`
    );
  }

  return useStore(locationStoreContext, selector);
};
