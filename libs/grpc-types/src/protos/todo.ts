/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "todo";

/** <-- Create */
export interface CreateDto {
  userId: string;
  title: string;
  content: string;
}

export interface CreateAck {
  todo: Todo | undefined;
}

/** <-- common section */
export interface Todo {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: number;
}

export const TODO_PACKAGE_NAME = "todo";

export interface TodoServiceClient {
  create(request: CreateDto): Observable<CreateAck>;
}

export interface TodoServiceController {
  create(request: CreateDto): Promise<CreateAck> | Observable<CreateAck> | CreateAck;
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create"];
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
