import { useCallback, useEffect, useRef } from 'react';
import { debounce } from '../utils/debounce';

export function useDebouncedCallback(fn, delay) {
  const fnRef = useRef(fn);
  const debouncedRef = useRef(null);

  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    const debounced = debounce((...args) => fnRef.current(...args), delay);
    debouncedRef.current = debounced;
    return () => debounced.cancel();
  }, [delay]);

  const call = useCallback((...args) => {
    debouncedRef.current?.(...args);
  }, []);

  const cancel = useCallback(() => debouncedRef.current?.cancel(), []);

  return { call, cancel };
}
