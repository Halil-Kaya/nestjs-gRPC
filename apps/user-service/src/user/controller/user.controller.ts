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
    console.log("gelenData -> ", data);
    const result = await this.userService.create(data);
    console.log({ result });
    return null;
  }
}