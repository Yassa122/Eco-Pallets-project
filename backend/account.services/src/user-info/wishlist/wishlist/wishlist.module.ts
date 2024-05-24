// wishlist.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistSchema } from '../../schemas/wishlist.schems';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { ProductSchema } from '../../schemas/product.schema';
import { JwtStrategy } from 'src/identity/strategies/jwt.strategy';
import { UserSchema } from 'src/identity/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Wishlist', schema: WishlistSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService, JwtStrategy],
  exports: [WishlistService],
})
export class WishlistModule {}
