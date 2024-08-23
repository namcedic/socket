import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../types/auth.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthPayload;
  },
);
