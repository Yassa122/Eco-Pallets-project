// user.info.module.ts

import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/identity/schemas/user.schema';
import { IdentityModule } from 'src/identity/identity.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController]
})
export class UserInfoModule {}
