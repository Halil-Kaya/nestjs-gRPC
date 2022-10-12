/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export interface Empty {
}

export interface ExOneOfDto {
  one: Dto_one | undefined;
  two: Dto_two | undefined;
}

export interface ExOneOfAck {
  one: Dto_one | undefined;
  two: Dto_two | undefined;
}

export interface Dto_one {
  title: string;
}

export interface Dto_two {
  content: string;
}

export interface ExNestedDto {
}

export interface ExNestedAck {
  nested: NestedDeep | undefined;
  todos: Todo[];
}

export interface NestedDeep {
  user: User | undefined;
  foo: string;
}

export interface Todo {
  title: string;
  content: string;
}

export interface ExampleFieldsDto {
  fieldOne: string;
  fieldTwo: string;
}

export interface ExampleFieldsAck {
  fieldOne: string;
  fieldTwo: string;
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

  findByNickname(request: FindByNicknameDto): Observable<User>;

  findById(request: FindByIdDto): Observable<User>;

  exampleFields(request: ExampleFieldsDto): Observable<ExampleFieldsAck>;

  exNested(request: ExNestedDto): Observable<ExNestedAck>;

  exOneOf(request: ExOneOfDto): Observable<Empty>;

  exErrorHandling(request: Empty): Observable<Empty>;
}

export interface UserServiceController {
  create(request: UserCreateDto): Promise<UserCreateAck> | Observable<UserCreateAck> | UserCreateAck;

  findByNickname(request: FindByNicknameDto): Promise<User> | Observable<User> | User;

  findById(request: FindByIdDto): Promise<User> | Observable<User> | User;

  exampleFields(request: ExampleFieldsDto): Promise<ExampleFieldsAck> | Observable<ExampleFieldsAck> | ExampleFieldsAck;

  exNested(request: ExNestedDto): Promise<ExNestedAck> | Observable<ExNestedAck> | ExNestedAck;

  exOneOf(request: ExOneOfDto): Promise<Empty> | Observable<Empty> | Empty;

  exErrorHandling(request: Empty): Promise<Empty> | Observable<Empty> | Empty;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findByNickname",
      "findById",
      "exampleFields",
      "exNested",
      "exOneOf",
      "exErrorHandling",
    ];
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
