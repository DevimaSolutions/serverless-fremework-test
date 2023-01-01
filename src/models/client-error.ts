export default class ClientError extends Error {
  constructor(
    public message: string,
    public statusCode = 400,
    public payload: object | null = null,
  ) {
    super();
  }
}
