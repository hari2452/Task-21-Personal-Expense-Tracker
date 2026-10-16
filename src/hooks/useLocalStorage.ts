import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    setStoredValue((previousValue) => {
      const newValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(previousValue)
          : value;

      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      return newValue;
    });
  };

  return [storedValue, setValue];
}

export default useLocalStorage;