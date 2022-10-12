import { Body, Controller, Get, Inject, OnModuleInit, Post } from "@nestjs/common";
import { UserProto } from "grpc-types/grpc-types";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";

@Controller("user")
export class UserController implements OnModuleInit {
  private userService: UserProto.UserServiceClient;

  constructor(@Inject(UserProto.USER_PACKAGE_NAME) private client: ClientGrpc) {
  }

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(UserProto.USER_SERVICE_NAME);
  }

  @Post()
  async create(@Body() dto: UserProto.UserCreateDto): Promise<Observable<UserProto.UserCreateAck>> {
    return this.userService.create(dto);
  }

  //*-*-*-*-*-*-*-*-*-*Example Section*-*-*-*-*-*-*-*-*-*-*-

  /*
  * alanlarin required olmamasiyla ilgili gelen dto da bir alan eksik, dondururkende bir alan eksik donduruyor
  * bu bir hataya sebeb olmuyor
  * */
  @Get("required-fields")
  async exRequiredFields() {
    const dto: UserProto.ExampleFieldsDto = {
      fieldOne: "fieldOne",
      fieldTwo: undefined
    };
    console.log("exRequiredFields:dto -> ", dto);
    const result = await firstValueFrom(this.userService.exampleFields(dto));
    console.log("exRequiredFields:result -> ", result);
    return result;
  }

  /*
  * nested ve list ornegi
  * */
  @Get("nested-ex")
  async nestedAndListExample() {
    const result = await firstValueFrom(this.userService.exNested({}));
    console.log("nestedAndListExample:result -> ", result);
    return result;
  }

  /*
  * oneOf kullanim amaci
  * */
  @Get("oneof-ex")
  async oneOfExample() {
    let dto: any = {
      one: {
        title: "one value"
      },
      two: {
        content: "two value"
      }
    };

    const result1 = await firstValueFrom(this.userService.exOneOf(dto));
    console.log("oneOfExample:result1 -> ", result1);

    dto = {
      two: {
        content: "two value"
      }
    };
    const result2 = await firstValueFrom(this.userService.exOneOf(dto));
    console.log("oneOfExample:result2 -> ", result2);
    return result2;
  }

  /*
  * error handling
  * */
  @Get("error-ex")
  async errorEx() {
    try {
      await firstValueFrom(this.userService.exErrorHandling({}));
    } catch (err) {
      console.log("errorEx:err -> ", err);
      console.log("Object.keys(err) -> ", Object.keys(err));
      console.log("code -> ", err.code);
      console.log("details -> ", err.details);
      console.log("metadata -> ", err.metadata);
      console.log("error in metadata -> ", JSON.parse(err.metadata.get("customError")[0]));
    }
  }

}
