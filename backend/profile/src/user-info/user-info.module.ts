import { Module } from '@nestjs/common';
// import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { AppModule } from '../app.module';
// import { UserSchema } from 'src/schemas/user.schema';

@Module({
    controllers: [UserInfoController],
    providers: [UserInfoService],
    exports: [UserInfoService]  // Export UserInfoService if it needs to be used elsewhere
  })
  export class UserInfoModule {}
  
