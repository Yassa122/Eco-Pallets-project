import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { IdentityService } from './identity/identity.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    IdentityModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, IdentityService, JwtService],
})
export class AppModule {}
