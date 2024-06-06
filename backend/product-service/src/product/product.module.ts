import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';
import { ReviewSchema } from './schemas/review.schema';
import { WishlistSchema } from './schemas/wishlist.schema';
import { productProviders } from './database/product.providers';
import { databaseProviders } from './database/database.providers';
import { reviewProviders } from './database/review.providers';
import { RentalSchema } from './schemas/rentals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Review', schema: ReviewSchema },
      { name: 'Wishlist', schema: WishlistSchema },
      { name: 'Rentals', schema: RentalSchema },
    ]),
  ], // Corrected schema name
  controllers: [ProductController],
  providers: [ProductService, ...databaseProviders, ...productProviders],
  exports: [ProductService, MongooseModule], // Make sure to export MongooseModule],
})
export class ProductModule {}
