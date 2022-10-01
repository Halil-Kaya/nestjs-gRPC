import { Controller, UseFilters } from "@nestjs/common";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { AuthProto } from "grpc-types/grpc-types";
import { AuthService } from "../service/auth.service";

@UseFilters(GrpcAllExceptionsFilter)
@Controller()
@AuthProto.AuthServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  login(dto: AuthProto.LoginDto): AuthProto.LoginAck {
    return this.authService.login(dto);
  }
}