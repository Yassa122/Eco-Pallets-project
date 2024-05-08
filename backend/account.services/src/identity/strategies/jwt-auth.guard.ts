import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  GetUserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
      const request = ctx.switchToHttp().getRequest();
      return request.user.id; // Ensure that your JWT strategy is setting `request.user`
    },
  );
}
