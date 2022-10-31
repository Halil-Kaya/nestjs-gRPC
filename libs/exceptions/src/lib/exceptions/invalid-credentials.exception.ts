import { CustomException } from 'exceptions/exceptions/lib/exceptions/custom.exception';
import { ErrorCodes } from 'exceptions/exceptions/lib/error-codes';

export class InvalidCredentialsException extends CustomException {
  constructor() {
    super('Invalid Credentials', 500, ErrorCodes.INVALID_CREDENTIALS);
  }
}
