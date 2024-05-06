import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey_YoucANWritewhateveryoulike',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username }; // Ensure the payload.sub corresponds to user ID
  }
}
