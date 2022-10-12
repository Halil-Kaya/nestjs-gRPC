import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { AuthProto, UserProto } from "grpc-types/grpc-types";
import { ClientGrpc } from "@nestjs/microservices";
import { InvalidCredentialsException } from "exceptions/exceptions";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserProto.UserServiceClient;

  constructor(@Inject(UserProto.USER_PACKAGE_NAME) private client: ClientGrpc,
              private readonly jwtService: JwtService) {
  }

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(UserProto.USER_SERVICE_NAME);
  }

  async login(dto: AuthProto.LoginDto): Promise<AuthProto.LoginAck> {
    console.log("user service ine istek atmadan once");
    const user = await this.userService.findByNickname({ nickname: dto.nickname }).toPromise();
    console.log("user service ine istek attiktan sonra");
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return {
      token: this.jwtService.sign({
        _id: user._id
      })
    };
  }

}