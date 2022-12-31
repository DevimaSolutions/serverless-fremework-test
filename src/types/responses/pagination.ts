export type IPaginationResponse<T extends {}> = {
  items: T;
  cursor: string;
};
