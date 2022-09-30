import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  Logger
} from "@nestjs/common";
import { GeneralServerErrorException } from "exceptions/exceptions";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception.metadata) {
      exception = JSON.parse(exception.metadata.get("customError")[0]);
    }
    if (!exception.isCustomError) {
      exception = new GeneralServerErrorException();
    }
    this.logger.error(
      `[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`
    );
    response.status(500).json({
      meta: {
        headers: request.headers,
        params: request.params,
        status: request.status,
        errorCode: exception.errorCode,
        errorMessage: exception.message,
        timestamp: new Date()
      },
      result: exception
    });
  }
}
