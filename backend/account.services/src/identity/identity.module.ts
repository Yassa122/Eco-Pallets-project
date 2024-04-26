import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { databaseProviders } from './database/database.providers';
import { identityProviders } from './database/identity.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ExistsStrategy } from './strategies/exists.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret:'secretKey_YoucANWritewhateveryoulike',
      signOptions:{expiresIn:'10000s'},
    })
  ],
  controllers: [IdentityController],
  providers: [IdentityService,...identityProviders ,...databaseProviders, LocalStrategy,JwtStrategy,ExistsStrategy],
  exports: [...databaseProviders],
})
export class IdentityModule {}
