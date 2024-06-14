import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { KafkaModule } from './kafka/kafka.module';
import { ReviewsModule } from './user-info/reviews/reviews/reviews.module';
import { WishlistModule } from './user-info/wishlist/wishlist/wishlist.module';
import { UserInfoModule } from './user-info/user-info/user-info.module';
import { IdentityService } from './identity/identity.service';
import { UserInfoService } from './user-info/user-info/user-info.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './identity/strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Admin:98pE-8FZADg8bbZ@eco-pallets.saefewe.mongodb.net/plastic-pallets?retryWrites=true&w=majority&appName=Eco-Pallets',
    ),
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    IdentityModule,
    UsersModule,
    ReviewsModule,
    WishlistModule,
    KafkaModule,
    UserInfoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserInfoService,
    KafkaService,
    IdentityService,
    GoogleStrategy,
  ],
})
export class AppModule {}
