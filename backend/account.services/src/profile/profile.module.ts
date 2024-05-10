// profile.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserSchema } from 'src/identity/schemas/user.schema';
import { KafkaService } from 'src/kafka/kafka.service';
import { IdentityService } from 'src/identity/identity.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, KafkaService, IdentityService,JwtService],
})
export class ProfileModule {}
