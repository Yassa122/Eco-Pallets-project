import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new Error('Authorization header is missing');
  }

  const token = authorizationHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"
  const decodedToken = jwt.decode(token);

  if (typeof decodedToken === 'object' && decodedToken) {
    return decodedToken.id;
  } else {
    throw new Error('Invalid token');
  }
});
