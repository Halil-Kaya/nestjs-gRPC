import { Body, Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { AuthProto } from "grpc-types/grpc-types";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller("auth")
export class AuthController implements OnModuleInit {
  private authService: AuthProto.AuthServiceClient;


  constructor(@Inject(AuthProto.AUTH_PACKAGE_NAME) private client: ClientGrpc) {
  }

  onModuleInit() {
    this.authService = this.client.getService<AuthProto.AuthServiceClient>(AuthProto.AUTH_SERVICE_NAME);
  }

  @Post("login")
  async login(@Body() dto: AuthProto.LoginDto): Promise<Observable<AuthProto.LoginAck>> {
    console.log("istek geldi?");
    return this.authService.login(dto);
  }

}