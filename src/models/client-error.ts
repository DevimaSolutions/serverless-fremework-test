export default class ClientError extends Error {
  public body: object;

  public statusCode: number;

  constructor(message: string, statusCode = 400, payload: object | null = null) {
    super();
    this.body = { message, payload };
    this.statusCode = statusCode;
  }
}
