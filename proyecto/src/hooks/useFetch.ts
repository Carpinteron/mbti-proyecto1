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
    setState({ data: null, status: 'loading' });
    fetcher(controller.signal)
      .then((data) => setState({ data, status: 'success' }))
      .catch((error: Error) => {
        if (error.name !== 'AbortError') setState({ data: null, status: 'error' });
      });
    return () => controller.abort();
    // `key` identifies the request; `fetcher` is intentionally not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
