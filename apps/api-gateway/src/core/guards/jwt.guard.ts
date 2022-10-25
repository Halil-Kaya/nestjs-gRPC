import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { StrategyType } from "../strategies/strategy-types.enum";

@Injectable()
export class JWTGuard
  extends AuthGuard(StrategyType.JWT)
  implements CanActivate {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtActivation = await super.canActivate(context);
    return !!jwtActivation;
  }
}