import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { AuthProto } from "grpc-types/grpc-types";
import { AuthService } from "../service/auth.service";
import { GrpcLogInterceptor } from "interceptors/interceptors";

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller("auth")
@AuthProto.AuthServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  async login(dto: AuthProto.LoginDto): Promise<AuthProto.LoginAck> {
    return this.authService.login(dto);
  }

}