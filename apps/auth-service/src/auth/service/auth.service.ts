import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { AuthProto, UserProto } from "grpc-types/grpc-types";
import { ClientGrpc } from "@nestjs/microservices";
import { InvalidCredentialsException } from "exceptions/exceptions";
import { JwtService } from "@nestjs/jwt";
import { firstValueFrom } from "rxjs";
import * as bcrypt from "bcrypt";

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
    const { nickname, password } = dto;
    const user = await firstValueFrom(this.userService.findByNickname({ nickname }));
    if (!user || Object.keys(user).length === 0) {
      throw new InvalidCredentialsException();
    }
    const isPasswordMatch: boolean = await AuthService.checkPasswordMatch(password, user.password);
    if (!isPasswordMatch) {
      throw new InvalidCredentialsException();
    }
    return {
      token: this.jwtService.sign({
        _id: user._id
      })
    };
  }

  private static checkPasswordMatch(password, realPassword): Promise<boolean> {
    return bcrypt.compare(password, realPassword);
  }

}