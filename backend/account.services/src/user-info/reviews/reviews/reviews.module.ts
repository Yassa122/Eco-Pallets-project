// src/reviews/reviews.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema} from '../../schemas/review.schema';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from '../reviews/reviews.service';
import { ProductSchema } from 'src/user-info/schemas/product.schema';
import { UserSchema } from 'src/identity/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema}]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
   ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService]  // Only necessary if it's used outside this module
})
export class ReviewsModule {}
