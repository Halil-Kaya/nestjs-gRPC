import { Body, Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { UserProto } from "grpc-types/grpc-types";
import { ClientGrpc } from "@nestjs/microservices";

@Controller("user")
export class UserController implements OnModuleInit {
  private userService: UserProto.UserServiceClient;

  constructor(@Inject(UserProto.USER_PACKAGE_NAME) private client: ClientGrpc) {
  }

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(UserProto.USER_SERVICE_NAME);
  }

  @Post()
  async create(@Body() dto: UserProto.UserCreateDto): Promise<UserProto.UserCreateAck> {
    const result = await this.userService.create(dto).toPromise();
    console.log({ result });
    return result;
  }
}
