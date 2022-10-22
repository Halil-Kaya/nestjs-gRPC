/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export interface FindByNicknameAck {
  user: User | undefined;
}

export interface FindByIdAck {
  user: User | undefined;
}

export interface User {
  _id: string;
  fullName: string;
  nickname: string;
  password?: string | undefined;
  role: UserRole;
  createdAt: number;
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
  createdAt: number;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: UserCreateDto): Observable<UserCreateAck>;

  findByNickname(request: FindByNicknameDto): Observable<FindByNicknameAck>;

  findById(request: FindByIdDto): Observable<FindByIdAck>;
}

export interface UserServiceController {
  create(request: UserCreateDto): Promise<UserCreateAck> | Observable<UserCreateAck> | UserCreateAck;

  findByNickname(
    request: FindByNicknameDto,
  ): Promise<FindByNicknameAck> | Observable<FindByNicknameAck> | FindByNicknameAck;

  findById(request: FindByIdDto): Promise<FindByIdAck> | Observable<FindByIdAck> | FindByIdAck;
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
