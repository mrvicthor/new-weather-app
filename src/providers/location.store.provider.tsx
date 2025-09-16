import { type ReactNode, useRef } from "react";

import { createLocationStore } from "../store/location.store";
import { LocationStoreContext } from "../hooks/useLocationStore";

export type LocationStoreApi = ReturnType<typeof createLocationStore>;

export interface LocationStoreProviderProps {
  children: ReactNode;
}

export const LocationStoreProvider = ({
  children,
}: LocationStoreProviderProps) => {
  const storeRef = useRef<LocationStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createLocationStore();
  }

  return (
    <LocationStoreContext.Provider value={storeRef.current}>
      {children}
    </LocationStoreContext.Provider>
  );
};
