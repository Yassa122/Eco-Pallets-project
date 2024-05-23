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


    let token = cookieObject['auth_token']; // Update to look for 'auth_token'
    
    if (!token) {
      token = cookieObject['accessToken']; // Update to look for 'auth_token'
    }

    if (!token) {
      throw new UnauthorizedException(
        'Token verification failed:  Token not found',
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
        'Token verification failed: ' + err.message,
      );
    }
  },
);
