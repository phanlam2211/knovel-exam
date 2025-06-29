export type InfinityPaginationResultType<T> = Readonly<{
  data: T[];
  hasNextPage: boolean;
}>;

export type InfinityPaginationAndCountResultType<T> = Readonly<{
  data: T[];
  hasNextPage: boolean;
  total?: number;
}>;
