import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../../../user-service/src/user/model/user';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
