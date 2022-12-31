export type IPaginationRequest<T extends {}> = T & {
  limit?: number;
  cursor?: string;
};
