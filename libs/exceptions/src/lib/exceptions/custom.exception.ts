export class CustomException {
  message: string;
  httpStatusCode: number;
  errorCode: number;
  isCustomError = true;

  constructor(message: string, httpStatusCode: number, errorCode: number) {
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.errorCode = errorCode;
  }
}
