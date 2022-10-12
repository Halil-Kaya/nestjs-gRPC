/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "todo";

export interface ExRequiredFieldDto {
  field1: string;
  field2: string;
}

export const TODO_PACKAGE_NAME = "todo";

export interface TodoServiceClient {
  exRequiredFields(request: ExRequiredFieldDto): Observable<ExRequiredFieldDto>;
}

export interface TodoServiceController {
  exRequiredFields(
    request: ExRequiredFieldDto,
  ): Promise<ExRequiredFieldDto> | Observable<ExRequiredFieldDto> | ExRequiredFieldDto;
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["exRequiredFields"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodoService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodoService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODO_SERVICE_NAME = "TodoService";
