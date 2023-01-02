export type IRepositoryPaginated<T extends {}> = {
  items: T;
  cursor: { [key: string]: unknown };
};
