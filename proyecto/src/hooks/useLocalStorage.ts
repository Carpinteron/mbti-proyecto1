import { useCallback, useState } from 'react';

function read<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    const parsed: unknown = JSON.parse(stored);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/** useState that persists to localStorage. Safe when storage is blocked or corrupted. */
export function useLocalStorage<T>(key: string, fallback: T, isValid: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => read(key, fallback, isValid));

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = typeof next === 'function' ? (next as (current: T) => T)(current) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* storage unavailable: keep the in-memory value */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
