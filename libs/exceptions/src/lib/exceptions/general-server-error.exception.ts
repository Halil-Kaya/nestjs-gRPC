import { CustomException } from 'exceptions/exceptions/lib/exceptions/custom.exception';
import { ErrorCodes } from 'exceptions/exceptions/lib/error-codes';

export class GeneralServerErrorException extends CustomException {
  constructor() {
    super('General server error', 500, ErrorCodes.GENERAL_SERVER_ERROR);
  }
}
