import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserProto } from 'grpc-types/grpc-types';
import { GrpcAllExceptionsFilter } from 'filters/filters';
import { GrpcLogInterceptor } from 'interceptors/interceptors';
import { Observable } from 'rxjs';

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller('user')
@UserProto.UserServiceControllerMethods()
export class UserController implements UserProto.UserServiceController {
  constructor() {}
  getUserForLogin(
    request: UserProto.GetUserForLoginDto,
  ):
    | UserProto.GetUserForLoginAck
    | Promise<UserProto.GetUserForLoginAck>
    | Observable<UserProto.GetUserForLoginAck> {
    throw new Error('Method not implemented.');
  }
  findById(
    request: UserProto.FindByIdDto,
  ):
    | UserProto.FindByIdAck
    | Promise<UserProto.FindByIdAck>
    | Observable<UserProto.FindByIdAck> {
    throw new Error('Method not implemented.');
  }

  async create(data: UserProto.CreateDto): Promise<UserProto.CreateAck> {
    return {
      _id: global.NODE_ID,
      createdAt: 1,
      ...data,
    };
  }
}
