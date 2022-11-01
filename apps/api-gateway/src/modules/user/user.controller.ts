import { Body, Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { UserProto } from 'grpc-types/grpc-types';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController implements OnModuleInit {
  private userService: UserProto.UserServiceClient;

  constructor(
    @Inject(UserProto.USER_PACKAGE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(
      UserProto.USER_SERVICE_NAME,
    );
  }

  @Get()
  async create(): Promise<UserProto.CreateAck> {
    const rnd = (Math.random() * 10).toFixed(0);
    return firstValueFrom(
      this.userService.create({
        fullName: 'test-user#' + rnd,
        nickname: 'test-user#' + rnd,
        password: 'test-user#' + rnd,
      }),
    );
  }
}
