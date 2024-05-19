import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.headers.cookie;

    if (!cookies) {
      throw new UnauthorizedException('Cookies are missing');
    }


    const cookieObject = Object.fromEntries(
      cookies.split('; ').map((c) => c.split('=')),
    );
    const token = cookieObject['accessToken'];

    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const decodedToken = jwt.decode(token);
      if (typeof decodedToken === 'object' && decodedToken && decodedToken.id) {
        return decodedToken.id;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (err) {
      throw new UnauthorizedException(
        'Token verification failed: ' + err.message,
      );
    }
  },
);
