import { CustomException } from 'exceptions/exceptions/lib/exceptions/custom.exception';
import { ErrorCodes } from 'exceptions/exceptions/lib/error-codes';

export class NicknameAlreadyTakenException extends CustomException {
  constructor() {
    super('Nickname is already taken', 500, ErrorCodes.USERNAME_ALREADY_TAKEN);
  }
}
