/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

/** <-- GetUserForLogin */
export interface GetUserForLoginDto {
  nickname: string;
}

export interface GetUserForLoginAck {
  user: User | undefined;
}

/** <-- create */
export interface UserCreateDto {
  fullName: string;
  nickname: string;
  password: string;
}

export interface UserCreateAck {
  _id: string;
  fullName: string;
  nickname: string;
  createdAt: number;
}

/** <-- common section */
export interface User {
  _id: string;
  fullName: string;
  nickname: string;
  password?: string | undefined;
  createdAt: number;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: UserCreateDto): Observable<UserCreateAck>;

  getUserForLogin(request: GetUserForLoginDto): Observable<GetUserForLoginAck>;
}

export interface UserServiceController {
  create(request: UserCreateDto): Promise<UserCreateAck> | Observable<UserCreateAck> | UserCreateAck;

  getUserForLogin(
    request: GetUserForLoginDto,
  ): Promise<GetUserForLoginAck> | Observable<GetUserForLoginAck> | GetUserForLoginAck;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "getUserForLogin"];
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
