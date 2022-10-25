import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SanitizedUser } from "interfaces/interfaces";
import { UserProto } from "grpc-types/grpc-types";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { InvalidCredentialsException } from "exceptions/exceptions";
import { StrategyType } from "./strategy-types.enum";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, StrategyType.JWT) implements OnModuleInit {
  private userService: UserProto.UserServiceClient;

  constructor(@Inject(UserProto.USER_PACKAGE_NAME) private client: ClientGrpc) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "<_._._>"
    });
  }

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(UserProto.USER_SERVICE_NAME);
  }


  async validate(payload: SanitizedUser, done: Function) {
    try {
      const { user } = await firstValueFrom(this.userService.findById(payload));
      return done(null, user);
    } catch (err) {
      return done(new InvalidCredentialsException(), null);
    }
  }
}
