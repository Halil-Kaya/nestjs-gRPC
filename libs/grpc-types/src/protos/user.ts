/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'user';

/** <-- FindById */
export interface FindByIdDto {
  _id: string;
}

export interface FindByIdAck {
  user: User | undefined;
}

/** <-- GetUserForLogin */
export interface GetUserForLoginDto {
  nickname: string;
}

export interface GetUserForLoginAck {
  user: User | undefined;
}

/** <-- create */
export interface CreateDto {
  fullName: string;
  nickname: string;
  password: string;
}

export interface CreateAck {
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

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  create(request: CreateDto): Observable<CreateAck>;

  getUserForLogin(request: GetUserForLoginDto): Observable<GetUserForLoginAck>;

  findById(request: FindByIdDto): Observable<FindByIdAck>;
}

export interface UserServiceController {
  create(
    request: CreateDto,
  ): Promise<CreateAck> | Observable<CreateAck> | CreateAck;

  getUserForLogin(
    request: GetUserForLoginDto,
  ):
    | Promise<GetUserForLoginAck>
    | Observable<GetUserForLoginAck>
    | GetUserForLoginAck;

  findById(
    request: FindByIdDto,
  ): Promise<FindByIdAck> | Observable<FindByIdAck> | FindByIdAck;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'getUserForLogin', 'findById'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
