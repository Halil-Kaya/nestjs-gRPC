import { Controller, UseFilters } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserProto } from "grpc-types/grpc-types";
import { GrpcAllExceptionsFilter } from "filters/filters";

@UseFilters(GrpcAllExceptionsFilter)
@Controller("user")
@UserProto.UserServiceControllerMethods()
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  async create(data: UserProto.UserCreateDto): Promise<UserProto.UserCreateAck> {
    return this.userService.create(data);
  }
}