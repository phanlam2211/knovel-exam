import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

declare type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export function createZustandContext<T extends object>(initialProps: T) {
  const defaultStore = createStore(() => initialProps);
  const Context = createContext(defaultStore);

  function Provider({ children, ...props }: React.PropsWithChildren<T>) {
    const store = useMemo(() => createStore(() => initialProps), []);

    useIsomorphicLayoutEffect(() => {
      store.setState(props as T);
    });

    return <Context.Provider value={store}>{children}</Context.Provider>;
  }

  function useSelector<U>(selector: (state: ExtractState<StoreApi<T>>) => U, equalityFn?: (a: U, b: U) => boolean) {
    return useStore(useContext(Context), selector, equalityFn);
  }

  return {
    Provider,
    useSelector,
  };
}
