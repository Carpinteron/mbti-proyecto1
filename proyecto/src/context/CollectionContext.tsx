import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CollectionContextValue {
  /** Codes of the saved personalities (e.g. "INTJ"). */
  collection: string[];
  isSaved: (code: string) => boolean;
  save: (code: string) => void;
  remove: (code: string) => void;
}

const CollectionContext = createContext<CollectionContextValue | null>(null);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

/** Lives above the router so the collection persists between routes (and reloads, via localStorage). */
export function CollectionProvider({ children }: { children: ReactNode }) {
  const [collection, setCollection] = useLocalStorage<string[]>('collection', [], isStringArray);

  const isSaved = useCallback((code: string) => collection.includes(code), [collection]);
  const save = useCallback(
    (code: string) => setCollection((current) => (current.includes(code) ? current : [...current, code])),
    [setCollection],
  );
  const remove = useCallback(
    (code: string) => setCollection((current) => current.filter((item) => item !== code)),
    [setCollection],
  );

  const value = useMemo(() => ({ collection, isSaved, save, remove }), [collection, isSaved, save, remove]);
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection(): CollectionContextValue {
  const context = useContext(CollectionContext);
  if (!context) throw new Error('useCollection must be used inside <CollectionProvider>.');
  return context;
}
