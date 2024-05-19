import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { UserSchema } from 'src/schemas/user.schema';
import { KafkaService } from 'src/kafka/kafka.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    KafkaModule, // Import KafkaModule here
  ],
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    KafkaService,
    {
      provide: 'USER_MODEL',
      useFactory: (model) => model,
      inject: [getModelToken('User')], // Correctly reference the model token
    },
  ],
  exports: [UserInfoService], // Export UserInfoService if it needs to be used elsewhere
})
export class UserInfoModule {}
