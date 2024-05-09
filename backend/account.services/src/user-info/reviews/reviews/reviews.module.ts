// src/reviews/reviews.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewDoc } from '../../schemas/review.schema';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from '../reviews/reviews.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    MongooseModule.forFeature([{ name: 'Review', schema: Review}])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService]  // Only necessary if it's used outside this module
})
export class ReviewsModule {}
