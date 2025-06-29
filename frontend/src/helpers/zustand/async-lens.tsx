/* eslint-disable @typescript-eslint/no-explicit-any */
import {Lens, lens} from '@dhmk/zustand-lens';
import {AxiosError} from 'axios';

type AsyncFn = (...args: any[]) => Promise<any>;

type State<T = any> = {
  loading: boolean;
  loaded: boolean;
  error?: Error | AxiosError;
  data: T;
  execute: AsyncFn;
  reset: () => void;
};

type Set<T> = Parameters<Lens<State<T>>>[0];

export function asyncLens<T extends AsyncFn>(fn: T, initialData: Awaited<ReturnType<T>>) {
  return lens<State<Awaited<ReturnType<T>>>>((set) => ({
    loading: false,
    error: undefined,
    loaded: false,
    data: initialData,
    execute: execute(set, fn),
    reset: reset(set, initialData),
  }));
}

function reset<Response>(set: Set<Response>, initialData: Response) {
  return () => {
    set({
      loading: false,
      loaded: false,
      error: undefined,
      data: initialData,
    });
  };
}

function execute<T extends AsyncFn>(set: Set<any>, fn: T) {
  return ((...args: Parameters<T>) => {
    set({ loading: true });

    // Để lỗi được throw ra ngoài
    return fn(...args)
      .then((data) => {
        onResolve(set)(data); // Set data vào state nếu thành công
        return data; // Trả về dữ liệu nếu cần xử lý tiếp
      })
      .catch((error) => {
        onReject(set)(error); // Set lỗi vào state nhưng không bắt lại
        throw error; // Throw lỗi ra ngoài để có thể catch ở bên ngoài
      });
  }) as unknown as T;
}

function onResolve(set: Set<any>) {
  return (data: any) =>
    set({
      loading: false,
      error: undefined,
      loaded: true,
      data,
    });
}

function onReject(set: Set<any>) {
  return (error: any) => {
    set({ loading: false, loaded: true, error });
  };
}

export const _internal = {
  onReject,
};
