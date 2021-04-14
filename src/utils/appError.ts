export class AppError extends Error {
  private statusCode: number;
  private status: string;

  constructor(statusCode: number, status: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}
