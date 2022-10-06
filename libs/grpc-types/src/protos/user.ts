/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export interface User {
  _id: string;
  fullName: string;
  nickname: string;
  password?: string | undefined;
  role: UserRole;
  createdAt: Date | undefined;
}

export interface FindByIdDto {
  _id: string;
}

export interface FindByNicknameDto {
  nickname: string;
}

export interface UserCreateDto {
  fullName: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export interface UserCreateAck {
  _id: string;
  fullName: string;
  nickname: string;
  role: UserRole;
  createdAt: Date | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: UserCreateDto): Observable<UserCreateAck>;

  findByNickname(request: FindByNicknameDto): Observable<User>;

  findById(request: FindByIdDto): Observable<User>;
}

export interface UserServiceController {
  create(request: UserCreateDto): Promise<UserCreateAck> | Observable<UserCreateAck> | UserCreateAck;

  findByNickname(request: FindByNicknameDto): Promise<User> | Observable<User> | User;

  findById(request: FindByIdDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findByNickname", "findById"];
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
