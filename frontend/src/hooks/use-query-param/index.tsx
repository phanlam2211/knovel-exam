import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryOptions<T> = {
  defaultValue?: T | (() => T);
  resetPageQuery?: boolean;
  method?: 'replace' | 'push';
};

type ParamProcessor<T> = {
  encode: (value: T) => string;
  decode: (value: string | null) => T | undefined;
};

export function useQueryParam<T>(
  name: string,
  processor: ParamProcessor<T>,
  options?: QueryOptions<T>,
): [T, (value: T) => void, React.Dispatch<React.SetStateAction<T>>] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<T>(() => (options?.defaultValue instanceof Function ? options.defaultValue() : (options?.defaultValue as T)));

  const setQuery = useCallback(
    (param: T) => {
      const encodedValue = processor.encode(param);
      const currentValue = searchParams.get(name) || '';

      if (encodedValue === currentValue) {
        return;
      }

      const updatedParams = new URLSearchParams(searchParams);
      if (encodedValue) {
        updatedParams.set(name, encodedValue);
      } else {
        updatedParams.delete(name);
      }

      if (options?.resetPageQuery) {
        updatedParams.delete('page');
      }

      if (options?.method === 'replace') {
        setSearchParams(updatedParams, { replace: true });
      } else {
        setSearchParams(updatedParams);
      }
    },
    [name, processor, searchParams, options, setSearchParams],
  );

  useEffect(() => {
    const paramValue = searchParams.get(name);
    setValue((prevValue: any) => {
      const newValue = processor.decode(paramValue);
      if (newValue === undefined && options?.defaultValue) {
        return options.defaultValue instanceof Function ? options.defaultValue() : (options.defaultValue as T);
      }

      return newValue !== undefined ? newValue : prevValue;
    });
  }, [name, processor, searchParams, options?.defaultValue]);

  return [value, setQuery, setValue];
}
