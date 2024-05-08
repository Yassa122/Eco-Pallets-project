import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { IdentityService } from './identity/identity.service';
import { JwtService } from '@nestjs/jwt';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka/kafka.module';
import { UserInfoModule } from './user-info/user-info/user-info.module';
import { OrderHistoryModule } from './user-info/order-history/order-history/order-history.module';
import { ReviewsModule } from './user-info/reviews/reviews/reviews.module';
@Module({
  imports: [
    KafkaModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    IdentityModule,
    UsersModule,
    UserInfoModule,
    OrderHistoryModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, IdentityService, JwtService],
  exports: [],
})
export class AppModule {}
