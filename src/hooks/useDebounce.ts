import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 1000): string => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
};
