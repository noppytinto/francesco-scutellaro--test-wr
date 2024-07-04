export const STORAGE_KEYS = {
  TRAVELS_DATA: "__travels_data__",
  BOOKINGS_DATA: "__bookings_data__",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function saveToLocalStorage(key: StorageKey, value: any) {
  if (import.meta.client) {
    if (localStorage) {
      console.log("ffffffffffffffffffffffffffff Saved to local storage");
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export function getFromLocalStorage<T>(key: StorageKey): T | null {
  if (import.meta.client) {
    if (localStorage) {
      console.log("ffffffffffffffffffffffffffff Got from local storage");
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    }
  }

  return null;
}