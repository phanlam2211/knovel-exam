import { useIsomorphicLayoutEffect } from '@react-hookz/web';
import { create } from 'zustand';

export function AutoResetZustandStore({ stores }: { stores: ReturnType<typeof create>[] }) {
  useIsomorphicLayoutEffect(() => {
    const initialStates = stores.map((store) => store.getState());

    return () => {
      stores.forEach((store, index) => {
        store.setState(initialStates[index]);
      });
    };
  }, stores);

  return null;
}
