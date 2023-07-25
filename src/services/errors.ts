export class HttpError extends Error {
  constructor(public status: number, public statusText: string) {
    super(`Error ${status}: ${statusText}`);
    this.name = "HttpError";
  }
}
