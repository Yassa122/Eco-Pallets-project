import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          let data = request?.headers?.cookie;
          if (!data) {
            return null;
          }
          const token = data
            .split(';')
            .find((c) => c.trim().startsWith('accessToken='));
          if (!token) return null;
          return token.split('=')[1];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secretKey_YoucANWritewhateveryoulikey', // Ensure your secret key is secure
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
