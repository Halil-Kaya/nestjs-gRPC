import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserProto } from "grpc-types/grpc-types";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { GrpcLogInterceptor } from "interceptors/interceptors";

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller("user")
@UserProto.UserServiceControllerMethods()
export class UserController implements UserProto.UserServiceController {
  constructor(private readonly userService: UserService) {
  }

  async create(data: UserProto.UserCreateDto): Promise<UserProto.UserCreateAck> {
    return this.userService.create(data);
  }

  async findByNickname(data: UserProto.FindByNicknameDto): Promise<UserProto.FindByNicknameAck> {
    return this.userService.findByNickname(data.nickname);
  }

  async findById(data: UserProto.FindByIdDto): Promise<UserProto.FindByIdAck> {
    return this.userService.findById(data._id);
  }
}