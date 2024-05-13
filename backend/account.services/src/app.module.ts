import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { KafkaModule } from './kafka/kafka.module';
import { ProfileService } from './profile/profile.service';
import { UserInfoService } from './user-info/user-info/user-info.service';
import { ReviewsModule } from './user-info/reviews/reviews/reviews.module';
import { WishlistModule } from './user-info/wishlist/wishlist/wishlist.module';
import { KafkaService } from './kafka/kafka.service';
import { JwtService } from '@nestjs/jwt';
import { IdentityService } from './identity/identity.service';
@Module({
  imports: [
    KafkaModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    IdentityModule,
    UsersModule,
    ReviewsModule,
    WishlistModule, // Correct the name if it is different
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProfileService,
    UserInfoService,
    KafkaService,
    JwtService,
    IdentityService
  ],
})
export class AppModule {}
