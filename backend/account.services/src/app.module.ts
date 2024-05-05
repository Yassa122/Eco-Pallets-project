import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { IdentityService } from './identity/identity.service';
import { JwtService } from '@nestjs/jwt';
import { KafkaModule } from './kafka/kafka.module';
import { UpdateUserProfileDto } from './identity/dto/updateUserProfile.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaService } from './kafka/kafka.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    IdentityModule,
    UsersModule,
    KafkaModule,

  ],
  controllers: [AppController],
  providers: [AppService, IdentityService, JwtService,KafkaService],
})
export class AppModule {}
