export const storage = {
  /**
   * Get a value from LocalStorage
   * @param key - The key to retrieve
   * @param defaultValue - Optional value to return if key doesn't exist
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === "undefined") return defaultValue ?? null;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : (defaultValue ?? null);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue ?? null;
    }
  },

  /**
   * Set a value in LocalStorage
   * @param key - The key to set
   * @param value - The value to store
   */
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;

    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  },

  /**
   * Remove a value from LocalStorage
   * @param key - The key to remove
   */
  remove: (key: string): void => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key “${key}”:`, error);
    }
  },

  /**
   * Clear all LocalStorage
   */
  clear: (): void => {
    if (typeof window === "undefined") return;
    window.localStorage.clear();
  },
};
