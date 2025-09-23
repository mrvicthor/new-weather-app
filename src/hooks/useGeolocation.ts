import { useEffect } from "react";

// Custom hook for geolocation
export function useGeolocation(
  setLocation: (lat: number, lng: number) => void
) {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(latitude, longitude);
      });
    }
  }, [setLocation]);
}
