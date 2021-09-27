import { useEffect, useState } from 'react';

export default function useDebounce<T>(
  value: T,
  timeout: number
): T | undefined {
  const [debounceTarget, setDebounceTarget] = useState<T | undefined>(value);

  useEffect(() => {
    const timeObj = setTimeout(() => setDebounceTarget(value), timeout);

    return () => {
      setDebounceTarget(undefined);
      clearTimeout(timeObj);
    };
  }, [value, timeout]);

  return debounceTarget;
}
