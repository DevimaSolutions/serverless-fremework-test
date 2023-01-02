export interface IUpdatePayload {
  UpdateExpression: string;
  ExpressionAttributeValues: { [key: string]: string };
}
export interface ICursor {
  [key: string]: unknown;
}
