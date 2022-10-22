import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  Logger
} from "@nestjs/common";
import { GeneralServerErrorException } from "exceptions/exceptions";
import { GrpcMetadataErrorKey } from "grpc-types/grpc-types";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception.metadata) {
      try {
        exception = JSON.parse(exception.metadata.get(GrpcMetadataErrorKey)[0]);
      } catch (e) {
        exception = new GeneralServerErrorException();
      }
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