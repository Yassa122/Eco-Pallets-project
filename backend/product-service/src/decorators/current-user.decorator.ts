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
    const authHeader = request.headers.authorization;

    let token: string | undefined;

    // Check for token in cookies
    if (cookies) {
      const cookieObject = Object.fromEntries(
        cookies.split('; ').map((c) => c.split('='))
      );
      token = cookieObject['auth_token'] || cookieObject['accessToken'];
    }

    // Check for token in Authorization header if not found in cookies
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedException(
        'Token verification failed: Token not found'
      );
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
        'Token verification failed: ' + err.message
      );
    }
  }
);
