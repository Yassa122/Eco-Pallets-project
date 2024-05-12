import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDoc } from '../../schemas/review.schema';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from 'src/user-info/dto/update-review.dto';
import { CreateProductDto } from 'src/user-info/dto/create-product.dto';
import { ProductSchema } from 'src/user-info/schemas/product.schema';
import { Product } from 'src/user-info/interfaces/product';
import { User } from 'src/identity/schemas/user.schema';
import { UserReviewsDto } from 'src/user-info/dto/get-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<ReviewDoc>,
  @InjectModel('Product') private readonly productModel: Model<Product>,
  @InjectModel('User') private readonly userModel: Model<User>
) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }
  
  async findUserReviews(userId: string): Promise<UserReviewsDto[]> {
    // Find reviews by user ID and populate product details
    const reviews = await this.reviewModel
      .find({ userId })
      .populate('productId', 'name description') // Populate only specific product fields
      .exec();
  
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException(`No reviews found for user with ID ${userId}.`);
    }
  
    // Map the review documents to the UserReviewsDto
    const userReviewsDto: UserReviewsDto[] = reviews.map((review) => ({
      productId: review.productId.toString(),
      productName: review.productId['name'], // Access the populated `name` field
      productDescription: review.productId['description'], // Access the populated `description` field
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));
  
    return userReviewsDto;
  }

  // async findUserReviews(userId: string): Promise<ReviewDoc[]> {
  //   const reviews = await this.reviewModel.find({ userId }).populate('productId').exec();
  //   if (!reviews) {
  //     throw new NotFoundException(`No reviews found for user with ID ${userId}.`);
  //   }
  //   return reviews;
  // }

  async addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<ReviewDoc> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const review = new this.reviewModel({
      ...createReviewDto,
      productId,
      userId
    });

    const savedReview = await review.save();

    // Add the review to the user's list of reviews
    user.reviews.push(savedReview._id);
    await user.save();

    return savedReview;
  }
  

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<ReviewDoc> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto, { new: true }).exec();
    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found.`);
    }

    return updatedReview;
  }

  async deleteReview(reviewId: string): Promise<ReviewDoc> {
    return this.reviewModel.findByIdAndDelete(reviewId).exec();
  }
  
}
