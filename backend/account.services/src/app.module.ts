import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { KafkaModule } from './kafka/kafka.module';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaService } from './kafka/kafka.service';
//import { ProfileService } from './profile/profile.service';
import { ReviewsModule } from './user-info/reviews/reviews/reviews.module';
import { WishlistModule } from './user-info/wishlist/wishlist/wishlist.module';
// import { ProfileModule } from './profile/profile.module';
import { UserInfoModule } from './user-info/user-info/user-info.module';
import { IdentityService } from './identity/identity.service';
import { UserInfoService } from './user-info/user-info/user-info.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    KafkaModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    IdentityModule,
    UsersModule,
    ReviewsModule,

    WishlistModule, // Correct the name if it is different
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey_YoucANWritewhateveryoulikey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserInfoService,
    KafkaService,
    JwtService,
    IdentityService,
  ],
})
export class AppModule {}
