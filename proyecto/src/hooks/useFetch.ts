import { useEffect, useState } from 'react';

export type FetchStatus = 'loading' | 'success' | 'error';

interface FetchState<T> {
  data: T | null;
  status: FetchStatus;
}

/**
 * Runs `fetcher` whenever `key` changes and exposes loading / success / error.
 * The request is aborted on unmount or when the key changes.
 */
export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>, key: string = '') {
  const [state, setState] = useState<FetchState<T>>({ data: null, status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState({ data: null, status: 'loading' });
      try {
        const data = await fetcher(controller.signal);
        setState({ data, status: 'success' });
      } catch (error) {
        // An aborted request means the component left or the key changed: not an error for the UI.
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({ data: null, status: 'error' });
      }
    }

    void load();
    return () => controller.abort();
    // `key` identifies the request; `fetcher` is a new function on every render, so it is left out on purpose.
  }, [key]);

  return state;
}
