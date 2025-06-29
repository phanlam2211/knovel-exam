import { IPaginationOptions } from './types/pagination-options';
import {
  InfinityPaginationAndCountResultType,
  InfinityPaginationResultType,
} from './types/infinity-pagination-result.type';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};

export const infinityAndCountPagination = <T>(
  data: [T[], number],
  options: IPaginationOptions,
): InfinityPaginationAndCountResultType<T> => {
  return {
    data: data[0],
    hasNextPage: data[0].length === options.limit,
    total: data[1],
  };
};
