/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export interface UserCreateDto {
  fullName: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export interface UserCreateAck {
  Id: string;
  fullName: string;
  nickname: string;
  role: UserRole;
  createdAt: Date | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: UserCreateDto): Observable<UserCreateAck>;
}

export interface UserServiceController {
  create(request: UserCreateDto): Promise<UserCreateAck> | Observable<UserCreateAck> | UserCreateAck;
}

export function UserServiceControllerMethods() {
  return function(constructor: Function) {
    const grpcMethods: string[] = ["create"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
