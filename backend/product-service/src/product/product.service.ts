import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { Rentals } from './interfaces/rentals';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { RentProductDto } from './dto/rent-product.dto';
import { productProviders } from './database/product.providers';
import { KafkaService } from './kafka/kafka.service'; // Import KafkaService

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlist>,
    @InjectModel('Rentals') private readonly rentalModel: Model<Rentals>,
    private readonly kafkaService: KafkaService, // Inject KafkaService
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async viewProductDetails(id: string): Promise<Product> {
    console.log(id);
    try {
      console.log(`Finding product with ID: ${id}`);
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error finding product with ID: ${id}', error.stack);
      throw error;
    }
  }

  async getAllProducts(): Promise<CreateProductDto[]> {
    const products = this.productModel.find().exec();
    console.log('fetch', products);
    return products;
  }

  async addReview(
    productId: string,
    userId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    console.log(createReviewDto);
    const review = new this.reviewModel({
      productId,
      userId,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    });
    return review.save();
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    const reviews = await this.reviewModel.find({ productId }).exec();
    console.log(productId);
    console.log(reviews);
    if (!reviews) {
      throw new NotFoundException('No reviews found for this product');
    }
    return reviews;
  }

  async deleteReview(id: string, userId: string): Promise<{ message: string }> {
    const review = await this.reviewModel.findById(id).exec();
    console.log('Found review:', review);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    await this.reviewModel.findByIdAndDelete(id).exec();
    return { message: 'Review successfully deleted' };
  }

  async addToWishlist(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    console.log(
      `Received request to add to wishlist: ${JSON.stringify(createWishlistDto)}`,
    );

    const { userId, productId } = createWishlistDto;

    // Validate product ID format
    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException(`Invalid product ID: ${productId}`);
    }

    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      console.log(`Product with ID ${productId} not found`);
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Find or create wishlist
    let wishlist = await this.wishlistModel.findOne({ userId }).exec();
    if (!wishlist) {
      wishlist = new this.wishlistModel({ userId, products: [] });
      console.log(`Created new wishlist for user ID ${userId}`);
    }

    // Ensure wishlist.products is an array
    if (!Array.isArray(wishlist.products)) {
      wishlist.products = [];
    }

    // Check if product is already in the wishlist
    const productExists = wishlist.products.some((item) =>
      item.productId.equals(productId),
    );
    if (productExists) {
      console.log(`Product with ID ${productId} is already in the wishlist`);
      throw new ConflictException(
        `Product with ID ${productId} is already in the wishlist`,
      );
    }

    // Add product to wishlist
    wishlist.products.push({
      productId: new Types.ObjectId(productId),
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      color: product.color,
      size: product.size,
      material: product.material,
      availability: product.availability,
      rentalOptions: product.rentalOptions,
    });

    const savedWishlist = await wishlist.save();
    console.log(
      `Product with ID ${productId} added to wishlist for user ID ${userId}`,
    );

    // Emit Kafka event after adding to wishlist
    try {
      await this.kafkaService.sendMessage('wishlist-add', {
        userId,
        productId,
      });
    } catch (error) {
      console.error('Failed to send message to Kafka:', error);
    }

    return savedWishlist;
  }

  async getWishlistByUser(userId: string): Promise<any> {
    console.log('Finding wishlist for User ID:', userId);
    return this.wishlistModel.find({ userId }).populate('productId').exec();
  }

  async removeFromWishlist(productId: string): Promise<Wishlist | null> {
    const removedItem = await this.wishlistModel
      .findOneAndDelete({ productId })
      .exec();

    // Emit Kafka event after removing from wishlist
    await this.kafkaService.sendMessage('wishlist-remove', { productId });

    return removedItem;
  }

  async customizeProduct(
    productId: string,
    customizationDto: CustomizationDto,
  ): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.color = customizationDto.color;
    product.size = customizationDto.size;
    product.material = customizationDto.material;

    return product.save();
  }

  async rentProduct(
    productId: string,
    rentProductDto: RentProductDto,
  ): Promise<any> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { rentalStart, rentalEnd, deposit } = rentProductDto;

    const startDate = new Date(rentalStart);
    const endDate = new Date(rentalEnd);
    const rentalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (rentalDays <= 0) {
      throw new Error('Invalid rental period');
    }

    const totalPrice = rentalDays * deposit;
    const rentalRecord = new this.rentalModel({
      productId,
      rentalStart,
      rentalEnd,
      rentalDays,
      deposit,
      totalPrice,
    });

    await rentalRecord.save();

    return {
      productId,
      rentalStart,
      rentalEnd,
      rentalDays,
      deposit,
      totalPrice,
    };
  }
}
