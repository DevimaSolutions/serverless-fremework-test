export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface UpdatePayload {
  UpdateExpression: string;
  ExpressionAttributeValues: { [key: string]: string };
}

export interface FilterPayload {
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: string };
  FilterExpression: string;
}

export interface Cursor {
  [key: string]: unknown;
}
