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

  async login(dto: AuthProto.LoginDto): Promise<AuthProto.LoginAck> {
    return this.authService.login(dto);
  }

}