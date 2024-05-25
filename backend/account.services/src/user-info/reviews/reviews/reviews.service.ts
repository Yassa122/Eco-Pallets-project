import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReviewSchema} from '../../schemas/review.schema';
import { Reviews } from 'src/user-info/interfaces/reviews';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from 'src/user-info/dto/update-review.dto';
import { CreateProductDto } from 'src/user-info/dto/create-product.dto';
import { ProductSchema } from 'src/user-info/schemas/product.schema';
import { Product } from 'src/user-info/interfaces/product';
import { User } from 'src/identity/schemas/user.schema';
import { UserReviewsDto } from 'src/user-info/dto/get-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<Reviews>,
  @InjectModel('Product') private readonly productModel: Model<Product>,
  @InjectModel('User') private readonly userModel: Model<User>
) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  
  
  async findUserReviews(userId: string): Promise<UserReviewsDto[]> {
    // Find reviews by user ID and populate product details
    const reviews = await this.reviewModel
      .find({ userId })
      .populate('productId', 'name description images') // Populate only specific product fields
      .exec();
  
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException(`No reviews found for user with ID ${userId}.`);
    }
  
    // Map the review documents to the UserReviewsDto
    const userReviewsDto: UserReviewsDto[] = reviews.map((review) => ({
      reviewId: review._id.toString(), // Add the review ID her
      productId: review.productId.toString(),
      productName: review.productId['name'], // Access the populated `name` field
      productDescription: review.productId['description'],
      productImages: review.productId['images'], 
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));
  
    return userReviewsDto;
  }


  async addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Reviews> {
    // Find the product
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    // Find the user
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Check if the user has already reviewed this product
    const existingReview = await this.reviewModel.findOne({ productId, userId });
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this product.');
    }

    // Create a new review instance
    const review = new this.reviewModel({
      ...createReviewDto,
      productId: new Types.ObjectId(productId),
      userId: new Types.ObjectId(userId)
    });

    // Save the review
    const savedReview = await review.save();

    // Add the review to the user's reviews list
    user.reviews.push(savedReview._id);
    await user.save();

    // Add the review to the product's reviews list
    product.reviews.push(savedReview as unknown as Reviews); // Use assertion to treat as Reviews
    await product.save();

    return savedReview as unknown as Reviews; // Return as Reviews
  }
  

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<Reviews> {
    const existingReview = await this.reviewModel.findById(reviewId);
    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found.`);
    }
  
    const updatedReview = await this.reviewModel.findByIdAndUpdate(
      reviewId,
      updateReviewDto,
      { new: true }
    ).exec();
    
    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found after update.`);
    }
  
    const product = await this.productModel.findById(updatedReview.productId);
    if (product) {
      const reviewIndex = product.reviews.findIndex((prodReview) => 
        prodReview instanceof Types.ObjectId ? prodReview.equals(updatedReview._id) : prodReview._id.equals(updatedReview._id)
      );
  
      if (reviewIndex >= 0) {
        product.reviews[reviewIndex] = updatedReview as unknown as Reviews;
        await product.save();
      }
    }
  
    return updatedReview as unknown as Reviews;
  }

  async deleteReview(reviewId: string): Promise<Reviews> {
    // Find the review to get references to the user and product
    const review = await this.reviewModel.findById(reviewId);
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found.`);
    }

    // Delete the review
    const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found for deletion.`);
    }

    // Update the user: Remove the review from the user's list of reviews
    const user = await this.userModel.findById(review.userId);
    if (user) {
      user.reviews = user.reviews.filter((reviewId) => !reviewId.equals(deletedReview._id));
      await user.save();
    }

    // Update the product: Remove the review from the product's embedded reviews array
    const product = await this.productModel.findById(review.productId);
    if (product) {
      product.reviews = product.reviews.filter((prodReview) => !prodReview._id.equals(deletedReview._id));
      await product.save();
    }

    return deletedReview;
  }
  
}
