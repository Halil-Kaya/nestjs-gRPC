import {
  ArgumentsHost,
  Catch,
  Logger
} from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { throwError } from "rxjs";
import { Metadata } from "@grpc/grpc-js";
import { GeneralServerErrorException } from "exceptions/exceptions";

@Catch()
export class GrpcAllExceptionsFilter extends BaseRpcExceptionFilter {
  private logger = new Logger(GrpcAllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (!exception.isCustomError) {
      exception = new GeneralServerErrorException();
    }
    this.logger.error(`[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`);
    const errorMetadata = new Metadata();
    errorMetadata.add("customError", JSON.stringify(exception));
    exception.metadata = errorMetadata;
    return throwError(() => exception);
  }
}