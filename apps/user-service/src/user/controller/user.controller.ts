import { Controller, UseFilters } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserProto } from "grpc-types/grpc-types";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { UserRole } from "grpc-types/grpc-types/protos/user";
import { Observable } from "rxjs";
import { NicknameAlreadyTakenException } from "exceptions/exceptions";

@UseFilters(GrpcAllExceptionsFilter)
@Controller("user")
@UserProto.UserServiceControllerMethods()
export class UserController implements UserProto.UserServiceController {
  constructor(private readonly userService: UserService) {

  }

  async create(data: UserProto.UserCreateDto): Promise<UserProto.UserCreateAck> {
    return this.userService.create(data);
  }

  async findByNickname(data: UserProto.FindByNicknameDto): Promise<UserProto.User> {
    const result = await this.userService.findByNickname(data.nickname);
    console.log({ result });
    return result;
  }

  async findById(data: UserProto.FindByIdDto): Promise<UserProto.User> {
    return this.userService.findById(data._id);
  }


  //*-*-*-*-*-*-*-*-*-*Example Section*-*-*-*-*-*-*-*-*-*-*-

  async exampleFields(request: UserProto.ExampleFieldsDto): Promise<UserProto.ExampleFieldsAck> {
    console.log("exampleFields:request -> ", request);
    return request;
  }

  exNested(request: UserProto.ExNestedDto): UserProto.ExNestedAck {
    const response: UserProto.ExNestedAck = {
      nested: {
        user: {
          _id: "_id",
          nickname: "nickname",
          role: UserRole.NORMAL,
          createdAt: undefined,
          fullName: "name",
          password: undefined
        },
        foo: "foo"
      },
      todos: [
        { title: "title-1", content: "content-1" },
        { title: "title-2", content: "content-2" },
        { title: "title-3", content: "content-3" }
      ]
    };
    return response;
  }

  exOneOf(request: UserProto.ExOneOfDto): UserProto.Empty {
    console.log("exOneOf:request-> ", request);
    return {};
  }

  exErrorHandling(request: UserProto.Empty): UserProto.Empty {
    throw new NicknameAlreadyTakenException();
  }

}