import { useState } from "react";

type StorageType = "localStorage" | "sessionStorage";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  storageType: StorageType = "sessionStorage"
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window[storageType].getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window[storageType].setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
