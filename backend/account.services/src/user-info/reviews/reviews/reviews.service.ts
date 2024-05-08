import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDoc } from '../../schemas/review.schema';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from 'src/user-info/dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<ReviewDoc>) {}

  async findUserReviews(userId: string): Promise<ReviewDoc[]> {
    return this.reviewModel.find({ userId }).exec();
  }

  async createReview(userId: string, createReviewDto: CreateReviewDto): Promise<ReviewDoc> {
    const review = new this.reviewModel({ ...createReviewDto, userId });
    return review.save();
  }

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<ReviewDoc> {
    return this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto, { new: true }).exec();
  }

  async deleteReview(reviewId: string): Promise<ReviewDoc> {
    return this.reviewModel.findByIdAndDelete(reviewId).exec();
  }
  
}
